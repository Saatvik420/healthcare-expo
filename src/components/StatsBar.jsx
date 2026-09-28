export default function StatsBar() {
  const stats = [
    { value: '600+', label: 'Exhibiting Brands' },
    { value: '25,000+', label: 'Trade Attendees' },
    { value: '45+', label: 'Global Delegations' },
    { value: '20,000 m²', label: 'Exhibition Floor' },
  ];

  return (
    <div className="container stats-bar-wrapper">
      <div className="stats-bar">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
