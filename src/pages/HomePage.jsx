import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import AseanConfluenceSection from '../components/AseanConfluenceSection';
import Sectors from '../components/Sectors';
import WhatsAppSection from '../components/WhatsAppSection';
import Faq from '../components/Faq';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AseanConfluenceSection />
      <Sectors />
      <WhatsAppSection />
      <Faq />
    </>
  );
}
