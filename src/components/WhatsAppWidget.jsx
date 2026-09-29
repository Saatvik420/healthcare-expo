import { useState } from 'react';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [quickName, setQuickName] = useState('');
  const [quickType, setQuickType] = useState('visitor');
  const [quickOrg, setQuickOrg] = useState('');

  const handleQuickWhatsAppSubmit = (e) => {
    e.preventDefault();
    const typeLabel = quickType === 'visitor' ? 'Visitor (Healthcare Facilities / Buyer)' : 'Exhibitor (Stall / Facility Showcase)';
    const text = `Hello IndiGlobal Healthcare Expo Team,\n\nI want to register via WhatsApp for the India-ASEAN Global Confluence 2027.\n\nRegistration Type: ${typeLabel}\nName: ${quickName || 'Not specified'}\nOrganization/Hospital: ${quickOrg || 'Not specified'}\nPlease share the provisional registration confirmation.`;
    
    window.open(getWhatsAppUrl(quickType, text), '_blank', 'noopener,noreferrer');
  };

  const getDirectLink = (type) => {
    return getWhatsAppUrl(type);
  };

  return (
    <div className="whatsapp-floating-container">
      {isOpen && (
        <div className="whatsapp-popup-card">
          <div className="whatsapp-popup-header">
            <div className="whatsapp-header-info">
              <div className="whatsapp-avatar">
                <i className="fa-brands fa-whatsapp"></i>
                <span className="online-dot"></span>
              </div>
              <div>
                <h4>IndiGlobal WhatsApp Desk</h4>
                <p>India-ASEAN Global Confluence 2027</p>
              </div>
            </div>
            <button
              type="button"
              className="whatsapp-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat popup"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="whatsapp-popup-body">
            <div className="whatsapp-confluence-badge">
              <i className="fa-solid fa-calendar-days"></i> <strong>21st & 22nd January 2027</strong> &bull; Fast-Track Registration
            </div>
            
            <p className="whatsapp-greeting-msg">
              Welcome to <strong>IndiGlobal Healthcare Expo</strong>! Register directly through WhatsApp in seconds without filling lengthy forms.
            </p>

            <div className="whatsapp-quick-actions">
              <a
                href={getDirectLink('visitor')}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-action-btn"
              >
                <div className="action-icon visitor-icon">
                  <i className="fa-solid fa-id-card"></i>
                </div>
                <div className="action-text">
                  <strong>1-Click Visitor Registration</strong>
                  <span>Instant Visitor Badge & Entry Pass</span>
                </div>
                <i className="fa-solid fa-chevron-right action-arrow"></i>
              </a>

              <a
                href={getDirectLink('exhibitor')}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-action-btn"
              >
                <div className="action-icon exhibitor-icon">
                  <i className="fa-solid fa-store"></i>
                </div>
                <div className="action-text">
                  <strong>1-Click Exhibitor Stall Booking</strong>
                  <span>Floorplan Allotment & Booking Support</span>
                </div>
                <i className="fa-solid fa-chevron-right action-arrow"></i>
              </a>

              <a
                href={getDirectLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-action-btn"
              >
                <div className="action-icon general-icon">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div className="action-text">
                  <strong>Chat with Expo Coordinator</strong>
                  <span>Instant answers to venue & schedule questions</span>
                </div>
                <i className="fa-solid fa-chevron-right action-arrow"></i>
              </a>
            </div>

            <div className="whatsapp-divider">
              <span>Or pre-fill details</span>
            </div>

            <form onSubmit={handleQuickWhatsAppSubmit} className="whatsapp-mini-form">
              <div className="mini-form-row">
                <select
                  value={quickType}
                  onChange={(e) => setQuickType(e.target.value)}
                  className="whatsapp-mini-select"
                >
                  <option value="visitor">Visitor / Facility Buyer</option>
                  <option value="exhibitor">Exhibitor / Stall Booking</option>
                </select>
              </div>
              <div className="mini-form-row">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  className="whatsapp-mini-input"
                  required
                />
              </div>
              <div className="mini-form-row">
                <input
                  type="text"
                  placeholder="Hospital / Company Name"
                  value={quickOrg}
                  onChange={(e) => setQuickOrg(e.target.value)}
                  className="whatsapp-mini-input"
                />
              </div>
              <button type="submit" className="whatsapp-submit-btn">
                <i className="fa-brands fa-whatsapp"></i> Register via WhatsApp
              </button>
            </form>
          </div>

          <div className="whatsapp-popup-footer">
            <small>Powered by IndiGlobal Expo &bull; GTTCI Partner</small>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        className={`whatsapp-floating-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Direct WhatsApp Registration"
      >
        <i className="fa-brands fa-whatsapp"></i>
        <span className="floating-tooltip">Register via WhatsApp</span>
        <span className="pulse-ring"></span>
      </button>
    </div>
  );
}
