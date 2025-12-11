import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../services/gemini';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', parts: { text: string }[], groundingChunks?: any[] }[]>([
    { role: 'model', parts: [{ text: "Hi! I'm the Marketing Widget AI. How can I help you grow your business today?" }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chat-widget', handleOpen);
    return () => window.removeEventListener('open-chat-widget', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMessage }] }]);
    setIsLoading(true);

    try {
      const historyForApi = messages.map(m => ({ role: m.role, parts: m.parts }));
      
      const response = await chatWithGemini(userMessage, historyForApi);
      
      setMessages(prev => [...prev, { 
          role: 'model', 
          parts: [{ text: response.text || "I didn't catch that." }],
          groundingChunks: response.groundingMetadata?.groundingChunks
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I encountered an error connecting to Gemini." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 font-sans">
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[500px] bg-white dark:bg-[#1a2230] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                 <span className="material-symbols-outlined text-xl">smart_toy</span>
               </div>
               <div>
                 <h3 className="font-bold text-sm">Marketing Assistant</h3>
                 <p className="text-xs text-blue-100 flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                 </p>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1.5 transition-colors">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#111621]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white dark:bg-[#232d3f] text-slate-800 dark:text-slate-200 border border-gray-200 dark:border-white/5 rounded-bl-none'
                }`}>
                  {msg.parts[0].text}
                </div>
                
                {/* Grounding Sources */}
                {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                   <div className="mt-2 max-w-[85%] flex flex-wrap gap-2">
                       {msg.groundingChunks.map((chunk, i) => {
                           if (chunk.web?.uri) {
                               return (
                                   <a key={i} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded border border-blue-100 dark:border-blue-800 hover:underline truncate max-w-full flex items-center gap-1">
                                       <span className="material-symbols-outlined text-▪[10px]">public</span>
                                       {chunk.web.title || "Source"}
                                   </a>
                               );
                           }
                           return null;
                       })}
                   </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-[#232d3f] rounded-2xl rounded-bl-none px-4 py-3 border border-gray-200 dark:border-white/5 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span className="text-xs text-slate-500 ml-2">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-[#1a2230] border-t border-gray-200 dark:border-white/10">
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about SEO, Ads, or Strategy..."
                className="flex-1 bg-gray-100 dark:bg-[#0f151f] border-0 rounded-full pl-4 pr-12 h-10 text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-1 top-1 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:bg-gray-400 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-gray-400">Powered by Gemini 3 Pro</p>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 flex items-center justify-center ring-2 ring-white dark:ring-[#1a2230]"
        aria-label="Open Chat"
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'keyboard_arrow_down' : 'chat_bubble'}
        </span>
      </button>
    </div>
  );
};

export default ChatWidget;