import { Link } from 'react-router-dom';
import aseanLogo from '../assets/Indian Asean Global Confluence Logo with GTTCI Logo.png';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

export default function Footer() {

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand-col">
            <Link to="/" className="brand-logo" style={{ marginBottom: '1rem', textDecoration: 'none' }}>
              <div className="logo-symbol">
                <i className="fa-solid fa-hospital-user"></i>
              </div>
              <div className="brand-text">
                <h1 style={{ color: 'white' }}>IndiGlobal Healthcare Expo</h1>
                <span style={{ color: '#34d399' }}>India-ASEAN Confluence 2027</span>
              </div>
            </Link>
            <p>
              An initiative of <strong>IndiGlobal Expo</strong> (<em>Connect &bull; Collaborate &bull; Grow</em>)
              held under the aegis of <strong>India-ASEAN Global Confluence 2027</strong> in official association
              with <strong>GTTCI</strong>.
            </p>

            <div className="footer-partner-badge">
              <span className="footer-partner-caption">Official Initiative Banner:</span>
              <div className="footer-logo-box">
                <img
                  src={aseanLogo}
                  alt="India-ASEAN Global Confluence 2027 with GTTCI Logo"
                  className="footer-asean-logo"
                />
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Sectors & Zones</h4>
            <ul>
              <li>
                <Link to="/sectors?zone=healthcare-facilities">Healthcare Facilities & Hospitals</Link>
              </li>
              <li>
                <Link to="/sectors?zone=apis">APIs & Ingredients</Link>
              </li>
              <li>
                <Link to="/sectors?zone=finished">Formulations & Generics</Link>
              </li>
              <li>
                <Link to="/sectors?zone=machinery">Machinery & Cleanroom</Link>
              </li>
              <li>
                <Link to="/sectors?zone=packaging">Packaging Systems</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Registration & Expo</h4>
            <ul>
              <li>
                <Link to="/register-visitor">Trade Visitor Pass</Link>
              </li>
              <li>
                <Link to="/book-stall">Book an Exhibit Stall</Link>
              </li>
              <li>
                <Link to="/sponsorship">Sponsorship Deck</Link>
              </li>
              <li>
                <Link to="/schedule">Summit Agenda & Keynotes</Link>
              </li>
              <li>
                <Link to="/contact">Helpdesk & Venue Logistics</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Desk</h4>
            <div className="footer-contact-item">
              <i className="fa-solid fa-envelope"></i>
              <span>{CONTACT_CONFIG.general.email}</span>
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
              <i className="fa-solid fa-phone"></i>
              <span>{CONTACT_CONFIG.general.landline}</span>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-location-dot"></i>
              <span>{CONTACT_CONFIG.general.officeAddress}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2027 IndiGlobal Healthcare Expo &bull; India-ASEAN Global Confluence &bull; Organised with GTTCI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
