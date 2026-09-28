import { useState } from 'react';
import { Link } from 'react-router-dom';

const scheduleData = {
  day1: {
    label: 'Day 1',
    date: 'Wednesday, October 14, 2026',
    theme: 'Global Supply Chain Resilience, API Sourcing & Biotech Ingredients',
    sessions: [
      {
        time: '09:00 AM – 10:00 AM',
        title: 'Expo Inauguration & Official Ribbon Cutting Ceremony',
        track: 'Inaugural',
        hall: 'Main Grand Atrium',
        speaker: 'Ministerial Delegation & Industry Association Chiefs',
        description:
          'Welcome address, unveiling of the 2026 Global Pharma Outlook Report, and opening of all 5 specialized exhibition pavilions.',
      },
      {
        time: '10:30 AM – 11:45 AM',
        title: 'Plenary Keynote: Navigating Geopolitical Shifts in API & Intermediate Sourcing',
        track: 'Plenary Keynote',
        hall: 'Auditorium Hall 1',
        speaker: 'Dr. Alistair Finch (Head of Global Sourcing, Alliance BioTech)',
        description:
          'Analyzing diversification strategies, near-shoring, and ensuring uninterrupted raw chemical supplies across North America, Europe, and Asia-Pacific.',
      },
      {
        time: '12:00 PM – 01:15 PM',
        title: 'Panel Discussion: High-Potency APIs (HPAPI) & Safe Clean Containment Engineering',
        track: 'Technical Panel',
        hall: 'Symposium Stage A',
        speaker: 'Elena Rostova (Sterile Systems Lead) & Panel of CDMO Directors',
        description:
          'Engineering strategies for handling cytotoxic and potent oncology active compounds safely with isolator technologies.',
      },
      {
        time: '02:30 PM – 03:45 PM',
        title: 'Workshop: AI-Powered Peptide & Small Molecule Synthesis Optimization',
        track: 'Workshop',
        hall: 'Hall 2 Innovation Hub',
        speaker: 'Prof. Chen Wei (Institute of Computational Pharmacology)',
        description:
          'Interactive live demo of algorithmic route prediction reducing synthesis cycle time and optimizing chemical reaction yields.',
      },
      {
        time: '04:15 PM – 06:00 PM',
        title: 'International Buyer-Seller Networking Reception & Cocktail Hour',
        track: 'Networking',
        hall: 'VIP Executive Lounge (Hall 3)',
        speaker: 'Open to Exhibitors and VIP Delegates',
        description:
          'Connect with 200+ pre-vetted institutional buyers, wholesale importers, and government tender delegates.',
      },
    ],
  },
  day2: {
    label: 'Day 2',
    date: 'Thursday, October 15, 2026',
    theme: 'Finished Formulations, Automation, Industry 4.0 & Cleanroom Systems',
    sessions: [
      {
        time: '09:30 AM – 10:45 AM',
        title: 'Keynote: The Biosimilar Revolution — Expanding Access to Complex Therapeutics',
        track: 'Plenary Keynote',
        hall: 'Auditorium Hall 1',
        speaker: 'Dr. Sunita Rao (Director of Biologics, Veloce Therapeutics)',
        description:
          'Regulatory fast-tracks, comparability assays, and commercial scale-up for monoclonal antibody biosimilars in emerging markets.',
      },
      {
        time: '11:00 AM – 12:30 PM',
        title: 'Machinery Showcase: Next-Gen Continuous Tablet Compression & Robotic Inspection',
        track: 'Machinery Tech',
        hall: 'Hall 4 Tech Pavilion',
        speaker: 'Markus Weber (Chief Automation Architect, SynthoMech Machinery)',
        description:
          'Live demonstration of 250,000 tablets/hr high-speed rotary presses featuring automated weight variation feedback and laser ejection.',
      },
      {
        time: '02:00 PM – 03:15 PM',
        title: 'Cleanroom Validation: Meeting Revised EU Annex 1 Contamination Control Standards',
        track: 'Regulatory Panel',
        hall: 'Symposium Stage B',
        speaker: 'Claire Dumont (Senior GMP Inspector & Cleanroom Consultant)',
        description:
          'Critical audit checkpoints for automated environmental monitoring, sterile airflow smoke studies, and single-use fluid manifolds.',
      },
      {
        time: '03:45 PM – 05:00 PM',
        title: 'CDMO Round Table: Strategies for Accelerating Tech-Transfer from Lab to Commercial Batch',
        track: 'Round Table',
        hall: 'Conference Room 3',
        speaker: 'Executive Panel from Top 5 Global Contract Manufacturers',
        description:
          'Overcoming analytical discrepancies, process validation challenges, and supply chain constraints during formulation scale-up.',
      },
    ],
  },
  day3: {
    label: 'Day 3',
    date: 'Friday, October 16, 2026',
    theme: 'Packaging Innovation, Cold Chain Logistics & Serialization Compliance',
    sessions: [
      {
        time: '10:00 AM – 11:15 AM',
        title: 'Smart Drug Delivery: Pre-Filled Syringes, Wearable Autoinjectors & Patient Adherence',
        track: 'Innovation Track',
        hall: 'Hall 5 Packaging Arena',
        speaker: 'Julian Becker (VP Device Engineering, NanoDeliver Tech)',
        description:
          'Integrating micro-sensors and connectivity into disposable autoinjectors to track dosage timing and cold-chain compliance.',
      },
      {
        time: '11:30 AM – 12:45 PM',
        title: 'Global Anti-Counterfeiting: DSCSA, EU FMD, and End-to-End Serialization',
        track: 'Compliance',
        hall: 'Auditorium Hall 1',
        speaker: 'Priya Sharma (Traceability Consultant, TrackMed Global)',
        description:
          'Harmonizing GS1 2D DataMatrix standards across cross-border borders with cryptographically secured cloud verification.',
      },
      {
        time: '01:45 PM – 03:00 PM',
        title: 'Sustainable Packaging: Biodegradable Blister Foils & Cold Chain Decarbonization',
        track: 'Sustainability',
        hall: 'Symposium Stage A',
        speaker: 'EcoPack Pharma Consortium Leaders',
        description:
          'Transitioning from PVC/PVDC to recyclable mono-materials without compromising vapor barrier moisture transmission rates.',
      },
      {
        time: '03:30 PM – 04:30 PM',
        title: 'Healthcare Innovation Awards & Valedictory Closing Ceremony',
        track: 'Closing Gala',
        hall: 'Main Grand Atrium',
        speaker: 'Advisory Board & Expo Organizing Committee',
        description:
          'Honoring the most innovative pharmaceutical ingredient, cleanest manufacturing machinery, and sustainable packaging design of 2026.',
      },
    ],
  },
};

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState('day1');
  const [savedSessions, setSavedSessions] = useState([]);

  const toggleSaveSession = (title) => {
    setSavedSessions((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const currentDay = scheduleData[activeDay];

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">Summit Itinerary</span>
          <h1>International Pharma & Healthcare Summit Agenda</h1>
          <p>
            Three full days of high-impact keynotes, interactive machinery tech stages, regulatory
            harmonization panels, and dedicated B2B networking.
          </p>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          {/* Day Navigation Tabs */}
          <div className="schedule-day-tabs">
            {Object.keys(scheduleData).map((dayKey) => {
              const day = scheduleData[dayKey];
              const isActive = activeDay === dayKey;
              return (
                <button
                  key={dayKey}
                  type="button"
                  className={`schedule-day-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveDay(dayKey)}
                >
                  <span className="day-number">{day.label}</span>
                  <span className="day-date">{day.date}</span>
                </button>
              );
            })}
          </div>

          {/* Day Overview Banner */}
          <div className="schedule-day-theme-banner">
            <div>
              <span className="tag">Day Focus</span>
              <h3>{currentDay.theme}</h3>
              <p>
                Showing {currentDay.sessions.length} sessions scheduled across plenary halls and
                technical stages.
              </p>
            </div>
            <div className="saved-sessions-counter">
              <i className="fa-solid fa-bookmark text-primary"></i>
              <span>{savedSessions.length} Bookmarked</span>
            </div>
          </div>

          {/* Sessions Timeline */}
          <div className="sessions-timeline">
            {currentDay.sessions.map((session, index) => {
              const isSaved = savedSessions.includes(session.title);
              return (
                <div className="session-card" key={index}>
                  <div className="session-time-col">
                    <div className="session-time-badge">
                      <i className="fa-regular fa-clock"></i>
                      <span>{session.time}</span>
                    </div>
                    <div className="session-location">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{session.hall}</span>
                    </div>
                  </div>

                  <div className="session-body-col">
                    <div className="session-header-row">
                      <span className="session-track-badge">{session.track}</span>
                      <button
                        type="button"
                        className={`save-session-btn ${isSaved ? 'saved' : ''}`}
                        onClick={() => toggleSaveSession(session.title)}
                        title={isSaved ? 'Remove bookmark' : 'Bookmark session'}
                      >
                        <i className={`fa-${isSaved ? 'solid' : 'regular'} fa-bookmark`}></i>
                        <span>{isSaved ? 'Bookmarked' : 'Save'}</span>
                      </button>
                    </div>

                    <h3 className="session-title">{session.title}</h3>
                    <p className="session-desc">{session.description}</p>

                    <div className="session-speaker">
                      <i className="fa-solid fa-microphone-lines text-primary"></i>
                      <span><strong>Key Speaker:</strong> {session.speaker}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Registration Prompt CTA */}
          <div className="schedule-cta-box">
            <div>
              <h3>Want Access to All Summit Sessions & Keynote Stages?</h3>
              <p>Pre-register for your complimentary Trade Visitor Pass or upgrade to a VIP Executive Badge.</p>
            </div>
            <div className="schedule-cta-buttons">
              <Link to="/register-visitor" className="btn btn-primary">
                Get Visitor Pass
              </Link>
              <Link to="/book-stall" className="btn btn-outline">
                Exhibit at Expo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
