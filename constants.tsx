
import { Song, Playlist } from './types';

export const MOCK_SONGS: Song[] = [
  // Existing/English
  {
    id: '1',
    title: 'Toxic Sludge',
    artist: 'The Hazmat Crew',
    album: 'Corrosive Beats',
    coverUrl: 'https://picsum.photos/seed/toxic1/400/400',
    duration: '3:45',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Techno',
    language: 'English'
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: 'Cyber Runner',
    album: 'Digital Abyss',
    coverUrl: 'https://picsum.photos/seed/toxic2/400/400',
    duration: '4:12',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Synthwave',
    language: 'English'
  },
  // Hindi Hits
  {
    id: 'h1',
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    album: 'Aashiqui 2',
    coverUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=400&h=400&auto=format&fit=crop',
    duration: '4:22',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Romantic',
    language: 'Hindi'
  },
  {
    id: 'h2',
    title: 'Kesariya',
    artist: 'Arijit Singh',
    album: 'Brahmastra',
    coverUrl: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=400&h=400&auto=format&fit=crop',
    duration: '4:28',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Pop',
    language: 'Hindi'
  },
  {
    id: 'h3',
    title: 'Raataan Lambiyan',
    artist: 'Jubin Nautiyal',
    album: 'Shershaah',
    coverUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?q=80&w=400&h=400&auto=format&fit=crop',
    duration: '3:50',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    genre: 'Pop',
    language: 'Hindi'
  },
  // Bhojpuri Hits
  {
    id: 'b1',
    title: 'Lollipop Lagelu',
    artist: 'Pawan Singh',
    album: 'Bhojpuri Dhamaka',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&h=400&auto=format&fit=crop',
    duration: '4:10',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    genre: 'Folk/Dance',
    language: 'Bhojpuri'
  },
  {
    id: 'b2',
    title: 'Pudina Ae Haseena',
    artist: 'Khesari Lal Yadav',
    album: 'Khesari Hits',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&h=400&auto=format&fit=crop',
    duration: '3:45',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    genre: 'Modern Bhojpuri',
    language: 'Bhojpuri'
  },
  {
    id: 'b3',
    title: 'Coolar Kurti Me',
    artist: 'Khesari Lal Yadav',
    album: 'Deewanapan',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&h=400&auto=format&fit=crop',
    duration: '3:55',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    genre: 'Bhojpuri Dance',
    language: 'Bhojpuri'
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Toxic Essentials',
    description: 'The tracks that define our corrosive sound.',
    coverUrl: 'https://picsum.photos/seed/playlist1/400/400',
    songs: ['1', '2', 'h1']
  },
  {
    id: 'p2',
    name: 'Desi Melt',
    description: 'Hindi and Bhojpuri bangers for the soul.',
    coverUrl: 'https://picsum.photos/seed/desi/400/400',
    songs: ['h2', 'h3', 'b1', 'b2']
  }
];
