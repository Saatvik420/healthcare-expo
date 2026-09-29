import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

const awardCategories = [
  {
    id: 1,
    title: 'Global Healthcare Leader of the Year',
    icon: 'fa-solid fa-crown',
    desc: 'Honoring visionary CEOs, managing directors, and healthcare executives demonstrating transformative leadership and global market expansion.',
    badge: 'Premier Honor',
  },
  {
    id: 2,
    title: 'Pharmaceutical Company of the Year',
    icon: 'fa-solid fa-pills',
    desc: 'Recognizing pharmaceutical enterprises achieving outstanding commercial excellence, quality manufacturing, and cross-border distribution.',
    badge: 'Pharma Excellence',
  },
  {
    id: 3,
    title: 'Healthcare Company of the Year',
    icon: 'fa-solid fa-hospital-user',
    desc: 'Celebrating holistic healthcare corporations setting global benchmarks in clinical delivery, infrastructure, and integrated patient care.',
    badge: 'Corporate Standard',
  },
  {
    id: 4,
    title: 'Emerging Healthcare Brand of the Year',
    icon: 'fa-solid fa-chart-line-up',
    desc: 'Spotlighting rapid-growth healthcare, wellness, or biotech brands disrupting international markets through customer focus and innovation.',
    badge: 'Rising Star',
  },
  {
    id: 5,
    title: 'Medical Device Company of the Year',
    icon: 'fa-solid fa-stethoscope',
    desc: 'Awarded to manufacturers producing superior medical hardware, surgical tools, diagnostic instrumentation, or life-support systems.',
    badge: 'MedTech Benchmark',
  },
  {
    id: 6,
    title: 'Healthcare Innovation Award',
    icon: 'fa-solid fa-lightbulb',
    desc: 'Recognizing breakthrough therapeutic inventions, patented biomedical processes, and creative solutions solving urgent health challenges.',
    badge: 'R&D Breakthrough',
  },
  {
    id: 7,
    title: 'Digital Health Excellence Award',
    icon: 'fa-solid fa-laptop-medical',
    desc: 'Commending forward-thinking digital health platforms, telemedicine networks, EHR systems, and mobile health solutions enhancing accessibility.',
    badge: 'Digital Care',
  },
  {
    id: 8,
    title: 'Healthcare Technology Leadership Award',
    icon: 'fa-solid fa-microchip',
    desc: 'Recognizing deep-tech engineering in AI, surgical robotics, nanotechnology, automated diagnostic pipelines, and clinical IoT.',
    badge: 'Deep Tech',
  },
  {
    id: 9,
    title: 'Healthcare Export Excellence Award',
    icon: 'fa-solid fa-ship',
    desc: 'Honoring manufacturers and exporters who have demonstrated exceptional trade volumes and brand penetration across international healthcare markets.',
    badge: 'Global Trade',
  },
  {
    id: 10,
    title: 'ASEAN Market Expansion Award',
    icon: 'fa-solid fa-earth-asia',
    desc: 'Dedicated to businesses that have established successful commercial partnerships, distribution corridors, and footprints across ASEAN member nations.',
    badge: 'Regional Corridor',
  },
  {
    id: 11,
    title: 'Healthcare Startup of the Year',
    icon: 'fa-solid fa-rocket',
    desc: 'Honoring early-stage high-growth health-tech, biotech, or diagnostics startups demonstrating scalable traction and immense societal value.',
    badge: 'Startup Spotlight',
  },
  {
    id: 12,
    title: 'Healthcare Entrepreneur of the Year',
    icon: 'fa-solid fa-user-tie',
    desc: 'Celebrating dynamic founders and trailblazing innovators whose entrepreneurial tenacity has built impactful healthcare enterprises.',
    badge: 'Visionary Founder',
  },
  {
    id: 13,
    title: 'Healthcare Sustainability Award',
    icon: 'fa-solid fa-seedling',
    desc: 'Recognizing organizations championing green pharma manufacturing, eco-friendly medical packaging, carbon-neutral hospitals, and ESG excellence.',
    badge: 'ESG & Green Health',
  },
  {
    id: 14,
    title: 'Healthcare Institution Excellence Award',
    icon: 'fa-solid fa-square-h',
    desc: 'Acknowledging tertiary hospitals, medical colleges, research centers, and diagnostic chains providing world-class clinical care.',
    badge: 'Institutional Pride',
  },
  {
    id: 15,
    title: 'Outstanding Contribution to Global Healthcare',
    icon: 'fa-solid fa-award',
    desc: 'The summit lifetime achievement honor presented to an eminent luminary whose career has reshaped global public health and medical science.',
    badge: 'Lifetime Laureate',
  },
];

export default function AwardsPage() {
  const [nominationForm, setNominationForm] = useState({
    nomineeName: '',
    company: '',
    category: 'Global Healthcare Leader of the Year',
    email: '',
    phone: '',
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNominationSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppNominationUrl = () => {
    const text = `Hello Global Healthcare Excellence Awards Secretariat,\n\nI would like to inquire regarding award nominations for The Global Healthcare Excellence Awards 2027 in Bangkok, Thailand.\n\nCompany / Nominee: ${nominationForm.company || 'Not specified'}\nContact Person: ${nominationForm.nomineeName || 'Not specified'}\nCategory: ${nominationForm.category}\nPhone: ${nominationForm.phone || 'Not specified'}\nEmail: ${nominationForm.email || 'Not specified'}\n\nPlease share the formal nomination dossier and jury guidelines.`;
    return getWhatsAppUrl('general', text);
  };

  return (
    <div className="page-wrapper awards-page">
      {/* Hero Banner */}
      <section className="awards-hero-banner">
        <div className="container">
          <div className="awards-hero-content">
            <span className="awards-pill">
              <i className="fa-solid fa-trophy"></i> Official Confluence Ceremony &bull; Day 2 Evening
            </span>
            <h1 className="awards-title">Global Healthcare Excellence Awards 2027</h1>
            <p className="awards-tagline">
              Followed by the Prestigious India–ASEAN International Gala Dinner &bull; Bangkok, Thailand
            </p>
            <p className="awards-lead-text">
              Celebrating extraordinary leadership, breakthrough innovation, and transformative cross-border partnerships
              shaping the future of healthcare, pharmaceuticals, medical technology, and institutional care across India, ASEAN, and the world.
            </p>

            <div className="awards-date-strip">
              <span><i className="fa-solid fa-calendar-check text-accent"></i> Friday, 22nd January 2027</span>
              <span><i className="fa-solid fa-clock text-accent"></i> 06:30 PM Onwards</span>
              <span><i className="fa-solid fa-location-dot text-accent"></i> The Grand Ballroom, Bangkok</span>
            </div>

            <div className="awards-hero-actions">
              <a href="#categories" className="btn btn-primary btn-lg">
                <i className="fa-solid fa-award"></i> View 15 Award Categories
              </a>
              <a href="#nominate" className="btn btn-outline btn-lg">
                <i className="fa-solid fa-file-signature"></i> Submit Nomination Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Evening Itinerary Flow */}
      <section className="section bg-light-surface">
        <div className="container">
          <div className="section-header">
            <span className="tag">
              <i className="fa-solid fa-champagne-glasses"></i> Evening Itinerary
            </span>
            <h2>Gala Evening Schedule</h2>
            <p className="section-subtitle-lead">
              A high-profile red-carpet celebration bringing together ministerial dignitaries, healthcare leaders, diplomatic envoys, and international delegates.
            </p>
          </div>

          <div className="awards-timeline-grid">
            <div className="awards-time-card">
              <div className="time-badge">06:30 PM – 07:15 PM</div>
              <h4>Red Carpet &amp; Welcome Reception</h4>
              <p>Photography, international media interviews, VIP delegate arrival, and welcome reception.</p>
            </div>

            <div className="awards-time-card">
              <div className="time-badge">07:15 PM – 07:30 PM</div>
              <h4>Awards Opening Ceremony</h4>
              <p>Keynote ceremonial opening addresses by government, diplomatic and industry council leaders.</p>
            </div>

            <div className="awards-time-card highlight-card">
              <div className="time-badge">07:30 PM – 08:30 PM</div>
              <h4>Global Healthcare Excellence Awards Presentation</h4>
              <p>Conferring coveted trophies and formal citations across all 15 premier industry categories.</p>
            </div>

            <div className="awards-time-card special-card">
              <div className="time-badge">08:30 PM – 08:45 PM</div>
              <h4>Special Recognition: India–ASEAN Healthcare Partnership</h4>
              <p>Honoring organizations and leaders driving healthcare trade, investment, and cross-border innovation.</p>
            </div>

            <div className="awards-time-card">
              <div className="time-badge">08:45 PM – 09:00 PM</div>
              <h4>Grand Finale &amp; Stage Felicitation</h4>
              <p>Commemorative photo-op with winners, jury members, dignitaries, and congratulatory remarks.</p>
            </div>

            <div className="awards-time-card dinner-card">
              <div className="time-badge">09:00 PM Onwards</div>
              <h4>Gala Dinner &amp; International Celebration</h4>
              <p>Lavish multi-cuisine international banquet, cultural performances, and networking celebration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Recognition Spotlight */}
      <section className="section bg-white">
        <div className="container">
          <div className="special-recognition-banner">
            <div className="special-rec-icon">
              <i className="fa-solid fa-handshake-angle"></i>
            </div>
            <div className="special-rec-content">
              <span className="special-rec-tag">Flagship Citation</span>
              <h3>Special Recognition: India–ASEAN Healthcare Partnership Recognition</h3>
              <p>
                A high-distinction ceremonial recognition dedicated to visionary organisations, trade councils,
                government initiatives, and business pioneers who have demonstrated outstanding contribution to
                <strong> healthcare trade, investment, technological innovation, and international bilateral collaboration</strong>{' '}
                between India and ASEAN member countries.
              </p>
              <div className="special-rec-highlights">
                <span><i className="fa-solid fa-check-circle text-primary"></i> Cross-Border Trade Alliances</span>
                <span><i className="fa-solid fa-check-circle text-primary"></i> Technology &amp; Know-How Transfer</span>
                <span><i className="fa-solid fa-check-circle text-primary"></i> Bilateral Health Resiliency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15 Categories Grid */}
      <section className="section bg-light-surface" id="categories">
        <div className="container">
          <div className="section-header">
            <span className="tag">
              <i className="fa-solid fa-trophy"></i> 15 Prestigious Categories
            </span>
            <h2>Official Award Categories 2027</h2>
            <p className="section-subtitle-lead">
              Evaluated by an independent jury composed of senior healthcare administrators, regulatory experts, and trade leaders.
            </p>
          </div>

          <div className="awards-categories-grid">
            {awardCategories.map((cat) => (
              <div className="award-cat-card" key={cat.id}>
                <div className="cat-card-header">
                  <div className="cat-icon-badge">
                    <i className={cat.icon}></i>
                  </div>
                  <span className="cat-badge">{cat.badge}</span>
                </div>
                <h3 className="cat-title">{cat.title}</h3>
                <p className="cat-desc">{cat.desc}</p>
                <div className="cat-card-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      setNominationForm((prev) => ({ ...prev, category: cat.title }));
                      const el = document.getElementById('nominate');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Nominate for this Category <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nomination Inquiry Section */}
      <section className="section bg-white" id="nominate">
        <div className="container">
          <div className="nomination-wrapper">
            <div className="nomination-info">
              <span className="tag">
                <i className="fa-solid fa-envelope-open-text"></i> Call for Nominations
              </span>
              <h2>Nominate Your Organization or Leader</h2>
              <p>
                Nominations are open to pharmaceutical companies, healthcare providers, medical device manufacturers,
                health-tech innovators, startups, and institutions operating across India, ASEAN, and international markets.
              </p>
              <ul className="nomination-steps-list">
                <li>
                  <i className="fa-solid fa-1"></i>
                  <div>
                    <strong>Select Category</strong>
                    <span>Choose from the 15 categories matching your business milestones.</span>
                  </div>
                </li>
                <li>
                  <i className="fa-solid fa-2"></i>
                  <div>
                    <strong>Submit Preliminary Inquiry</strong>
                    <span>Fill the inquiry form or connect via WhatsApp for the official nomination kit.</span>
                  </div>
                </li>
                <li>
                  <i className="fa-solid fa-3"></i>
                  <div>
                    <strong>Jury Review &amp; Felicitation</strong>
                    <span>Shortlisted finalists are invited to the Gala Evening in Bangkok.</span>
                  </div>
                </li>
              </ul>

              <div className="nomination-wa-box">
                <h4>Prefer Direct WhatsApp Assistance?</h4>
                <p>Chat directly with our Awards Secretariat for instant dossier guidelines:</p>
                <a
                  href={getWhatsAppNominationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <i className="fa-brands fa-whatsapp"></i> Inquire via WhatsApp ({CONTACT_CONFIG.general.phone})
                </a>
              </div>
            </div>

            {/* Nomination Form */}
            <div className="nomination-form-card">
              {submitted ? (
                <div className="nomination-success">
                  <div className="success-icon">
                    <i className="fa-solid fa-circle-check text-primary"></i>
                  </div>
                  <h3>Nomination Inquiry Received!</h3>
                  <p>
                    Thank you, <strong>{nominationForm.nomineeName}</strong>. Our Awards Committee has recorded your interest in the{' '}
                    <strong>{nominationForm.category}</strong> category for <em>{nominationForm.company}</em>.
                  </p>
                  <p className="success-note">
                    The formal nomination submission kit and evaluation guidelines will be emailed to{' '}
                    <strong>{nominationForm.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Nomination
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNominationSubmit}>
                  <h3>Awards Nomination Inquiry</h3>
                  <p className="form-subtext">Request the official nomination dossier and entry requirements.</p>

                  <div className="form-group">
                    <label>Nominated Company / Institution / Brand *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Health Systems / Pharma Ltd."
                      value={nominationForm.company}
                      onChange={(e) => setNominationForm({ ...nominationForm, company: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Contact Person / Submitter Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={nominationForm.nomineeName}
                      onChange={(e) => setNominationForm({ ...nominationForm, nomineeName: e.target.value })}
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Official Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="rajesh@company.com"
                        value={nominationForm.email}
                        onChange={(e) => setNominationForm({ ...nominationForm, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={nominationForm.phone}
                        onChange={(e) => setNominationForm({ ...nominationForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Award Category of Interest *</label>
                    <select
                      value={nominationForm.category}
                      onChange={(e) => setNominationForm({ ...nominationForm, category: e.target.value })}
                      required
                    >
                      {awardCategories.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                      <option value="Special Recognition: India–ASEAN Healthcare Partnership Recognition">
                        Special Recognition: India–ASEAN Healthcare Partnership
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Brief Highlight of Achievements / Rationale</label>
                    <textarea
                      rows="3"
                      placeholder="Outline key accomplishments, innovations, or market expansion highlights..."
                      value={nominationForm.reason}
                      onChange={(e) => setNominationForm({ ...nominationForm, reason: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    <i className="fa-solid fa-paper-plane"></i> Request Nomination Dossier
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cross Navigation CTA */}
      <section className="section bg-light-surface py-4">
        <div className="container">
          <div className="awards-cross-nav">
            <div>
              <h3>Planning to Attend the Expo as Well?</h3>
              <p>Join 5,000+ healthcare leaders, explore the 19 sector pavilions, or showcase your products as an exhibitor.</p>
            </div>
            <div className="awards-cross-buttons">
              <Link to="/visitor-registration" className="btn btn-primary">
                <i className="fa-solid fa-id-card"></i> Visitor Registration
              </Link>
              <Link to="/exhibitor-registration" className="btn btn-outline">
                <i className="fa-solid fa-store"></i> Exhibitor Registration
              </Link>
              <Link to="/schedule" className="btn btn-outline">
                <i className="fa-solid fa-clock"></i> Conference Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
