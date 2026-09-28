export default function NotificationModal({ isOpen, title, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="toast-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="toast-box" onClick={(e) => e.stopPropagation()}>
        <div className="toast-icon">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h3 className="toast-title">{title}</h3>
        <p className="toast-message">{message}</p>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Got it, thank you
        </button>
      </div>
    </div>
  );
}
