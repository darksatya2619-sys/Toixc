
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import AIChat from './components/AIChat';
import Library from './components/Library';
import AuthModal from './components/AuthModal';
import { ViewType, Song, User, Playlist } from './types';
import { MOCK_SONGS, MOCK_PLAYLISTS } from './constants';
import { 
  Search, Bell, User as UserIcon, Play, Clock, MoreHorizontal, Heart, 
  Sparkles, SkipBack, SkipForward, Home, Library as LibraryIcon, MessageSquareText,
  Globe, Languages, Star, Flame
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewType>(ViewType.HOME);
  const [currentSong, setCurrentSong] = useState<Song | null>(MOCK_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth & Profile State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const filteredSongs = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return MOCK_SONGS.filter(s => 
      s.title.toLowerCase().includes(query) || 
      s.artist.toLowerCase().includes(query) ||
      s.genre.toLowerCase().includes(query) ||
      s.language?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const playSong = useCallback((song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  }, []);

  // Added playNext and playPrevious functions to handle player navigation
  const playNext = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = MOCK_SONGS.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % MOCK_SONGS.length;
    setCurrentSong(MOCK_SONGS[nextIndex]);
    setIsPlaying(true);
  }, [currentSong]);

  const playPrevious = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = MOCK_SONGS.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + MOCK_SONGS.length) % MOCK_SONGS.length;
    setCurrentSong(MOCK_SONGS[prevIndex]);
    setIsPlaying(true);
  }, [currentSong]);

  const toggleLike = useCallback((songId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setUser(prev => {
      if (!prev) return null;
      const alreadyLiked = prev.likedSongIds.includes(songId);
      return {
        ...prev,
        likedSongIds: alreadyLiked 
          ? prev.likedSongIds.filter(id => id !== songId)
          : [...prev.likedSongIds, songId]
      };
    });
  }, [user]);

  const handleAuth = (username: string) => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      username,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      likedSongIds: [],
      playlists: [...MOCK_PLAYLISTS]
    });
  };

  const createPlaylist = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const name = prompt("Enter playlist name:");
    if (name) {
      const newPlaylist: Playlist = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        description: "A toxic collection.",
        coverUrl: `https://picsum.photos/seed/${name}/400/400`,
        songs: []
      };
      setUser(prev => prev ? { ...prev, playlists: [...prev.playlists, newPlaylist] } : null);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewType.AI_CHAT:
        return <AIChat />;
      case ViewType.LIBRARY:
        return (
          <Library 
            likedSongIds={user?.likedSongIds || []} 
            playlists={user?.playlists || []}
            onPlaySong={playSong}
            onCreatePlaylist={createPlaylist}
          />
        );
      case ViewType.SEARCH:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={24} />
                <input 
                    autoFocus
                    type="text" 
                    placeholder="Search Hindi, Bhojpuri, or Toxic Hits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 py-4 pl-14 pr-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg transition-all"
                />
            </div>
            
            {searchQuery ? (
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Star className="text-emerald-500" size={20} />
                        Found for "{searchQuery}"
                    </h3>
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
                                <p className="text-sm text-zinc-500 truncate italic">{song.artist}</p>
                                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full mt-2 inline-block font-bold">
                                    {song.language}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      { name: 'Bhojpuri Beats', icon: Languages, color: 'from-orange-500/20' },
                      { name: 'Hindi Romance', icon: Heart, color: 'from-red-500/20' },
                      { name: 'Global Hits', icon: Globe, color: 'from-blue-500/20' },
                      { name: 'Trending Now', icon: Flame, color: 'from-emerald-500/20' }
                    ].map(category => (
                        <div 
                          key={category.name} 
                          onClick={() => setSearchQuery(category.name.split(' ')[0])}
                          className={`h-40 rounded-3xl bg-gradient-to-br ${category.color} to-zinc-900/40 p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer border border-zinc-800 hover:border-zinc-700 group`}
                        >
                            <category.icon className="text-zinc-500 group-hover:text-white transition-colors" size={32} />
                            <span className="text-xl font-black italic tracking-tight">{category.name}</span>
                        </div>
                    ))}
                </div>
            )}
          </div>
        );
      case ViewType.PROFILE:
        return (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center text-center space-y-4">
               <div className="w-40 h-40 rounded-full border-4 border-emerald-500 p-1 shadow-2xl shadow-emerald-500/20 overflow-hidden">
                  <img src={user?.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest'} className="w-full h-full rounded-full bg-zinc-800" />
               </div>
               <div>
                  <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase">{user?.username || 'GUEST USER'}</h2>
                  <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mt-2">Toxic Member Since 2024</p>
               </div>
               <button 
                  onClick={() => user ? setUser(null) : setIsAuthModalOpen(true)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-2 rounded-full font-bold transition-all"
               >
                  {user ? 'SIGN OUT' : 'SIGN IN'}
               </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'Liked Songs', count: user?.likedSongIds.length || 0 },
                  { label: 'Playlists', count: user?.playlists.length || 0 },
                  { label: 'Toxic Score', count: '99' }
                ].map(stat => (
                  <div key={stat.label} className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 text-center">
                    <div className="text-3xl font-black italic text-emerald-500">{stat.count}</div>
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">{stat.label}</div>
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
                  <h2 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">Toxic Hits</h2>
                  <p className="text-zinc-500 font-medium">Top trending tracks globally, in Hindi & Bhojpuri.</p>
                </div>
                <button className="text-emerald-500 font-bold hover:underline text-sm uppercase tracking-widest">See All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {MOCK_SONGS.slice(0, 6).map(song => (
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
               <h2 className="text-3xl font-black italic tracking-tighter text-white mb-6 uppercase">For Your Desi Meltdown</h2>
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
                          <button onClick={(e) => { e.stopPropagation(); }} className="hover:text-emerald-500 transition-colors"><Heart size={20} /></button>
                          <button onClick={(e) => { e.stopPropagation(); }} className="hover:text-emerald-500 transition-colors"><MoreHorizontal size={20} /></button>
                          <span className="text-xs font-mono uppercase ml-auto">{playlist.songs.length} Tracks</span>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        );
    }
  };

  const isLiked = currentSong ? user?.likedSongIds.includes(currentSong.id) : false;

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
            <div 
              onClick={() => setView(ViewType.PROFILE)}
              className={`w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 overflow-hidden cursor-pointer hover:border-emerald-500 transition-all ${currentView === ViewType.PROFILE ? 'border-emerald-500 ring-2 ring-emerald-500/20' : ''}`}
            >
              {user ? (
                <img src={user.avatarUrl} alt={user.username} />
              ) : (
                <UserIcon size={20} className="text-zinc-500" />
              )}
            </div>
            {!user && (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-emerald-500 text-black px-4 py-1.5 rounded-full font-bold text-sm hover:bg-emerald-400 transition-all"
              >
                SIGN IN
              </button>
            )}
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

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuth={handleAuth} 
      />

      {/* Mobile Nav Overlay (simplified) */}
      <div className="md:hidden fixed bottom-24 left-4 right-4 bg-zinc-900/90 backdrop-blur-lg rounded-2xl p-2 flex justify-around border border-zinc-800 z-50 shadow-2xl">
        <button onClick={() => setView(ViewType.HOME)} className={`p-3 rounded-xl ${currentView === ViewType.HOME ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-500'}`}><Home size={24} /></button>
        <button onClick={() => setView(ViewType.SEARCH)} className={`p-3 rounded-xl ${currentView === ViewType.SEARCH ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-500'}`}><Search size={24} /></button>
        <button onClick={() => setView(ViewType.LIBRARY)} className={`p-3 rounded-xl ${currentView === ViewType.LIBRARY ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-500'}`}><LibraryIcon size={24} /></button>
        <button onClick={() => setView(ViewType.AI_CHAT)} className={`p-3 rounded-xl ${currentView === ViewType.AI_CHAT ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-500'}`}><MessageSquareText size={24} /></button>
      </div>
    </div>
  );
};

export default App;
