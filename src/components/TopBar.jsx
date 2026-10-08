import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TopBar() {
  const { isAdmin } = useAuth();

  return (
    <div className="top-bar">
      <div className="container top-bar-content">
        <div className="top-bar-info">
          <span className="topbar-coming-soon-pill">
            <i className="fa-solid fa-calendar-days"></i> 21st & 22nd January 2027
          </span>
          <span className="topbar-confluence-text">
            <strong>India-ASEAN Global Confluence 2027</strong> &bull; Bangkok, Thailand
          </span>
        </div>
        <div className="top-bar-links">
          <Link to="/visitor-registration">
            <i className="fa-solid fa-id-card"></i> Visitor Registration
          </Link>
          <Link to="/exhibitor-registration">
            <i className="fa-solid fa-store"></i> Exhibitor Registration
          </Link>
          <Link to="/schedule">
            <i className="fa-solid fa-clock"></i> Schedule
          </Link>
          <Link to="/awards">
            <i className="fa-solid fa-trophy"></i> Awards
          </Link>
          <Link to="/contact">
            <i className="fa-solid fa-envelope"></i> info@indiglobalexpo.com
          </Link>
          {isAdmin && (
            <Link to="/admin" className="topbar-admin-badge-link">
              <i className="fa-solid fa-shield-halved"></i> Admin Portal
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
