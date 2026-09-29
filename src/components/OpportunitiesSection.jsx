export default function OpportunitiesSection() {
  const opportunities = [
    {
      number: '01',
      icon: 'fa-solid fa-earth-americas',
      title: 'Export & Import Opportunities',
      desc: 'Explore lucrative export and import opportunities across Thailand, ASEAN, and fast-growing international healthcare markets.',
    },
    {
      number: '02',
      icon: 'fa-solid fa-users-viewfinder',
      title: 'Connect with Key Buyers',
      desc: 'Engage directly with importers, distributors, agents, wholesalers, and institutional buyers actively seeking healthcare products and solutions.',
    },
    {
      number: '03',
      icon: 'fa-solid fa-map-location-dot',
      title: 'Distribution & Market-Entry Partners',
      desc: 'Identify vetted distribution partners and market-entry allies for accelerated territorial expansion across Southeast Asia.',
    },
    {
      number: '04',
      icon: 'fa-solid fa-bullhorn',
      title: 'Showcase Products & Innovations',
      desc: 'Showcase pharmaceutical formulations, medical technologies, surgical solutions, and clinical innovations directly to an international audience.',
    },
    {
      number: '05',
      icon: 'fa-solid fa-handshake',
      title: 'B2B Alliances & Joint Ventures',
      desc: 'Develop high-value B2B partnerships, corporate joint ventures, strategic international alliances, and technology collaborations.',
    },
    {
      number: '06',
      icon: 'fa-solid fa-industry',
      title: 'Contract Manufacturing & Sourcing',
      desc: 'Explore high-margin opportunities for contract manufacturing (CDMO), technology licensing, private labelling, and global sourcing partnerships.',
    },
    {
      number: '07',
      icon: 'fa-solid fa-chart-line-up',
      title: 'Generate International Business Leads',
      desc: 'Generate targeted, pre-qualified business leads and build long-term relationships with prospective international clients and institutional buyers.',
    },
    {
      number: '08',
      icon: 'fa-solid fa-microchip',
      title: 'Market Requirements & Localisation',
      desc: 'Understand emerging healthcare-market demands, regional regulatory standards, and identify concrete avenues for product localisation.',
    },
    {
      number: '09',
      icon: 'fa-solid fa-bridge-water',
      title: 'India–ASEAN Commercial Bridges',
      desc: 'Build resilient, long-lasting commercial connections between Indian, ASEAN, and global healthcare enterprises and trade bodies.',
    },
    {
      number: '10',
      icon: 'fa-solid fa-award',
      title: 'Long-Term Brand Positioning',
      desc: 'Position your brand as a recognized market leader for sustainable international growth and regional healthcare market leadership.',
    },
  ];

  return (
    <section className="section bg-white" id="opportunities">
      <div className="container">
        <div className="section-header">
          <span className="tag">
            <i className="fa-solid fa-briefcase"></i> Commercial Advantage
          </span>
          <h2>Turn Exhibition Participation into Business Opportunities</h2>
          <p className="section-subtitle-lead">
            The Global Healthcare Expo 2027 brings together pharmaceutical companies, healthcare manufacturers, importers,
            exporters, distributors, wholesalers, hospitals, healthcare institutions, investors, procurement professionals,
            and government &amp; industry representatives under one dynamic platform.
          </p>
        </div>

        {/* 10 Opportunities Grid */}
        <div className="opportunities-grid">
          {opportunities.map((item, idx) => (
            <div className="opportunity-card" key={idx}>
              <div className="opportunity-card-top">
                <span className="opp-number">{item.number}</span>
                <div className="opp-icon-box">
                  <i className={item.icon}></i>
                </div>
              </div>
              <h3 className="opp-title">{item.title}</h3>
              <p className="opp-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
