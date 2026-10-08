import { useState } from 'react';

export default function ExhibitorDetailModal({
  exhibitor,
  onClose,
  onUpdateStatus,
  onDelete,
  onNotify,
}) {
  const [currentStatus, setCurrentStatus] = useState(exhibitor.status || 'Pending Review');

  if (!exhibitor) return null;

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    onUpdateStatus(exhibitor.id, newStatus);
    onNotify('Exhibitor Status Updated', `${exhibitor.company} status changed to "${newStatus}".`);
  };

  const cleanPhone = (exhibitor.phone || '').replace(/[^0-9]/g, '');

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-lg" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="admin-modal-header">
          <div className="admin-modal-title-group">
            <span
              className={`status-pill ${
                currentStatus === 'Approved'
                  ? 'status-approved'
                  : currentStatus === 'Contract Dispatched'
                  ? 'status-dispatched'
                  : 'status-pending'
              }`}
            >
              <i className="fa-solid fa-circle"></i> {currentStatus}
            </span>
            <h3>Exhibitor Contract: {exhibitor.company}</h3>
            <span className="admin-modal-sub">
              Contract Reference: <code>{exhibitor.id || exhibitor.exhibitorCode}</code> &bull; Allotted to {exhibitor.hall}
            </span>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="admin-modal-body">
          <div className="admin-modal-split">
            {/* Left Column: Enterprise & Representative Information */}
            <div className="admin-modal-details-col">
              <div className="admin-detail-section">
                <h4>
                  <i className="fa-solid fa-building text-primary"></i> Exhibiting Enterprise Details
                </h4>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="detail-label">Company Name</span>
                    <strong className="detail-value">{exhibitor.company}</strong>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Website / Portal</span>
                    {exhibitor.website ? (
                      <a
                        href={exhibitor.website.startsWith('http') ? exhibitor.website : `https://${exhibitor.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-link"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i> {exhibitor.website}
                      </a>
                    ) : (
                      <span className="text-muted">Not specified</span>
                    )}
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Booking Date</span>
                    <strong className="detail-value">{exhibitor.bookingDate || 'Recent'}</strong>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Contract Amount</span>
                    <strong className="detail-value text-accent-navy">{exhibitor.amount || '$2,600'}</strong>
                  </div>
                </div>
              </div>

              <div className="admin-detail-section">
                <h4>
                  <i className="fa-solid fa-user-gear text-primary"></i> Authorized Representative
                </h4>
                <div className="admin-detail-grid">
                  <div className="admin-detail-item">
                    <span className="detail-label">Contact Person</span>
                    <strong className="detail-value">{exhibitor.contactPerson}</strong>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Executive Designation</span>
                    <strong className="detail-value">{exhibitor.designation || 'Lead Representative'}</strong>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Corporate Email</span>
                    <a href={`mailto:${exhibitor.email}`} className="detail-link">
                      <i className="fa-solid fa-envelope"></i> {exhibitor.email}
                    </a>
                  </div>
                  <div className="admin-detail-item">
                    <span className="detail-label">Direct Phone</span>
                    {exhibitor.phone ? (
                      <div className="phone-actions-row">
                        <a href={`tel:${exhibitor.phone}`} className="detail-link">
                          <i className="fa-solid fa-phone"></i> {exhibitor.phone}
                        </a>
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="badge-wa-quick"
                            title="Chat on WhatsApp"
                          >
                            <i className="fa-brands fa-whatsapp"></i> Chat
                          </a>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted">Not provided</span>
                    )}
                  </div>
                </div>
              </div>

              {exhibitor.notes && (
                <div className="admin-detail-section">
                  <h4>
                    <i className="fa-solid fa-clipboard-list text-primary"></i> Technical Specs & Custom Requests
                  </h4>
                  <p className="admin-notes-callout">{exhibitor.notes}</p>
                </div>
              )}
            </div>

            {/* Right Column: Stall Specs & Fast Actions */}
            <div className="admin-modal-badge-col">
              <div className="stall-spec-card">
                <span className="stall-spec-badge">Floor Allocation Details</span>
                <div className="stall-spec-body">
                  <div className="stall-spec-header">
                    <i className="fa-solid fa-store text-primary"></i>
                    <div>
                      <h4>{exhibitor.stallType}</h4>
                      <span className="hall-pill">{exhibitor.hall}</span>
                    </div>
                  </div>

                  <div className="stall-spec-list">
                    <div className="spec-row">
                      <span>Pavilion Hall:</span>
                      <strong>{exhibitor.hall}</strong>
                    </div>
                    <div className="spec-row">
                      <span>Stall Format:</span>
                      <strong>{exhibitor.stallType}</strong>
                    </div>
                    <div className="spec-row">
                      <span>Commercial Tariff:</span>
                      <strong className="amount-cell">{exhibitor.amount || '$2,600'}</strong>
                    </div>
                    <div className="spec-row">
                      <span>Approval State:</span>
                      <strong className="text-primary">{currentStatus}</strong>
                    </div>
                  </div>

                  <div className="admin-quick-status-actions">
                    <span className="actions-header-label">Quick Update Approval Status:</span>
                    <div className="status-button-grid">
                      <button
                        type="button"
                        className={`status-btn-choice ${currentStatus === 'Approved' ? 'active-approved' : ''}`}
                        onClick={() => handleStatusChange('Approved')}
                      >
                        <i className="fa-solid fa-circle-check"></i> Approve Stall
                      </button>
                      <button
                        type="button"
                        className={`status-btn-choice ${currentStatus === 'Contract Dispatched' ? 'active-dispatched' : ''}`}
                        onClick={() => handleStatusChange('Contract Dispatched')}
                      >
                        <i className="fa-solid fa-file-contract"></i> Dispatch Contract
                      </button>
                      <button
                        type="button"
                        className={`status-btn-choice ${currentStatus === 'Pending Review' ? 'active-pending' : ''}`}
                        onClick={() => handleStatusChange('Pending Review')}
                      >
                        <i className="fa-solid fa-clock"></i> Mark Pending
                      </button>
                      <button
                        type="button"
                        className={`status-btn-choice ${currentStatus === 'Cancelled' ? 'active-cancelled' : ''}`}
                        onClick={() => handleStatusChange('Cancelled')}
                      >
                        <i className="fa-solid fa-ban"></i> Put On Hold
                      </button>
                    </div>
                  </div>

                  <div className="stall-direct-contact-stack">
                    <a
                      href={`mailto:${exhibitor.email}?subject=Contract%20Update:%20The%20Global%20Healthcare%20Expo%202027`}
                      className="btn btn-primary btn-block btn-sm"
                    >
                      <i className="fa-solid fa-paper-plane"></i> Email Official Contract
                    </a>
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(exhibitor.contactPerson)},%20regarding%20your%20booth%20at%20The%20Global%20Healthcare%20Expo%202027:`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-block btn-sm"
                      >
                        <i className="fa-brands fa-whatsapp"></i> Message on WhatsApp
                      </a>
                    )}
                  </div>
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
              if (window.confirm(`Permanently remove booth allocation for ${exhibitor.company}?`)) {
                onDelete(exhibitor.id);
                onClose();
              }
            }}
          >
            <i className="fa-solid fa-trash-can"></i> Delete Exhibitor Allocation
          </button>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
