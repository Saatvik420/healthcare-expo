import { useState } from 'react';
import logoImg from '../../assets/logo-transparent.png';

export default function VisitorDetailModal({ visitor, onClose, onUpdateStatus, onDelete, onNotify }) {
  const [currentStatus, setCurrentStatus] = useState(visitor.status || 'Confirmed');

  if (!visitor) return null;

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    onUpdateStatus(visitor.id, { status: newStatus });
    onNotify('Visitor Status Updated', `${visitor.name}'s badge status changed to "${newStatus}".`);
  };

  const handlePrintBadge = () => {
    window.print();
  };

  const isVip = visitor.passType === 'vip';

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-lg" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="admin-modal-header">
          <div className="admin-modal-title-group">
            <span className={`pass-tier-pill ${isVip ? 'pill-vip' : 'pill-standard'}`}>
              <i className={isVip ? 'fa-solid fa-crown' : 'fa-solid fa-id-badge'}></i>{' '}
              {isVip ? 'VIP Executive Delegate' : 'Trade Visitor'}
            </span>
            <h3>Attendee Profile: {visitor.name}</h3>
            <span className="admin-modal-sub">
              Registration Code: <code>{visitor.passCode || visitor.id}</code>
            </span>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="admin-modal-body">
          <div className="admin-modal-split">
            {/* Left Column: Full Details */}
            <div className="admin-modal-details-col">
              <div className="admin-detail-section">
                <h4>
                  <i className="fa-solid fa-user-tie text-primary"></i> Personal & Professional Profile
                </h4>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="detail-label">Full Name</span>
                    <strong className="detail-value">{visitor.name}</strong>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Designation / Role</span>
                    <strong className="detail-value">{visitor.designation || 'Visitor'}</strong>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Company / Hospital</span>
                    <strong className="detail-value">{visitor.organization || 'Independent Trade Buyer'}</strong>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Country / Region</span>
                    <strong className="detail-value">
                      <i className="fa-solid fa-earth-americas text-primary"></i> {visitor.country || 'India'}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="admin-detail-section">
                <h4>
                  <i className="fa-solid fa-address-book text-primary"></i> Direct Contact Information
                </h4>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="detail-label">Email Address</span>
                    <a href={`mailto:${visitor.email}`} className="detail-link">
                      <i className="fa-solid fa-envelope"></i> {visitor.email}
                    </a>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Direct Phone</span>
                    {visitor.phone ? (
                      <div className="phone-actions-row">
                        <a href={`tel:${visitor.phone}`} className="detail-link">
                          <i className="fa-solid fa-phone"></i> {visitor.phone}
                        </a>
                        <a
                          href={`https://wa.me/${visitor.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="badge-wa-quick"
                          title="Message on WhatsApp"
                        >
                          <i className="fa-brands fa-whatsapp"></i> Chat
                        </a>
                      </div>
                    ) : (
                      <span className="text-muted">Not provided</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="admin-detail-section">
                <h4>
                  <i className="fa-solid fa-calendar-check text-primary"></i> Exhibition & Attendance Details
                </h4>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="detail-label">Product Zone / Sector</span>
                    <span className="zone-tag">
                      <i className="fa-solid fa-microscope text-primary"></i> {visitor.sectorLabel || visitor.sector}
                    </span>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Attendance Schedule</span>
                    <strong className="detail-value">
                      <i className="fa-regular fa-clock"></i>{' '}
                      {visitor.attendDay === 'all'
                        ? 'Full Summit (21 & 22 Jan 2027)'
                        : visitor.attendDay || 'All Days'}
                    </strong>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Registration Date</span>
                    <strong className="detail-value">{visitor.date || 'Recent'}</strong>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Current Check-In Status</span>
                    <div className="status-toggle-group">
                      <button
                        type="button"
                        className={`status-btn-sm ${currentStatus === 'Confirmed' ? 'active-confirmed' : ''}`}
                        onClick={() => handleStatusChange('Confirmed')}
                      >
                        <i className="fa-solid fa-circle-check"></i> Confirmed
                      </button>
                      <button
                        type="button"
                        className={`status-btn-sm ${currentStatus === 'Checked-in' ? 'active-checkedin' : ''}`}
                        onClick={() => handleStatusChange('Checked-in')}
                      >
                        <i className="fa-solid fa-door-open"></i> Checked-In
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {visitor.notes && (
                <div className="admin-detail-section">
                  <h4>
                    <i className="fa-solid fa-note-sticky text-primary"></i> Attendee Notes
                  </h4>
                  <p className="admin-notes-callout">{visitor.notes}</p>
                </div>
              )}
            </div>

            {/* Right Column: E-Badge Physical Preview */}
            <div className="admin-modal-badge-col">
              <div className="badge-preview-container">
                <span className="badge-preview-tag">Official Delegate E-Badge</span>
                <div className={`conference-badge-card ${isVip ? 'badge-card-vip' : 'badge-card-standard'}`}>
                  <div className="badge-card-top">
                    <img src={logoImg} alt="Global Healthcare Expo" className="badge-card-logo" />
                    <span className="badge-event-text">Bangkok, Thailand &bull; 2027</span>
                  </div>

                  <div className="badge-card-tier-banner">
                    {isVip ? '★ VIP EXECUTIVE DELEGATE ★' : 'OFFICIAL TRADE VISITOR'}
                  </div>

                  <div className="badge-card-person">
                    <h3 className="badge-person-name">{visitor.name}</h3>
                    <p className="badge-person-title">{visitor.designation || 'Healthcare Leader'}</p>
                    <p className="badge-person-org">{visitor.organization || 'Independent Trade Buyer'}</p>
                    <span className="badge-person-country">{visitor.country || 'India'}</span>
                  </div>

                  <div className="badge-card-qr-section">
                    <div className="badge-qr-box">
                      <i className="fa-solid fa-qrcode"></i>
                    </div>
                    <code className="badge-card-code">{visitor.passCode || visitor.id}</code>
                    <small className="badge-access-zone">{visitor.sectorLabel || visitor.sector}</small>
                  </div>

                  <div className="badge-card-footer">
                    <span>India–ASEAN Global Confluence</span>
                  </div>
                </div>

                <div className="badge-actions-box">
                  <button type="button" className="btn btn-primary btn-block btn-sm" onClick={handlePrintBadge}>
                    <i className="fa-solid fa-print"></i> Print Official Badge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="admin-modal-footer">
          <button
            type="button"
            className="btn btn-outline btn-danger-soft"
            onClick={() => {
              if (window.confirm(`Are you sure you want to permanently delete attendee ${visitor.name}?`)) {
                onDelete(visitor.id);
                onClose();
              }
            }}
          >
            <i className="fa-solid fa-trash-can"></i> Delete Attendee Record
          </button>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
