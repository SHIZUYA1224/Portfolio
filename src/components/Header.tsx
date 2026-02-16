'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'HOME' },
  { href: '/room', label: 'ROOM' },
  { href: '/chat', label: 'CHAT' },
  { href: '/music', label: 'MUSIC' },
  { href: '/model', label: 'MODEL' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const desktopLinkClass =
    "text-[14px] lg:text-[15px] font-medium tracking-[0.05em] text-white/95 hover:text-white relative transition-colors duration-250 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-cyan-300 after:transition-all after:duration-250 hover:after:w-full";
  const desktopActiveClass =
    'text-white after:w-full after:bg-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.55)]';
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

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
      <nav className="relative container mx-auto h-14 md:h-[4.25rem] px-3 md:px-6 flex items-center justify-center md:justify-start gap-2 md:gap-4">
        <Link href="/" className="text-white font-semibold text-[18px] md:text-[1.2rem] tracking-tight whitespace-nowrap shrink-0">
          PORTFOLIO
        </Link>

        <button
          type="button"
          aria-label="メニューを開く"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden absolute right-3 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/30 text-white"
        >
          <span className="text-xl leading-none">{isMenuOpen ? '✕' : '☰'}</span>
        </button>

        <ul className="hidden md:flex space-x-5 lg:space-x-6 items-center ml-auto">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={`${desktopLinkClass} ${isActive(item.href) ? desktopActiveClass : ''}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`md:hidden fixed top-0 right-0 z-50 h-dvh w-72 max-w-[85vw] bg-slate-900/95 backdrop-blur-md border-l border-white/10 p-5 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-white font-semibold">Menu</span>
          <button
            type="button"
            aria-label="メニューを閉じる"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/30 text-white"
          >
            ✕
          </button>
        </div>
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <li key={`mobile-${item.href}`}>
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`inline-flex w-full items-center rounded-md border px-3 py-2 text-sm transition-all duration-200 ${
                  isActive(item.href)
                    ? 'border-white/60 bg-cyan-400/20 text-white'
                    : 'border-transparent text-white hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
    </header>
  );
}
