import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="section bg-light-surface" id="about-expo">
      <div className="container">
        <div className="section-header">
          <span className="tag">
            <i className="fa-solid fa-earth-asia"></i> Strategic Gateway to ASEAN
          </span>
          <h2>About The Global Healthcare Expo 2027</h2>
          <p className="section-subtitle-lead">
            An international healthcare and pharmaceutical exhibition organised under the aegis of the{' '}
            <strong>India–ASEAN Global Confluence 2027</strong> in Bangkok, Thailand — a strategic gateway to the rapidly
            expanding ASEAN healthcare market.
          </p>
        </div>

        {/* Primary Narrative Card */}
        <div className="about-overview-card">
          <div className="about-overview-text">
            <h3>A Business &amp; Market-Expansion Platform</h3>
            <p>
              The Expo is designed as a focused commercial platform for pharmaceutical companies, healthcare
              manufacturers, medical device companies, diagnostics providers, biotechnology firms, surgical brands,
              healthcare service providers, health-tech innovators, wellness brands, and allied healthcare businesses looking
              to expand their presence across <strong>Thailand, ASEAN, and international markets</strong>.
            </p>
            <div className="about-feature-chips">
              <span className="about-chip"><i className="fa-solid fa-check-circle text-primary"></i> Market Expansion</span>
              <span className="about-chip"><i className="fa-solid fa-check-circle text-primary"></i> Cross-Border Trade</span>
              <span className="about-chip"><i className="fa-solid fa-check-circle text-primary"></i> Strategic Joint Ventures</span>
              <span className="about-chip"><i className="fa-solid fa-check-circle text-primary"></i> International Distribution</span>
            </div>
          </div>
          <div className="about-overview-stats">
            <div className="overview-stat-box">
              <span className="stat-number">40+</span>
              <span className="stat-desc">Countries Represented</span>
            </div>
            <div className="overview-stat-box">
              <span className="stat-number">650M+</span>
              <span className="stat-desc">ASEAN Population Reach</span>
            </div>
            <div className="overview-stat-box">
              <span className="stat-number">5,000+</span>
              <span className="stat-desc">Institutional Trade Buyers</span>
            </div>
            <div className="overview-stat-box">
              <span className="stat-number">100%</span>
              <span className="stat-desc">B2B Focused Platform</span>
            </div>
          </div>
        </div>

        {/* Dual Pillar Grid: Gateway to New Markets & Why Bangkok? */}
        <div className="about-two-col-grid">
          {/* Column 1: A Gateway to New Healthcare Markets */}
          <div className="about-card gateway-card">
            <div className="about-card-badge">
              <i className="fa-solid fa-door-open"></i> Global Reach
            </div>
            <h3>A Gateway to New Healthcare Markets</h3>
            <p>
              For companies seeking export growth, international distributors, importers, institutional buyers, strategic
              partners and new market opportunities, <strong>The Global Healthcare Expo 2027</strong> provides a focused platform
              to showcase products and capabilities directly to an international business audience.
            </p>
            <p>
              With India and ASEAN witnessing growing healthcare needs, increasing investments, evolving healthcare
              infrastructure and expanding demand for quality and cost-effective healthcare solutions, the Expo aims to
              facilitate cross-border trade, business development and long-term commercial partnerships.
            </p>
            <div className="about-card-points">
              <div className="card-point-item">
                <i className="fa-solid fa-arrows-split-up-and-left text-primary"></i>
                <div>
                  <strong>Export &amp; Import Facilitation</strong>
                  <span>Direct conduit for pharmaceutical and medical supplies between India, ASEAN &amp; world</span>
                </div>
              </div>
              <div className="card-point-item">
                <i className="fa-solid fa-handshake-angle text-primary"></i>
                <div>
                  <strong>Institutional Procurement</strong>
                  <span>Direct interface with hospital groups, tender boards, and procurement authorities</span>
                </div>
              </div>
            </div>
            <div className="about-card-cta">
              <Link to="/visitor-registration" className="btn btn-outline btn-sm">
                <i className="fa-solid fa-id-card"></i> Register as Visitor
              </Link>
            </div>
          </div>

          {/* Column 2: Why Bangkok? */}
          <div className="about-card bangkok-card">
            <div className="about-card-badge">
              <i className="fa-solid fa-location-dot"></i> Host City Strategy
            </div>
            <h3>Why Bangkok, Thailand?</h3>
            <p>
              Bangkok provides a strategic business environment for companies looking to access Southeast Asia.
              Through <strong>The Global Healthcare Expo 2027</strong>, participating companies can use Thailand as a
              platform to explore commercial opportunities within the broader ASEAN region and develop relationships with
              businesses operating across multiple international markets.
            </p>
            <p>
              The Expo is therefore positioned not simply as a product showcase, but as a{' '}
              <strong>market-access and business-development platform</strong> where companies can explore opportunities
              to take their products and capabilities beyond their domestic markets.
            </p>
            <div className="about-card-points">
              <div className="card-point-item">
                <i className="fa-solid fa-plane-arrival text-primary"></i>
                <div>
                  <strong>Logistical &amp; Commercial Hub</strong>
                  <span>Premier Southeast Asian transport node with world-class exhibition infrastructure</span>
                </div>
              </div>
              <div className="card-point-item">
                <i className="fa-solid fa-chart-line text-primary"></i>
                <div>
                  <strong>High-Growth Regional Demand</strong>
                  <span>Rapidly modernizing healthcare systems seeking quality formulations &amp; medical devices</span>
                </div>
              </div>
            </div>
            <div className="about-card-cta">
              <Link to="/exhibitor-registration" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-store"></i> Register as Exhibitor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
