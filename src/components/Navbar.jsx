import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

  return (
    <header>
      <div className="container nav-container">
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <div className="logo-symbol">
            <i className="fa-solid fa-hospital-user"></i>
          </div>
          <div className="brand-text">
            <h1>The Global Healthcare Expo</h1>
            <span className="brand-domain-subtext">Part of IndiGlobalExpo.com</span>
          </div>
        </Link>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
              onClick={closeMenu}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/registration"
              className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
              onClick={closeMenu}
            >
              Registration
            </NavLink>
          </li>
          <li>
            <a
              href="/#sectors"
              onClick={closeMenu}
            >
              Pavilions
            </a>
          </li>
          <li>
            <NavLink
              to="/schedule"
              className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
              onClick={closeMenu}
            >
              Schedule
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sponsorship"
              className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
              onClick={closeMenu}
            >
              Sponsorship
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
              onClick={closeMenu}
            >
              Contact Desk
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? 'active-nav-link admin-nav-item' : 'admin-nav-item'
                }
                onClick={closeMenu}
              >
                <i className="fa-solid fa-shield-halved"></i> Admin
              </NavLink>
            </li>
          )}
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
              <Link to="/login" className="btn btn-link-nav" onClick={closeMenu}>
                <i className="fa-regular fa-user"></i> Log In
              </Link>
              <Link to="/book-stall" className="btn btn-primary btn-nav-cta" onClick={closeMenu}>
                Book Stall
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
  );
}
