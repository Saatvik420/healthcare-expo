import aseanLogo from '../assets/Indian Asean Global Confluence Logo with GTTCI Logo.png';

export default function Hero({ onOpenPortal }) {
  return (
    <section className="hero" id="about">
      <div className="container hero-container-layout">
        <div className="hero-wrapper">
          <div className="hero-badge-group">
            <span className="hero-cs-pill">
              <i className="fa-solid fa-sparkles"></i> COMING SOON 2027
            </span>
            <span className="hero-badge">
              <i className="fa-solid fa-globe"></i> IndiGlobal Expo &bull; Healthcare Facilities & Pharma Summit
            </span>
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenPortal('visitor')}
            >
              <i className="fa-solid fa-id-card"></i> Visitor Registration
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onOpenPortal('exhibitor')}
            >
              <i className="fa-solid fa-store"></i> Book Exhibitor Stall
            </button>
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
                <span><i className="fa-solid fa-calendar-check text-primary"></i> 2027 Edition</span>
                <span><i className="fa-solid fa-location-dot text-primary"></i> New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
