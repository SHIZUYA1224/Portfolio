import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/config';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 overflow-x-hidden">
        {/* ヘッダー */}
        <Header />

        {/* メインコンテンツ: 新規padding-top追加でHeader分の余白確保 */}
        <main className="pt-14 md:pt-[4.25rem] overflow-x-hidden">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
