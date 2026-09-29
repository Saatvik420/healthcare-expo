import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import AboutSection from '../components/AboutSection';
import OpportunitiesSection from '../components/OpportunitiesSection';
import WhoShouldExhibitSection from '../components/WhoShouldExhibitSection';
import ConferencePreview from '../components/ConferencePreview';
import AseanConfluenceSection from '../components/AseanConfluenceSection';
import Faq from '../components/Faq';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutSection />
      <OpportunitiesSection />
      <WhoShouldExhibitSection />
      <ConferencePreview />
      <AseanConfluenceSection />
      <Faq />
    </>
  );
}
