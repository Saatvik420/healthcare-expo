import { useState } from 'react';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

export default function RegistrationPortal({ activeTab, setActiveTab, onNotify }) {
  // Visitor Form State
  const [visitorForm, setVisitorForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    sector: '',
  });

  // Exhibitor Form State
  const [exhibitorForm, setExhibitorForm] = useState({
    contactPerson: '',
    designation: '',
    company: '',
    email: '',
    phone: '',
    space: '',
    notes: '',
  });

  const handleVisitorChange = (e) => {
    const { name, value } = e.target;
    setVisitorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExhibitorChange = (e) => {
    const { name, value } = e.target;
    setExhibitorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVisitorSubmit = (e) => {
    e.preventDefault();
    onNotify(
      'Visitor Pass Confirmed!',
      `Thank you, ${visitorForm.firstName}. Your visitor pass for India-ASEAN Global Confluence 2027 has been generated. Confirmation details sent to ${visitorForm.email}.`
    );
    setVisitorForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      organization: '',
      sector: '',
    });
  };

  const handleExhibitorSubmit = (e) => {
    e.preventDefault();
    onNotify(
      'Booth Request Received!',
      `Thank you, ${exhibitorForm.contactPerson}. Your stall request for ${exhibitorForm.company} has been received. Our floor manager will connect with you shortly at ${exhibitorForm.email}.`
    );
    setExhibitorForm({
      contactPerson: '',
      designation: '',
      company: '',
      email: '',
      phone: '',
      space: '',
      notes: '',
    });
  };

  const waVisitorUrl = getWhatsAppUrl(
    'visitor',
    `Hello IndiGlobal Healthcare Expo Team,\n\nI want to register as a Trade Visitor / Healthcare Facility Representative for India-ASEAN Global Confluence 2027.\nName: ${visitorForm.firstName} ${visitorForm.lastName}\nEmail: ${visitorForm.email}\nPhone: ${visitorForm.phone}\nOrganization: ${visitorForm.organization}\nPlease send me the confirmation pass.`
  );

  const waExhibitorUrl = getWhatsAppUrl(
    'exhibitor',
    `Hello IndiGlobal Healthcare Expo Team,\n\nI want to book an Exhibitor Stall / Healthcare Facility Pavilion for India-ASEAN Global Confluence 2027.\nContact: ${exhibitorForm.contactPerson} (${exhibitorForm.designation})\nCompany: ${exhibitorForm.company}\nPhone: ${exhibitorForm.phone}\nRequired Space: ${exhibitorForm.space || 'Standard Shell'}\nPlease share the available booth layouts.`
  );

  return (
    <section className="section registration-section" id="registration">
      <div className="container">
        <div className="section-header">
          <span className="tag">
            <i className="fa-solid fa-calendar-days"></i> 21st & 22nd January 2027 &bull; Fast-Track Portal
          </span>
          <h2>Confirm Your Participation</h2>
          <p>
            An initiative of <strong>IndiGlobal Expo</strong> under the <strong>India-ASEAN Global Confluence 2027</strong>.
            Choose between instant WhatsApp registration or standard digital confirmation below.
          </p>
        </div>

        {/* WhatsApp Fast-Track Callout Card */}
        <div className="whatsapp-fast-track-card">
          <div className="wa-card-badge">
            <i className="fa-brands fa-whatsapp"></i> Direct WhatsApp Desks
          </div>
          <div className="wa-card-content">
            <div className="wa-card-text">
              <h3>Fast-Track Registration via WhatsApp</h3>
              <p>
                Prefer to connect directly on your phone? Contact the dedicated Visitor Desk or Exhibitor Secretariat on WhatsApp:
              </p>
            </div>
            <div className="wa-card-actions">
              <a
                href={waVisitorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <i className="fa-brands fa-whatsapp"></i> Visitor Desk WhatsApp
              </a>
              <a
                href={waExhibitorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp-outline"
              >
                <i className="fa-brands fa-whatsapp"></i> Exhibitor Desk WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="portal-box">
          {/* Tab Bar */}
          <div className="tabs-header">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'visitor' ? 'active' : ''}`}
              id="tab-visitor"
              onClick={() => setActiveTab('visitor')}
            >
              <i className="fa-regular fa-user"></i> Visitor Pass Registration
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'exhibitor' ? 'active' : ''}`}
              id="tab-exhibitor"
              onClick={() => setActiveTab('exhibitor')}
            >
              <i className="fa-solid fa-briefcase"></i> Exhibitor Booth Booking
            </button>
          </div>

          <div className="form-container">
            {/* Visitor Pane */}
            <div className={`tab-pane ${activeTab === 'visitor' ? 'active' : ''}`} id="pane-visitor">
              <div className="form-intro">
                <div className="form-intro-row">
                  <div>
                    <h3>Trade Visitor & Healthcare Buyer Pass</h3>
                    <p>
                      Access full exhibition halls, hospital technology pavilions, tech keynotes, and India-ASEAN B2B lounges.
                    </p>
                  </div>
                  <a
                    href={waVisitorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-whatsapp"
                    title={`Visitor Desk WhatsApp (${CONTACT_CONFIG.visitor.display})`}
                  >
                    <i className="fa-brands fa-whatsapp"></i> WhatsApp Helpdesk
                  </a>
                </div>
              </div>
              <form onSubmit={handleVisitorSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="v-fname">First Name *</label>
                    <input
                      type="text"
                      id="v-fname"
                      name="firstName"
                      value={visitorForm.firstName}
                      onChange={handleVisitorChange}
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="v-lname">Last Name *</label>
                    <input
                      type="text"
                      id="v-lname"
                      name="lastName"
                      value={visitorForm.lastName}
                      onChange={handleVisitorChange}
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="v-email">Business / Hospital Email *</label>
                    <input
                      type="email"
                      id="v-email"
                      name="email"
                      value={visitorForm.email}
                      onChange={handleVisitorChange}
                      placeholder="name@hospital.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="v-phone">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      id="v-phone"
                      name="phone"
                      value={visitorForm.phone}
                      onChange={handleVisitorChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div className="form-group col-full">
                    <label htmlFor="v-org">Hospital / Healthcare Facility / Organization *</label>
                    <input
                      type="text"
                      id="v-org"
                      name="organization"
                      value={visitorForm.organization}
                      onChange={handleVisitorChange}
                      placeholder="e.g. Apollo Hospital Group / Max Healthcare / Regional Clinic"
                      required
                    />
                  </div>
                  <div className="form-group col-full">
                    <label htmlFor="v-interest">Sector of Interest *</label>
                    <select
                      id="v-interest"
                      name="sector"
                      value={visitorForm.sector}
                      onChange={handleVisitorChange}
                      required
                    >
                      <option value="" disabled>
                        -- Select primary category --
                      </option>
                      <option value="healthcare-facilities">Healthcare Facilities & Hospital Infrastructure (Featured)</option>
                      <option value="diagnostics-surgicals">Diagnostics and Surgicals (New)</option>
                      <option value="apis">APIs, Intermediates & Fine Chemicals</option>
                      <option value="finished">Finished Formulations & Generic Drugs</option>
                      <option value="machinery">Pharma Processing Machinery & Equipment</option>
                      <option value="packaging">Packaging Materials & Medical Devices</option>
                    </select>
                  </div>
                </div>
                <div className="form-submit-row">
                  <button type="submit" className="btn btn-primary btn-block">
                    Complete Online Registration
                  </button>
                </div>
              </form>
            </div>

            {/* Exhibitor Pane */}
            <div
              className={`tab-pane ${activeTab === 'exhibitor' ? 'active' : ''}`}
              id="pane-exhibitor"
            >
              <div className="form-intro">
                <div className="form-intro-row">
                  <div>
                    <h3>Reserve Booth Space</h3>
                    <p>
                      Showcase your healthcare facilities, medical technology, or pharma products to 25,000+ international buyers.
                    </p>
                  </div>
                  <a
                    href={waExhibitorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-whatsapp"
                    title={`Exhibitor Secretariat WhatsApp (${CONTACT_CONFIG.exhibitor.display})`}
                  >
                    <i className="fa-brands fa-whatsapp"></i> WhatsApp Secretariat
                  </a>
                </div>
              </div>
              <form onSubmit={handleExhibitorSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="e-person">Contact Person Name *</label>
                    <input
                      type="text"
                      id="e-person"
                      name="contactPerson"
                      value={exhibitorForm.contactPerson}
                      onChange={handleExhibitorChange}
                      placeholder="Full name of representative"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="e-designation">Designation</label>
                    <input
                      type="text"
                      id="e-designation"
                      name="designation"
                      value={exhibitorForm.designation}
                      onChange={handleExhibitorChange}
                      placeholder="e.g. Hospital Director, Sales Lead"
                    />
                  </div>
                  <div className="form-group col-full">
                    <label htmlFor="e-company">Exhibiting Organization / Hospital / Brand *</label>
                    <input
                      type="text"
                      id="e-company"
                      name="company"
                      value={exhibitorForm.company}
                      onChange={handleExhibitorChange}
                      placeholder="Official Registered Organization Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="e-email">Corporate Email *</label>
                    <input
                      type="email"
                      id="e-email"
                      name="email"
                      value={exhibitorForm.email}
                      onChange={handleExhibitorChange}
                      placeholder="trade@company.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="e-phone">Direct Contact / WhatsApp *</label>
                    <input
                      type="tel"
                      id="e-phone"
                      name="phone"
                      value={exhibitorForm.phone}
                      onChange={handleExhibitorChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  {/* Space Required */}
                  <div className="form-group col-full">
                    <label htmlFor="e-space">Pavilion & Space Required *</label>
                    <select
                      id="e-space"
                      name="space"
                      value={exhibitorForm.space}
                      onChange={handleExhibitorChange}
                      required
                    >
                      <option value="" disabled>
                        -- Select Booth Configuration --
                      </option>
                      <option value="healthcare-pavilion">Hall 6: Healthcare Facilities & Hospital Infrastructure (9–18 sqm)</option>
                      <option value="6sqm">6 sq.m (Standard Shell Scheme)</option>
                      <option value="9sqm">9 sq.m (Standard Shell Scheme)</option>
                      <option value="12sqm">12 sq.m (Prime Shell Scheme)</option>
                      <option value="others">Custom Raw Bare Space / Island Pavilion</option>
                    </select>
                  </div>

                  <div className="form-group col-full">
                    <label htmlFor="e-notes">Booth Preferences & Technical Notes</label>
                    <textarea
                      id="e-notes"
                      name="notes"
                      rows={3}
                      value={exhibitorForm.notes}
                      onChange={handleExhibitorChange}
                      placeholder="Hospital equipment setup requirements, 3-phase power, corner booth preference, etc."
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit Space Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
