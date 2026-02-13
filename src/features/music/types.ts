export type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // seconds
  category: string;
  genre: string;
  notesPath?: string;
};
