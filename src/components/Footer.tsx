'use client';

import { usePathname } from 'next/navigation';

const HIDE_ON_PREFIX = ['/music', '/room', '/model', '/chat'];

export default function Footer() {
  const pathname = usePathname() || '';
  if (HIDE_ON_PREFIX.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="max-w-6xl mx-auto text-center">
        <p>&copy; 2024 SHIZUYA. All rights reserved.</p>
      </div>
    </footer>
  );
}
