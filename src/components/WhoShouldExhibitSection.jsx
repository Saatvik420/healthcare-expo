import { useState } from 'react';
import { Link } from 'react-router-dom';

const sectorsList = [
  {
    id: 'pharmaceuticals',
    title: 'Pharmaceuticals',
    icon: 'fa-solid fa-pills',
    desc: 'Generic medications, branded ethical drugs, specialty therapeutics, and essential global medicines.',
  },
  {
    id: 'apis',
    title: 'APIs & Fine Chemicals',
    icon: 'fa-solid fa-flask-vial',
    desc: 'Active pharmaceutical ingredients, organic intermediates, peptides, and chemical building blocks.',
  },
  {
    id: 'formulations',
    title: 'Formulations',
    icon: 'fa-solid fa-prescription-bottle-medical',
    desc: 'Solid oral dosages, sterile injectables, lyophilized vials, creams, and complex formulations.',
  },
  {
    id: 'biotech',
    title: 'Biotechnology & Biologics',
    icon: 'fa-solid fa-dna',
    desc: 'Biosimilars, recombinant proteins, monoclonal antibodies, genomics, and bioprocessing solutions.',
  },
  {
    id: 'medical-devices',
    title: 'Medical Devices',
    icon: 'fa-solid fa-stethoscope',
    desc: 'Diagnostic monitors, cardiovascular systems, orthopedic implants, and patient care instruments.',
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics & IVD',
    icon: 'fa-solid fa-microscope',
    desc: 'In-vitro diagnostic kits, clinical lab analyzers, point-of-care testing, and molecular diagnostics.',
  },
  {
    id: 'surgical-equipment',
    title: 'Surgical Equipment',
    icon: 'fa-solid fa-syringe',
    desc: 'Minimally invasive instruments, laparoscopic towers, electro-surgical tools, and sterile disposables.',
  },
  {
    id: 'hospital-solutions',
    title: 'Hospital Solutions',
    icon: 'fa-solid fa-hospital',
    desc: 'Turnkey hospital furniture, medical gas pipelines, sterilization autoclaves, and patient handling.',
  },
  {
    id: 'digital-health',
    title: 'Digital Health',
    icon: 'fa-solid fa-laptop-medical',
    desc: 'Electronic Medical Records (EMR/EHR), hospital information systems (HIS), and cloud medical data.',
  },
  {
    id: 'health-tech',
    title: 'Health-Tech & AI',
    icon: 'fa-solid fa-robot',
    desc: 'Artificial intelligence diagnostics, predictive care algorithms, clinical automation, and IoT health.',
  },
  {
    id: 'healthcare-services',
    title: 'Healthcare Services',
    icon: 'fa-solid fa-user-doctor',
    desc: 'Clinical trial management, regulatory compliance consulting, hospital advisory, and accreditation.',
  },
  {
    id: 'contract-manufacturing',
    title: 'Contract Manufacturing (CDMO)',
    icon: 'fa-solid fa-industry',
    desc: 'Contract formulation development, third-party manufacturing, tech transfer, and private labelling.',
  },
  {
    id: 'nutraceuticals',
    title: 'Nutraceuticals & Wellness',
    icon: 'fa-solid fa-leaf',
    desc: 'Dietary supplements, herbal extracts, functional foods, multivitamins, and preventive wellness.',
  },
  {
    id: 'laboratory-equipment',
    title: 'Laboratory Equipment',
    icon: 'fa-solid fa-vial',
    desc: 'Centrifuges, chromatography systems, spectrophotometers, clean benches, and lab consumables.',
  },
  {
    id: 'medical-technology',
    title: 'Medical Technology',
    icon: 'fa-solid fa-microchip',
    desc: 'Robotic surgical systems, laser therapy apparatus, dialysis machinery, and telemetry systems.',
  },
  {
    id: 'healthcare-infrastructure',
    title: 'Healthcare Infrastructure',
    icon: 'fa-solid fa-building-circle-check',
    desc: 'Modular operation theatres, cleanroom HVAC engineering, ICU architecture, and green hospital design.',
  },
  {
    id: 'rehabilitation-elder-care',
    title: 'Rehabilitation & Elder Care',
    icon: 'fa-solid fa-wheelchair',
    desc: 'Physiotherapy equipment, mobility aids, geriatric nursing solutions, and assisted living tech.',
  },
  {
    id: 'medical-tourism',
    title: 'Medical Tourism & Networks',
    icon: 'fa-solid fa-plane-departure',
    desc: 'International patient departments, cross-border health facilitators, and accredited healthcare chains.',
  },
  {
    id: 'allied-healthcare',
    title: 'Allied Healthcare Businesses',
    icon: 'fa-solid fa-suitcase-medical',
    desc: 'Medical publishing, cold-chain logistics, pharmaceutical packaging, insurance, and trade councils.',
  },
];

export default function WhoShouldExhibitSection() {
  const [filter, setFilter] = useState('all');

  const filteredSectors =
    filter === 'all'
      ? sectorsList
      : filter === 'pharma'
      ? sectorsList.filter((s) =>
          ['pharmaceuticals', 'apis', 'formulations', 'biotech', 'contract-manufacturing', 'nutraceuticals'].includes(s.id)
        )
      : filter === 'medtech'
      ? sectorsList.filter((s) =>
          ['medical-devices', 'diagnostics', 'surgical-equipment', 'laboratory-equipment', 'medical-technology'].includes(s.id)
        )
      : sectorsList.filter((s) =>
          ['hospital-solutions', 'digital-health', 'health-tech', 'healthcare-services', 'healthcare-infrastructure', 'rehabilitation-elder-care', 'medical-tourism', 'allied-healthcare'].includes(s.id)
        );

  return (
    <section className="section bg-light-surface" id="who-should-exhibit">
      <div className="container">
        <div className="section-header">
          <span className="tag">
            <i className="fa-solid fa-layer-group"></i> 19 Comprehensive Sectors
          </span>
          <h2>Who Should Exhibit?</h2>
          <p className="section-subtitle-lead">
            The Expo welcomes participation from across the entire healthcare, pharmaceutical, medical technology,
            and life sciences ecosystem looking to access Thailand, ASEAN, and international markets.
          </p>
        </div>

        {/* Sector Quick Filter Pills */}
        <div className="sector-filter-bar">
          <button
            type="button"
            className={`sector-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All 19 Sectors ({sectorsList.length})
          </button>
          <button
            type="button"
            className={`sector-filter-btn ${filter === 'pharma' ? 'active' : ''}`}
            onClick={() => setFilter('pharma')}
          >
            Pharma, APIs &amp; Biotech
          </button>
          <button
            type="button"
            className={`sector-filter-btn ${filter === 'medtech' ? 'active' : ''}`}
            onClick={() => setFilter('medtech')}
          >
            Medical Devices, Surgicals &amp; Labs
          </button>
          <button
            type="button"
            className={`sector-filter-btn ${filter === 'facilities' ? 'active' : ''}`}
            onClick={() => setFilter('facilities')}
          >
            Hospital Infrastructure &amp; Health-Tech
          </button>
        </div>

        {/* 19 Sectors Grid */}
        <div className="who-exhibit-grid">
          {filteredSectors.map((sector) => (
            <div className="who-exhibit-card" key={sector.id}>
              <div className="who-card-icon">
                <i className={sector.icon}></i>
              </div>
              <div className="who-card-content">
                <h3>{sector.title}</h3>
                <p>{sector.desc}</p>
                <div className="who-card-actions">
                  <Link
                    to={`/exhibitor-registration?sector=${sector.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    <span>Book Stall</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  <Link
                    to={`/visitor-registration?sector=${sector.id}`}
                    className="btn btn-sm btn-link-visitor"
                  >
                    <span>Visitor Pass</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="sectors-bottom-action">
          <div className="sectors-bottom-text">
            <h4>Don&apos;t see your exact segment?</h4>
            <p>Our exhibition halls cater to customized pavilions and specialized trade delegations.</p>
          </div>
          <div className="sectors-bottom-buttons">
            <Link to="/exhibitor-registration" className="btn btn-primary">
              <i className="fa-solid fa-store"></i> Register as Exhibitor
            </Link>
            <Link to="/visitor-registration" className="btn btn-outline">
              <i className="fa-solid fa-id-card"></i> Register as Visitor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
