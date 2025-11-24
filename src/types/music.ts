export interface Song {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  audio: string;
}

export const dummySongs: Song[] = [
  {
    id: '1',
    title: 'Sample Song MAX',
    artist: 'Artist 1',
    artwork: 'https://via.placeholder.com/300x200?text=Song+1',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  },
  {
    id: '2',
    title: 'Sample Song 2',
    artist: 'Artist 2',
    artwork: 'https://via.placeholder.com/300x200?text=Song+2',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  },
  {
    id: '3',
    title: 'Sample Song 3',
    artist: 'Artist 3',
    artwork: 'https://via.placeholder.com/300x200?text=Song+3',
    audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  },
];