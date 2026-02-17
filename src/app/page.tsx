import HeroSection from '@/components/MainPageSections/HeroSection';
import AboutSection from '@/components/MainPageSections/AboutSection';
import CgSection from '@/components/MainPageSections/CgSection';
import MusicSection from '@/components/MainPageSections/MusicSection';
import ChatSection from '@/components/MainPageSections/ChatSection';
import ContactSection from '@/components/MainPageSections/ContactSection';
import SectionRevealObserver from '@/components/common/SectionRevealObserver';

export default function Home() {
  return (
    <main>
      <SectionRevealObserver />
      <HeroSection />
      <AboutSection />
      <CgSection />
      <MusicSection />
      <ChatSection />
      <ContactSection />
    </main>
  );
}
