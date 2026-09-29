import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { SECTOR_OPTIONS } from '../config/sectorsData';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';
import logoImg from '../assets/logo-transparent.png';

const boothOptions = [
  {
    id: '9sqm',
    title: '9 sq.m Shell Scheme',
    badge: 'Standard Setup',
    dimensions: '3m x 3m',
    description: 'Turnkey standard setup for pharmaceuticals, medical device manufacturers, CDMOs, and healthcare innovators.',
    inclusions: [
      'Modular wall partition panels (2.5m H)',
      '1 Fascia board with company name & stall no.',
      '3 Spotlights & 1 Power socket (5 Amp)',
      '1 Reception table, 1 Round table & 3 Chairs',
      '1 Lockable storage counter & waste bin',
      'Complimentary listing in official directory',
    ],
  },
  {
    id: 'healthcare-suite',
    title: '15 sq.m Healthcare Suite',
    badge: 'Recommended',
    dimensions: '5m x 3m',
    popular: true,
    description: 'Bespoke turnkey suite tailored for pharma leaders, hospital chains, diagnostic networks, and healthcare technology showcases.',
    inclusions: [
      'Prime location in high-footfall pavilion',
      '1 Executive discussion lounge with leather seating',
      'LED display mounting bracket & reinforced walls',
      'High-capacity electrical feeds & Wi-Fi hub',
      '3 VIP India–ASEAN Buyer Delegation passes',
      'Feature profile in IndiGlobal Expo Directory',
    ],
  },
  {
    id: 'raw18',
    title: '18+ sq.m Raw Bare Space',
    badge: 'Custom Build',
    dimensions: 'Custom / Island',
    description: 'Bare ground space for bespoke double-decker hospital pavilions, processing machinery showcases, or custom corporate booths.',
    inclusions: [
      'Custom 2-side or 4-side open island position',
      'Raw floor footprint with marking boundaries',
      'High-capacity 3-phase industrial power feed',
      'Dedicated exhibitor logistics loading dock access',
      '4 VIP Delegate Passes & lounge access',
      'Priority spotlight in Confluence event guide',
    ],
  },
];

export default function BookStallPage({ onNotify }) {
  const [searchParams] = useSearchParams();
  const sectorParam = searchParams.get('sector') || 'pharmaceuticals';
  const { addExhibitor } = useData();

  const [selectedBooth, setSelectedBooth] = useState('healthcare-suite');
  const [formData, setFormData] = useState({
    contactPerson: '',
    designation: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    sector: sectorParam,
    notes: '',
  });

  const [submittedStall, setSubmittedStall] = useState(null);

  const activeOption = boothOptions.find((b) => b.id === selectedBooth) || boothOptions[1] || boothOptions[0];

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

    const stallCode = 'IGHE-EXH-' + Math.floor(100000 + Math.random() * 900000);
    setSubmittedStall({
      ...formData,
      code: stallCode,
      dateGenerated: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    });

    addExhibitor({
      company: formData.company,
      contactPerson: formData.contactPerson,
      designation: formData.designation,
      email: formData.email,
      phone: formData.phone,
      stallType: activeOption.title,
      hall: getSectorLabel(formData.sector),
      amount: 'Allotment on Request',
      notes: formData.notes || 'Booked via Online Exhibitor Registration Portal.',
    });

    onNotify(
      'Space Booking Request Submitted!',
      `Thank you, ${formData.contactPerson}. Your provisional stall booking for "${formData.company}" (${activeOption.title}) at The Global Healthcare Expo 2027 in Bangkok, Thailand has been recorded. Our floor manager will email the official contract and hall layout to ${formData.email} within 24 hours.`
    );
  };

  const getWhatsAppBookingUrl = () => {
    const text = `Hello Global Healthcare Expo Team,\n\nI want to register as an Exhibitor and book a booth for The Global Healthcare Expo 2027 in Bangkok, Thailand (India–ASEAN Global Confluence).\n\nCompany: ${formData.company || 'Not specified'}\nContact Person: ${formData.contactPerson || 'Not specified'} (${formData.designation || 'Representative'})\nPhone: ${formData.phone || 'Not specified'}\nEmail: ${formData.email || 'Not specified'}\nPreferred Format: ${activeOption.title} (${activeOption.dimensions})\nSector: ${getSectorLabel(formData.sector)}\nNotes: ${formData.notes || 'None'}\n\nPlease share the available hall floorplan and allotment details on WhatsApp.`;
    return getWhatsAppUrl('exhibitor', text);
  };

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">
            <i className="fa-solid fa-calendar-days"></i> 21st &amp; 22nd January 2027 &bull; Bangkok, Thailand
          </span>
          <h1>Exhibitor Registration</h1>
          <p className="page-header-lead">
            <strong>The Global Healthcare Expo 2027</strong> &bull; Organised Under the Aegis of <strong>India–ASEAN Global Confluence 2027</strong>
          </p>
          <p className="page-header-sub">
            Reserve exhibition space and showcase your pharmaceutical products, medical devices, and healthcare innovations
            to 5,000+ international buyers and hospital procurement leaders in Bangkok, Thailand.
          </p>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          {/* WhatsApp Direct Stall Booking Banner */}
          <div className="whatsapp-page-banner">
            <div className="wa-banner-icon">
              <i className="fa-brands fa-whatsapp"></i>
            </div>
            <div className="wa-banner-info">
              <h3>Fast-Track Stall Booking via WhatsApp</h3>
              <p>
                Want real-time stall layout maps and instant allotment assistance? Message our floor allocation team directly on
                WhatsApp (<strong>{CONTACT_CONFIG.exhibitor.display}</strong>) to lock your preferred corner or island space.
              </p>
            </div>
            <a
              href={getWhatsAppBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <i className="fa-brands fa-whatsapp"></i> Book Stall via WhatsApp
            </a>
          </div>

          {/* Booth Format Selection Cards (No Pricing) */}
          <div className="booth-options-grid mb-4">
            {boothOptions.map((booth) => {
              const isSelected = selectedBooth === booth.id;
              return (
                <div
                  key={booth.id}
                  className={`booth-option-card ${isSelected ? 'selected' : ''} ${booth.popular ? 'featured-booth' : ''}`}
                  onClick={() => setSelectedBooth(booth.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {booth.popular && (
                    <div className="popular-badge">
                      <i className="fa-solid fa-crown"></i> High Demand
                    </div>
                  )}
                  <div className="booth-header">
                    <h4>{booth.title}</h4>
                    <span className="booth-dim">
                      <i className="fa-solid fa-ruler-combined"></i> {booth.dimensions}
                    </span>
                  </div>
                  <p className="booth-desc" style={{ marginTop: '0.5rem' }}>{booth.description}</p>

                  <div className="booth-inclusions">
                    <h5>Included Equipment &amp; Benefits:</h5>
                    <ul>
                      {booth.inclusions.map((item, idx) => (
                        <li key={idx}>
                          <i className="fa-solid fa-circle-check inclusion-icon"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    className={`btn btn-block ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {isSelected ? (
                      <>
                        <i className="fa-solid fa-circle-check"></i> Selected Format
                      </>
                    ) : (
                      'Choose This Format'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Clean Form & Live Stall Preview (Identical Structure to Visitor Page) */}
          <div className="registration-columns">
            <div className="reg-form-card">
              <div className="form-intro">
                <h3>Exhibitor Space Allocation</h3>
                <p>Enter your corporate and contact details to submit your provisional space reservation under India–ASEAN Confluence 2027.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="ex-person">Authorized Representative Name *</label>
                    <input
                      type="text"
                      id="ex-person"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Rajesh Kumar"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ex-desig">Designation</label>
                    <input
                      type="text"
                      id="ex-desig"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Managing Director / VP Healthcare"
                    />
                  </div>
                  <div className="form-group col-full">
                    <label htmlFor="ex-comp">Exhibiting Company / Institution Legal Name *</label>
                    <input
                      type="text"
                      id="ex-comp"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. MedTech Global / Apex Pharma Group"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ex-email">Corporate / Business Email *</label>
                    <input
                      type="email"
                      id="ex-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="expo@apexpharma.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ex-phone">Direct Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      id="ex-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ex-web">Company Website</label>
                    <input
                      type="url"
                      id="ex-web"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.apexpharma.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ex-sector">Industry Sector (19 Sectors) *</label>
                    <select
                      id="ex-sector"
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
                    <label htmlFor="ex-booth-select">Selected Stall Format *</label>
                    <select
                      id="ex-booth-select"
                      value={selectedBooth}
                      onChange={(e) => setSelectedBooth(e.target.value)}
                    >
                      {boothOptions.map((booth) => (
                        <option key={booth.id} value={booth.id}>
                          {booth.title} ({booth.dimensions})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-full">
                    <label htmlFor="ex-notes">Special Requests / Requirements</label>
                    <textarea
                      id="ex-notes"
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. Near main pavilion entrance, corner requested, heavy machinery demo planned..."
                    ></textarea>
                  </div>
                </div>

                <div className="form-actions-split">
                  <button type="submit" className="btn btn-primary btn-block">
                    <i className="fa-solid fa-store"></i> Submit Space Booking Request
                  </button>
                </div>
              </form>
            </div>

            {/* Live Stall Reservation Mockup Card */}
            <div className="badge-preview-side">
              <div className="badge-preview-box">
                <div className="badge-header">
                  <img
                    src={logoImg}
                    alt="The Global Healthcare Expo"
                    className="badge-expo-brand-logo"
                  />
                  <div>
                    <h4>THE GLOBAL HEALTHCARE EXPO</h4>
                    <span>INDIA–ASEAN GLOBAL CONFLUENCE &bull; BANGKOK 2027</span>
                  </div>
                </div>

                <div className="badge-content">
                  <div className="badge-avatar">
                    <i className="fa-solid fa-building-circle-check"></i>
                  </div>
                  <h3 className="badge-attendee-name">
                    {formData.company || 'Exhibiting Company'}
                  </h3>
                  <p className="badge-attendee-org">
                    {formData.contactPerson
                      ? `${formData.contactPerson} (${formData.designation || 'Representative'})`
                      : 'Authorized Representative'}
                  </p>
                  <p className="badge-attendee-desig">
                    {activeOption.title} &bull; {getSectorLabel(formData.sector)}
                  </p>

                  <div className="badge-qr-code">
                    <i className="fa-solid fa-qrcode"></i>
                    <span>
                      {submittedStall ? submittedStall.code : 'IGHE-EXH-2027-PREVIEW'}
                    </span>
                  </div>

                  <div className="badge-tier-tag">
                    EXHIBITOR SPACE ALLOTMENT
                  </div>
                </div>

                <div className="badge-footer">
                  <small>Bangkok, Thailand &bull; GTTCI Accredited &bull; Reserved Space</small>
                </div>
              </div>

              {submittedStall && (
                <div className="pass-success-note">
                  <i className="fa-solid fa-circle-check text-primary"></i>
                  <div>
                    <strong>Space Request Submitted!</strong>
                    <p>Reference: {submittedStall.code}. Your space booking request for "{formData.company}" has been logged. Our floor manager will email the formal hall floorplan and allotment details to {formData.email}.</p>
                    <a
                      href={getWhatsAppBookingUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-whatsapp mt-2"
                    >
                      <i className="fa-brands fa-whatsapp"></i> Confirm on WhatsApp
                    </a>
                  </div>
                </div>
              )}

              <div className="exhibitor-redirect-banner mt-4">
                <h4>Attending as a Trade Visitor / Buyer Instead?</h4>
                <p>Register for a complimentary trade pass to browse pavilions and attend sessions.</p>
                <Link to="/visitor-registration" className="btn btn-outline btn-sm">
                  <i className="fa-solid fa-id-card"></i> Switch to Visitor Registration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitor Essential Information */}
      <section className="section bg-light-surface">
        <div className="container">
          <div className="section-header">
            <span className="tag">India–ASEAN 2027 Exhibitor Notice</span>
            <h2>Exhibitor Essential Information</h2>
          </div>
          <div className="grid-3-cols">
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-cubes"></i></div>
              <h3>Turnkey Pavilion Engineering</h3>
              <p>Standard Shell Scheme booths come fully fitted with modular walls, spotlights, furniture, and customized company fascia nameplates.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-solid fa-handshake"></i></div>
              <h3>Buyer Matchmaking &amp; Corridors</h3>
              <p>Direct pre-scheduled B2B buyer meetings with hospital procurement heads, pharmacy chain distributors, and ASEAN trade delegations.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><i className="fa-brands fa-whatsapp"></i></div>
              <h3>Direct Exhibitor WhatsApp Desk</h3>
              <p>Real-time stall layout maps, corner hold requests, and priority allocation via our dedicated exhibitor WhatsApp helpline: <strong>{CONTACT_CONFIG.exhibitor.display}</strong>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
