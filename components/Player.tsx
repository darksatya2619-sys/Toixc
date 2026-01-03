
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, 
  Volume2, VolumeX, Maximize2, ListMusic, Heart
} from 'lucide-react';
import { Song } from '../types';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

const Player: React.FC<PlayerProps> = ({ currentSong, isPlaying, togglePlay, playNext, playPrevious }) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = (parseFloat(e.target.value) / 100) * (audioRef.current?.duration || 0);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
      setProgress(parseFloat(e.target.value));
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
        audioRef.current.muted = !isMuted;
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 h-24 px-4 flex items-center justify-between z-50">
      <audio 
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
      />
      
      {/* Song Info */}
      <div className="flex items-center gap-4 w-1/3">
        <img 
          src={currentSong.coverUrl} 
          alt={currentSong.title} 
          className="w-14 h-14 rounded-md shadow-lg shadow-black"
        />
        <div className="overflow-hidden">
          <h4 className="font-bold text-white truncate hover:underline cursor-pointer">{currentSong.title}</h4>
          <p className="text-sm text-zinc-400 truncate hover:text-white cursor-pointer">{currentSong.artist}</p>
        </div>
        <button className="text-zinc-500 hover:text-emerald-500 ml-2">
            <Heart size={20} />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 w-1/3 max-w-xl">
        <div className="flex items-center gap-6">
          <button className="text-zinc-500 hover:text-emerald-500 transition-colors">
            <Shuffle size={20} />
          </button>
          <button onClick={playPrevious} className="text-zinc-300 hover:text-white transition-colors">
            <SkipBack size={24} fill="currentColor" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
          </button>
          <button onClick={playNext} className="text-zinc-300 hover:text-white transition-colors">
            <SkipForward size={24} fill="currentColor" />
          </button>
          <button className="text-zinc-500 hover:text-emerald-500 transition-colors">
            <Repeat size={20} />
          </button>
        </div>

        <div className="w-full flex items-center gap-2">
          <span className="text-[10px] text-zinc-500 font-medium w-10 text-right">
            {Math.floor((audioRef.current?.currentTime || 0) / 60)}:
            {Math.floor((audioRef.current?.currentTime || 0) % 60).toString().padStart(2, '0')}
          </span>
          <input 
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
          />
          <span className="text-[10px] text-zinc-500 font-medium w-10">
            {currentSong.duration}
          </span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center justify-end gap-4 w-1/3">
        <button className="text-zinc-400 hover:text-white"><ListMusic size={20} /></button>
        <div className="flex items-center gap-2 w-32">
          <button onClick={toggleMute} className="text-zinc-400 hover:text-white">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input 
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => {
                const val = parseInt(e.target.value);
                setVolume(val);
                if (audioRef.current) audioRef.current.volume = val / 100;
            }}
            className="flex-1 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
        <button className="text-zinc-400 hover:text-white"><Maximize2 size={20} /></button>
      </div>
    </div>
  );
};

export default Player;
