import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RegistrationPortal from '../components/RegistrationPortal';

export default function RegistrationPage({ onNotify }) {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam === 'exhibitor' ? 'exhibitor' : 'visitor');

  useEffect(() => {
    if (tabParam === 'exhibitor' || tabParam === 'visitor') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">
            <i className="fa-solid fa-calendar-days"></i> 21st & 22nd January 2027 &bull; Official Registration Desk
          </span>
          <h1>Registration & Booth Booking Portal</h1>
          <p>
            Secure your credentials for <strong>The Global Healthcare Expo 2027</strong> held under the prestigious{' '}
            <strong>India-ASEAN Global Confluence</strong>. Register for a complimentary Trade Visitor Pass or request an
            Exhibition Pavilion Booth.
          </p>
        </div>
      </section>

      <RegistrationPortal
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNotify={onNotify}
      />
    </div>
  );
}
