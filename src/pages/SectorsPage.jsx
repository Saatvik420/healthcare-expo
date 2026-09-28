import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const sectorsData = [
  {
    id: 'healthcare-facilities',
    name: 'Healthcare Facilities & Hospital Infrastructure',
    tagline: 'Turnkey hospital design, ICU/modular OT setups, diagnostic equipment & clinical tech',
    hall: 'Hall 6 & Grand Pavilion',
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    description:
      'Connecting global healthcare infrastructure builders, hospital administrators, biomedical engineers, and medical equipment manufacturers. An epicenter for hospital modernization, robotic surgical suites, and healthcare facility management across India, ASEAN, and international markets.',
    subcategories: [
      'Modular Operating Theatres & Critical Care ICUs',
      'Hospital Engineering, HVAC & Clean Air Solutions',
      'Advanced Diagnostic Imaging (MRI, CT, Ultrasound)',
      'Hospital Beds, Surgical Furniture & Patient Handling',
      'Biomedical Waste Management & Sterilization Plants',
      'Smart Hospital Management Systems (HIS/EMR) & Telehealth',
      'Diagnostic Laboratories & Point-of-Care Testing (POCT)',
      'Healthcare Facility Operations & Maintenance Services',
    ],
    highlights: [
      'Over 220+ Hospital Facility Exhibitors & Providers',
      'Dedicated India-ASEAN Hospital Procurement Delegation',
      'Live Smart ICU and Modular Operation Theatre Showcase',
    ],
  },
  {
    id: 'apis',
    name: 'APIs & Fine Chemicals',
    tagline: 'Raw intermediates, active ingredients & biosimilar substrates',
    hall: 'Hall 1 & 2',
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description:
      'The API pavilion brings together world-leading chemical synthesizers, bulk drug manufacturers, peptide chemists, and biotech fermenters supplying essential building blocks for global medicine.',
    subcategories: [
      'Active Pharmaceutical Ingredients (APIs)',
      'Fine Chemicals & Organic Intermediates',
      'High-Potency APIs (HPAPI)',
      'Peptides, Oligonucleotides & Enzymes',
      'Herbal & Phytochemical Extracts',
      'Custom Chemical Synthesis & Contract Research (CRO)',
    ],
    highlights: [
      '180+ Active Ingredient Exporters',
      'Dedicated US-FDA / EU-GMP compliant zone',
      'B2B Sourcing Lounge for bulk procurement',
    ],
  },
  {
    id: 'finished',
    name: 'Finished Dosages & Formulations',
    tagline: 'Generics, branded pharmaceuticals, biologics & OTC portfolios',
    hall: 'Hall 3',
    image:
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    description:
      'Dedicated to commercial pharmaceutical formulations, oral solid dosages, injectables, therapeutic biologics, and nutraceutical products ready for international distribution and pharmacy licensing.',
    subcategories: [
      'Solid Dosage Forms (Tablets, Hard/Softgel Capsules)',
      'Sterile Injectables & Lyophilized Vials',
      'Topical Creams, Ointments & Aerosols',
      'Biosimilar & Monoclonal Antibody Formulations',
      'Nutraceuticals, Minerals & Dietary Supplements',
      'Contract Development & Manufacturing (CDMO)',
    ],
    highlights: [
      '140+ Formulation Plants exhibiting',
      'Licensing & Tech-Transfer meeting tables',
      'Government Procurement Delegation visits',
    ],
  },
  {
    id: 'machinery',
    name: 'Pharma Machinery & Cleanroom',
    tagline: 'Processing automation, fluid systems & sterile containment',
    hall: 'Hall 4',
    image:
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    description:
      'Showcasing state-of-the-art manufacturing hardware, high-speed rotary presses, continuous granulation lines, HVAC cleanrooms, water-for-injection (WFI) generators, and robotic inspection units.',
    subcategories: [
      'Granulation, Mixing & Tablet Compression Presses',
      'Cleanroom Modular Panels, HEPA Filtration & HVAC',
      'Water Purification, Distillation & Pure Steam Generators',
      'Sterilization Autoclaves & Depyrogenation Tunnels',
      'Liquid Filling & Capping Automated Lines',
      'Analytical Testing & Chromatography Instrumentation',
    ],
    highlights: [
      'Live equipment demonstrations on the show floor',
      'Automation & Industry 4.0 IoT displays',
      'Consultation with cleanroom validation engineers',
    ],
  },
  {
    id: 'packaging',
    name: 'Packaging & Drug Delivery',
    tagline: 'Smart packaging, cold chain logistics & anti-counterfeit tech',
    hall: 'Hall 5',
    image:
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
    description:
      'Focusing on primary and secondary containment that guarantees drug stability, patient compliance, temper-evidence, serialization, and temperature-controlled global cold chain distribution.',
    subcategories: [
      'Pre-filled Syringes, Cartridges & Autoinjectors',
      'Blister Foils (Cold-form Alu-Alu, PVC/PVDC)',
      'Tubular Glass Vials, Ampoules & Rubber Stoppers',
      'Track & Trace 2D Data Matrix Serialization',
      'Thermal Cold-Chain Insulated Shipping Containers',
      'Sustainable & Biodegradable Pharma Packaging',
    ],
    highlights: [
      'Over 90 global packaging innovators',
      'Track-and-trace compliance workshops',
      'Display of smart patient-centric delivery devices',
    ],
  },
];

export default function SectorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = searchParams.get('zone') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterClick = (filterId) => {
    if (filterId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ zone: filterId });
    }
  };

  const filteredSectors = sectorsData.filter((sector) => {
    const matchesFilter = selectedFilter === 'all' || sector.id === selectedFilter;
    const matchesQuery =
      sector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sector.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sector.subcategories.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="tag">Exhibition Directory</span>
          <h1>Focus Areas & Product Zones</h1>
          <p>
            Navigate our specialized exhibition pavilions covering the entire pharmaceutical lifecycle,
            from molecule synthesis to advanced automated packaging.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="container filter-container">
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            All Zones ({sectorsData.length})
          </button>
          {sectorsData.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={`filter-btn ${selectedFilter === sec.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(sec.id)}
            >
              {sec.name}
            </button>
          ))}
        </div>

        <div className="search-input-wrapper">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search categories, equipment, or materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>

      {/* Sectors Detail List */}
      <section className="section py-4">
        <div className="container">
          {filteredSectors.length === 0 ? (
            <div className="empty-state">
              <i className="fa-solid fa-folder-open empty-icon"></i>
              <h3>No matching product zones found</h3>
              <p>Try searching for a different keyword or reset your filter.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSearchQuery('');
                  setSearchParams({});
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="sectors-detail-list">
              {filteredSectors.map((sector) => (
                <div className="sector-detail-card" key={sector.id} id={sector.id}>
                  <div className="sector-detail-media">
                    <img src={sector.image} alt={sector.name} />
                    <span className="hall-badge">
                      <i className="fa-solid fa-location-dot"></i> {sector.hall}
                    </span>
                  </div>

                  <div className="sector-detail-body">
                    <div className="sector-detail-header">
                      <div>
                        <h2>{sector.name}</h2>
                        <span className="sector-tagline">{sector.tagline}</span>
                      </div>
                    </div>

                    <p className="sector-summary">{sector.description}</p>

                    <div className="subcategories-grid">
                      <h4>Core Product Categories:</h4>
                      <ul>
                        {sector.subcategories.map((sub, idx) => (
                          <li key={idx}>
                            <i className="fa-solid fa-check text-primary"></i>
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="sector-highlights">
                      {sector.highlights.map((h, i) => (
                        <div className="highlight-pill" key={i}>
                          <i className="fa-solid fa-circle-dot"></i> {h}
                        </div>
                      ))}
                    </div>

                    <div className="sector-card-actions">
                      <Link
                        to={`/book-stall?sector=${sector.id}`}
                        className="btn btn-primary"
                      >
                        <i className="fa-solid fa-store"></i> Book Stall in {sector.hall}
                      </Link>
                      <Link
                        to={`/register-visitor?sector=${sector.id}`}
                        className="btn btn-outline"
                      >
                        <i className="fa-solid fa-id-card"></i> Visitor Pass for this Zone
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pavilion Distribution Map Banner */}
      <section className="section bg-light-surface">
        <div className="container">
          <div className="expo-map-banner">
            <div className="map-banner-content">
              <span className="tag">Exhibition Layout</span>
              <h2>Pragati Maidan Integrated Floorplan</h2>
              <p>
                Our 20,000 m² exhibition expanse is structured into interconnected thematic halls
                ensuring optimized footfall, smooth visitor transit, and specialized meeting points.
              </p>
              <div className="hall-stats-row">
                <div className="hall-stat">
                  <strong>Hall 1-2</strong>
                  <span>APIs & Ingredients</span>
                </div>
                <div className="hall-stat">
                  <strong>Hall 3</strong>
                  <span>Finished Formulations</span>
                </div>
                <div className="hall-stat">
                  <strong>Hall 4</strong>
                  <span>Machinery & Cleanroom</span>
                </div>
                <div className="hall-stat">
                  <strong>Hall 5</strong>
                  <span>Packaging & Delivery</span>
                </div>
                <div className="hall-stat featured-hall-stat">
                  <strong>Hall 6</strong>
                  <span>Healthcare Facilities & Hospitals</span>
                </div>
              </div>
            </div>
            <div className="map-banner-cta">
              <Link to="/book-stall" className="btn btn-primary">
                View Available Stalls
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
