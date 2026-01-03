
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: string;
  audioUrl: string;
  genre: string;
  language?: 'Hindi' | 'Bhojpuri' | 'English';
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  likedSongIds: string[];
  playlists: Playlist[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: string[]; // array of song IDs
}

export enum ViewType {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  LIBRARY = 'LIBRARY',
  PLAYLIST_DETAIL = 'PLAYLIST_DETAIL',
  AI_CHAT = 'AI_CHAT',
  PROFILE = 'PROFILE'
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
