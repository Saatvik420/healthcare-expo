import { Link } from 'react-router-dom';
import aseanLogo from '../assets/Indian Asean Global Confluence Logo with GTTCI Logo.png';

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="container hero-container-layout">
        <div className="hero-wrapper">
          <div className="hero-badge-group">
            <span className="hero-cs-pill">
              <i className="fa-solid fa-calendar-days"></i> 21st & 22nd January 2027
            </span>
            <div className="hero-expo-spotlight-badge">
              <span className="hero-expo-title-highlight">
                <i className="fa-solid fa-hospital-user"></i> The Global Healthcare Expo 2027
              </span>
              <span className="hero-expo-collab-text">
                In collaboration with GTTCI & Asepsis Marketing
              </span>
            </div>
          </div>

          <h1>
            Connecting <span>Healthcare Facilities</span>, Medical Tech & Pharma Supply Chains.
          </h1>

          <p>
            An exclusive flagship vertical of <strong>IndiGlobal Expo</strong> (<em>Connect &bull; Collaborate &bull; Grow</em>)
            held under the prestigious <strong>India-ASEAN Global Confluence 2027</strong> in collaboration with <strong>GTTCI</strong>.
            Bringing together hospital administrators, healthcare facility developers, clinical technology innovators,
            and pharmaceutical leaders across 40+ countries.
          </p>

          <div className="hero-ctas">
            <Link
              to="/registration?tab=visitor"
              className="btn btn-primary"
            >
              <i className="fa-solid fa-id-card"></i> Visitor Registration
            </Link>
            <Link
              to="/registration?tab=exhibitor"
              className="btn btn-outline"
            >
              <i className="fa-solid fa-store"></i> Book Exhibitor Stall
            </Link>
          </div>

          <div className="hero-key-highlights">
            <div className="highlight-tag">
              <i className="fa-solid fa-hospital"></i> Healthcare & Hospital Facilities
            </div>
            <div className="highlight-tag">
              <i className="fa-solid fa-handshake"></i> India-ASEAN Trade Corridor
            </div>
            <div className="highlight-tag">
              <i className="fa-solid fa-flask-vial"></i> APIs, Formulations & Tech
            </div>
          </div>
        </div>

        {/* Co-Branding Card featuring India-ASEAN Global Confluence & GTTCI Logo */}
        <div className="hero-partner-card">
          <div className="partner-card-inner">
            <div className="partner-card-header">
              <span className="partner-eyebrow">HELD UNDER THE AEGIS OF</span>
              <h4>India-ASEAN Global Confluence 2027</h4>
            </div>
            <div className="partner-logo-wrapper">
              <img
                src={aseanLogo}
                alt="India-ASEAN Global Confluence 2027 Logo with GTTCI"
                className="hero-asean-logo-img"
              />
            </div>
            <div className="partner-card-footer">
              <p>
                <strong>Organised under IndiGlobal Expo</strong> in official association with the{' '}
                <strong>Global Trade & Technology Council of India (GTTCI)</strong>.
              </p>
              <div className="partner-meta-row">
                <span><i className="fa-solid fa-calendar-check text-primary"></i> 21st & 22nd January 2027</span>
                <span><i className="fa-solid fa-location-dot text-primary"></i> Bangkok, Thailand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
