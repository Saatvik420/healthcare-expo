import { useState } from 'react';
import { Link } from 'react-router-dom';

const conferenceSchedule = {
  day1: {
    id: 'day1',
    label: 'Day 1',
    dateBadge: '21st January 2027',
    date: 'Thursday, 21st January 2027',
    themeTitle: 'DAY 1 — HEALTHCARE MARKETS, TRADE & GLOBAL BUSINESS',
    themeSubtitle:
      'Focusing on India-ASEAN trade corridors, cross-border pharma expansion, medical devices & MedTech, buyer dialogues, and executive networking.',
    sessions: [
      {
        time: '09:30 AM – 10:30 AM',
        title: 'Registration & Welcome Networking',
        track: 'Registration & Opening',
        hall: 'Main Grand Foyer & Exhibition Halls',
        description: 'Exhibition opens | Delegate registration | Networking breakfast for registered delegates, trade visitors and exhibitors.',
        bullets: ['Delegate registration desk opens', 'Exhibition floor official entry', 'Networking breakfast & VIP welcome lounge'],
        isKeynote: false,
      },
      {
        time: '10:30 AM – 11:15 AM',
        title: 'Inaugural Session: The Future of Healthcare: Connecting India, ASEAN & Global Markets',
        track: 'Inaugural Session',
        hall: 'Grand Plenary Auditorium',
        description: 'Official inauguration ceremony setting the strategic vision for India-ASEAN healthcare trade and global partnership.',
        bullets: [
          'Welcome Address',
          'Opening Remarks',
          'Special Addresses by Government / Diplomatic / Industry Leaders',
          'Expo Opening & Exhibition Tour',
        ],
        isKeynote: true,
      },
      {
        time: '11:15 AM – 12:00 PM',
        title: 'Leadership Plenary: The Next Healthcare Economy: Growth, Investment & Market Opportunities',
        track: 'Leadership Plenary',
        hall: 'Grand Plenary Auditorium',
        description: 'High-level macro perspective on emerging economic trends shaping healthcare across India and Southeast Asia.',
        bullets: [
          'Global healthcare growth',
          'ASEAN healthcare markets',
          'Investment opportunities',
          'Healthcare infrastructure',
          'India–ASEAN collaboration',
        ],
        isKeynote: true,
      },
      {
        time: '12:00 PM – 01:00 PM',
        title: 'Conference Session I: India–ASEAN Healthcare Trade Corridor',
        subtitle: '“From Local Manufacturing to Global Markets”',
        track: 'Trade Corridor Track',
        hall: 'Plenary Stage A',
        description: 'Practical roadmap for healthcare manufacturers seeking cross-border market entry, regulatory pathways, and distribution channels.',
        bullets: [
          'Pharmaceutical exports',
          'Medical device exports',
          'Import–export opportunities',
          'ASEAN market access',
          'Distribution and sourcing partnerships',
          'Regulatory considerations',
        ],
        isKeynote: false,
      },
      {
        time: '01:00 PM – 02:00 PM',
        title: 'Networking Lunch & Exhibition Tour',
        track: 'Lunch Break',
        hall: 'Dining Pavilion & Exhibition Floor',
        description: 'Delegates and exhibitors network over lunch while exploring product pavilions and pre-scheduled appointments.',
        bullets: ['International buffet lunch', 'Exhibition floor open browsing', 'Informal buyer-seller engagements'],
        isBreak: true,
      },
      {
        time: '02:00 PM – 03:00 PM',
        title: 'Conference Session II: Pharmaceuticals Beyond Borders',
        subtitle: '“Unlocking New Markets for Indian & ASEAN Pharma Companies”',
        track: 'Pharma Strategy',
        hall: 'Plenary Stage A',
        description: 'Strategies for pharmaceutical firms to leverage contract manufacturing, APIs, and formulations to penetrate international territories.',
        bullets: [
          'Formulations & APIs',
          'Contract manufacturing',
          'Licensing opportunities',
          'Distribution partnerships',
          'Generic medicines',
          'Emerging-market opportunities',
          'International expansion strategies',
        ],
        isKeynote: false,
      },
      {
        time: '03:00 PM – 04:00 PM',
        title: 'Conference Session III: Medical Devices & MedTech: The Next Global Growth Engine',
        track: 'MedTech & Diagnostics',
        hall: 'Tech Innovation Stage',
        description: 'Spotlighting surgical instruments, diagnostic equipment, and manufacturing partnerships driving the next wave of healthcare delivery.',
        bullets: [
          'Medical devices',
          'Diagnostics',
          'Surgical technologies',
          'Hospital equipment',
          'Digital medical technologies',
          'Manufacturing & sourcing opportunities',
          'Technology partnerships',
        ],
        isKeynote: false,
      },
      {
        time: '04:00 PM – 04:30 PM',
        title: 'Networking & Refreshment Break',
        track: 'Networking Break',
        hall: 'Exhibition Lounges',
        description: 'Tea, coffee and curated B2B conversations across pavilion exhibition aisles.',
        bullets: ['Refreshments served', 'B2B meeting desk interactions'],
        isBreak: true,
      },
      {
        time: '04:30 PM – 05:30 PM',
        title: 'Global Healthcare Business Forum: Where Buyers Meet Healthcare Businesses',
        subtitle: 'International Buyer–Seller Dialogue',
        track: 'Buyer–Seller Dialogue',
        hall: 'International Sourcing Arena',
        description: 'Curated direct dialogue between high-volume institutional buyers and leading pharmaceutical and device manufacturers.',
        bullets: [
          'Importers & Wholesale Sourcing Leaders',
          'Distributors & Territorial Agents',
          'Hospital Procurement Teams & Chain Networks',
          'Healthcare Groups & Clinic Consortia',
          'Pharmaceutical Companies & Bulk Buyers',
          'Medical Device Buyers & Equipment Procurers',
          'Investors & Healthcare Venture Backers',
        ],
        isKeynote: true,
      },
      {
        time: '05:30 PM – 06:30 PM',
        title: 'CEO Leadership Forum: Building Global Healthcare Champions',
        track: 'Closed-Door Leadership',
        hall: 'VIP Boardroom & Executive Stage',
        description: 'A closed-door leadership discussion with CEOs, founders, investors and international business leaders shaping the next healthcare decade.',
        bullets: [
          'Executive exchange on cross-border scale',
          'Overcoming international tariff and regulatory friction',
          'Capital allocation and cross-border M&A strategies',
          'Joint ventures and institutional partnerships',
        ],
        isKeynote: true,
      },
      {
        time: '06:30 PM onwards',
        title: 'International Networking Evening: India–ASEAN Healthcare Business Networking',
        track: 'Diplomatic & VIP Reception',
        hall: 'The Grand Ballroom & Sky Terrace',
        description: 'Exclusive evening gathering featuring diplomatic delegations, government dignitaries, CEOs, investors, exporters, importers, distributors, and exhibitors.',
        bullets: [
          'Diplomatic delegation presence',
          'CEOs, Founders & Hospital Presidents',
          'Exporters, Importers & Master Distributors',
          'Cross-border trade toasts & cocktail reception',
        ],
        isKeynote: true,
      },
    ],
  },
  day2: {
    id: 'day2',
    label: 'Day 2',
    dateBadge: '22nd January 2027',
    date: 'Friday, 22nd January 2027',
    themeTitle: 'DAY 2 — INNOVATION, INVESTMENT & THE FUTURE OF HEALTHCARE',
    themeSubtitle:
      'Spotlighting digital healthcare, AI in medicine, venture financing, healthcare supply chains, startup innovation, and executive roadmaps.',
    sessions: [
      {
        time: '09:30 AM – 10:15 AM',
        title: 'Business Networking & Exhibition Visit',
        track: 'Exhibition & Networking',
        hall: 'Pavilion Halls 1–6',
        description: 'Morning exhibition floor opening, pavilion demonstrations, and one-on-one trade meetings.',
        bullets: ['Booth interactions', 'Live product demos in MedTech & Hospital Facilities'],
        isKeynote: false,
      },
      {
        time: '10:15 AM – 11:00 AM',
        title: 'Leadership Keynote: Healthcare 2035: Technology, Innovation & New Business Models',
        track: 'Opening Keynote',
        hall: 'Grand Plenary Auditorium',
        description: 'Visionary keynote forecasting the technological breakthroughs, consumer paradigms, and systemic innovations driving healthcare to 2035.',
        bullets: [
          'Next-decade healthcare paradigms',
          'Converging AI, genetics, and distributed healthcare',
          'New business models for cost-effective global delivery',
        ],
        isKeynote: true,
      },
      {
        time: '11:00 AM – 12:00 PM',
        title: 'Conference Session IV: AI, Digital Health & Healthcare Technology',
        track: 'Digital Health Track',
        hall: 'Tech Innovation Stage',
        description: 'Deep dive into computational health, intelligent hospital infrastructure, and connected diagnostics.',
        bullets: [
          'Artificial Intelligence & Predictive Diagnostics',
          'Digital hospitals & Smart HIS / EMR Infrastructure',
          'Telemedicine & Connected Care Networks',
          'Health data governance & Cybersecurity',
          'Remote diagnostics & Wearable Patient Monitors',
          'Health-tech startups & Scale-up Acceleration',
          'Technology partnerships & Co-Development',
        ],
        isKeynote: false,
      },
      {
        time: '12:00 PM – 01:00 PM',
        title: 'Conference Session V: Healthcare Investment & Financing Opportunities',
        track: 'Investment & Capital',
        hall: 'Plenary Stage A',
        description: 'Connecting healthcare entrepreneurs, hospital developers, and pharma leaders with institutional capital and private equity.',
        bullets: [
          'Healthcare investments across Asia & ASEAN',
          'Private equity & venture capital perspectives',
          'Hospital investments & Facility expansion funding',
          'Pharma manufacturing investments & CAPEX financing',
          'Medical technology commercialization funding',
          'Healthcare infrastructure funding models',
          'Cross-border investment opportunities & JVs',
        ],
        isKeynote: true,
      },
      {
        time: '01:00 PM – 02:00 PM',
        title: 'Networking Lunch Break',
        track: 'Lunch Break',
        hall: 'Dining Pavilion',
        description: 'Executive lunch and peer networking across all delegation tracks.',
        bullets: ['Buffet dining', 'Informal partner discussions'],
        isBreak: true,
      },
      {
        time: '02:00 PM – 03:00 PM',
        title: 'Conference Session VI: Building Stronger Healthcare Supply Chains',
        subtitle: '“From Manufacturing to Market”',
        track: 'Supply Chain Track',
        hall: 'Plenary Stage A',
        description: 'Addressing raw material dependencies, cold-chain distribution, multi-modal logistics, and warehousing across India and ASEAN.',
        bullets: [
          'Pharmaceutical supply chains resilience',
          'Medical device sourcing & component logistics',
          'Logistics & multi-modal transport corridors',
          'Warehousing & regional hub operations',
          'Distribution networks across ASEAN member states',
          'Import–export facilitation & customs modernization',
          'Regional supply-chain opportunities',
        ],
        isKeynote: false,
      },
      {
        time: '03:00 PM – 04:00 PM',
        title: 'Global Healthcare Innovation Forum: Innovate. Scale. Go Global.',
        track: 'Innovation & Startups',
        hall: 'Tech Innovation Stage',
        description: 'High-energy showcase highlighting disruptive startups, breakthrough clinical technologies, and investor pitch sessions.',
        bullets: [
          'Healthcare startups showcase',
          'Emerging clinical technologies & diagnostics',
          'Innovative products & clinical delivery tools',
          'New healthcare business models',
          'Investor–startup interactions & pitch evaluations',
        ],
        isKeynote: false,
      },
      {
        time: '04:00 PM – 04:30 PM',
        title: 'Networking Break & Delegation Assembly',
        track: 'Networking Break',
        hall: 'Grand Foyer',
        description: 'Coffee, tea, and transition to the summit closing and evening celebrations.',
        bullets: ['Networking tea', 'Exhibition floor wrap-up'],
        isBreak: true,
      },
      {
        time: '04:30 PM – 05:30 PM',
        title: 'CEO Roundtable: The Global Healthcare Growth Agenda',
        subtitle: '“What Will Drive the Next Wave of Healthcare Business?”',
        track: 'Executive Roundtable',
        hall: 'Grand Plenary Auditorium',
        description: 'C-suite leaders formulate actionable resolutions on how enterprises can lead the next wave of global healthcare growth.',
        bullets: [
          'International expansion strategies',
          'ASEAN market opportunities',
          'Healthcare innovation & R&D priorities',
          'Export growth & market access',
          'Strategic partnerships & cross-border alliances',
          'Investment & capacity creation',
          'Sustainability & ESG in healthcare manufacturing',
          'Future-ready healthcare businesses',
        ],
        isKeynote: true,
      },
      {
        time: '05:30 PM – 06:00 PM',
        title: 'Closing Session: From Connections to Collaborations',
        track: 'Valedictory & Closing',
        hall: 'Grand Plenary Auditorium',
        description: 'Formal culmination of the 2-day conference proceedings with commercial milestones, trade announcements, and resolutions.',
        bullets: [
          'Key takeaways & summit summary',
          'Business commitments & MOUs',
          'Partnership announcements',
          'Closing remarks by Organizers & GTTCI',
        ],
        isKeynote: true,
      },
    ],
  },
  evening: {
    id: 'evening',
    label: 'Day 2 Evening',
    dateBadge: '22nd Jan | 06:30 PM',
    date: 'Friday Evening, 22nd January 2027',
    themeTitle: 'GLOBAL HEALTHCARE EXCELLENCE AWARDS 2027 & GALA DINNER',
    themeSubtitle:
      'The prestigious red-carpet evening honoring outstanding institutions, pioneering brands, visionary leaders, and India-ASEAN partnership champions.',
    sessions: [
      {
        time: '06:30 PM – 07:15 PM',
        title: 'Red Carpet & Welcome Reception',
        track: 'Red Carpet',
        hall: 'The Grand Ballroom Promenade',
        description: 'Dignitaries, award nominees, business leaders, and global delegates gather for photography, media interviews, and welcome drinks.',
        bullets: ['Red carpet photography & media interviews', 'Welcome cocktail reception & live acoustic ensemble'],
        isKeynote: true,
      },
      {
        time: '07:15 PM – 07:30 PM',
        title: 'Awards Opening Ceremony',
        track: 'Ceremony Opening',
        hall: 'The Grand Ballroom',
        description: 'Formal commencement of the Global Healthcare Excellence Awards 2027 with keynote welcome by event patrons and dignitaries.',
        bullets: ['Lighting of the lamp & traditional welcome', 'Opening remarks by the Jury Chairman and GTTCI Leadership'],
        isKeynote: true,
      },
      {
        time: '07:30 PM – 08:30 PM',
        title: 'Global Healthcare Excellence Awards Presentation Ceremony',
        track: 'Awards Ceremony',
        hall: 'The Grand Ballroom',
        description: 'Conferring trophies and citations across 15 premier healthcare, pharmaceutical, and technology categories.',
        bullets: [
          '1. Global Healthcare Leader of the Year',
          '2. Pharmaceutical Company of the Year',
          '3. Healthcare Company of the Year',
          '4. Emerging Healthcare Brand of the Year',
          '5. Medical Device Company of the Year',
          '6. Healthcare Innovation Award',
          '7. Digital Health Excellence Award',
          '8. Healthcare Technology Leadership Award',
          '9. Healthcare Export Excellence Award',
          '10. ASEAN Market Expansion Award',
          '11. Healthcare Startup of the Year',
          '12. Healthcare Entrepreneur of the Year',
          '13. Healthcare Sustainability Award',
          '14. Healthcare Institution Excellence Award',
          '15. Outstanding Contribution to Global Healthcare',
        ],
        isKeynote: true,
      },
      {
        time: '08:30 PM – 08:45 PM',
        title: 'Special Recognition: India–ASEAN Healthcare Partnership Recognition',
        track: 'Special Recognition',
        hall: 'The Grand Ballroom',
        description: 'Honoring visionary organizations and individuals who have rendered exemplary contribution to healthcare trade, investment, innovation and international collaboration between India and ASEAN member states.',
        bullets: [
          'Fostering cross-border health corridors',
          'Facilitating technology transfer & bilateral trade',
          'Strengthening public-private health partnerships',
        ],
        isKeynote: true,
      },
      {
        time: '08:45 PM – 09:00 PM',
        title: 'Grand Finale & Felicitation Ceremony',
        track: 'Grand Finale',
        hall: 'The Grand Ballroom Stage',
        description: 'Group photograph with all award winners, jurors, ambassadors, and organizing committee chairs.',
        bullets: ['Commemorative photo-op on stage', 'Congratulatory addresses & vote of thanks'],
        isKeynote: true,
      },
      {
        time: '09:00 PM onwards',
        title: 'Gala Dinner & International Celebration',
        track: 'Gala Dinner',
        hall: 'The Grand Ballroom & Terrace',
        description: 'Lavish multi-cuisine international banquet, cultural showcase, live entertainment, and celebratory networking.',
        bullets: [
          'Curated culinary banquet featuring Thai, Indian & International cuisines',
          'Cultural dance performance & live orchestral music',
          'High-level celebration and closing toasts',
        ],
        isKeynote: true,
      },
    ],
  },
};

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState('day1');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedSessions, setSavedSessions] = useState([]);

  const toggleSaveSession = (title) => {
    setSavedSessions((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const currentTab = conferenceSchedule[activeTab] || conferenceSchedule.day1;

  const filteredSessions = currentTab.sessions.filter((session) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      session.title.toLowerCase().includes(q) ||
      session.track.toLowerCase().includes(q) ||
      session.hall.toLowerCase().includes(q) ||
      (session.description && session.description.toLowerCase().includes(q)) ||
      (session.bullets && session.bullets.some((b) => b.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="tag">
            <i className="fa-solid fa-calendar-days"></i> 21st &amp; 22nd January 2027 &bull; Bangkok, Thailand
          </span>
          <h1>Conference Agenda &amp; Program Schedule</h1>
          <p className="page-header-lead">
            <strong>The Global Healthcare Expo 2027</strong> &bull; Held Under the Aegis of India–ASEAN Global Confluence 2027
          </p>
          <div className="schedule-theme-strip">
            <i className="fa-solid fa-lightbulb text-primary"></i>
            <span>
              <strong>Suggested Conference Theme:</strong> &ldquo;Connecting Healthcare Markets. Driving Innovation. Expanding Global Opportunities.&rdquo;
            </span>
          </div>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          {/* Day Navigation Tabs */}
          <div className="schedule-day-tabs">
            <button
              type="button"
              className={`schedule-day-btn ${activeTab === 'day1' ? 'active' : ''}`}
              onClick={() => setActiveTab('day1')}
            >
              <span className="day-number">DAY 1</span>
              <span className="day-date">21 Jan 2027 &bull; Markets &amp; Trade</span>
            </button>
            <button
              type="button"
              className={`schedule-day-btn ${activeTab === 'day2' ? 'active' : ''}`}
              onClick={() => setActiveTab('day2')}
            >
              <span className="day-number">DAY 2</span>
              <span className="day-date">22 Jan 2027 &bull; Innovation &amp; Tech</span>
            </button>
            <button
              type="button"
              className={`schedule-day-btn gala-day-btn ${activeTab === 'evening' ? 'active' : ''}`}
              onClick={() => setActiveTab('evening')}
            >
              <span className="day-number"><i className="fa-solid fa-trophy"></i> DAY 2 EVENING</span>
              <span className="day-date">Excellence Awards &amp; Gala Dinner</span>
            </button>
          </div>

          {/* Theme Banner for Selected Day */}
          <div className="schedule-day-theme-banner">
            <div>
              <span className="tag">Program Focus</span>
              <h3>{currentTab.themeTitle}</h3>
              <p>{currentTab.themeSubtitle}</p>
            </div>
            <div className="saved-sessions-counter">
              <i className="fa-solid fa-bookmark text-primary"></i>
              <span>{savedSessions.length} Bookmarked</span>
            </div>
          </div>

          {/* Search / Filter Bar */}
          <div className="schedule-search-row">
            <div className="schedule-search-input-wrap">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search sessions by topic, keyword, or hall..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="schedule-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
            <span className="search-count-pill">
              Showing {filteredSessions.length} of {currentTab.sessions.length} sessions
            </span>
          </div>

          {/* Timeline of Sessions */}
          <div className="sessions-timeline">
            {filteredSessions.map((session, index) => {
              const isSaved = savedSessions.includes(session.title);
              return (
                <div
                  className={`session-card ${session.isBreak ? 'session-break-card' : ''} ${
                    session.isKeynote ? 'session-keynote-card' : ''
                  }`}
                  key={index}
                >
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
                      {!session.isBreak && (
                        <button
                          type="button"
                          className={`save-session-btn ${isSaved ? 'saved' : ''}`}
                          onClick={() => toggleSaveSession(session.title)}
                          title={isSaved ? 'Remove bookmark' : 'Bookmark session'}
                        >
                          <i className={`fa-${isSaved ? 'solid' : 'regular'} fa-bookmark`}></i>
                          <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                      )}
                    </div>

                    <h3 className="session-title">{session.title}</h3>
                    {session.subtitle && <h4 className="session-subtitle">{session.subtitle}</h4>}

                    {session.description && <p className="session-desc">{session.description}</p>}

                    {session.bullets && session.bullets.length > 0 && (
                      <div className="session-bullets-box">
                        <h5>Key Topics &amp; Highlights:</h5>
                        <ul className="session-bullet-list">
                          {session.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>
                              <i className="fa-solid fa-circle-check text-primary"></i>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Call to Action */}
          <div className="schedule-cta-box">
            <div>
              <h3>Participate in The Global Healthcare Expo 2027</h3>
              <p>
                Whether attending as a Trade Visitor or participating as an Exhibitor, secure your credentials for the premier India-ASEAN healthcare convention.
              </p>
            </div>
            <div className="schedule-cta-buttons">
              <Link to="/visitor-registration" className="btn btn-primary">
                <i className="fa-solid fa-id-card"></i> Visitor Registration
              </Link>
              <Link to="/exhibitor-registration" className="btn btn-outline">
                <i className="fa-solid fa-store"></i> Exhibitor Registration
              </Link>
              <Link to="/awards" className="btn btn-outline">
                <i className="fa-solid fa-trophy"></i> Excellence Awards
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
