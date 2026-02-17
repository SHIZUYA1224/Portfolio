import React from 'react';

interface TitleProps {
  text: string;
  className?: string;
}

export default function Title({ text, className = '' }: TitleProps) {
  return (
    <div className="relative inline-block group cursor-default">
      <h1 
        className={`
          relative z-10
          text-5xl md:text-8xl font-black tracking-tighter text-neutral-900
          ${className}
        `}
      >
        {text}
      </h1>
      
      {/* ホバー時の下線アニメーション */}
      <span 
        className="
          absolute bottom-2 left-0 w-full h-4 
          bg-neutral-200 -z-10 origin-bottom-left transform scale-x-0 
          group-hover:scale-x-100 transition-transform duration-300 ease-out
        "
      ></span>
    </div>
  );
}
