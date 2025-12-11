import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchSite } from '../services/gemini';

interface AiSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiSearchModal: React.FC<AiSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setSuggestion(null);
    try {
        const data = await searchSite(searchTerm);
        setResults(data.results || []);
        if (data.suggestion && data.suggestion.toLowerCase() !== searchTerm.toLowerCase()) {
            setSuggestion(data.suggestion);
        }
    } catch (error) {
        console.error(error);
        setResults([]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const handleApplySuggestion = () => {
      if (suggestion) {
          setQuery(suggestion);
          performSearch(suggestion);
      }
  };

  const handleNavigate = (path: string) => {
      navigate(path);
      onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a2230] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-slate-200 dark:border-white/10 p-4">
            <span className="material-symbols-outlined text-slate-400 text-2xl mr-3">search</span>
            <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything... (e.g., 'How can I improve my SEO?')"
                className="flex-grow bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-400 outline-none"
            />
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <button type="submit" className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-slate-600">
                    Enter
                </button>
            )}
        </form>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
            
            {/* Suggestion Prompt */}
            {!isLoading && suggestion && (
                <div className="px-4 py-3 mb-2 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-lg flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 text-lg">lightbulb</span>
                    <span className="font-medium">Did you mean:</span>
                    <button 
                        onClick={handleApplySuggestion}
                        className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                        {suggestion}
                    </button>
                    <span>?</span>
                </div>
            )}

            {!isLoading && results.length === 0 && query && !suggestion && (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <p>No results found for "{query}"</p>
                    <p className="text-xs mt-2">Try asking differently or browse our services.</p>
                </div>
            )}
            
            {!isLoading && results.length === 0 && !query && (
                <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">smart_toy</span>
                    <p>AI Search is ready.</p>
                </div>
            )}

            {results.length > 0 && (
                <div className="space-y-1">
                    <p className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Top Matches</p>
                    {results.map((result, idx) => (
                        <button 
                            key={idx}
                            onClick={() => handleNavigate(result.path)}
                            className="w-full text-left p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 flex items-start gap-4 transition-colors group"
                        >
                            <div className={`mt-1 p-2 rounded-md shrink-0 
                                ${result.type === 'Service' ? 'bg-blue-100 text-blue-600' : 
                                  result.type === 'Blog' ? 'bg-purple-100 text-purple-600' : 
                                  result.type === 'Case Study' ? 'bg-green-100 text-green-600' : 
                                  'bg-slate-100 text-slate-600'}`}>
                                <span className="material-symbols-outlined text-lg">
                                    {result.type === 'Service' ? 'design_services' : 
                                     result.type === 'Blog' ? 'article' : 
                                     result.type === 'Case Study' ? 'trending_up' : 
                                     'description'}
                                </span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{result.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{result.reason}</p>
                            </div>
                            <span className="ml-auto material-symbols-outlined text-slate-300 group-hover:text-primary text-sm self-center">arrow_forward</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
        
        {/* Footer */}
        <div className="bg-slate-50 dark:bg-[#151b26] p-3 text-xs text-slate-500 flex justify-between border-t border-slate-200 dark:border-white/10">
            <span>Powered by Gemini 2.5 Flash</span>
            <span className="flex gap-2">
                <span className="flex items-center gap-1"><kbd className="bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 font-sans">Esc</kbd> to close</span>
            </span>
        </div>
      </div>
    </div>
  );
};

export default AiSearchModal;