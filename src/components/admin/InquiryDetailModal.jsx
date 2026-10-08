export default function InquiryDetailModal({ inquiry, onClose, onDelete, onNotify }) {
  if (!inquiry) return null;

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div className="admin-modal-title-group">
            <span className="badge-preview-tag">
              <i className="fa-solid fa-headset text-primary"></i> Contact Desk Inquiry
            </span>
            <h3>{inquiry.subject || 'Exhibition Inquiry'}</h3>
            <span className="admin-modal-sub">
              Received on {inquiry.date || 'Recent'} &bull; Type: <strong>{inquiry.inquiryType || 'General'}</strong>
            </span>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="admin-modal-body">
          <div className="admin-detail-section">
            <h4>
              <i className="fa-solid fa-user text-primary"></i> Sender Details
            </h4>
            <div className="admin-detail-grid">
              <div className="admin-detail-item">
                <span className="detail-label">Name</span>
                <strong className="detail-value">{inquiry.name}</strong>
              </div>
              <div className="admin-detail-item">
                <span className="detail-label">Organization</span>
                <strong className="detail-value">{inquiry.organization || 'Independent'}</strong>
              </div>
              <div className="admin-detail-item">
                <span className="detail-label">Email</span>
                <a href={`mailto:${inquiry.email}`} className="detail-link">
                  <i className="fa-solid fa-envelope"></i> {inquiry.email}
                </a>
              </div>
              <div className="admin-detail-item">
                <span className="detail-label">Phone</span>
                {inquiry.phone ? (
                  <a href={`tel:${inquiry.phone}`} className="detail-link">
                    <i className="fa-solid fa-phone"></i> {inquiry.phone}
                  </a>
                ) : (
                  <span className="text-muted">Not provided</span>
                )}
              </div>
            </div>
          </div>

          <div className="admin-detail-section">
            <h4>
              <i className="fa-solid fa-message text-primary"></i> Message Body
            </h4>
            <div className="inquiry-message-box">
              <p>{inquiry.message}</p>
            </div>
          </div>
        </div>

        <div className="admin-modal-footer">
          <button
            type="button"
            className="btn btn-outline btn-danger-soft"
            onClick={() => {
              if (window.confirm('Delete this inquiry record?')) {
                onDelete(inquiry.id);
                onNotify('Inquiry Deleted', 'The contact inquiry was removed.');
                onClose();
              }
            }}
          >
            <i className="fa-solid fa-trash-can"></i> Delete
          </button>
          <a
            href={`mailto:${inquiry.email}?subject=RE: ${encodeURIComponent(inquiry.subject || 'The Global Healthcare Expo 2027')}`}
            className="btn btn-primary"
          >
            <i className="fa-solid fa-reply"></i> Reply via Email
          </a>
        </div>
      </div>
    </div>
  );
}
