import type { Track } from '../types';

export const TRACKS: Track[] = [
  {
    id: '001',
    title: 'Art Work',
    artist: 'SHIZUYA',
    coverUrl: '/covers/artwork.jpg',
    audioUrl: '/music/目覚め.mp3',
    duration: 191,
    category: 'DoPs',
    genre: 'Electronic',
    notesPath: '/notes/001.md',
  },
  {
    id: '002',
    title: 'Rain',
    artist: 'SHIZUYA',
    coverUrl: '/covers/rain.png',
    audioUrl: '/music/目覚めサビ.mp3',
    duration: 142,
    category: 'BGM',
    genre: 'LoFi',
    notesPath: '/notes/002.md',
  },
];
