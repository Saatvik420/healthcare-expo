import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Sectors() {
  const [selectedSector, setSelectedSector] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedSector(null);
      }
    };
    if (selectedSector) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedSector]);

  const sectors = [
    {
      id: 'healthcare-facilities',
      title: 'Healthcare Facilities & Hospital Infrastructure',
      shortTitle: 'Healthcare Facilities',
      badge: 'Featured Pavilion',
      hall: 'Hall 6 & Grand Pavilion',
      icon: 'fa-solid fa-hospital',
      tagline: 'Turnkey hospital engineering, modular OTs & critical care',
      description:
        'Connecting global healthcare infrastructure developers, hospital superintendents, clinical engineers, and turnkey builders across India, ASEAN, and international healthcare systems.',
      subcategories: [
        'Modular Operating Theatres (OT) & ICU Suites',
        'Hospital Engineering, HVAC & Clean Air Solutions',
        'Advanced Diagnostic Imaging (MRI, CT, Ultrasound)',
        'Hospital Beds, Surgical Furniture & Patient Handling',
        'Biomedical Waste Management & Autoclave Systems',
        'Smart Hospital Management Systems (HIS/EMR) & Telehealth',
      ],
      highlights: [
        '220+ Hospital Facility Exhibitors & Providers',
        'Live Smart ICU and Modular Operation Theatre Showcase',
        'Direct Sourcing Sessions with Hospital Procurement Heads',
      ],
      image:
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'diagnostics-surgicals',
      title: 'Diagnostics and Surgicals',
      shortTitle: 'Diagnostics & Surgicals',
      badge: 'New Pavilion',
      hall: 'Hall 5 & Diagnostic Hub',
      icon: 'fa-solid fa-microscope',
      tagline: 'Clinical lab analyzers, surgical instruments & IVD kits',
      description:
        'Dedicated exhibition zone spotlighting cutting-edge pathology analyzers, surgical cutting & laparoscopic devices, in-vitro diagnostics (IVD), point-of-care testing kits, and sterile surgical equipment.',
      subcategories: [
        'Clinical Pathology Analyzers & Automated Chemistry Systems',
        'Laparoscopic, Endoscopic & Robotic Surgical Instruments',
        'Point-of-Care Testing (POCT) & Rapid Molecular Kits',
        'Ophthalmic, Orthopedic & Micro-Surgical Device Suites',
        'Sterile Disposables, Sutures & Operation Theatre Packs',
        'Centrifuges, Incubators & Cold-Chain Specimen Storage',
      ],
      highlights: [
        '120+ Diagnostic & Surgical Innovation Leaders',
        'Live Surgical Tool & Laparoscopic Demonstration Theatres',
        'Accredited Lab Director & Clinical Buyer Delegations',
      ],
      image:
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'apis',
      title: 'APIs & Fine Chemicals',
      shortTitle: 'APIs & Chemicals',
      badge: 'Bulk Sourcing',
      hall: 'Hall 1 & 2',
      icon: 'fa-solid fa-flask-vial',
      tagline: 'Raw intermediates, active ingredients & biosimilars',
      description:
        'Bringing together world-leading chemical synthesizers, bulk drug manufacturers, peptide chemists, and biotech fermenters supplying essential pharmaceutical building blocks.',
      subcategories: [
        'Active Pharmaceutical Ingredients (APIs)',
        'Fine Chemicals & Organic Intermediates',
        'High-Potency APIs (HPAPI) & Peptides',
        'Herbal, Botanical & Phytochemical Extracts',
        'Custom Chemical Synthesis & Contract Research (CRO)',
      ],
      highlights: [
        '180+ Active Ingredient Exporters',
        'Dedicated US-FDA & EU-GMP Compliant Pavilion',
        'B2B Sourcing Lounge for bulk annual contracts',
      ],
      image:
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'finished',
      title: 'Finished Dosages & Formulations',
      shortTitle: 'Formulations & Generics',
      badge: 'Commercial Pharma',
      hall: 'Hall 3',
      icon: 'fa-solid fa-pills',
      tagline: 'Generics, branded pharmaceuticals & therapeutic biologics',
      description:
        'Dedicated to commercial pharmaceutical formulations, oral solid dosages, injectables, therapeutic biologics, and nutraceutical products ready for global distribution.',
      subcategories: [
        'Solid Dosage Forms (Tablets, Hard/Softgel Capsules)',
        'Sterile Injectables & Lyophilized Vials',
        'Biosimilar & Monoclonal Antibody Formulations',
        'Nutraceuticals, Minerals & Dietary Supplements',
        'Contract Development & Manufacturing (CDMO)',
      ],
      highlights: [
        '140+ Formulation Manufacturing Plants exhibiting',
        'Licensing & Tech-Transfer B2B meeting desks',
        'Government Hospital Procurement Delegations',
      ],
      image:
        'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'machinery',
      title: 'Pharma Machinery & Cleanroom',
      shortTitle: 'Machinery & Automation',
      badge: 'Industrial Tech',
      hall: 'Hall 4',
      icon: 'fa-solid fa-gears',
      tagline: 'Processing automation, fluid systems & cleanrooms',
      description:
        'State-of-the-art manufacturing hardware, rotary tablet presses, continuous granulation lines, HVAC cleanrooms, water-for-injection generators, and automated packaging lines.',
      subcategories: [
        'Granulation, Mixing & Tablet Compression Presses',
        'Cleanroom Modular Panels, HEPA Filtration & HVAC',
        'Water-for-Injection (WFI) & Pure Steam Generators',
        'Liquid Filling, Capping & Sterile Bottling Lines',
        'Analytical Testing & Chromatography Instrumentation',
      ],
      highlights: [
        'Live operating machinery displays on the exhibition floor',
        'Industry 4.0 automation & IoT monitoring systems',
        'Cleanroom certification & validation consultations',
      ],
      image:
        'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'packaging',
      title: 'Packaging & Drug Delivery',
      shortTitle: 'Packaging & Devices',
      badge: 'Smart Delivery',
      hall: 'Hall 5',
      icon: 'fa-solid fa-box-archive',
      tagline: 'Smart packaging, cold chain logistics & serialization',
      description:
        'Focusing on primary and secondary containment guaranteeing drug stability, patient safety, tamper-evidence, serialization, and temperature-controlled global cold chain distribution.',
      subcategories: [
        'Pre-filled Syringes, Cartridges & Autoinjectors',
        'Blister Foils (Cold-form Alu-Alu, PVC/PVDC)',
        'Tubular Glass Vials, Ampoules & Rubber Stoppers',
        'Track & Trace 2D Data Matrix Serialization Systems',
        'Thermal Cold-Chain Insulated Shipping Containers',
      ],
      highlights: [
        '90+ Global Packaging & Device Innovators',
        'Track-and-trace regulatory compliance workshops',
        'Sustainable, recyclable & eco-friendly pharma packaging',
      ],
      image:
        'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="section sectors-compact-section" id="sectors">
      <div className="container">
        <div className="section-header">
          <span className="tag">
            <i className="fa-solid fa-cubes"></i> 6 Key Exhibition Pavilions
          </span>
          <h2>Focus Areas & Exhibition Pavilions</h2>
          <p>
            Explore our specialized pavilions covering hospital infrastructure, surgical technology, diagnostics,
            and the complete pharmaceutical value chain. Click any pavilion to view full details and product profiles.
          </p>
        </div>

        {/* Compact Grid with Detail Popup Icons */}
        <div className="sectors-compact-grid">
          {sectors.map((sector) => (
            <div className="sector-compact-card" key={sector.id}>
              <div className="sector-card-banner">
                <img src={sector.image} alt={sector.title} className="sector-card-thumb" />
                <span className="sector-badge-pill">{sector.badge}</span>
                <span className="sector-hall-pill">{sector.hall}</span>
              </div>

              <div className="sector-compact-body">
                <div className="sector-title-row">
                  <div className="sector-mini-icon">
                    <i className={sector.icon}></i>
                  </div>
                  <h3>{sector.title}</h3>
                </div>

                <p className="sector-tagline-text">{sector.tagline}</p>

                <div className="sector-compact-footer">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm sector-popup-trigger-btn"
                    onClick={() => setSelectedSector(sector)}
                    title={`View full details for ${sector.title}`}
                  >
                    <i className="fa-solid fa-circle-info"></i> View Details
                  </button>
                  <Link
                    to={`/book-stall?sector=${sector.id}`}
                    className="btn btn-primary btn-sm sector-quick-book-btn"
                  >
                    Book Stall <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sector Details Popup Modal */}
      {selectedSector && (
        <div
          className="sector-modal-backdrop"
          onClick={() => setSelectedSector(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="sector-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="sector-modal-close-btn"
              onClick={() => setSelectedSector(null)}
              aria-label="Close details"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="sector-modal-header">
              <div className="sector-modal-icon-badge">
                <i className={selectedSector.icon}></i>
              </div>
              <div>
                <div className="sector-modal-pills">
                  <span className="sector-badge-pill">{selectedSector.badge}</span>
                  <span className="sector-hall-pill">{selectedSector.hall}</span>
                </div>
                <h2>{selectedSector.title}</h2>
                <p className="sector-modal-tagline">{selectedSector.tagline}</p>
              </div>
            </div>

            <div className="sector-modal-body">
              <div className="sector-modal-desc-box">
                <h4>Pavilion Overview</h4>
                <p>{selectedSector.description}</p>
              </div>

              <div className="sector-modal-subcats">
                <h4>
                  <i className="fa-solid fa-boxes-stacked text-primary"></i> Featured Categories & Exhibits
                </h4>
                <ul className="sector-subcat-list">
                  {selectedSector.subcategories.map((sub, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-circle-check text-primary"></i>
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sector-modal-highlights">
                <h4>
                  <i className="fa-solid fa-star text-primary"></i> Pavilion Highlights
                </h4>
                <ul className="sector-highlight-list">
                  {selectedSector.highlights.map((h, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-sparkles text-accent"></i>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="sector-modal-footer">
              <Link
                to={`/book-stall?sector=${selectedSector.id}`}
                className="btn btn-primary"
                onClick={() => setSelectedSector(null)}
              >
                <i className="fa-solid fa-store"></i> Book Stall in this Pavilion
              </Link>
              <Link
                to="/registration?tab=visitor"
                className="btn btn-outline"
                onClick={() => setSelectedSector(null)}
              >
                <i className="fa-solid fa-id-card"></i> Visitor Trade Pass
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
