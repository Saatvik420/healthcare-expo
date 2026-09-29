import { useSearchParams, Link } from 'react-router-dom';
import RegistrationPortal from '../components/RegistrationPortal';

export default function RegistrationPage({ onNotify }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'exhibitor' ? 'exhibitor' : 'visitor';
  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">
            <i className="fa-solid fa-calendar-days"></i> 21st &amp; 22nd January 2027 &bull; Bangkok, Thailand
          </span>
          <h1>Registration Gateway</h1>
          <p className="page-header-lead">
            <strong>The Global Healthcare Expo 2027</strong> &bull; Held Under the Aegis of <strong>India–ASEAN Global Confluence 2027</strong>
          </p>
          <p className="page-header-sub">
            Please choose your participation type below. We offer dedicated registration channels for trade visitors and exhibiting companies.
          </p>

          {/* Quick Choice Gateways */}
          <div className="reg-choice-cards-row">
            <div className="reg-choice-card">
              <div className="choice-icon">
                <i className="fa-solid fa-id-card"></i>
              </div>
              <div className="choice-body">
                <h3>Trade Visitor Pass</h3>
                <p>Complimentary access for hospital administrators, trade buyers, doctors, and institutional procurers.</p>
                <Link to="/visitor-registration" className="btn btn-primary">
                  Go to Visitor Registration <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="reg-choice-card exhibitor-choice">
              <div className="choice-icon">
                <i className="fa-solid fa-store"></i>
              </div>
              <div className="choice-body">
                <h3>Exhibitor Registration &amp; Stall</h3>
                <p>Reserve Shell Scheme or Raw Space booths to showcase your products to 5,000+ international buyers.</p>
                <Link to="/exhibitor-registration" className="btn btn-outline">
                  Go to Exhibitor Registration <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          <div className="section-subtitle-bar text-center">
            <h3>Or Register Online Below</h3>
            <p>You can also use this express registration form directly:</p>
          </div>

          <RegistrationPortal
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNotify={onNotify}
          />
        </div>
      </section>
    </div>
  );
}
