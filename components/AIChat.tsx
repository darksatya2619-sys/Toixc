
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Trash2 } from 'lucide-react';
import { chatWithToxicAI } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Welcome to Toxicfy. I'm the Toxic AI. What kind of garbage music are you into today? I'm here to judge you and maybe give a recommendation if I'm feeling generous." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = await chatWithToxicAI(newMessages);
    setMessages([...newMessages, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-4xl mx-auto bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles size={20} fill="black" />
          </div>
          <div>
            <h2 className="font-bold text-white leading-none">Toxic AI Critic</h2>
            <p className="text-xs text-emerald-500 font-medium">Online (Judging you)</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'model', content: "Back for more abuse? Fine. What do you want?" }])}
          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-zinc-700' : 'bg-emerald-500'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} fill="black" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-zinc-800 text-white rounded-tr-none' 
                : 'bg-emerald-500/10 text-emerald-100 border border-emerald-500/20 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse">
                <Sparkles size={16} fill="black" />
              </div>
              <div className="p-3 bg-emerald-500/5 text-zinc-400 rounded-2xl italic text-xs animate-pulse">
                Analyzing your questionable taste...
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-zinc-900 border-t border-zinc-800">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center"
        >
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me for an edgy recommendation..."
            className="w-full bg-zinc-800 border-none text-white rounded-xl py-4 pl-4 pr-14 focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm shadow-inner"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-lg"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-[10px] text-center text-zinc-600 mt-2 font-medium tracking-wide">
          WARNING: THIS AI MAY HURT YOUR FEELINGS. PROCEED WITH CAUTION.
        </p>
      </div>
    </div>
  );
};

export default AIChat;
