
import React, { useState, useCallback, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import AIChat from './components/AIChat';
import { ViewType, Song } from './types';
import { MOCK_SONGS, MOCK_PLAYLISTS } from './constants';
import { 
  Search, Bell, User, Play, Clock, MoreHorizontal, Heart, 
  Sparkles, SkipBack, SkipForward, Home, Library, MessageSquareText 
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewType>(ViewType.HOME);
  const [currentSong, setCurrentSong] = useState<Song | null>(MOCK_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = useMemo(() => {
    return MOCK_SONGS.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const playSong = useCallback((song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  }, []);

  const playNext = useCallback(() => {
    if (!currentSong) return;
    const idx = MOCK_SONGS.findIndex(s => s.id === currentSong.id);
    const nextIdx = (idx + 1) % MOCK_SONGS.length;
    setCurrentSong(MOCK_SONGS[nextIdx]);
  }, [currentSong]);

  const playPrevious = useCallback(() => {
    if (!currentSong) return;
    const idx = MOCK_SONGS.findIndex(s => s.id === currentSong.id);
    const prevIdx = (idx - 1 + MOCK_SONGS.length) % MOCK_SONGS.length;
    setCurrentSong(MOCK_SONGS[prevIdx]);
  }, [currentSong]);

  const renderContent = () => {
    switch (currentView) {
      case ViewType.AI_CHAT:
        return <AIChat />;
      case ViewType.SEARCH:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={24} />
                <input 
                    autoFocus
                    type="text" 
                    placeholder="Search for toxic tunes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 py-4 pl-14 pr-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg transition-all"
                />
            </div>
            
            {searchQuery && (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Search results</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {filteredSongs.map(song => (
                            <div key={song.id} className="bg-zinc-900/40 p-4 rounded-xl hover:bg-zinc-800/60 transition-all group cursor-pointer" onClick={() => playSong(song)}>
                                <div className="relative aspect-square mb-4 shadow-xl overflow-hidden rounded-lg">
                                    <img src={song.coverUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            <Play size={24} fill="black" />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="font-bold truncate">{song.title}</h4>
                                <p className="text-sm text-zinc-500 truncate">{song.artist}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {['Hyperpop', 'Glitch', 'Industrial', 'Doom Metal', 'Vaporwave', 'Phonk'].map(genre => (
                    <div key={genre} className="h-32 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 p-4 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer border border-zinc-800">
                        <span className="text-lg font-black italic tracking-tight">{genre}</span>
                        <div className="flex justify-end opacity-20"><Search size={40} /></div>
                    </div>
                ))}
            </div>
          </div>
        );
      case ViewType.HOME:
      default:
        return (
          <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">Corrosive Hits</h2>
                  <p className="text-zinc-500 font-medium">Top trending tracks that'll dissolve your speakers.</p>
                </div>
                <button className="text-emerald-500 font-bold hover:underline text-sm uppercase tracking-widest">See All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {MOCK_SONGS.map(song => (
                  <div 
                    key={song.id} 
                    onClick={() => playSong(song)}
                    className="group bg-zinc-900/30 p-4 rounded-2xl hover:bg-zinc-800/50 transition-all cursor-pointer border border-zinc-900 hover:border-zinc-700"
                  >
                    <div className="relative aspect-square mb-4 shadow-2xl rounded-xl overflow-hidden">
                      <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-black/50">
                          <Play size={24} fill="black" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-white truncate leading-tight mb-1">{song.title}</h3>
                    <p className="text-xs text-zinc-500 truncate font-medium uppercase tracking-tighter">{song.artist}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
               <h2 className="text-3xl font-black italic tracking-tighter text-white mb-6 uppercase">For Your Meltdown</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_PLAYLISTS.map(playlist => (
                    <div key={playlist.id} className="flex gap-6 p-6 bg-zinc-900/40 rounded-3xl border border-zinc-800 hover:bg-zinc-800/60 transition-all group cursor-pointer">
                      <div className="w-32 h-32 flex-shrink-0 shadow-2xl rounded-xl overflow-hidden relative">
                        <img src={playlist.coverUrl} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play fill="white" size={40} />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-2">{playlist.name}</h3>
                        <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{playlist.description}</p>
                        <div className="flex items-center gap-4 text-zinc-400">
                          <button className="hover:text-emerald-500 transition-colors"><Heart size={20} /></button>
                          <button className="hover:text-emerald-500 transition-colors"><MoreHorizontal size={20} /></button>
                          <span className="text-xs font-mono uppercase ml-auto">{playlist.songs.length} Tracks</span>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </section>

            <section className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <span className="text-emerald-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Experimental Feature</span>
                        <h2 className="text-4xl font-black italic tracking-tighter mb-4">WANT AN ACTUAL RECOMMENDATION?</h2>
                        <p className="text-zinc-400 font-medium mb-6">Our AI doesn't care about your feelings, but it knows what's good. Get a tailored, judgmental recommendation right now.</p>
                        <button 
                            onClick={() => setView(ViewType.AI_CHAT)}
                            className="bg-emerald-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 group"
                        >
                            TALK TO TOXIC AI
                            <Play size={14} fill="black" className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="w-48 h-48 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] animate-pulse">
                        <Sparkles size={80} fill="black" />
                    </div>
                </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      <Sidebar currentView={currentView} setView={setView} />
      
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors">
              <SkipBack size={16} fill="white" className="rotate-180" />
            </button>
            <button className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors">
              <SkipForward size={16} fill="white" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-black"></span>
            </button>
            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 overflow-hidden cursor-pointer hover:border-emerald-500 transition-all">
              <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="px-8 pt-4 pb-32">
          {renderContent()}
        </div>
      </main>

      <Player 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        togglePlay={togglePlay}
        playNext={playNext}
        playPrevious={playPrevious}
      />

      {/* Mobile Nav Overlay (simplified) */}
      <div className="md:hidden fixed bottom-24 left-4 right-4 bg-zinc-900/90 backdrop-blur-lg rounded-2xl p-2 flex justify-around border border-zinc-800 z-50">
        <button onClick={() => setView(ViewType.HOME)} className={`p-3 rounded-xl ${currentView === ViewType.HOME ? 'text-emerald-500' : 'text-zinc-500'}`}><Home size={24} /></button>
        <button onClick={() => setView(ViewType.SEARCH)} className={`p-3 rounded-xl ${currentView === ViewType.SEARCH ? 'text-emerald-500' : 'text-zinc-500'}`}><Search size={24} /></button>
        <button onClick={() => setView(ViewType.LIBRARY)} className={`p-3 rounded-xl ${currentView === ViewType.LIBRARY ? 'text-emerald-500' : 'text-zinc-500'}`}><Library size={24} /></button>
        <button onClick={() => setView(ViewType.AI_CHAT)} className={`p-3 rounded-xl ${currentView === ViewType.AI_CHAT ? 'text-emerald-500' : 'text-zinc-500'}`}><MessageSquareText size={24} /></button>
      </div>
    </div>
  );
};

export default App;
