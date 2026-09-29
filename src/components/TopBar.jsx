import { Link } from 'react-router-dom';

export default function TopBar() {
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
          <a href="/#sectors">
            <i className="fa-solid fa-hospital"></i> Healthcare Pavilions
          </a>
          <Link to="/schedule">
            <i className="fa-solid fa-clock"></i> Schedule
          </Link>
          <Link to="/contact">
            <i className="fa-solid fa-envelope"></i> info@indiglobalexpo.com
          </Link>
        </div>
      </div>
    </div>
  );
}
