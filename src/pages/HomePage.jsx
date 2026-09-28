import { useState } from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import AseanConfluenceSection from '../components/AseanConfluenceSection';
import Sectors from '../components/Sectors';
import WhatsAppSection from '../components/WhatsAppSection';
import RegistrationPortal from '../components/RegistrationPortal';
import Faq from '../components/Faq';

export default function HomePage({ onNotify }) {
  const [activeTab, setActiveTab] = useState('visitor');

  const handleOpenPortal = (tab = 'visitor') => {
    setActiveTab(tab);
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Hero onOpenPortal={handleOpenPortal} />
      <StatsBar />
      <AseanConfluenceSection />
      <Sectors onOpenPortal={handleOpenPortal} />
      <WhatsAppSection />
      <RegistrationPortal
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNotify={onNotify}
      />
      <Faq />
    </>
  );
}
