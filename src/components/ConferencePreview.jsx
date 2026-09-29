import { Link } from 'react-router-dom';

export default function ConferencePreview() {
  return (
    <section className="section bg-white" id="conference-preview">
      <div className="container">
        <div className="section-header">
          <span className="tag">
            <i className="fa-solid fa-microphone-lines"></i> 2-Day International Healthcare Summit
          </span>
          <h2>Conference &amp; Summit Highlights</h2>
          <p className="conference-theme-highlight">
            <i className="fa-solid fa-quote-left text-primary"></i> Suggested Conference Theme:{' '}
            <strong>&ldquo;Connecting Healthcare Markets. Driving Innovation. Expanding Global Opportunities.&rdquo;</strong>
            <i className="fa-solid fa-quote-right text-primary"></i>
          </p>
        </div>

        <div className="conference-preview-grid">
          {/* Day 1 Card */}
          <div className="conf-day-card">
            <div className="conf-day-badge">
              <span className="conf-day-number">DAY 1</span>
              <span className="conf-day-date">21st January 2027</span>
            </div>
            <div className="conf-day-header">
              <h3>Healthcare Markets, Trade &amp; Global Business</h3>
              <p className="conf-theme-sub">Focusing on cross-border pharma corridors, medical technology, and buyer dialogues.</p>
            </div>
            <ul className="conf-session-highlights">
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>Inaugural Session:</strong> The Future of Healthcare: Connecting India, ASEAN &amp; Global Markets
                </div>
              </li>
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>Leadership Plenary:</strong> The Next Healthcare Economy: Growth, Investment &amp; Market Opportunities
                </div>
              </li>
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>Conference Session I:</strong> India–ASEAN Healthcare Trade Corridor &ldquo;From Local Manufacturing to Global Markets&rdquo;
                </div>
              </li>
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>Conference Session II:</strong> Pharmaceuticals Beyond Borders (Formulations, APIs, CDMO &amp; Generics)
                </div>
              </li>
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>Global Healthcare Business Forum:</strong> Where Buyers Meet Healthcare Businesses (Buyer–Seller Dialogue)
                </div>
              </li>
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>CEO Leadership Forum &amp; International Networking Evening:</strong> Closed-door CEO roundtable &amp; Diplomatic reception
                </div>
              </li>
            </ul>
            <div className="conf-card-footer">
              <Link to="/schedule" className="btn btn-outline btn-block">
                View Day 1 Full Schedule <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Day 2 Card */}
          <div className="conf-day-card">
            <div className="conf-day-badge">
              <span className="conf-day-number">DAY 2</span>
              <span className="conf-day-date">22nd January 2027</span>
            </div>
            <div className="conf-day-header">
              <h3>Innovation, Investment &amp; The Future of Healthcare</h3>
              <p className="conf-theme-sub">Spotlighting digital hospitals, AI, venture financing, and resilient supply chains.</p>
            </div>
            <ul className="conf-session-highlights">
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>Leadership Keynote:</strong> Healthcare 2035: Technology, Innovation &amp; New Business Models
                </div>
              </li>
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>Conference Session IV:</strong> AI, Digital Health, Telemedicine &amp; Remote Diagnostics
                </div>
              </li>
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>Conference Session V:</strong> Healthcare Investment &amp; Financing (PE, VC, Hospital &amp; MedTech)
                </div>
              </li>
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>Conference Session VI:</strong> Building Stronger Healthcare Supply Chains &ldquo;From Manufacturing to Market&rdquo;
                </div>
              </li>
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>Global Healthcare Innovation Forum:</strong> Innovate. Scale. Go Global (Startup showcase)
                </div>
              </li>
              <li>
                <i className="fa-solid fa-check text-primary"></i>
                <div>
                  <strong>CEO Roundtable &amp; Closing:</strong> The Global Healthcare Growth Agenda &amp; Partnership Announcements
                </div>
              </li>
            </ul>
            <div className="conf-card-footer">
              <Link to="/schedule" className="btn btn-outline btn-block">
                View Day 2 Full Schedule <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Day 2 Evening: Gala Awards Card */}
          <div className="conf-day-card gala-card-highlight">
            <div className="conf-day-badge gala-badge">
              <span className="conf-day-number"><i className="fa-solid fa-trophy"></i> DAY 2 EVENING</span>
              <span className="conf-day-date">From 06:30 PM Onwards</span>
            </div>
            <div className="conf-day-header">
              <h3>Global Healthcare Excellence Awards 2027 &amp; Gala Dinner</h3>
              <p className="conf-theme-sub">The grand climax celebrating top leaders, innovators, and cross-border partnerships.</p>
            </div>
            <ul className="conf-session-highlights">
              <li>
                <i className="fa-solid fa-star text-accent"></i>
                <div>
                  <strong>06:30 PM:</strong> Red Carpet &amp; Welcome Reception
                </div>
              </li>
              <li>
                <i className="fa-solid fa-star text-accent"></i>
                <div>
                  <strong>15 Prestigious Award Categories:</strong> Honoring Pharma, MedTech, Digital Health, Startups &amp; Leaders
                </div>
              </li>
              <li>
                <i className="fa-solid fa-star text-accent"></i>
                <div>
                  <strong>Special Recognition:</strong> India–ASEAN Healthcare Partnership Recognition
                </div>
              </li>
              <li>
                <i className="fa-solid fa-star text-accent"></i>
                <div>
                  <strong>Grand Finale &amp; Awards Ceremony:</strong> Presenting the 2027 Healthcare Champions
                </div>
              </li>
              <li>
                <i className="fa-solid fa-star text-accent"></i>
                <div>
                  <strong>09:00 PM:</strong> Gala Dinner &amp; International Celebration
                </div>
              </li>
            </ul>
            <div className="conf-card-footer">
              <Link to="/awards" className="btn btn-primary btn-block">
                <i className="fa-solid fa-trophy"></i> Explore Awards &amp; Nominations
              </Link>
            </div>
          </div>
        </div>

        {/* Global Action Banner */}
        <div className="conference-action-banner">
          <div className="conf-banner-text">
            <h4>Attending The Summit as a Delegate or Speaker?</h4>
            <p>Trade visitor passes include access to conference keynotes and exhibition halls.</p>
          </div>
          <div className="conf-banner-buttons">
            <Link to="/visitor-registration" className="btn btn-primary">
              <i className="fa-solid fa-id-card"></i> Visitor Registration
            </Link>
            <Link to="/schedule" className="btn btn-outline">
              <i className="fa-solid fa-calendar-days"></i> View Full 2-Day Agenda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
