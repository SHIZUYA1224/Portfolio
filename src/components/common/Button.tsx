interface ButtonProps {
  href: string;
  text: string;
}

export default function Button({ href, text }: ButtonProps) {
  return (
    <a
      href={href}
      className="
        group relative inline-block px-8 py-3 
        font-bold text-slate-800 
        bg-white border-2 border-slate-800 rounded-lg
        overflow-hidden transition-all duration-400 ease-in-out
        hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(30,41,59,0.3)]
        shadow-[4px_4px_0px_0px_rgba(30,41,59,1)]
        hover:shadow-[2px_2px_0px_0px_rgba(30,41,59,1), 0_0_20px_rgba(30,41,59,0.3)]
        active:translate-x-[1px] active:translate-y-[1px] active:shadow-none active:duration-100
        before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:to-white before:opacity-0 before:transition-opacity before:duration-400
        group-hover:before:opacity-20
      "
    >
      {/* ホバー時に流れてくる背景色 */}
      <span className="absolute inset-0 w-full h-full bg-slate-800 -translate-x-full transition-transform duration-400 ease-in-out group-hover:translate-x-0 z-0"></span>
      
      <span className="relative z-10 transition-shadow duration-400 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]">{text}</span>
    </a>
  );
}

