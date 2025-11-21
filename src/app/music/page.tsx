// filepath: /Users/Dev/Portfolio/portfolio/src/app/music/page.tsx
import Title from '@/components/Title';
import Button from '@/components/Button';

export default function Music() {
  return (
    <main className="p-8">
      <Title text="Music" />
      <div className="flex flex-col gap-4 items-start mt-8">
        <Button href="/" text="Back to Home" />
        <Button href="/ai-tuber" text="AI-Tuber" />
        <Button href="/room" text="3D Room" />
      </div>
    </main>
  );
}