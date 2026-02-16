'use client';

import { usePathname } from 'next/navigation';
import { FOOTER_HIDDEN_PREFIXES, SITE_OWNER_NAME } from '@/config';

export default function Footer() {
  const pathname = usePathname() || '';
  if (FOOTER_HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; 2024 {SITE_OWNER_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}
