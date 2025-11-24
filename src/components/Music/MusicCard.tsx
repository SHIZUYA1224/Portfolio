import React, { useRef, useState } from 'react';
// 以前のButtonコンポーネントはカードデザインに合わないため削除し、アイコンにします
// npm install lucide-react が必要ですが、なければ下のIcon部分を文字に変えてください
import { Play, Pause, Music } from 'lucide-react'; 

interface MusicCardProps {
  songTitle?: string;
  artistName?: string;
  audioUrl?: string;
  artworkUrl?: string;
  onSelect?: () => void;
}

export default function MusicCard({ 
  songTitle = "Unknown Title", // デフォルト値をここで設定するのが今の主流
  artistName = "Unknown Artist", 
  audioUrl, 
  artworkUrl, 
  onSelect 
}: MusicCardProps) {
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // 親要素へのイベント伝播を防ぐプロの技
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
    onSelect?.();
  };

  return (
    <div 
      className="group relative w-64 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden border border-zinc-100 dark:border-zinc-800"
      onClick={handlePlay}
    >
      {/* 🖼️ ジャケット画像エリア */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {artworkUrl ? (
          <img 
            src={artworkUrl} 
            alt={songTitle} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Music size={48} />
          </div>
        )}

        {/* ⏯️ オーバーレイ（ホバー時に現れる黒いフィルターとボタン） */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/30 shadow-lg transform transition-transform group-hover:scale-110 active:scale-95">
            {isPlaying ? <Pause fill="white" size={24} /> : <Play fill="white ml-1" size={24} />}
          </div>
        </div>
      </div>

      {/* 📝 テキスト情報エリア */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
          {songTitle}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
          {artistName}
        </p>
      </div>
      
      {/* 🎵 隠れたプレイヤー（機能はそのまま） */}
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onEnded={() => setIsPlaying(false)} 
        />
      )}
    </div>
  );
}