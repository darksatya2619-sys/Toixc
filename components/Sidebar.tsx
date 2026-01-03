
import React from 'react';
import { Home, Search, Library, MessageSquareText, PlusCircle, Heart } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewType.HOME, icon: Home, label: 'Home' },
    { id: ViewType.SEARCH, icon: Search, label: 'Explore' },
    { id: ViewType.LIBRARY, icon: Library, label: 'Library' },
    { id: ViewType.AI_CHAT, icon: MessageSquareText, label: 'Toxic AI' },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 hidden md:flex flex-col p-4 h-full">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden relative z-10 rotate-3 group-hover:rotate-0 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&h=200&auto=format&fit=crop" 
              alt="Shubham" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-emerald-500 italic">TOXICFY</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-colors font-medium ${
              currentView === item.id 
              ? 'bg-zinc-900 text-emerald-400' 
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <item.icon size={22} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-8 mt-8 border-t border-zinc-900">
        <button className="w-full flex items-center gap-4 px-3 py-2 text-zinc-400 hover:text-white transition-colors">
          <PlusCircle size={22} />
          <span className="font-medium">Create Playlist</span>
        </button>
        <button className="w-full flex items-center gap-4 px-3 py-2 text-zinc-400 hover:text-white transition-colors mt-2">
          <Heart size={22} />
          <span className="font-medium">Liked Songs</span>
        </button>
      </div>

      <div className="mt-auto p-4 bg-emerald-950/20 rounded-xl border border-emerald-900/50">
        <p className="text-xs text-emerald-500 font-bold uppercase mb-1">Upgrade Your Vibe</p>
        <p className="text-xs text-zinc-400 leading-relaxed mb-3">Go Toxic Premium for zero interruptions.</p>
        <button className="w-full py-2 bg-emerald-500 text-black font-bold text-xs rounded-lg hover:bg-emerald-400 transition-colors">
          GET PREMIUM
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
