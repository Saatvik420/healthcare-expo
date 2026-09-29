import { Link } from 'react-router-dom';
import posterImg from '../assets/poster.png';

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="container hero-container-layout">
        <div className="hero-wrapper">
          <div className="hero-badge-group">
            <span className="hero-cs-pill">
              <i className="fa-solid fa-calendar-days"></i> 21st &amp; 22nd January 2027
            </span>
            <div className="hero-expo-spotlight-badge">
              <span className="hero-expo-title-highlight">
                <i className="fa-solid fa-location-dot"></i> Bangkok, Thailand
              </span>
              <span className="hero-expo-collab-text">
                Under the Aegis of India–ASEAN Global Confluence 2027
              </span>
            </div>
          </div>

          <h1 className="hero-main-heading">
            Your Gateway to <span>Global Healthcare Markets</span>, Partnerships &amp; Growth.
          </h1>

          <p className="hero-lead-text">
            <strong>The Global Healthcare Expo 2027</strong> is an international healthcare and pharmaceutical exhibition
            organised under the aegis of the <strong>India–ASEAN Global Confluence 2027</strong> in <strong>Bangkok, Thailand</strong> —
            a strategic gateway to the rapidly expanding ASEAN healthcare market.
          </p>

          {/* Event Pillars Ribbon */}
          <div className="hero-pillars-ribbon">
            <span className="pillar-tag"><i className="fa-solid fa-building"></i> Exhibition</span>
            <span className="pillar-divider">&bull;</span>
            <span className="pillar-tag"><i className="fa-solid fa-microphone"></i> Conference</span>
            <span className="pillar-divider">&bull;</span>
            <span className="pillar-tag"><i className="fa-solid fa-handshake"></i> B2B Meetings</span>
            <span className="pillar-divider">&bull;</span>
            <span className="pillar-tag"><i className="fa-solid fa-globe"></i> International Networking</span>
            <span className="pillar-divider">&bull;</span>
            <span className="pillar-tag"><i className="fa-solid fa-trophy"></i> Awards &amp; Gala Dinner</span>
          </div>

          <div className="hero-theme-pill-box">
            <i className="fa-solid fa-lightbulb text-primary"></i>
            <span>
              <strong>Conference Theme:</strong> &ldquo;Connecting Healthcare Markets. Driving Innovation. Expanding Global Opportunities.&rdquo;
            </span>
          </div>

          <div className="hero-ctas">
            <Link
              to="/visitor-registration"
              className="btn btn-primary btn-lg"
            >
              <i className="fa-solid fa-id-card"></i> Visitor Registration
            </Link>
            <Link
              to="/schedule"
              className="btn btn-outline btn-lg"
            >
              <i className="fa-solid fa-calendar-days"></i> See Schedule
            </Link>
          </div>

          <div className="hero-action-motto">
            <span className="motto-item"><i className="fa-solid fa-circle-check text-primary"></i> Connect</span>
            <span className="motto-item"><i className="fa-solid fa-circle-check text-primary"></i> Exhibit</span>
            <span className="motto-item"><i className="fa-solid fa-circle-check text-primary"></i> Export</span>
            <span className="motto-item"><i className="fa-solid fa-circle-check text-primary"></i> Expand</span>
          </div>
        </div>

        {/* Official Event Poster Spotlight Card */}
        <div className="hero-partner-card">
          <div className="partner-card-inner">
            <div className="partner-card-header">
              <span className="partner-eyebrow">OFFICIAL EVENT SPOTLIGHT</span>
              <h4>The Global Healthcare Expo 2027</h4>
            </div>
            <div className="hero-poster-wrapper">
              <img
                src={posterImg}
                alt="The Global Healthcare Expo 2027 Official Poster - Bangkok, Thailand"
                className="hero-poster-img"
              />
            </div>
            <div className="partner-card-footer">
              <div className="partner-meta-row">
                <span><i className="fa-solid fa-calendar-check text-primary"></i> 21st &amp; 22nd January 2027</span>
                <span><i className="fa-solid fa-location-dot text-primary"></i> Bangkok, Thailand</span>
              </div>
              <div className="partner-card-actions">
                <Link to="/visitor-registration" className="btn btn-sm btn-primary">
                  <i className="fa-solid fa-id-card"></i> Visitor Pass
                </Link>
                <Link to="/schedule" className="btn btn-sm btn-outline">
                  <i className="fa-solid fa-calendar-days"></i> See Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
