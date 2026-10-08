import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';
import logoImg from '../assets/logo-transparent.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header>
        <div className="container nav-container">
          <Link to="/" className="brand-logo" onClick={closeMenu}>
            <img
              src={logoImg}
              alt="The Global Healthcare Expo"
              className="navbar-brand-logo-img"
            />
          </Link>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {/* Mobile Header Inside Drawer */}
            <li className="mobile-drawer-header">
              <div className="mobile-drawer-brand">
                <img
                  src={logoImg}
                  alt="The Global Healthcare Expo 2027"
                  className="mobile-drawer-logo-img"
                />
              </div>
              <button
                type="button"
                className="mobile-drawer-close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </li>

            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
                onClick={closeMenu}
                end
              >
                <i className="fa-solid fa-house nav-item-icon"></i>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/visitor-registration"
                className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
                onClick={closeMenu}
              >
                <i className="fa-solid fa-id-card nav-item-icon"></i>
                <span>Visitor Registration</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/exhibitor-registration"
                className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
                onClick={closeMenu}
              >
                <i className="fa-solid fa-store nav-item-icon"></i>
                <span>Exhibitor Registration</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/awards"
                className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
                onClick={closeMenu}
              >
                <i className="fa-solid fa-trophy nav-item-icon"></i>
                <span>Excellence Awards</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
                onClick={closeMenu}
              >
                <i className="fa-solid fa-headset nav-item-icon"></i>
                <span>Contact Desk</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? 'active-nav-link admin-nav-item' : 'admin-nav-item'
                }
                onClick={closeMenu}
              >
                <i className="fa-solid fa-shield-halved nav-item-icon"></i>
                <span>Admin Dashboard</span>
              </NavLink>
            </li>

            {/* Mobile Actions Drawer Footer */}
            <li className="mobile-drawer-actions">
              <div className="mobile-actions-stack">
                <Link
                  to="/visitor-registration"
                  className="btn btn-primary btn-block"
                  onClick={closeMenu}
                >
                  <i className="fa-solid fa-id-card"></i> Visitor Registration
                </Link>
                <Link
                  to="/schedule"
                  className="btn btn-outline btn-block"
                  onClick={closeMenu}
                >
                  <i className="fa-solid fa-calendar-days"></i> See Schedule
                </Link>
                <Link
                  to="/admin"
                  className="btn btn-outline btn-block"
                  onClick={closeMenu}
                >
                  <i className="fa-solid fa-shield-halved"></i> Admin Console
                </Link>
                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-block"
                >
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp Helpdesk ({CONTACT_CONFIG.visitor.display})
                </a>
              </div>
            </li>
          </ul>

          <div className="nav-actions">
            {currentUser ? (
              <div className="user-nav-dropdown">
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  className="btn btn-outline nav-user-btn"
                  onClick={closeMenu}
                >
                  <i className={`fa-solid ${isAdmin ? 'fa-shield-halved' : 'fa-circle-user'}`}></i>
                  <span>{currentUser.name.split(' ')[0]}</span>
                  <span className="nav-role-pill">{currentUser.role.toUpperCase()}</span>
                </Link>
                <button
                  type="button"
                  className="nav-logout-btn"
                  onClick={handleLogout}
                  title="Sign Out"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <>
                <Link to="/admin" className="btn btn-link-nav nav-admin-quick-link" onClick={closeMenu} title="Admin Portal">
                  <i className="fa-solid fa-shield-halved"></i> Admin
                </Link>
                <Link to="/login" className="btn btn-link-nav" onClick={closeMenu}>
                  <i className="fa-regular fa-user"></i> Log In
                </Link>
                <Link to="/visitor-registration" className="btn btn-primary btn-nav-cta" onClick={closeMenu}>
                  Visitor Pass
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
}
