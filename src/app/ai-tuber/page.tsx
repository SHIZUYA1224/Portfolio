import Title from '@/components/common/Title';
import Button from '../../components/common/Button';

export default function AiTuber() {
  return (
    <main>
      <Title text="AI-Tuber" />
      
      <div className="flex flex-col gap-4 items-start mt-8">
        <Button href="/" text="Back to Home" />
        <Button href="/ai-tuber" text="AI-Tuber" />
        <Button href="/room" text="3D Room" />
      </div>
    </main>
  );
}