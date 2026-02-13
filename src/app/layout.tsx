import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'SHIZUYA Portfolio',
  description: '3D Interactive Self-Introduction Site',
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
