import Image from 'next/image';
import Title from '../common/Title';

export default function HeroSection() {
  return (
    <section className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 px-4 text-center text-white">
        <Title text="Simple is Best" />
        <p className="text-lg md:text-xl font-light opacity-90 mt-4">
          最小限の要素で、最大限のインパクトを。
        </p>
      </div>
    </section>
  );
}
