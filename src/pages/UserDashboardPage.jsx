import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserDashboardPage({ onNotify }) {
  const { currentUser, logout, isAdmin, isVisitor, isExhibitor } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="page-wrapper">
        <section className="section py-4">
          <div className="container">
            <div className="empty-state auth-empty-state">
              <i className="fa-solid fa-lock empty-icon text-primary"></i>
              <h2>Sign In Required</h2>
              <p>Please log in or create an account to view your personalized expo credentials and dashboard.</p>
              <div className="empty-state-buttons">
                <Link to="/login" className="btn btn-primary">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-outline">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const handleDownloadBadge = () => {
    onNotify(
      'Digital Badge Ready',
      `Official digital credential PDF for ${currentUser.name} has been prepared for download.`
    );
  };

  const handleLogout = () => {
    logout();
    onNotify('Logged Out', 'You have been successfully logged out of your account.');
    navigate('/');
  };

  return (
    <div className="page-wrapper">
      {/* User Dashboard Header */}
      <section className="user-dashboard-banner">
        <div className="container">
          <div className="user-profile-header-row">
            <div className="user-profile-info">
              <div className="user-avatar-circle">
                <i className={`fa-solid ${isAdmin ? 'fa-shield-halved' : isExhibitor ? 'fa-store' : 'fa-user-tie'}`}></i>
              </div>
              <div>
                <div className="user-role-badge">
                  {currentUser.role.toUpperCase()} ACCOUNT
                </div>
                <h1>{currentUser.name}</h1>
                <p>
                  {currentUser.organization || currentUser.company || 'The Global Healthcare Expo'} &bull;{' '}
                  <span>{currentUser.email}</span>
                </p>
              </div>
            </div>

            <div className="user-header-actions">
              {isAdmin && (
                <Link to="/admin" className="btn btn-primary">
                  <i className="fa-solid fa-gauge-high"></i> Open Admin Dashboard
                </Link>
              )}
              <button type="button" className="btn btn-outline" onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          {/* Visitor Dashboard View */}
          {isVisitor && (
            <div className="dashboard-content-grid">
              {/* Badge Column */}
              <div className="dashboard-card">
                <div className="card-title-bar">
                  <h3>Your Verified Trade E-Badge</h3>
                  <span className="status-pill status-active">Active & Verified</span>
                </div>

                <div className="badge-preview-box mt-4">
                  <div className="badge-header">
                    <div className="badge-logo-icon">
                      <i className="fa-solid fa-notes-medical"></i>
                    </div>
                    <div>
                      <h4>THE GLOBAL HEALTHCARE EXPO</h4>
                      <span>PRAGATI MAIDAN &bull; OCT 14-16, 2026</span>
                    </div>
                  </div>

                  <div className="badge-content">
                    <div className="badge-avatar">
                      <i className="fa-solid fa-user-check"></i>
                    </div>
                    <h3 className="badge-attendee-name">{currentUser.name}</h3>
                    <p className="badge-attendee-org">{currentUser.organization || 'Trade Attendee'}</p>
                    <p className="badge-attendee-desig">{currentUser.designation || 'Visitor'}</p>

                    <div className="badge-qr-code">
                      <i className="fa-solid fa-qrcode"></i>
                      <span>{currentUser.passCode || 'GHE-2026-ACTIVE'}</span>
                    </div>

                    <div className="badge-tier-tag">
                      {currentUser.passType === 'vip' ? 'VIP EXECUTIVE DELEGATE' : 'STANDARD TRADE VISITOR'}
                    </div>
                  </div>

                  <div className="badge-footer">
                    <small>Gate 4 & 10 Fast-Track Turnstile Scanner Compatible</small>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block mt-4"
                  onClick={handleDownloadBadge}
                >
                  <i className="fa-solid fa-download"></i> Download Wallet / PDF Badge
                </button>
              </div>

              {/* Attendee Itinerary and Quick Services */}
              <div className="dashboard-side-col">
                <div className="dashboard-card mb-4">
                  <h3>Event Arrival Logistics</h3>
                  <div className="arrival-guide-list">
                    <div className="arrival-item">
                      <i className="fa-solid fa-calendar-check text-primary"></i>
                      <div>
                        <strong>Show Dates:</strong>
                        <p>October 14–16, 2026 (Daily from 10:00 AM)</p>
                      </div>
                    </div>
                    <div className="arrival-item">
                      <i className="fa-solid fa-location-dot text-primary"></i>
                      <div>
                        <strong>Venue Entry:</strong>
                        <p>Gate 4 & 10, Pragati Maidan, New Delhi (Supreme Court Metro)</p>
                      </div>
                    </div>
                    <div className="arrival-item">
                      <i className="fa-solid fa-id-card text-primary"></i>
                      <div>
                        <strong>Fast-Track Registration:</strong>
                        <p>Present the QR code above at the self-service turnstiles.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card">
                  <h3>Quick Expo Resources</h3>
                  <div className="quick-resource-links">
                    <Link to="/schedule" className="resource-link-row">
                      <i className="fa-solid fa-calendar-days"></i>
                      <div>
                        <strong>Browse Summit Schedule</strong>
                        <small>Explore keynotes and save sessions to your agenda</small>
                      </div>
                      <i className="fa-solid fa-chevron-right arrow-icon"></i>
                    </Link>

                    <Link to="/sectors" className="resource-link-row">
                      <i className="fa-solid fa-boxes-stacked"></i>
                      <div>
                        <strong>Explore Product Zones</strong>
                        <small>Locate exhibitors in Halls 1 through 5</small>
                      </div>
                      <i className="fa-solid fa-chevron-right arrow-icon"></i>
                    </Link>

                    <Link to="/contact" className="resource-link-row">
                      <i className="fa-solid fa-headset"></i>
                      <div>
                        <strong>Visitor Helpdesk</strong>
                        <small>Assistance with visa letters, hotels, and parking</small>
                      </div>
                      <i className="fa-solid fa-chevron-right arrow-icon"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Exhibitor Dashboard View */}
          {isExhibitor && (
            <div className="dashboard-content-grid">
              <div className="dashboard-card">
                <div className="card-title-bar">
                  <h3>Exhibitor Booth Space Overview</h3>
                  <span className="status-pill status-active">
                    {currentUser.status || 'Confirmed Space'}
                  </span>
                </div>

                <div className="exhibitor-space-summary mt-4">
                  <div className="exhibitor-company-badge">
                    <i className="fa-solid fa-building text-primary"></i>
                    <div>
                      <h4>{currentUser.company || 'Exhibiting Corporation'}</h4>
                      <span>Primary Contact: {currentUser.name} ({currentUser.designation || 'Representative'})</span>
                    </div>
                  </div>

                  <div className="grid-2-cols mt-4">
                    <div className="space-stat-box">
                      <span>Assigned Pavilion:</span>
                      <strong>{currentUser.hall || 'Hall 1-2 (APIs & Fine Chemicals)'}</strong>
                    </div>
                    <div className="space-stat-box">
                      <span>Stall Configuration:</span>
                      <strong>{currentUser.stallType || '12 sq.m Prime Scheme'}</strong>
                    </div>
                    <div className="space-stat-box">
                      <span>Electrical Hookup:</span>
                      <strong>Single-Phase & 5A Sockets Connected</strong>
                    </div>
                    <div className="space-stat-box">
                      <span>Fascia Lettering:</span>
                      <strong>{currentUser.company || 'Company Name'} (Stall #E-14)</strong>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4>Included In-Booth Furnishings:</h4>
                    <ul className="exhibitor-amenities-list">
                      <li><i className="fa-solid fa-check text-primary"></i> 2 Reception Counters & 4 Standard Chairs</li>
                      <li><i className="fa-solid fa-check text-primary"></i> 4 LED Spotlights & 1 Lockable Cupboard</li>
                      <li><i className="fa-solid fa-check text-primary"></i> Grey Modular Wall Panels (2.5m Height)</li>
                      <li><i className="fa-solid fa-check text-primary"></i> 4 Exhibitor Staff Passes allocated</li>
                    </ul>
                  </div>

                  <div className="space-action-buttons mt-4">
                    <Link to="/book-stall" className="btn btn-outline">
                      <i className="fa-solid fa-plus"></i> Request Booth Upgrades
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        onNotify(
                          'Invoice Ready',
                          `Official GST/VAT commercial invoice for ${currentUser.company} has been queued for download.`
                        )
                      }
                    >
                      <i className="fa-solid fa-receipt"></i> Download Official Allotment Invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* Exhibitor Side Column: Lead Capture */}
              <div className="dashboard-side-col">
                <div className="dashboard-card mb-4">
                  <h3>Lead Retrieval System</h3>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    Scan attendee QR badges directly using your booth scanner app or export leads.
                  </p>
                  <div className="lead-scanner-box">
                    <i className="fa-solid fa-qrcode lead-scanner-icon"></i>
                    <div>
                      <strong>Badge Scanner Active</strong>
                      <span>24 Pre-Qualified Leads Captured</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline btn-block mt-3"
                    onClick={() =>
                      onNotify(
                        'CSV Exported',
                        '24 attendee lead records have been exported to CSV for your sales team.'
                      )
                    }
                  >
                    <i className="fa-solid fa-file-csv"></i> Export Leads to CSV
                  </button>
                </div>

                <div className="dashboard-card">
                  <h3>Move-In & Setup Deadlines</h3>
                  <div className="deadline-timeline">
                    <div className="deadline-item">
                      <span className="deadline-date">Oct 12, 08:00</span>
                      <strong>Bare Space Construction Begins</strong>
                    </div>
                    <div className="deadline-item">
                      <span className="deadline-date">Oct 13, 14:00</span>
                      <strong>Shell Scheme Handover & Decoration</strong>
                    </div>
                    <div className="deadline-item">
                      <span className="deadline-date">Oct 14, 09:00</span>
                      <strong>Grand Opening & Trade Floor Live</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Admin Redirect Option */}
          {isAdmin && (
            <div className="dashboard-card text-center" style={{ padding: '3rem' }}>
              <i className="fa-solid fa-shield-halved text-primary" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
              <h2>Organizer Administrative Controls</h2>
              <p style={{ maxWidth: '600px', margin: '0.5rem auto 1.5rem', color: '#64748b' }}>
                You are currently signed in with Root Administrator credentials. Access full visitor
                management, booth allotment reviews, and sponsorship analytics.
              </p>
              <Link to="/admin" className="btn btn-primary">
                Launch Full Admin Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
