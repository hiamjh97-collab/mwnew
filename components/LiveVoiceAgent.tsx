import React, { useEffect, useState, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { ensureApiKey } from '../services/gemini';

const LiveVoiceAgent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Disconnected');
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Audio Contexts and Nodes
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  
  // Clean up function
  const stopSession = () => {
    if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(session => session.close());
        sessionPromiseRef.current = null;
    }
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
    }
    if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect();
        scriptProcessorRef.current = null;
    }
    if (inputAudioContextRef.current) {
        inputAudioContextRef.current.close();
        inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
        outputAudioContextRef.current.close();
        outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setStatus('Disconnected');
  };

  const startSession = async () => {
    setError(null);
    setStatus('Connecting...');
    try {
        await ensureApiKey(); // Ensure key before connecting
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        
        // Setup Audio
        const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(newStream);

        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        
        // Connect to Live API
        const sessionPromise = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            callbacks: {
                onopen: () => {
                    setStatus('Connected - Listening');
                    
                    // Input processing
                    if (!inputAudioContextRef.current) return;
                    const source = inputAudioContextRef.current.createMediaStreamSource(newStream);
                    const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                    scriptProcessorRef.current = processor;
                    
                    processor.onaudioprocess = (e) => {
                        const inputData = e.inputBuffer.getChannelData(0);
                        const pcmBlob = createBlob(inputData);
                        sessionPromise.then(session => {
                            session.sendRealtimeInput({ media: pcmBlob });
                        });
                    };
                    
                    source.connect(processor);
                    processor.connect(inputAudioContextRef.current.destination);
                },
                onmessage: async (message: LiveServerMessage) => {
                    const outputCtx = outputAudioContextRef.current;
                    if (!outputCtx) return;

                    // Handle Audio Output
                    const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                    if (base64Audio) {
                        try {
                            const audioBuffer = await decodeAudioData(
                                decode(base64Audio),
                                outputCtx,
                                24000,
                                1
                            );
                            
                            const source = outputCtx.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputCtx.destination);
                            
                            source.addEventListener('ended', () => {
                                sourcesRef.current.delete(source);
                            });

                            const currentTime = outputCtx.currentTime;
                            // Schedule next start time
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, currentTime);
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            sourcesRef.current.add(source);
                            
                        } catch (err) {
                            console.error("Audio Decode Error", err);
                        }
                    }

                    // Handle Interruption
                    if (message.serverContent?.interrupted) {
                        sourcesRef.current.forEach(s => s.stop());
                        sourcesRef.current.clear();
                        nextStartTimeRef.current = 0;
                    }
                },
                onclose: () => {
                    setStatus('Disconnected');
                    setIsActive(false);
                },
                onerror: (e) => {
                    console.error("Live API Error", e);
                    setError("Connection Error");
                    stopSession();
                }
            },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
                },
                systemInstruction: "You are a helpful AI assistant for the Marketing Widget agency. Respond concisely and professionally."
            }
        });
        
        sessionPromiseRef.current = sessionPromise;
        setIsActive(true);

    } catch (e: any) {
        console.error(e);
        setError(e.message || "Failed to start session");
        setStatus('Error');
    }
  };

  // Helper Utils for Audio
  function createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    // Encode Int16 array to binary string then btoa
    let binary = '';
    const bytes = new Uint8Array(int16.buffer);
    const len = bytes.byteLength;
    for(let i=0; i<len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return {
        data: btoa(binary),
        mimeType: 'audio/pcm;rate=16000'
    };
  }

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
      const dataInt16 = new Int16Array(data.buffer);
      const frameCount = dataInt16.length / numChannels;
      const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
      
      for(let channel = 0; channel < numChannels; channel++) {
          const channelData = buffer.getChannelData(channel);
          for(let i=0; i<frameCount; i++) {
              channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
          }
      }
      return buffer;
  }
  
  // Cleanup on unmount
  useEffect(() => {
      return () => {
          stopSession();
      }
  }, []);

  return (
    <div className="bg-white dark:bg-[#1a2230] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${isActive ? 'bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse' : 'bg-slate-100 dark:bg-slate-800'}`}>
            <span className={`material-symbols-outlined text-4xl ${isActive ? 'text-red-500' : 'text-slate-400'}`}>
                {isActive ? 'mic' : 'mic_off'}
            </span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Live Voice Agent</h2>
        <p className={`text-sm font-medium mb-8 ${isActive ? 'text-green-500' : 'text-slate-500'}`}>
            Status: {status}
        </p>

        {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                {error}
            </div>
        )}

        {!isActive ? (
            <button 
                onClick={startSession}
                className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20 flex items-center gap-2"
            >
                <span className="material-symbols-outlined">play_arrow</span> Start Conversation
            </button>
        ) : (
             <button 
                onClick={stopSession}
                className="bg-red-500 text-white font-bold py-3 px-8 rounded-full hover:bg-red-600 transition-all hover:scale-105 shadow-lg shadow-red-500/20 flex items-center gap-2"
            >
                <span className="material-symbols-outlined">stop</span> End Conversation
            </button>
        )}
        
        <p className="mt-6 text-xs text-slate-400 text-center max-w-sm">
            Powered by Gemini 2.5 Native Audio Live API. Requires microphone access.
        </p>
    </div>
  );
};

export default LiveVoiceAgent;