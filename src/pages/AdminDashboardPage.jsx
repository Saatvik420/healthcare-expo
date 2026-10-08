import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ADMIN_CREDENTIALS } from '../context/AuthContext';
import { useData } from '../context/DataContext';

import VisitorDetailModal from '../components/admin/VisitorDetailModal';
import ExhibitorDetailModal from '../components/admin/ExhibitorDetailModal';
import AddVisitorModal from '../components/admin/AddVisitorModal';
import AddExhibitorModal from '../components/admin/AddExhibitorModal';
import InquiryDetailModal from '../components/admin/InquiryDetailModal';

export default function AdminDashboardPage({ onNotify }) {
  const { currentUser, isAdmin, login, logout } = useAuth();
  const {
    visitors,
    exhibitors,
    sponsorships,
    inquiries = [],
    backendStatus,
    refreshData,
    addVisitor,
    updateVisitor,
    deleteVisitor,
    addExhibitor,
    updateExhibitorStatus,
    deleteExhibitor,
    updateSponsorshipStatus,
    deleteInquiry,
    resetToDefaults,
  } = useData();

  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState('visitors');

  // Search & Filters for Visitors
  const [visitorSearch, setVisitorSearch] = useState('');
  const [visitorSectorFilter, setVisitorSectorFilter] = useState('all');
  const [visitorTierFilter, setVisitorTierFilter] = useState('all');
  const [visitorStatusFilter, setVisitorStatusFilter] = useState('all');

  // Search & Filters for Exhibitors
  const [exhibitorSearch, setExhibitorSearch] = useState('');
  const [exhibitorStatusFilter, setExhibitorStatusFilter] = useState('all');

  // Modals state
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [selectedExhibitor, setSelectedExhibitor] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isAddVisitorOpen, setIsAddVisitorOpen] = useState(false);
  const [isAddExhibitorOpen, setIsAddExhibitorOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Quick admin demo login
  const handleQuickAdminLogin = async () => {
    await login(ADMIN_CREDENTIALS.email, ADMIN_CREDENTIALS.password);
    onNotify('Admin Authenticated', 'Root Administrator dashboard session initiated.');
  };

  const handleAdminLogout = () => {
    logout();
    onNotify('Admin Session Ended', 'You have signed out from the administrator console.');
    navigate('/login');
  };

  const handleSyncBackend = async () => {
    setIsRefreshing(true);
    const success = await refreshData();
    setIsRefreshing(false);
    if (success) {
      onNotify('Live Sync Complete', 'All records refreshed from the central database.');
    } else {
      onNotify('Offline Mode', 'Server unreachable. Running on persistent local storage cache.');
    }
  };

  // Real CSV File Export
  const handleExportCSV = (dataType) => {
    let csvContent;
    let fileName = `ghe_${dataType}_report_${Date.now()}.csv`;

    if (dataType === 'visitors') {
      const headers = ['Badge Code', 'Full Name', 'Email', 'Phone', 'Organization', 'Designation', 'Country', 'Sector', 'Pass Tier', 'Status', 'Date'];
      const rows = visitors.map((v) => [
        `"${v.passCode || v.id}"`,
        `"${v.name || ''}"`,
        `"${v.email || ''}"`,
        `"${v.phone || ''}"`,
        `"${v.organization || ''}"`,
        `"${v.designation || ''}"`,
        `"${v.country || 'India'}"`,
        `"${v.sectorLabel || v.sector || ''}"`,
        `"${v.passType || 'standard'}"`,
        `"${v.status || 'Confirmed'}"`,
        `"${v.date || ''}"`,
      ]);
      csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    } else if (dataType === 'exhibitors') {
      const headers = ['Company', 'Contact Person', 'Email', 'Phone', 'Designation', 'Stall Format', 'Hall', 'Commercial Amount', 'Status', 'Booking Date', 'Notes'];
      const rows = exhibitors.map((e) => [
        `"${e.company || ''}"`,
        `"${e.contactPerson || ''}"`,
        `"${e.email || ''}"`,
        `"${e.phone || ''}"`,
        `"${e.designation || ''}"`,
        `"${e.stallType || ''}"`,
        `"${e.hall || ''}"`,
        `"${e.amount || ''}"`,
        `"${e.status || ''}"`,
        `"${e.bookingDate || ''}"`,
        `"${(e.notes || '').replace(/"/g, '""')}"`,
      ]);
      csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    } else if (dataType === 'sponsorships') {
      const headers = ['Company', 'Contact Person', 'Email', 'Phone', 'Sponsorship Tier', 'Investment', 'Status', 'Date'];
      const rows = sponsorships.map((s) => [
        `"${s.company || ''}"`,
        `"${s.contactPerson || ''}"`,
        `"${s.email || ''}"`,
        `"${s.phone || ''}"`,
        `"${s.tier || ''}"`,
        `"${s.investment || ''}"`,
        `"${s.status || ''}"`,
        `"${s.date || ''}"`,
      ]);
      csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    } else if (dataType === 'inquiries') {
      const headers = ['Sender Name', 'Email', 'Phone', 'Organization', 'Inquiry Type', 'Subject', 'Date', 'Message'];
      const rows = inquiries.map((i) => [
        `"${i.name || ''}"`,
        `"${i.email || ''}"`,
        `"${i.phone || ''}"`,
        `"${i.organization || ''}"`,
        `"${i.inquiryType || ''}"`,
        `"${i.subject || ''}"`,
        `"${i.date || ''}"`,
        `"${(i.message || '').replace(/"/g, '""')}"`,
      ]);
      csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    } else {
      onNotify('Export Info', `Summary data compiled for ${dataType}.`);
      return;
    }

    // Trigger browser file download
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onNotify('Export Downloaded', `${fileName} has been generated and downloaded.`);
  };

  // Lock Screen if not Admin
  if (!isAdmin) {
    return (
      <div className="page-wrapper bg-admin-canvas">
        <section className="section py-4">
          <div className="container">
            <div className="admin-lock-card">
              <div className="admin-lock-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h2>Exhibition Secretariat Console</h2>
              <p>
                Authorized access for Exhibition Directors, Secretariat Officers, and Registration Desk Managers.
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
                  className="btn btn-primary btn-lg"
                  onClick={handleQuickAdminLogin}
                >
                  <i className="fa-solid fa-bolt"></i> 1-Click Instant Admin Access
                </button>
                <Link to="/login" className="btn btn-outline">
                  <i className="fa-solid fa-arrow-right-to-bracket"></i> Standard Login Screen
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
    const q = visitorSearch.toLowerCase();
    const matchesSearch =
      (v.name && v.name.toLowerCase().includes(q)) ||
      (v.email && v.email.toLowerCase().includes(q)) ||
      (v.organization && v.organization.toLowerCase().includes(q)) ||
      (v.phone && v.phone.toLowerCase().includes(q)) ||
      (v.passCode && v.passCode.toLowerCase().includes(q));

    const matchesSector = visitorSectorFilter === 'all' || v.sector === visitorSectorFilter;
    const matchesTier = visitorTierFilter === 'all' || v.passType === visitorTierFilter;
    const matchesStatus = visitorStatusFilter === 'all' || v.status === visitorStatusFilter;

    return matchesSearch && matchesSector && matchesTier && matchesStatus;
  });

  // Filter Exhibitors
  const filteredExhibitors = exhibitors.filter((e) => {
    const q = exhibitorSearch.toLowerCase();
    const matchesSearch =
      (e.company && e.company.toLowerCase().includes(q)) ||
      (e.contactPerson && e.contactPerson.toLowerCase().includes(q)) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      (e.hall && e.hall.toLowerCase().includes(q));

    const matchesStatus =
      exhibitorStatusFilter === 'all' || e.status === exhibitorStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-wrapper bg-admin-canvas">
      {/* Top Admin Executive Bar */}
      <div className="admin-top-bar">
        <div className="container admin-bar-content">
          <div className="admin-bar-title">
            <i className="fa-solid fa-gauge-high text-primary"></i>
            <div>
              <h3>Expo Executive Admin Console</h3>
              <div className="admin-bar-meta">
                <span>
                  Director: <strong>{currentUser.name}</strong> ({currentUser.email})
                </span>
                <span className="meta-separator">&bull;</span>
                <span
                  className={`backend-status-pill ${
                    backendStatus.isOnline ? 'online' : 'offline'
                  }`}
                  title={
                    backendStatus.isOnline
                      ? 'Live connection to central database API'
                      : 'Running on browser persistent storage'
                  }
                >
                  <span className="status-indicator-dot"></span>
                  {backendStatus.isOnline ? 'Backend API (Live)' : 'Local Storage Mode'}
                </span>
              </div>
            </div>
          </div>

          <div className="admin-bar-actions">
            <button
              type="button"
              className="btn btn-outline btn-sm-admin"
              onClick={handleSyncBackend}
              title="Sync with central backend database"
              disabled={isRefreshing}
            >
              <i className={`fa-solid fa-arrows-rotate ${isRefreshing ? 'fa-spin' : ''}`}></i>{' '}
              Sync Data
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm-admin"
              onClick={() => {
                resetToDefaults();
                onNotify('Database Reset', 'Sample dataset restored to initial state.');
              }}
              title="Reset sample data"
            >
              <i className="fa-solid fa-rotate-left"></i> Reset Demo
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm-admin"
              onClick={() => handleExportCSV(activeTab)}
              title="Download CSV report of current tab"
            >
              <i className="fa-solid fa-file-arrow-down"></i> Export CSV
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
          <div className="kpi-card" onClick={() => setActiveTab('visitors')} style={{ cursor: 'pointer' }}>
            <div className="kpi-icon kpi-blue">
              <i className="fa-solid fa-users"></i>
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Registered Trade Attendees</span>
              <h3 className="kpi-number">{visitors.length}</h3>
              <small className="kpi-sub">
                {visitors.filter((v) => v.passType === 'vip').length} VIP Delegates &bull;{' '}
                {visitors.filter((v) => v.status === 'Checked-in').length} Checked-In
              </small>
            </div>
          </div>

          <div className="kpi-card" onClick={() => setActiveTab('exhibitors')} style={{ cursor: 'pointer' }}>
            <div className="kpi-icon kpi-green">
              <i className="fa-solid fa-store"></i>
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Exhibitor Booths Allotted</span>
              <h3 className="kpi-number">{exhibitors.length}</h3>
              <small className="kpi-sub">
                {exhibitors.filter((e) => e.status === 'Approved').length} Fully Approved
              </small>
            </div>
          </div>

          <div className="kpi-card" onClick={() => setActiveTab('sponsorships')} style={{ cursor: 'pointer' }}>
            <div className="kpi-icon kpi-purple">
              <i className="fa-solid fa-handshake"></i>
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Sponsorship Pipeline</span>
              <h3 className="kpi-number">
                ${sponsorships.length * 12},500
              </h3>
              <small className="kpi-sub">{sponsorships.length} Brand Partners</small>
            </div>
          </div>

          <div className="kpi-card" onClick={() => setActiveTab('inquiries')} style={{ cursor: 'pointer' }}>
            <div className="kpi-icon kpi-amber">
              <i className="fa-solid fa-envelope-open-text"></i>
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Desk Inquiries</span>
              <h3 className="kpi-number">{inquiries.length}</h3>
              <small className="kpi-sub">Public Conference Inquiries</small>
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
            className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <i className="fa-solid fa-headset"></i> Contact Inquiries ({inquiries.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'halls' ? 'active' : ''}`}
            onClick={() => setActiveTab('halls')}
          >
            <i className="fa-solid fa-map-location-dot"></i> Hall Occupancy Overview
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: VISITORS MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === 'visitors' && (
          <div className="admin-table-container">
            <div className="table-controls-bar">
              <div className="table-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search by name, company, email, phone, badge ID..."
                  value={visitorSearch}
                  onChange={(e) => setVisitorSearch(e.target.value)}
                />
              </div>

              <div className="table-filters-group">
                <select
                  value={visitorSectorFilter}
                  onChange={(e) => setVisitorSectorFilter(e.target.value)}
                >
                  <option value="all">All Sectors</option>
                  <option value="apis">APIs & Fine Chemicals</option>
                  <option value="finished">Finished Formulations</option>
                  <option value="machinery">Pharma Machinery</option>
                  <option value="packaging">Packaging Systems</option>
                  <option value="devices">Medical Devices</option>
                </select>

                <select
                  value={visitorTierFilter}
                  onChange={(e) => setVisitorTierFilter(e.target.value)}
                >
                  <option value="all">All Tiers</option>
                  <option value="standard">Standard Pass</option>
                  <option value="vip">VIP Delegate</option>
                </select>

                <select
                  value={visitorStatusFilter}
                  onChange={(e) => setVisitorStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Checked-in">Checked-In</option>
                </select>

                <button
                  type="button"
                  className="btn btn-primary btn-sm-table"
                  onClick={() => setIsAddVisitorOpen(true)}
                >
                  <i className="fa-solid fa-user-plus"></i> + Register Attendee
                </button>
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
                    <th>Check-in Status</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitors.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="table-empty-row">
                        No attendees match your search query.
                      </td>
                    </tr>
                  ) : (
                    filteredVisitors.map((visitor) => (
                      <tr key={visitor.id}>
                        <td>
                          <code className="badge-code-cell">{visitor.passCode || visitor.id}</code>
                        </td>
                        <td>
                          <div className="cell-primary-text">{visitor.name}</div>
                          <small className="cell-sub-text">
                            {visitor.designation || 'Trade Delegate'} &bull; {visitor.email}
                          </small>
                        </td>
                        <td>
                          <strong>{visitor.organization || 'Independent'}</strong>
                          {visitor.country && (
                            <small className="cell-sub-country">
                              <i className="fa-solid fa-location-dot"></i> {visitor.country}
                            </small>
                          )}
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
                            {visitor.passType === 'vip' ? 'VIP Delegate' : 'Standard'}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`status-pill ${
                              visitor.status === 'Checked-in'
                                ? 'status-approved'
                                : 'status-pending'
                            }`}
                          >
                            <i
                              className={`fa-solid ${
                                visitor.status === 'Checked-in'
                                  ? 'fa-circle-check'
                                  : 'fa-circle-dot'
                              }`}
                            ></i>{' '}
                            {visitor.status || 'Confirmed'}
                          </span>
                        </td>
                        <td>{visitor.date || 'Recent'}</td>
                        <td>
                          <div className="table-actions-cell" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="btn btn-outline btn-xs-action view-btn"
                              title="View Full Profile & Badge"
                              onClick={() => setSelectedVisitor(visitor)}
                            >
                              <i className="fa-solid fa-eye"></i> Details
                            </button>
                            <button
                              type="button"
                              className="action-icon-btn delete-btn"
                              title="Delete Attendee"
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

        {/* ============================================================== */}
        {/* TAB 2: EXHIBITORS MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === 'exhibitors' && (
          <div className="admin-table-container">
            <div className="table-controls-bar">
              <div className="table-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search by company, representative, email, hall..."
                  value={exhibitorSearch}
                  onChange={(e) => setExhibitorSearch(e.target.value)}
                />
              </div>

              <div className="table-filters-group">
                <select
                  value={exhibitorStatusFilter}
                  onChange={(e) => setExhibitorStatusFilter(e.target.value)}
                >
                  <option value="all">All Approval States</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Contract Dispatched">Contract Dispatched</option>
                </select>

                <button
                  type="button"
                  className="btn btn-primary btn-sm-table"
                  onClick={() => setIsAddExhibitorOpen(true)}
                >
                  <i className="fa-solid fa-plus"></i> + Add Exhibitor
                </button>
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
                    <th>Tariff</th>
                    <th>Approval Status</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
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
                          {exh.website && (
                            <small className="cell-sub-text">
                              <a
                                href={exh.website.startsWith('http') ? exh.website : `https://${exh.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cell-website-link"
                              >
                                <i className="fa-solid fa-arrow-up-right-from-square"></i> {exh.website}
                              </a>
                            </small>
                          )}
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
                          <div className="table-actions-cell" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="btn btn-outline btn-xs-action view-btn"
                              title="View Full Contract & Specs"
                              onClick={() => setSelectedExhibitor(exh)}
                            >
                              <i className="fa-solid fa-eye"></i> Details
                            </button>
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

        {/* ============================================================== */}
        {/* TAB 3: SPONSORSHIPS */}
        {/* ============================================================== */}
        {activeTab === 'sponsorships' && (
          <div className="admin-table-container">
            <div className="table-controls-bar">
              <div>
                <h3>Corporate Brand Sponsorship Deals</h3>
                <span className="text-muted">Partnership commitments across exhibition zones</span>
              </div>
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

        {/* ============================================================== */}
        {/* TAB 4: CONTACT DESK INQUIRIES */}
        {/* ============================================================== */}
        {activeTab === 'inquiries' && (
          <div className="admin-table-container">
            <div className="table-controls-bar">
              <div>
                <h3>Public Contact Desk Messages</h3>
                <span className="text-muted">Inquiries received via the online Contact Helpdesk</span>
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm-admin"
                onClick={() => handleExportCSV('inquiries')}
              >
                <i className="fa-solid fa-download"></i> Export Inquiries
              </button>
            </div>

            <div className="responsive-table-scroll">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Sender Name</th>
                    <th>Organization / Affiliation</th>
                    <th>Inquiry Category</th>
                    <th>Subject / Message Preview</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="table-empty-row">
                        No contact desk messages in the database.
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td>
                          <div className="cell-primary-text">{inq.name}</div>
                          <small className="cell-sub-text">{inq.email}</small>
                        </td>
                        <td>
                          <strong>{inq.organization || 'Individual'}</strong>
                        </td>
                        <td>
                          <span className="zone-tag">
                            {inq.inquiryType ? inq.inquiryType.toUpperCase() : 'GENERAL'}
                          </span>
                        </td>
                        <td>
                          <div className="cell-primary-text">{inq.subject || 'Exhibition Inquiry'}</div>
                          <small className="cell-notes-text">{inq.message}</small>
                        </td>
                        <td>{inq.date || 'Recent'}</td>
                        <td>
                          <div className="table-actions-cell" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="btn btn-outline btn-xs-action view-btn"
                              title="Read Message & Reply"
                              onClick={() => setSelectedInquiry(inq)}
                            >
                              <i className="fa-solid fa-envelope-open"></i> Read
                            </button>
                            <button
                              type="button"
                              className="action-icon-btn delete-btn"
                              title="Delete Inquiry"
                              onClick={() => {
                                if (window.confirm('Delete this inquiry message?')) {
                                  deleteInquiry(inq.id);
                                  onNotify('Inquiry Deleted', 'The contact inquiry was removed.');
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

        {/* ============================================================== */}
        {/* TAB 5: HALL OCCUPANCY OVERVIEW */}
        {/* ============================================================== */}
        {activeTab === 'halls' && (
          <div className="admin-table-container">
            <div className="hall-occupancy-wrapper">
              <div className="occupancy-header">
                <h3>Bangkok International Trade Exhibition Centre</h3>
                <p>20,000 m² Gross Footprint across Halls 1 through 5 &bull; India–ASEAN Global Confluence 2027</p>
              </div>

              <div className="hall-progress-list">
                <div className="hall-progress-row">
                  <div className="hall-info-col">
                    <strong>Hall 1 & 2: APIs & Fine Chemicals Pavilion</strong>
                    <span>5,800 m² allocated / 6,500 m² gross capacity</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar-fill" style={{ width: '89%' }}></div>
                  </div>
                  <span className="occupancy-pct">89% Booked</span>
                </div>

                <div className="hall-progress-row">
                  <div className="hall-info-col">
                    <strong>Hall 3: Finished Formulations & Generics</strong>
                    <span>4,200 m² allocated / 4,800 m² gross capacity</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar-fill" style={{ width: '87%' }}></div>
                  </div>
                  <span className="occupancy-pct">87% Booked</span>
                </div>

                <div className="hall-progress-row">
                  <div className="hall-info-col">
                    <strong>Hall 4: Pharma Machinery, Cleanroom & Cold Chain</strong>
                    <span>4,600 m² allocated / 5,200 m² gross capacity</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar-fill" style={{ width: '88%' }}></div>
                  </div>
                  <span className="occupancy-pct">88% Booked</span>
                </div>

                <div className="hall-progress-row">
                  <div className="hall-info-col">
                    <strong>Hall 5: Medical Devices & Packaging Systems</strong>
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

      {/* MODALS */}
      {selectedVisitor && (
        <VisitorDetailModal
          visitor={selectedVisitor}
          onClose={() => setSelectedVisitor(null)}
          onUpdateStatus={(id, updateData) => updateVisitor(id, updateData)}
          onDelete={(id) => deleteVisitor(id)}
          onNotify={onNotify}
        />
      )}

      {selectedExhibitor && (
        <ExhibitorDetailModal
          exhibitor={selectedExhibitor}
          onClose={() => setSelectedExhibitor(null)}
          onUpdateStatus={(id, status) => updateExhibitorStatus(id, status)}
          onDelete={(id) => deleteExhibitor(id)}
          onNotify={onNotify}
        />
      )}

      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onDelete={(id) => deleteInquiry(id)}
          onNotify={onNotify}
        />
      )}

      {isAddVisitorOpen && (
        <AddVisitorModal
          onClose={() => setIsAddVisitorOpen(false)}
          onAdd={addVisitor}
          onNotify={onNotify}
        />
      )}

      {isAddExhibitorOpen && (
        <AddExhibitorModal
          onClose={() => setIsAddExhibitorOpen(false)}
          onAdd={addExhibitor}
          onNotify={onNotify}
        />
      )}
    </div>
  );
}
