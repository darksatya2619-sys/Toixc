
import React, { useState } from 'react';
import { Heart, Music, ListMusic, Plus, Play, MoreHorizontal } from 'lucide-react';
import { Song, Playlist, ViewType } from '../types';
import { MOCK_SONGS } from '../constants';

interface LibraryProps {
  likedSongIds: string[];
  playlists: Playlist[];
  onPlaySong: (song: Song) => void;
  onCreatePlaylist: () => void;
}

const Library: React.FC<LibraryProps> = ({ likedSongIds, playlists, onPlaySong, onCreatePlaylist }) => {
  const [activeTab, setActiveTab] = useState<'liked' | 'playlists'>('liked');

  const likedSongs = MOCK_SONGS.filter(s => likedSongIds.includes(s.id));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex gap-8">
          <button 
            onClick={() => setActiveTab('liked')}
            className={`text-xl font-black italic tracking-tighter pb-4 relative transition-colors ${
              activeTab === 'liked' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            LIKED SONGS
            {activeTab === 'liked' && <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-emerald-500" />}
          </button>
          <button 
            onClick={() => setActiveTab('playlists')}
            className={`text-xl font-black italic tracking-tighter pb-4 relative transition-colors ${
              activeTab === 'playlists' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            YOUR PLAYLISTS
            {activeTab === 'playlists' && <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-emerald-500" />}
          </button>
        </div>
        
        {activeTab === 'playlists' && (
          <button 
            onClick={onCreatePlaylist}
            className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-500/20 transition-all"
          >
            <Plus size={18} />
            NEW PLAYLIST
          </button>
        )}
      </div>

      {activeTab === 'liked' ? (
        <div className="space-y-2">
          {likedSongs.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
              <Heart className="mx-auto text-zinc-700 mb-4" size={48} />
              <h3 className="text-xl font-bold text-zinc-500">No liked songs yet.</h3>
              <p className="text-zinc-600 text-sm mt-2">Start heartsing some toxic tunes.</p>
            </div>
          ) : (
            likedSongs.map((song, idx) => (
              <div 
                key={song.id} 
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/40 transition-all cursor-pointer"
                onClick={() => onPlaySong(song)}
              >
                <div className="flex items-center gap-4">
                  <span className="w-4 text-zinc-600 font-mono text-xs">{idx + 1}</span>
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                    <img src={song.coverUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={16} fill="white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white leading-tight">{song.title}</h4>
                    <p className="text-xs text-zinc-500 font-medium">{song.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-xs text-zinc-600 font-mono">{song.duration}</div>
                   <button className="text-zinc-500 hover:text-red-500 transition-colors">
                     <Heart size={18} fill="currentColor" />
                   </button>
                   <button className="text-zinc-500 hover:text-white transition-colors">
                     <MoreHorizontal size={18} />
                   </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.map(playlist => (
            <div key={playlist.id} className="group bg-zinc-900/30 p-4 rounded-2xl hover:bg-zinc-800/50 transition-all border border-zinc-900 hover:border-zinc-700">
              <div className="aspect-square rounded-xl overflow-hidden mb-4 shadow-xl relative">
                <img src={playlist.coverUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={40} fill="white" />
                </div>
              </div>
              <h4 className="font-bold truncate text-white">{playlist.name}</h4>
              <p className="text-xs text-zinc-500 truncate mt-1">{playlist.songs.length} Tracks</p>
            </div>
          ))}
          <button 
            onClick={onCreatePlaylist}
            className="aspect-square rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center gap-4 text-zinc-500 hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
              <Plus size={24} />
            </div>
            <span className="font-bold uppercase tracking-tighter text-sm">Create New</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Library;
