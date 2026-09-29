const sectorsList = [
  {
    id: 'pharmaceuticals',
    title: 'Pharmaceuticals',
    icon: 'fa-solid fa-pills',
    desc: 'Generic medications, branded ethical drugs, specialty therapeutics, and essential global medicines.',
  },
  {
    id: 'apis',
    title: 'API & Fine Chemicals',
    icon: 'fa-solid fa-flask-vial',
    desc: 'Active pharmaceutical ingredients, organic intermediates, peptides, and chemical building blocks.',
  },
  {
    id: 'medical-devices',
    title: 'Medical Devices',
    icon: 'fa-solid fa-stethoscope',
    desc: 'Diagnostic monitors, cardiovascular systems, orthopedic implants, and patient care instruments.',
  },
  {
    id: 'surgical-equipment',
    title: 'Surgical Equipments',
    icon: 'fa-solid fa-syringe',
    desc: 'Minimally invasive instruments, laparoscopic towers, electro-surgical tools, and sterile disposables.',
  },
  {
    id: 'health-tech',
    title: 'Health-tech & AI',
    icon: 'fa-solid fa-robot',
    desc: 'Artificial intelligence diagnostics, predictive care algorithms, clinical automation, and IoT health.',
  },
  {
    id: 'hospital-solutions',
    title: 'Hospital Solutions',
    icon: 'fa-solid fa-hospital',
    desc: 'Turnkey hospital furniture, medical gas pipelines, sterilization autoclaves, and patient handling.',
  },
];

export default function WhoShouldExhibitSection() {
  return (
    <section className="section bg-light-surface" id="who-should-exhibit">
      <div className="container">
        <div className="section-header">
          <span className="tag">
            <i className="fa-solid fa-layer-group"></i> Key Exhibition Sectors
          </span>
          <h2>Who Should Exhibit?</h2>
          <p className="section-subtitle-lead">
            The Expo welcomes participation from across key healthcare, pharmaceutical, medical technology,
            and hospital solutions sectors looking to access Thailand, ASEAN, and international markets.
          </p>
        </div>

        {/* 6 Core Sectors Grid */}
        <div className="who-exhibit-grid">
          {sectorsList.map((sector) => (
            <div className="who-exhibit-card" key={sector.id}>
              <div className="who-card-icon">
                <i className={sector.icon}></i>
              </div>
              <div className="who-card-content">
                <h3>{sector.title}</h3>
                <p style={{ marginBottom: 0 }}>{sector.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
