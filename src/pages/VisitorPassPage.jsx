import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

export default function VisitorPassPage({ onNotify }) {
  const [searchParams] = useSearchParams();
  const defaultSector = searchParams.get('sector') || 'healthcare-facilities';
  const { addVisitor } = useData();

  const [formData, setFormData] = useState({
    passType: 'standard',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    country: 'India',
    sector: defaultSector,
    attendDay: 'all',
  });

  const [submittedPass, setSubmittedPass] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passCode = 'IGHE-2027-' + Math.floor(100000 + Math.random() * 900000);
    setSubmittedPass({
      ...formData,
      code: passCode,
      dateGenerated: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });

    addVisitor({
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      designation: formData.designation,
      sector: formData.sector,
      sectorLabel:
        formData.sector === 'healthcare-facilities'
          ? 'Healthcare Facilities & Hospital Infrastructure'
          : formData.sector === 'diagnostics-surgicals'
          ? 'Diagnostics and Surgicals'
          : formData.sector === 'apis'
          ? 'APIs & Fine Chemicals'
          : formData.sector === 'finished'
          ? 'Finished Formulations'
          : formData.sector === 'machinery'
          ? 'Pharma Machinery'
          : 'Packaging Systems',
      passType: formData.passType,
      passCode: passCode,
    });

    onNotify(
      'Visitor Pass Confirmed!',
      `Welcome ${formData.firstName}! Your official trade pass (${passCode}) for India-ASEAN Global Confluence 2027 is now ready. An e-badge with QR access has been dispatched to ${formData.email}.`
    );
  };

  const getWhatsAppRegistrationUrl = () => {
    const name = `${formData.firstName} ${formData.lastName}`.trim();
    const text = `Hello IndiGlobal Healthcare Expo Team,\n\nI want to register via WhatsApp as a Trade Visitor / Healthcare Facility Representative for the India-ASEAN Global Confluence 2027.\n\nName: ${name || 'Not provided'}\nOrganization/Hospital: ${formData.organization || 'Not provided'}\nDesignation: ${formData.designation || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\nSector: ${formData.sector}\nPass Type: ${formData.passType === 'vip' ? 'VIP Delegate' : 'Standard Visitor Pass'}\n\nPlease confirm my registration.`;
    return getWhatsAppUrl('visitor', text);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <span className="tag">
            <i className="fa-solid fa-calendar-days"></i> 21st & 22nd January 2027 &bull; Trade Visitor Pass
          </span>
          <h1>Pre-Register for IndiGlobal Healthcare Expo</h1>
          <p>
            An initiative of <strong>IndiGlobal Expo</strong> held under the <strong>India-ASEAN Global Confluence 2027</strong> in
            partnership with <strong>GTTCI</strong>. Connect with hospital leaders, healthcare facility providers, pharmaceutical
            manufacturers, and global buyers.
          </p>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          {/* WhatsApp Direct Fast-Track Banner */}
          <div className="whatsapp-page-banner">
            <div className="wa-banner-icon">
              <i className="fa-brands fa-whatsapp"></i>
            </div>
            <div className="wa-banner-info">
              <h3>Fast-Track Registration via WhatsApp</h3>
              <p>
                Want to register in 1-click on your phone? Register through our official Visitor Desk on WhatsApp (<strong>{CONTACT_CONFIG.visitor.display}</strong>) and receive your digital pass straight to your chat.
              </p>
            </div>
            <a
              href={getWhatsAppRegistrationUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <i className="fa-brands fa-whatsapp"></i> Get Pass on WhatsApp
            </a>
          </div>

          {/* Pass Types Cards */}
          <div className="pass-types-grid">
            <div
              className={`pass-card ${formData.passType === 'standard' ? 'selected' : ''}`}
              onClick={() => setFormData({ ...formData, passType: 'standard' })}
            >
              <div className="pass-card-badge">Most Popular</div>
              <div className="pass-card-header">
                <h3>Standard Trade Pass</h3>
                <div className="pass-price">FREE <span>/ Pre-Registration</span></div>
                <p>Designed for hospital directors, clinical engineers, trade buyers, and sourcing teams.</p>
              </div>
              <ul className="pass-features">
                <li><i className="fa-solid fa-check text-primary"></i> 3-Day Access to Halls 1–6 (Healthcare Facilities & Pharma)</li>
                <li><i className="fa-solid fa-check text-primary"></i> Access to Open Innovation & Hospital Tech Theatres</li>
                <li><i className="fa-solid fa-check text-primary"></i> Digital PDF IndiGlobal Exhibitor Directory</li>
                <li><i className="fa-solid fa-check text-primary"></i> Fast-Track Turnstile QR Access & WhatsApp E-Badge</li>
              </ul>
              <button
                type="button"
                className={`btn btn-block ${formData.passType === 'standard' ? 'btn-primary' : 'btn-outline'}`}
              >
                {formData.passType === 'standard' ? 'Selected' : 'Select Standard Pass'}
              </button>
            </div>

            <div
              className={`pass-card ${formData.passType === 'vip' ? 'selected' : ''}`}
              onClick={() => setFormData({ ...formData, passType: 'vip' })}
            >
              <div className="pass-card-badge vip-badge">Executive Tier</div>
              <div className="pass-card-header">
                <h3>VIP Delegate Pass</h3>
                <div className="pass-price">Complimentary <span>/ Verified CXOs & Directors</span></div>
                <p>Reserved for Hospital CEOs, Medical Superintendents, Procurement Heads, and Ministry Officials.</p>
              </div>
              <ul className="pass-features">
                <li><i className="fa-solid fa-check text-primary"></i> Everything in Standard Trade Pass</li>
                <li><i className="fa-solid fa-check text-primary"></i> Access to VIP India-ASEAN Networking Lounge & Dining</li>
                <li><i className="fa-solid fa-check text-primary"></i> Priority Seating at Global Confluence Plenary Keynotes</li>
                <li><i className="fa-solid fa-check text-primary"></i> 1-on-1 Pre-Scheduled Buyer-Seller Matchmaking</li>
              </ul>
              <button
                type="button"
                className={`btn btn-block ${formData.passType === 'vip' ? 'btn-primary' : 'btn-outline'}`}
              >
                {formData.passType === 'vip' ? 'Selected' : 'Select VIP Pass'}
              </button>
            </div>
          </div>

          {/* Registration Form & Live Badge Mockup */}
          <div className="registration-columns">
            <div className="reg-form-card">
              <div className="form-intro">
                <h3>Attendee Information</h3>
                <p>Enter your professional credentials for official badge allocation under India-ASEAN Confluence 2027.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="reg-fname">First Name *</label>
                    <input
                      type="text"
                      id="reg-fname"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Elena"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-lname">Last Name *</label>
                    <input
                      type="text"
                      id="reg-lname"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Vance"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-email">Business / Hospital Email *</label>
                    <input
                      type="email"
                      id="reg-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="elena@hospitalgroup.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-phone">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      id="reg-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-org">Hospital / Company / Institution Name *</label>
                    <input
                      type="text"
                      id="reg-org"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Metro Health Care Systems"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-desig">Designation / Title</label>
                    <input
                      type="text"
                      id="reg-desig"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Chief of Hospital Operations"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-sector">Primary Sourcing Interest *</label>
                    <select
                      id="reg-sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      required
                    >
                      <option value="healthcare-facilities">Healthcare Facilities & Hospital Infrastructure (Featured)</option>
                      <option value="diagnostics-surgicals">Diagnostics and Surgicals (New)</option>
                      <option value="apis">APIs, Intermediates & Fine Chemicals</option>
                      <option value="finished">Finished Formulations & Generic Drugs</option>
                      <option value="machinery">Pharma Processing Machinery & Cleanroom</option>
                      <option value="packaging">Packaging Materials & Medical Devices</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-days">Days Attending *</label>
                    <select
                      id="reg-days"
                      name="attendDay"
                      value={formData.attendDay}
                      onChange={handleChange}
                    >
                      <option value="all">All Days (India-ASEAN Confluence 2027)</option>
                      <option value="day1">Day 1: Healthcare Facilities Inaugural</option>
                      <option value="day2">Day 2: India-ASEAN B2B Trade Summit</option>
                      <option value="day3">Day 3: Innovation & Sourcing</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions-split">
                  <button type="submit" className="btn btn-primary btn-block">
                    <i className="fa-solid fa-id-badge"></i> Confirm Pass & Generate Badge
                  </button>
                  <a
                    href={getWhatsAppRegistrationUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-block"
                  >
                    <i className="fa-brands fa-whatsapp"></i> Confirm via WhatsApp
                  </a>
                </div>
              </form>
            </div>

            {/* Badge Preview */}
            <div className="badge-preview-side">
              <div className="badge-preview-box">
                <div className="badge-header">
                  <div className="badge-logo-icon">
                    <i className="fa-solid fa-hospital-user"></i>
                  </div>
                  <div>
                    <h4>THE GLOBAL HEALTHCARE EXPO</h4>
                    <span>INDIA-ASEAN GLOBAL CONFLUENCE &bull; 21st & 22nd January 2027</span>
                  </div>
                </div>

                <div className="badge-content">
                  <div className="badge-avatar">
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <h3 className="badge-attendee-name">
                    {formData.firstName || formData.lastName
                      ? `${formData.firstName} ${formData.lastName}`.trim()
                      : 'Attendee Name'}
                  </h3>
                  <p className="badge-attendee-org">
                    {formData.organization || 'Hospital / Facility / Company'}
                  </p>
                  <p className="badge-attendee-desig">
                    {formData.designation || 'Healthcare Trade Delegate'}
                  </p>

                  <div className="badge-qr-code">
                    <i className="fa-solid fa-qrcode"></i>
                    <span>
                      {submittedPass ? submittedPass.code : 'IGHE-2027-PREVIEW'}
                    </span>
                  </div>

                  <div className={`badge-tier-tag ${formData.passType === 'vip' ? 'vip' : ''}`}>
                    {formData.passType === 'vip' ? 'VIP DELEGATE' : 'TRADE VISITOR'}
                  </div>
                </div>

                <div className="badge-footer">
                  <small>IndiGlobal Expo &bull; GTTCI Accredited &bull; Fast-Track QR</small>
                </div>
              </div>

              {submittedPass && (
                <div className="pass-success-note">
                  <i className="fa-solid fa-circle-check text-primary"></i>
                  <div>
                    <strong>Your Pass is Active!</strong>
                    <p>Reference: {submittedPass.code}. Official confirmation has been logged. You may also download it or receive details on WhatsApp.</p>
                    <a
                      href={getWhatsAppRegistrationUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-whatsapp mt-2"
                    >
                      <i className="fa-brands fa-whatsapp"></i> Receive on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Guidelines */}
      <section className="section bg-light-surface">
        <div className="container">
          <div className="section-header">
            <span className="tag">India-ASEAN 2027 Notice</span>
            <h2>Visitor Essential Information</h2>
          </div>
          <div className="grid-3-cols">
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-hospital"></i></div>
              <h3>Healthcare Facilities</h3>
              <p>Specialized pavilions featuring turnkey hospital engineering, modular OTs, diagnostic equipment, and surgical suites.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-earth-asia"></i></div>
              <h3>India-ASEAN Corridor</h3>
              <p>Facilitated buyer delegations, B2B matchmaking, and hospital supply-chain partnerships across 10 ASEAN countries.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-brands fa-whatsapp"></i></div>
              <h3>Direct WhatsApp Desk</h3>
              <p>Instant support, show floor navigation, and visitor assistance via our dedicated WhatsApp helpline: <strong>{CONTACT_CONFIG.visitor.display}</strong>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
