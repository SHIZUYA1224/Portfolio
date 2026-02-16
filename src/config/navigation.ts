export type MainNavItem = {
  href: string;
  label: string;
};

export const MAIN_NAV_ITEMS: MainNavItem[] = [
  { href: '/', label: 'HOME' },
  { href: '/room', label: 'ROOM' },
  { href: '/chat', label: 'CHAT' },
  { href: '/music', label: 'MUSIC' },
  { href: '/model', label: 'MODEL' },
];

export const FOOTER_HIDDEN_PREFIXES = ['/music', '/room', '/model', '/chat'];
