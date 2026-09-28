import { useState } from 'react';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

export default function WhatsAppSection() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('visitor');
  const [org, setOrg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const typeLabel = role === 'visitor' ? 'Trade Visitor / Healthcare Buyer' : 'Exhibitor / Healthcare Facility Stall Booking';
    const msg = `Hello IndiGlobal Healthcare Expo Team,\n\nI want to register via WhatsApp for the India-ASEAN Global Confluence 2027.\n\nType: ${typeLabel}\nName: ${name || 'Not provided'}\nOrganization/Hospital: ${org || 'Not provided'}\n\nPlease confirm my registration.`;
    window.open(getWhatsAppUrl(role, msg), '_blank', 'noopener,noreferrer');
  };

  const getUrl = (type) => {
    return getWhatsAppUrl(type);
  };

  return (
    <section className="section whatsapp-section" id="whatsapp-desk">
      <div className="container">
        <div className="section-header">
          <span className="tag text-whatsapp-tag">
            <i className="fa-brands fa-whatsapp"></i> Instant Mobile Access
          </span>
          <h2>Direct Registration via WhatsApp</h2>
          <p>
            No paperwork or complicated forms. Connect directly with the IndiGlobal Expo desk on WhatsApp
            to receive your visitor entry pass or secure preferred exhibition space.
          </p>
        </div>

        <div className="whatsapp-cards-grid">
          {/* Card 1: Visitor Registration */}
          <div className="wa-feature-card">
            <div className="wa-feature-icon-badge visitor-wa-bg">
              <i className="fa-solid fa-id-card"></i>
            </div>
            <h3>Trade Visitor Pass</h3>
            <div style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 600, marginBottom: '0.5rem' }}>
              <i className="fa-brands fa-whatsapp"></i> Visitor Desk: {CONTACT_CONFIG.visitor.display}
            </div>
            <p>
              For hospital administrators, doctors, healthcare facility managers, and trade procurement buyers.
            </p>
            <ul className="wa-perks-list">
              <li><i className="fa-solid fa-check text-whatsapp"></i> Instant confirmation on your phone</li>
              <li><i className="fa-solid fa-check text-whatsapp"></i> Turnstile QR E-Badge delivery</li>
              <li><i className="fa-solid fa-check text-whatsapp"></i> Access to all 6 exhibition halls</li>
            </ul>
            <a
              href={getUrl('visitor')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-block"
            >
              <i className="fa-brands fa-whatsapp"></i> Register Visitor ({CONTACT_CONFIG.visitor.display})
            </a>
          </div>

          {/* Card 2: Exhibitor Stall Booking */}
          <div className="wa-feature-card featured-wa-card">
            <div className="wa-popular-tag">Fastest Booking</div>
            <div className="wa-feature-icon-badge exhibitor-wa-bg">
              <i className="fa-solid fa-store"></i>
            </div>
            <h3>Exhibitor Stall Booking</h3>
            <div style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 600, marginBottom: '0.5rem' }}>
              <i className="fa-brands fa-whatsapp"></i> Exhibitor Desk: {CONTACT_CONFIG.exhibitor.display}
            </div>
            <p>
              For healthcare facility providers, medical device manufacturers, pharma companies, and suppliers.
            </p>
            <ul className="wa-perks-list">
              <li><i className="fa-solid fa-check text-whatsapp"></i> Real-time floorplan layout via WhatsApp</li>
              <li><i className="fa-solid fa-check text-whatsapp"></i> Corner & island stall priority holds</li>
              <li><i className="fa-solid fa-check text-whatsapp"></i> Direct consultation with floor manager</li>
            </ul>
            <a
              href={getUrl('exhibitor')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-block"
            >
              <i className="fa-brands fa-whatsapp"></i> Book Stall ({CONTACT_CONFIG.exhibitor.display})
            </a>
          </div>

          {/* Card 3: Quick Direct Send */}
          <div className="wa-feature-card">
            <div className="wa-feature-icon-badge general-wa-bg">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <h3>Quick Detail Sender</h3>
            <p>
              Select desk, type your details, and hit send to launch an immediate WhatsApp conversation:
            </p>
            <form onSubmit={handleSend} className="wa-inline-send-form">
              <div className="form-group mb-2">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="wa-inline-input"
                >
                  <option value="visitor">Visitor Desk ({CONTACT_CONFIG.visitor.display})</option>
                  <option value="exhibitor">Exhibitor Desk ({CONTACT_CONFIG.exhibitor.display})</option>
                </select>
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="wa-inline-input"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  placeholder="Hospital / Company Name"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="wa-inline-input"
                />
              </div>
              <button type="submit" className="btn btn-whatsapp btn-block">
                <i className="fa-brands fa-whatsapp"></i> Send via WhatsApp Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
