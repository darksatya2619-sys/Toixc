
import { Song, Playlist } from './types';

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Toxic Sludge',
    artist: 'The Hazmat Crew',
    album: 'Corrosive Beats',
    coverUrl: 'https://picsum.photos/seed/toxic1/400/400',
    duration: '3:45',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Techno'
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: 'Cyber Runner',
    album: 'Digital Abyss',
    coverUrl: 'https://picsum.photos/seed/toxic2/400/400',
    duration: '4:12',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Synthwave'
  },
  {
    id: '3',
    title: 'Acid Rain',
    artist: 'Liquid Death',
    album: 'Stormy Weather',
    coverUrl: 'https://picsum.photos/seed/toxic3/400/400',
    duration: '2:58',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Lo-Fi'
  },
  {
    id: '4',
    title: 'Midnight Gasoline',
    artist: 'Fuel Injection',
    album: 'Redline',
    coverUrl: 'https://picsum.photos/seed/toxic4/400/400',
    duration: '3:20',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Rock'
  },
  {
    id: '5',
    title: 'Venomous Vibes',
    artist: 'Cobra Kai',
    album: 'Strike First',
    coverUrl: 'https://picsum.photos/seed/toxic5/400/400',
    duration: '5:10',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    genre: 'Electronic'
  },
  {
    id: '6',
    title: 'Radioactive Heart',
    artist: 'Isotope',
    album: 'Half-Life',
    coverUrl: 'https://picsum.photos/seed/toxic6/400/400',
    duration: '3:55',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    genre: 'Pop'
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Toxic Essentials',
    description: 'The tracks that define our corrosive sound.',
    coverUrl: 'https://picsum.photos/seed/playlist1/400/400',
    songs: ['1', '2', '3']
  },
  {
    id: 'p2',
    name: 'Midnight Meltdown',
    description: 'When the world ends, listen to this.',
    coverUrl: 'https://picsum.photos/seed/playlist2/400/400',
    songs: ['4', '5', '6']
  }
];
