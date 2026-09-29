import { Link } from 'react-router-dom';
import aseanLogo from '../assets/Indian Asean Global Confluence Logo with GTTCI Logo.png';

export default function AseanConfluenceSection() {
  return (
    <section className="section bg-light-surface" id="confluence">
      <div className="container">
        <div className="section-header">
          <span className="tag">
            <i className="fa-solid fa-calendar-days"></i> Official Banner Initiative &bull; 21st &amp; 22nd January 2027
          </span>
          <h2>Held Under India-ASEAN Global Confluence 2027</h2>
          <p>
            An international platform presented by <strong>IndiGlobal Expo</strong> (<em>Connect &bull; Collaborate &bull; Grow</em>)
            in official co-presentation with the <strong>Global Trade &amp; Technology Council of India (GTTCI)</strong>.
          </p>
        </div>

        <div className="confluence-grid">
          {/* Left Column: Official Confluence Logo & Partner Showcase */}
          <div className="confluence-logo-card">
            <div className="confluence-badge-ribbon">
              <span>Official Confluence Banner</span>
            </div>
            
            <div className="confluence-image-container">
              <img
                src={aseanLogo}
                alt="India-ASEAN Global Confluence 2027 Logo with GTTCI Co-Presenter"
                className="confluence-showcase-logo"
              />
            </div>

            <div className="confluence-card-details">
              <div className="confluence-meta-item">
                <i className="fa-solid fa-calendar-check text-primary"></i>
                <div>
                  <strong>Edition &amp; Timeline</strong>
                  <span>21st &amp; 22nd January 2027</span>
                </div>
              </div>
              <div className="confluence-meta-item">
                <i className="fa-solid fa-location-dot text-primary"></i>
                <div>
                  <strong>Official Venue</strong>
                  <span>Bangkok, Thailand</span>
                </div>
              </div>
              <div className="confluence-meta-item">
                <i className="fa-solid fa-building-columns text-primary"></i>
                <div>
                  <strong>Co-Presented By</strong>
                  <span>Global Trade &amp; Technology Council of India (GTTCI)</span>
                </div>
              </div>
              <div className="confluence-meta-item">
                <i className="fa-solid fa-globe text-primary"></i>
                <div>
                  <strong>Organized By</strong>
                  <span>IndiGlobal Expo (indiglobalexpo.com)</span>
                </div>
              </div>
            </div>

            <div className="confluence-card-cta">
              <Link
                to="/contact"
                className="btn btn-outline btn-block"
              >
                <i className="fa-solid fa-headset"></i> Contact Expo Secretariat
              </Link>
            </div>
          </div>

          {/* Right Column: Strategic Focus & Healthcare Facilities Details */}
          <div className="confluence-info-column">
            <div className="confluence-info-box">
              <div className="confluence-pillar-item">
                <div className="pillar-icon">
                  <i className="fa-solid fa-hospital"></i>
                </div>
                <div className="pillar-content">
                  <h3>Specialized Healthcare Facilities &amp; Hospital Infrastructure</h3>
                  <p>
                    Covering the entire healthcare facility ecosystem: turnkey hospital engineering, modular operation
                    theatres, intensive care (ICU) units, diagnostic imaging centers, hospital furniture, biomedical waste
                    management, and smart hospital digital health systems (HIS/EMR).
                  </p>
                </div>
              </div>

              <div className="confluence-pillar-item">
                <div className="pillar-icon">
                  <i className="fa-solid fa-handshake"></i>
                </div>
                <div className="pillar-content">
                  <h3>India-ASEAN Healthcare &amp; Pharma Trade Corridor</h3>
                  <p>
                    Fostering strategic cross-border trade, technology transfer, and supply chain resiliency between India
                    and ASEAN nations (Singapore, Malaysia, Thailand, Vietnam, Indonesia, Philippines, and beyond).
                  </p>
                </div>
              </div>

              <div className="confluence-pillar-item">
                <div className="pillar-icon">
                  <i className="fa-solid fa-users-gear"></i>
                </div>
                <div className="pillar-content">
                  <h3>Curated B2B Matchmaking &amp; Facility Sourcing</h3>
                  <p>
                    Pre-scheduled one-on-one buyer-seller meetings connecting hospital procurement teams, ministry delegates,
                    pharma distributors, and institutional investors with leading global manufacturers.
                  </p>
                </div>
              </div>
            </div>

            <div className="confluence-actions-row">
              <a href="#who-should-exhibit" className="btn btn-primary">
                <i className="fa-solid fa-cubes"></i> Explore Product Pavilions
              </a>
              <Link to="/visitor-registration" className="btn btn-outline">
                <i className="fa-solid fa-id-card"></i> Visitor Trade Pass
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
