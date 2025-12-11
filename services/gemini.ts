import { GoogleGenAI, Type } from "@google/genai";
import { siteContent } from "./siteContent";

// Helper to check and prompt for API key if needed (Client-side only)
export const ensureApiKey = async () => {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) {
            await (window as any).aistudio.openSelectKey();
        }
        return true;
    }
    return false;
};

// Helper to get a fresh instance, ensuring we capture any API key updates from window.aistudio interactions
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Chatbot using Gemini 3 Pro with Grounding and Thinking
export const chatWithGemini = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const ai = getAi();
    const model = 'gemini-3-pro-preview';
    const chat = ai.chats.create({
      model: model,
      history: history,
      config: {
        systemInstruction: "You are the 'Marketing Widget' AI assistant. You are an expert in digital marketing strategies, SEO, PPC, and web development. You are helpful, professional, and concise. You can also answer questions about the 'Marketing Widget' agency services.",
        thinkingConfig: { thinkingBudget: 32768 }, // Max thinking budget for complex queries
        tools: [{ googleSearch: {} }, { googleMaps: {} }], // Grounding
      }
    });

    const result = await chat.sendMessage({ message });
    // Return text and grounding metadata if available
    return {
        text: result.text,
        groundingMetadata: result.candidates?.[0]?.groundingMetadata
    };
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};

// Image Editing using Gemini 2.5 Flash Image (Nano Banana)
export const editImageWithGemini = async (base64Image: string, prompt: string) => {
  try {
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/png',
            },
          },
          { text: prompt },
        ],
      },
    });
    
    // Check for image in response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null; // No image returned
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
};

// Image Generation using Gemini 3 Pro Image (Nano Banana Pro)
export const generateImageWithGemini = async (prompt: string, size: '1K' | '2K' | '4K', aspectRatio: string) => {
    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    imageSize: size,
                    aspectRatio: aspectRatio as any // Cast to allow user specified ratios
                }
            }
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Gemini Image Gen Error:", error);
        throw error;
    }
}

// Image Analysis using Gemini 3 Pro
export const analyzeImageWithGemini = async (base64Image: string, prompt: string) => {
    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: 'image/png', // Assuming PNG for simplicity, can be dynamic
                        }
                    },
                    { text: prompt || "Analyze this image." }
                ]
            }
        });
        return response.text;
    } catch (error) {
        console.error("Image Analysis Error:", error);
        throw error;
    }
}

// Video Generation using Veo (Text or Image to Video)
export const generateVideoWithVeo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '16:9', startImage?: string) => {
  try {
    const ai = getAi();
    // Use fast-generate-preview as requested
    const model = 'veo-3.1-fast-generate-preview';
    
    const request: any = {
        model,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio
        }
    };

    if (startImage) {
        request.image = {
            imageBytes: startImage,
            mimeType: 'image/png'
        };
        // Prompt is optional if image provided, but good to have
        if (prompt) request.prompt = prompt;
    } else {
        request.prompt = prompt;
    }

    let operation = await ai.models.generateVideos(request);

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (videoUri) {
        // Must append API key
        return `${videoUri}&key=${process.env.API_KEY}`; 
    }
    return null;
  } catch (error) {
    console.error("Veo Video Gen Error:", error);
    throw error;
  }
};

// TTS using Flash
export const generateSpeech = async (text: string) => {
    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: ['AUDIO'],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });
        return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    } catch (error) {
        console.error("TTS Error:", error);
        throw error;
    }
}

// Audio Transcription using Flash
export const transcribeAudio = async (base64Audio: string, mimeType: string = 'audio/mp3') => {
    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Audio,
                            mimeType: mimeType
                        }
                    },
                    { text: "Transcribe this audio exactly." }
                ]
            }
        });
        return response.text;
    } catch (error) {
        console.error("Transcription Error:", error);
        throw error;
    }
}

// Low Latency Response
export const fastResponse = async (prompt: string) => {
    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Fast Response Error:", error);
        throw error;
    }
}

// AI Powered Site Search
export const searchSite = async (query: string) => {
    try {
        const ai = getAi();
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                You are a smart search engine for the 'Marketing Widget' agency website. 
                Your goal is to find the most relevant content for the user's query from the index below.
                
                Content Index: ${JSON.stringify(siteContent)}
                
                User Query: "${query}"
                
                Instructions:
                1. Analyze the query for typos, misspellings, or vague intent.
                2. If the query has typos (e.g., "marketng", "anlytics") or is semantically close to a known term (e.g., "ads" -> "Paid Advertising"), provide a corrected or better search phrase in the 'suggestion' field.
                3. Search the Content Index for items relevant to the (corrected) query.
                4. Return up to 5 results.
                
                Output Schema (JSON):
                {
                  "results": [
                    { "title": "string", "path": "string", "type": "string", "reason": "string" }
                  ],
                  "suggestion": "string | null" 
                }
            `,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        results: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    path: { type: Type.STRING },
                                    type: { type: Type.STRING },
                                    reason: { type: Type.STRING, description: "A brief snippet explaining relevance" }
                                },
                                required: ['title', 'path', 'type', 'reason']
                            }
                        },
                        suggestion: {
                            type: Type.STRING,
                            description: "A corrected search query if the user's query has typos or is unclear. Null or empty string if no correction needed."
                        }
                    },
                    required: ['results']
                }
            }
        });

        // The response text is a JSON string because of responseMimeType config.
        // Clean markdown blocks if present (Gemini sometimes adds them).
        let cleanText = response.text || '{ "results": [] }';
        cleanText = cleanText.replace(/```json\n?|```/g, '').trim();
        
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("AI Search Error:", error);
        // Fallback or empty result on error
        return { results: [], suggestion: null };
    }
}