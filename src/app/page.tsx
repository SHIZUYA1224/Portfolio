import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import HeroSection from '@/components/MainPageSections/HeroSection';
import AboutSection from '@/components/MainPageSections/AboutSection';
import CgSection from '@/components/MainPageSections/CgSection';
import MusicSection from '@/components/MainPageSections/MusicSection';
import ChatSection from '@/components/MainPageSections/ChatSection';
import ContactSection from '@/components/MainPageSections/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <CgSection />
      <MusicSection />
      <ChatSection />
      <ContactSection />
    </main>
  );
}
