
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
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-black rotate-12">T</div>
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
