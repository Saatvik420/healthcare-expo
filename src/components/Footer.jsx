import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.png';
import posterImg from '../assets/poster.png';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

export default function Footer() {
  const { isAdmin } = useAuth();
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-brand-col">
            <Link to="/" className="brand-logo" style={{ marginBottom: '1.25rem', textDecoration: 'none' }}>
              <img
                src={logoImg}
                alt="The Global Healthcare Expo"
                className="footer-brand-logo-img"
              />
            </Link>
            <p>
              The Global Healthcare Expo 2027 is designed as a business and market-expansion platform for pharmaceutical, health-tech, diagnostics providers &amp; other healthcare companies looking to expand their presence across Thailand, ASEAN and international markets.
            </p>

            <div className="footer-partner-badge">
              <span className="footer-partner-caption">Official Expo Poster:</span>
              <div className="footer-poster-box">
                <img
                  src={posterImg}
                  alt="The Global Healthcare Expo 2027 Official Poster"
                  className="footer-poster-thumb"
                />
              </div>
            </div>
          </div>

          {/* Exhibition Pavilions Column */}
          <div className="footer-col">
            <h4>Exhibition Pavilions</h4>
            <ul>
              <li>
                <a href="/#who-should-exhibit">Pharmaceuticals</a>
              </li>
              <li>
                <a href="/#who-should-exhibit">API &amp; Fine Chemicals</a>
              </li>
              <li>
                <a href="/#who-should-exhibit">Medical Devices</a>
              </li>
              <li>
                <a href="/#who-should-exhibit">Surgical Equipments</a>
              </li>
              <li>
                <a href="/#who-should-exhibit">Health-tech &amp; AI</a>
              </li>
              <li>
                <a href="/#who-should-exhibit">Hospital Solutions</a>
              </li>
            </ul>
          </div>

          {/* Registration & Participation Column */}
          <div className="footer-col">
            <h4>Registration &amp; Summit</h4>
            <ul>
              <li>
                <Link to="/visitor-registration">Visitor Registration</Link>
              </li>
              <li>
                <Link to="/exhibitor-registration">Exhibitor Registration</Link>
              </li>
              <li>
                <Link to="/schedule">Summit Agenda &amp; Schedule</Link>
              </li>
              <li>
                <Link to="/awards">Global Excellence Awards 2027</Link>
              </li>
              <li>
                <Link to="/contact">Contact Desk &amp; Helpdesk</Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/admin">
                    <i className="fa-solid fa-shield-halved"></i> Executive Admin Console
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Desk Column */}
          <div className="footer-col">
            <h4>Contact Desk</h4>
            <div className="footer-contact-item">
              <i className="fa-solid fa-envelope"></i>
              <span>{CONTACT_CONFIG.general.email}</span>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-phone"></i>
              <span>{CONTACT_CONFIG.general.phone}</span>
            </div>
            <div className="footer-contact-item">
              <i className="fa-brands fa-whatsapp text-whatsapp"></i>
              <a
                href={getWhatsAppUrl('visitor')}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <span>Visitor WhatsApp: {CONTACT_CONFIG.visitor.display}</span>
              </a>
            </div>
            <div className="footer-contact-item">
              <i className="fa-brands fa-whatsapp text-whatsapp"></i>
              <a
                href={getWhatsAppUrl('exhibitor')}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <span>Exhibitor WhatsApp: {CONTACT_CONFIG.exhibitor.display}</span>
              </a>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-location-dot"></i>
              <span>Bangkok, Thailand (21st &amp; 22nd January 2027)</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2027 The Global Healthcare Expo &bull; India-ASEAN Global Confluence &bull; In collaboration with GTTCI &amp; Asepsis Marketing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
