import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

import { SECTOR_OPTIONS } from '../config/sectorsData';

export default function VisitorPassPage({ onNotify }) {
  const [searchParams] = useSearchParams();
  const defaultSector = searchParams.get('sector') || 'pharmaceuticals';
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

  const getSectorLabel = (sectorId) => {
    const found = SECTOR_OPTIONS.find((s) => s.id === sectorId);
    return found ? found.label : sectorId;
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
      sectorLabel: getSectorLabel(formData.sector),
      passType: formData.passType,
      passCode: passCode,
    });

    onNotify(
      'Visitor Pass Confirmed!',
      `Welcome ${formData.firstName}! Your official trade pass (${passCode}) for The Global Healthcare Expo 2027 in Bangkok, Thailand is now ready. An e-badge with QR access has been dispatched to ${formData.email}.`
    );
  };

  const getWhatsAppRegistrationUrl = () => {
    const name = `${formData.firstName} ${formData.lastName}`.trim();
    const text = `Hello Global Healthcare Expo Team,\n\nI want to register via WhatsApp as a Trade Visitor for The Global Healthcare Expo 2027 (India–ASEAN Global Confluence, Bangkok, Thailand).\n\nName: ${name || 'Not provided'}\nOrganization/Hospital: ${formData.organization || 'Not provided'}\nDesignation: ${formData.designation || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\nSector: ${getSectorLabel(formData.sector)}\nPass Type: ${formData.passType === 'vip' ? 'VIP Delegate' : 'Standard Trade Pass'}\n\nPlease confirm my registration pass.`;
    return getWhatsAppUrl('visitor', text);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <span className="tag">
            <i className="fa-solid fa-calendar-days"></i> 21st &amp; 22nd January 2027 &bull; Bangkok, Thailand
          </span>
          <h1>Visitor Registration</h1>
          <p className="page-header-lead">
            <strong>The Global Healthcare Expo 2027</strong> &bull; Organised Under the Aegis of the <strong>India–ASEAN Global Confluence 2027</strong>
          </p>
          <p className="page-header-sub">
            Pre-register for your complimentary Trade Visitor Pass or VIP Delegate Badge. Connect with international pharmaceutical companies,
            medical device manufacturers, hospital procurement teams, distributors, and healthcare innovators across India, Thailand, and ASEAN.
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
                <p>Designed for hospital directors, clinical engineers, trade buyers, importers, and sourcing teams.</p>
              </div>
              <ul className="pass-features">
                <li><i className="fa-solid fa-check text-primary"></i> 2-Day Full Access to All 19 Sector Pavilions &amp; Exhibition Floors</li>
                <li><i className="fa-solid fa-check text-primary"></i> Access to Open Innovation &amp; Hospital Tech Theatres</li>
                <li><i className="fa-solid fa-check text-primary"></i> Digital PDF Official Healthcare Exhibitor Directory</li>
                <li><i className="fa-solid fa-check text-primary"></i> Fast-Track Turnstile QR Access &amp; WhatsApp E-Badge</li>
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
                <div className="pass-price">Complimentary <span>/ Verified CXOs &amp; Directors</span></div>
                <p>Reserved for Hospital CEOs, Medical Superintendents, Procurement Heads, Importers, and Ministry Officials.</p>
              </div>
              <ul className="pass-features">
                <li><i className="fa-solid fa-check text-primary"></i> Everything in Standard Trade Pass</li>
                <li><i className="fa-solid fa-check text-primary"></i> Access to VIP India–ASEAN Networking Lounge &amp; Executive Dining</li>
                <li><i className="fa-solid fa-check text-primary"></i> Priority Seating at Leadership Plenaries &amp; CEO Forums</li>
                <li><i className="fa-solid fa-check text-primary"></i> 1-on-1 Pre-Scheduled Buyer–Seller Matchmaking Sessions</li>
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
                <p>Enter your professional credentials for official badge allocation under India–ASEAN Confluence 2027.</p>
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
                      placeholder="Chief of Hospital Operations / Procurement Head"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-sector">Primary Sourcing Interest (19 Sectors) *</label>
                    <select
                      id="reg-sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      required
                    >
                      {SECTOR_OPTIONS.map((sec) => (
                        <option key={sec.id} value={sec.id}>
                          {sec.label}
                        </option>
                      ))}
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
                      <option value="all">Both Days (21st &amp; 22nd January 2027)</option>
                      <option value="day1">Day 1: Healthcare Markets, Trade &amp; Global Business (21 Jan)</option>
                      <option value="day2">Day 2: Innovation, Investment &amp; Tech (22 Jan)</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions-split">
                  <button type="submit" className="btn btn-primary btn-block">
                    <i className="fa-solid fa-id-card"></i> Generate Official Visitor Pass
                  </button>
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
                    <span>INDIA–ASEAN GLOBAL CONFLUENCE &bull; 21st &amp; 22nd Jan 2027</span>
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
                  <small>Bangkok, Thailand &bull; GTTCI Accredited &bull; Fast-Track QR</small>
                </div>
              </div>

              {submittedPass && (
                <div className="pass-success-note">
                  <i className="fa-solid fa-circle-check text-primary"></i>
                  <div>
                    <strong>Your Pass is Active!</strong>
                    <p>Reference: {submittedPass.code}. Official confirmation has been logged. An e-badge has been sent to your email.</p>
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

              <div className="exhibitor-redirect-banner mt-4">
                <h4>Looking to Showcase Your Products Instead?</h4>
                <p>Register as an exhibitor to reserve prime pavilion booth space.</p>
                <Link to="/exhibitor-registration" className="btn btn-outline btn-sm">
                  <i className="fa-solid fa-store"></i> Switch to Exhibitor Registration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Guidelines */}
      <section className="section bg-light-surface">
        <div className="container">
          <div className="section-header">
            <span className="tag">India–ASEAN 2027 Notice</span>
            <h2>Visitor Essential Information</h2>
          </div>
          <div className="grid-3-cols">
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-hospital"></i></div>
              <h3>19 Sector Pavilions</h3>
              <p>Specialized pavilions featuring turnkey hospital engineering, modular OTs, diagnostic equipment, APIs, formulations, and MedTech.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-earth-asia"></i></div>
              <h3>India–ASEAN Trade Corridor</h3>
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
