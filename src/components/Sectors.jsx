export default function Sectors({ onOpenPortal }) {
  const sectors = [
    {
      id: 'healthcare-facilities',
      title: 'Healthcare Facilities & Hospital Infrastructure',
      badge: 'Featured Zone',
      description:
        'Turnkey hospital solutions, modular operation theatres, ICU equipment, imaging & diagnostics, biomedical engineering, and healthcare facility management.',
      image:
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'apis',
      title: 'APIs & Fine Chemicals',
      description:
        'Active pharmaceutical ingredients, raw chemical intermediates, herbal extracts, and custom pharmaceutical synthesis.',
      image:
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'finished',
      title: 'Finished Dosages & Formulations',
      description:
        'Generics, over-the-counter medicine, capsules, tablets, intravenous therapies, and biosimilar portfolios.',
      image:
        'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'machinery',
      title: 'Pharma Machinery & Cleanroom',
      description:
        'High-speed tableting, cleanroom sterile systems, fluid handling, purification, and analytical instruments.',
      image:
        'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'packaging',
      title: 'Packaging & Drug Delivery',
      description:
        'Pre-filled syringes, blisters, vials, cold-chain transport packaging, and anti-counterfeiting tracking technology.',
      image:
        'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="section" id="sectors">
      <div className="container">
        <div className="section-header">
          <span className="tag">IndiGlobal Expo Marketplace</span>
          <h2>Focus Areas & Exhibition Pavilions</h2>
          <p>
            Covering modern healthcare facilities, hospital infrastructure, and the complete pharmaceutical lifecycle
            under the India-ASEAN Global Confluence 2027.
          </p>
        </div>

        <div className="sectors-grid">
          {sectors.map((sector, index) => (
            <div className={`sector-card ${sector.badge ? 'sector-card-featured' : ''}`} key={index}>
              {sector.badge && <span className="sector-floating-badge">{sector.badge}</span>}
              <img src={sector.image} alt={sector.title} className="sector-img" />
              <div className="sector-content">
                <h3>{sector.title}</h3>
                <p>{sector.description}</p>
                <button
                  type="button"
                  className="sector-link"
                  onClick={() => onOpenPortal('exhibitor')}
                >
                  Exhibit in this zone <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
