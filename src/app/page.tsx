import Title from '@/components/Title';
import Button from '../components/Button';

export default function Home() {
  return (
    <main>
      <Title text="SHIZUYA Portfolio" />
      <p>Welcome to my 3D Interactive Self-Introduction Site</p>

      <div　className="flex flex-col gap-4 items-start">
        <Button href="/room" text="Enter 3D Room" />
        <Button href="/ai-tuber" text="AI-Tuber" />
        <Button href="/music" text="Music App" />
      </div>
    </main>
  );
}