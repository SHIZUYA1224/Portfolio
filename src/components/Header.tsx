import Link from 'next/link';

export default function Header() {
  const desktopLinkClass =
    "text-[14px] lg:text-[15px] font-medium tracking-[0.05em] text-white/95 hover:text-white relative transition-colors duration-250 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-cyan-300 after:transition-all after:duration-250 hover:after:w-full";

  return (
    <header
      className="
      fixed top-0 left-0 w-full z-50
      bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
      backdrop-blur-md bg-opacity-90
      transition-all duration-500 ease-in-out
      shadow-[0_4px_20px_rgba(0,0,0,0.3)]
      animate-fadeInDown
      scroll-transparent
    "
    >
      <nav className="container mx-auto h-16 md:h-[4.25rem] px-4 md:px-6 flex items-center gap-2 md:gap-4">
        <div className="text-white font-semibold text-base md:text-[1.2rem] tracking-tight group whitespace-nowrap shrink-0">
          Portfolio
          <span className="ml-2 text-slate-400 animate-pulse group-hover:rotate-180 transition-transform duration-500">
            ✦
          </span>
        </div>

        <div className="md:hidden flex-1 overflow-x-auto">
          <ul className="flex items-center gap-2 min-w-max justify-end pl-2">
            <li>
              <Link href="/" className="text-white/95 text-[12px] tracking-[0.03em] whitespace-nowrap">
                Home
              </Link>
            </li>
            <li>
              <Link href="/room" className="text-white/95 text-[12px] tracking-[0.03em] whitespace-nowrap">
                ROOM
              </Link>
            </li>
            <li>
              <Link href="/chat" className="text-white/95 text-[12px] tracking-[0.03em] whitespace-nowrap">
                CHAT
              </Link>
            </li>
            <li>
              <Link href="/music" className="text-white/95 text-[12px] tracking-[0.03em] whitespace-nowrap">
                MUSIC
              </Link>
            </li>
            <li>
              <Link href="/model" className="text-white/95 text-[12px] tracking-[0.03em] whitespace-nowrap">
                MODEL
              </Link>
            </li>
          </ul>
        </div>

        <ul className="hidden md:flex space-x-5 lg:space-x-6 items-center ml-auto">
          <li>
            <Link href="/" className={desktopLinkClass}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/room" className={desktopLinkClass}>
              ROOM
            </Link>
          </li>
          <li>
            <Link href="/chat" className={desktopLinkClass}>
              CHAT
            </Link>
          </li>
          <li>
            <Link href="/music" className={desktopLinkClass}>
              MUSIC
            </Link>
          </li>
          <li>
            <Link href="/model" className={desktopLinkClass}>
              MODEL
            </Link>
          </li>
        </ul>
      </nav>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
    </header>
  );
}
