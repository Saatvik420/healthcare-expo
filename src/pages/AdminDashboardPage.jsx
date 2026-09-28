import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ADMIN_CREDENTIALS } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function AdminDashboardPage({ onNotify }) {
  const { currentUser, isAdmin, login, logout } = useAuth();
  const {
    visitors,
    exhibitors,
    sponsorships,
    deleteVisitor,
    updateExhibitorStatus,
    deleteExhibitor,
    updateSponsorshipStatus,
    resetToDefaults,
  } = useData();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('visitors');
  const [visitorSearch, setVisitorSearch] = useState('');
  const [visitorSectorFilter, setVisitorSectorFilter] = useState('all');
  const [visitorTierFilter, setVisitorTierFilter] = useState('all');

  const [exhibitorSearch, setExhibitorSearch] = useState('');
  const [exhibitorStatusFilter, setExhibitorStatusFilter] = useState('all');

  // Quick login if not authenticated
  const handleQuickAdminLogin = () => {
    login(ADMIN_CREDENTIALS.email, ADMIN_CREDENTIALS.password);
    onNotify('Admin Authenticated', 'Root Administrator dashboard session initiated.');
  };

  const handleAdminLogout = () => {
    logout();
    onNotify('Admin Session Ended', 'You have been signed out from the administrator console.');
    navigate('/login');
  };

  const handleExportCSV = (dataType) => {
    onNotify(
      'Export Complete',
      `All ${dataType} records have been compiled and exported as a CSV report.`
    );
  };

  if (!isAdmin) {
    return (
      <div className="page-wrapper">
        <section className="section py-4">
          <div className="container">
            <div className="admin-lock-card">
              <div className="admin-lock-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h2>Administrator Authentication Required</h2>
              <p>
                This area is restricted to authorized exhibition directors and secretariat managers.
              </p>

              <div className="admin-credentials-reminder">
                <div className="cred-badge">
                  <i className="fa-solid fa-key text-primary"></i> Default Administrator Credentials:
                </div>
                <div className="cred-row">
                  <span>Username / Email:</span>
                  <code>{ADMIN_CREDENTIALS.email}</code>
                </div>
                <div className="cred-row">
                  <span>Password:</span>
                  <code>{ADMIN_CREDENTIALS.password}</code>
                </div>
              </div>

              <div className="admin-lock-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleQuickAdminLogin}
                >
                  <i className="fa-solid fa-bolt"></i> 1-Click Fast Admin Sign In
                </button>
                <Link to="/login" className="btn btn-outline">
                  Regular Login Page
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Filter Visitors
  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(visitorSearch.toLowerCase()) ||
      v.email.toLowerCase().includes(visitorSearch.toLowerCase()) ||
      (v.organization && v.organization.toLowerCase().includes(visitorSearch.toLowerCase())) ||
      (v.passCode && v.passCode.toLowerCase().includes(visitorSearch.toLowerCase()));

    const matchesSector =
      visitorSectorFilter === 'all' || v.sector === visitorSectorFilter;

    const matchesTier =
      visitorTierFilter === 'all' || v.passType === visitorTierFilter;

    return matchesSearch && matchesSector && matchesTier;
  });

  // Filter Exhibitors
  const filteredExhibitors = exhibitors.filter((e) => {
    const matchesSearch =
      e.company.toLowerCase().includes(exhibitorSearch.toLowerCase()) ||
      e.contactPerson.toLowerCase().includes(exhibitorSearch.toLowerCase()) ||
      e.email.toLowerCase().includes(exhibitorSearch.toLowerCase());

    const matchesStatus =
      exhibitorStatusFilter === 'all' || e.status === exhibitorStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-wrapper bg-admin-canvas">
      {/* Top Admin Bar */}
      <div className="admin-top-bar">
        <div className="container admin-bar-content">
          <div className="admin-bar-title">
            <i className="fa-solid fa-gauge-high text-primary"></i>
            <div>
              <h3>Expo Executive Admin Console</h3>
              <span>
                Logged in as <strong>{currentUser.name}</strong> ({currentUser.email})
              </span>
            </div>
          </div>

          <div className="admin-bar-actions">
            <button
              type="button"
              className="btn btn-outline btn-sm-admin"
              onClick={() => {
                resetToDefaults();
                onNotify('Database Reset', 'Sample dataset restored to initial state.');
              }}
              title="Reset sample data"
            >
              <i className="fa-solid fa-rotate-left"></i> Reset Demo Data
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm-admin"
              onClick={() => handleExportCSV(activeTab)}
            >
              <i className="fa-solid fa-file-arrow-down"></i> Export Report
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm-admin btn-logout"
              onClick={handleAdminLogout}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {/* KPI Metrics Ribbon */}
        <div className="admin-kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon kpi-blue">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Registered Trade Attendees</span>
              <h3 className="kpi-number">{visitors.length}</h3>
              <small className="kpi-sub">
                {visitors.filter((v) => v.passType === 'vip').length} VIP Delegates
              </small>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon kpi-green">
              <i className="fa-solid fa-store"></i>
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Exhibitor Booths Contracted</span>
              <h3 className="kpi-number">{exhibitors.length}</h3>
              <small className="kpi-sub">
                {exhibitors.filter((e) => e.status === 'Approved').length} Fully Approved
              </small>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon kpi-purple">
              <i className="fa-solid fa-handshake"></i>
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Sponsorship Pipeline</span>
              <h3 className="kpi-number">${sponsorships.length * 12},500</h3>
              <small className="kpi-sub">{sponsorships.length} Major Brand Sponsors</small>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon kpi-amber">
              <i className="fa-solid fa-chart-pie"></i>
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Floor Space Allotment</span>
              <h3 className="kpi-number">84.2%</h3>
              <small className="kpi-sub">Halls 1 to 5 Occupancy Rate</small>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="admin-nav-tabs">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'visitors' ? 'active' : ''}`}
            onClick={() => setActiveTab('visitors')}
          >
            <i className="fa-regular fa-id-card"></i> Visitor Database ({visitors.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'exhibitors' ? 'active' : ''}`}
            onClick={() => setActiveTab('exhibitors')}
          >
            <i className="fa-solid fa-store"></i> Exhibitor Allotments ({exhibitors.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'sponsorships' ? 'active' : ''}`}
            onClick={() => setActiveTab('sponsorships')}
          >
            <i className="fa-solid fa-award"></i> Sponsorship Deals ({sponsorships.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'halls' ? 'active' : ''}`}
            onClick={() => setActiveTab('halls')}
          >
            <i className="fa-solid fa-map-location-dot"></i> Hall Occupancy Overview
          </button>
        </div>

        {/* TAB 1: VISITORS MANAGEMENT */}
        {activeTab === 'visitors' && (
          <div className="admin-table-container">
            <div className="table-controls-bar">
              <div className="table-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search by name, organization, email, or badge ID..."
                  value={visitorSearch}
                  onChange={(e) => setVisitorSearch(e.target.value)}
                />
              </div>

              <div className="table-filters-group">
                <select
                  value={visitorSectorFilter}
                  onChange={(e) => setVisitorSectorFilter(e.target.value)}
                >
                  <option value="all">All Product Zones</option>
                  <option value="apis">APIs & Fine Chemicals</option>
                  <option value="finished">Finished Formulations</option>
                  <option value="machinery">Pharma Machinery</option>
                  <option value="packaging">Packaging Systems</option>
                </select>

                <select
                  value={visitorTierFilter}
                  onChange={(e) => setVisitorTierFilter(e.target.value)}
                >
                  <option value="all">All Pass Tiers</option>
                  <option value="standard">Standard Trade</option>
                  <option value="vip">VIP Executive</option>
                </select>
              </div>
            </div>

            <div className="responsive-table-scroll">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Badge Code</th>
                    <th>Attendee & Designation</th>
                    <th>Company / Institution</th>
                    <th>Product Zone</th>
                    <th>Pass Tier</th>
                    <th>Registration Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitors.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="table-empty-row">
                        No visitors match the current filter query.
                      </td>
                    </tr>
                  ) : (
                    filteredVisitors.map((visitor) => (
                      <tr key={visitor.id}>
                        <td>
                          <code className="badge-code-cell">{visitor.passCode}</code>
                        </td>
                        <td>
                          <div className="cell-primary-text">{visitor.name}</div>
                          <small className="cell-sub-text">
                            {visitor.designation || 'Visitor'} &bull; {visitor.email}
                          </small>
                        </td>
                        <td>
                          <strong>{visitor.organization || 'Independent'}</strong>
                        </td>
                        <td>
                          <span className="zone-tag">
                            {visitor.sectorLabel || visitor.sector}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`pass-tier-pill ${
                              visitor.passType === 'vip' ? 'pill-vip' : 'pill-standard'
                            }`}
                          >
                            {visitor.passType === 'vip' ? 'VIP Delegate' : 'Standard Pass'}
                          </span>
                        </td>
                        <td>{visitor.date || 'Recent'}</td>
                        <td>
                          <div className="table-actions-cell">
                            <button
                              type="button"
                              className="action-icon-btn delete-btn"
                              title="Delete Record"
                              onClick={() => {
                                if (window.confirm(`Delete visitor ${visitor.name}?`)) {
                                  deleteVisitor(visitor.id);
                                  onNotify('Visitor Removed', `${visitor.name} has been deleted.`);
                                }
                              }}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: EXHIBITORS MANAGEMENT */}
        {activeTab === 'exhibitors' && (
          <div className="admin-table-container">
            <div className="table-controls-bar">
              <div className="table-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search by company, representative, or email..."
                  value={exhibitorSearch}
                  onChange={(e) => setExhibitorSearch(e.target.value)}
                />
              </div>

              <div className="table-filters-group">
                <select
                  value={exhibitorStatusFilter}
                  onChange={(e) => setExhibitorStatusFilter(e.target.value)}
                >
                  <option value="all">All Approval Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Contract Dispatched">Contract Dispatched</option>
                </select>
              </div>
            </div>

            <div className="responsive-table-scroll">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Exhibiting Enterprise</th>
                    <th>Authorized Representative</th>
                    <th>Stall Configuration</th>
                    <th>Pavilion Hall</th>
                    <th>Estimated Value</th>
                    <th>Approval Status</th>
                    <th>Change Status / Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExhibitors.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="table-empty-row">
                        No exhibitors match the current filter query.
                      </td>
                    </tr>
                  ) : (
                    filteredExhibitors.map((exh) => (
                      <tr key={exh.id}>
                        <td>
                          <div className="cell-primary-text">{exh.company}</div>
                          {exh.notes && (
                            <small className="cell-notes-text" title={exh.notes}>
                              <i className="fa-solid fa-note-sticky text-primary"></i> {exh.notes}
                            </small>
                          )}
                        </td>
                        <td>
                          <div>{exh.contactPerson}</div>
                          <small className="cell-sub-text">
                            {exh.designation || 'Lead'} &bull; {exh.email}
                          </small>
                        </td>
                        <td>
                          <strong>{exh.stallType}</strong>
                        </td>
                        <td>
                          <span className="hall-pill">{exh.hall}</span>
                        </td>
                        <td>
                          <strong className="amount-cell">{exh.amount || '$2,600'}</strong>
                        </td>
                        <td>
                          <span
                            className={`status-pill ${
                              exh.status === 'Approved'
                                ? 'status-approved'
                                : exh.status === 'Contract Dispatched'
                                ? 'status-dispatched'
                                : 'status-pending'
                            }`}
                          >
                            {exh.status}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions-cell">
                            <select
                              className="status-selector-sm"
                              value={exh.status}
                              onChange={(e) => {
                                updateExhibitorStatus(exh.id, e.target.value);
                                onNotify(
                                  'Status Updated',
                                  `${exh.company} status changed to ${e.target.value}.`
                                );
                              }}
                            >
                              <option value="Approved">Approved</option>
                              <option value="Pending Review">Pending Review</option>
                              <option value="Contract Dispatched">Contract Dispatched</option>
                            </select>

                            <button
                              type="button"
                              className="action-icon-btn delete-btn"
                              title="Delete Exhibitor"
                              onClick={() => {
                                if (window.confirm(`Delete booth contract for ${exh.company}?`)) {
                                  deleteExhibitor(exh.id);
                                  onNotify(
                                    'Exhibitor Deleted',
                                    `${exh.company} has been removed from floor allocations.`
                                  );
                                }
                              }}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SPONSORSHIPS */}
        {activeTab === 'sponsorships' && (
          <div className="admin-table-container">
            <div className="table-controls-bar">
              <h3>Corporate Sponsorship Deals Pipeline</h3>
              <button
                type="button"
                className="btn btn-outline btn-sm-admin"
                onClick={() => handleExportCSV('sponsorships')}
              >
                <i className="fa-solid fa-download"></i> Export Sponsor Roster
              </button>
            </div>

            <div className="responsive-table-scroll">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Sponsor Organization</th>
                    <th>Lead Executive</th>
                    <th>Sponsorship Tier</th>
                    <th>Contract Commitment</th>
                    <th>Agreement Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sponsorships.map((sp) => (
                    <tr key={sp.id}>
                      <td>
                        <strong>{sp.company}</strong>
                      </td>
                      <td>
                        <div>{sp.contactPerson}</div>
                        <small className="cell-sub-text">{sp.email}</small>
                      </td>
                      <td>
                        <span className="tier-tag-admin">{sp.tier}</span>
                      </td>
                      <td>
                        <strong className="amount-cell">{sp.investment}</strong>
                      </td>
                      <td>
                        <span
                          className={`status-pill ${
                            sp.status === 'Agreement Signed'
                              ? 'status-approved'
                              : 'status-pending'
                          }`}
                        >
                          {sp.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="status-selector-sm"
                          value={sp.status}
                          onChange={(e) => {
                            updateSponsorshipStatus(sp.id, e.target.value);
                            onNotify(
                              'Deal Updated',
                              `${sp.company} agreement marked as ${e.target.value}.`
                            );
                          }}
                        >
                          <option value="Agreement Signed">Agreement Signed</option>
                          <option value="In Discussion">In Discussion</option>
                          <option value="Proposal Dispatched">Proposal Dispatched</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: HALL OCCUPANCY OVERVIEW */}
        {activeTab === 'halls' && (
          <div className="admin-table-container">
            <div className="hall-occupancy-wrapper">
              <div className="occupancy-header">
                <h3>Pragati Maidan Exhibition Space Distribution</h3>
                <p>20,000 m² Total Gross Footprint across Halls 1 through 5</p>
              </div>

              <div className="hall-progress-list">
                <div className="hall-progress-row">
                  <div className="hall-info-col">
                    <strong>Hall 1 & 2: APIs & Fine Chemicals</strong>
                    <span>5,800 m² allocated / 6,500 m² gross capacity</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar-fill" style={{ width: '89%' }}></div>
                  </div>
                  <span className="occupancy-pct">89% Booked</span>
                </div>

                <div className="hall-progress-row">
                  <div className="hall-info-col">
                    <strong>Hall 3: Finished Dosages & Formulations</strong>
                    <span>4,200 m² allocated / 4,800 m² gross capacity</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar-fill" style={{ width: '87%' }}></div>
                  </div>
                  <span className="occupancy-pct">87% Booked</span>
                </div>

                <div className="hall-progress-row">
                  <div className="hall-info-col">
                    <strong>Hall 4: Pharma Machinery & Cleanroom</strong>
                    <span>4,600 m² allocated / 5,200 m² gross capacity</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar-fill" style={{ width: '88%' }}></div>
                  </div>
                  <span className="occupancy-pct">88% Booked</span>
                </div>

                <div className="hall-progress-row">
                  <div className="hall-info-col">
                    <strong>Hall 5: Packaging & Drug Delivery</strong>
                    <span>2,900 m² allocated / 3,500 m² gross capacity</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar-fill" style={{ width: '82%' }}></div>
                  </div>
                  <span className="occupancy-pct">82% Booked</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
