import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

const boothOptions = [
  {
    id: 'healthcare-suite',
    title: '15 sq.m Healthcare Facility Suite',
    dimensions: '5m x 3m',
    basePrice: 4200,
    priceInr: '₹3,45,000',
    popular: true,
    description: 'Bespoke turnkey suite tailored for hospital chains, diagnostic networks, and healthcare technology showcases.',
    inclusions: [
      'Prime location in Hall 6 (Healthcare Pavilion)',
      '1 Executive discussion lounge with 6 leather chairs',
      'LED display mounting bracket & reinforced walls',
      '2 High-capacity electrical feeds & Wi-Fi hub',
      '3 VIP India-ASEAN Buyer Delegation passes',
      'Feature profile in IndiGlobal Expo Directory',
    ],
  },
  {
    id: '6sqm',
    title: '6 sq.m Shell Scheme',
    dimensions: '3m x 2m',
    basePrice: 1800,
    priceInr: '₹1,50,000',
    description: 'Ideal for early-stage pharma labs, startups, and specialized ingredient innovators.',
    inclusions: [
      'Modular wall partition panels (2.5m H)',
      '1 Fascia board with company name',
      '2 Spotlights & 1 Single-phase power outlet',
      '1 Information counter & 2 Chairs',
      '1 Waste bin & carpeted flooring',
    ],
  },
  {
    id: '9sqm',
    title: '9 sq.m Shell Scheme',
    dimensions: '3m x 3m',
    basePrice: 2600,
    priceInr: '₹2,15,000',
    description: 'Our standard setup for mid-sized manufacturers, CDMOs, and suppliers.',
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
    id: '12sqm',
    title: '12 sq.m Prime Scheme',
    dimensions: '4m x 3m',
    basePrice: 3400,
    priceInr: '₹2,80,000',
    description: 'Spacious configuration for clinical tech, machinery demonstrations, and client meetings.',
    inclusions: [
      'Prime aisle placement in pavilion',
      '4 LED Spotlights & 2 Power sockets (5/15 Amp)',
      '2 Reception counters & 4 Premium chairs',
      'Brochure stand & lockable credenza',
      '2 VIP Delegate Passes included',
    ],
  },
  {
    id: 'raw18',
    title: '18+ sq.m Raw Bare Space',
    dimensions: 'Custom / Island',
    basePrice: 4800,
    priceInr: '₹3,95,000',
    description: 'Bare ground space for bespoke double-decker hospital pavilions or custom corporate booths.',
    inclusions: [
      'Custom 2-side or 4-side open island position',
      'Raw floor footprint with marking boundaries',
      'High-capacity 3-phase industrial power feed',
      'Dedicated exhibitor logistics loading dock access',
      '4 VIP Delegate Passes & lounge access',
    ],
  },
];

export default function BookStallPage({ onNotify }) {
  const [searchParams] = useSearchParams();
  const sectorParam = searchParams.get('sector') || 'healthcare-facilities';
  const { addExhibitor } = useData();

  const [selectedBooth, setSelectedBooth] = useState('healthcare-suite');
  const [addons, setAddons] = useState({
    cornerStall: false,
    extraPower: false,
    leadApp: false,
    catalogueAd: false,
  });

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

  const activeOption = boothOptions.find((b) => b.id === selectedBooth) || boothOptions[0];

  const calculateTotal = () => {
    let total = activeOption.basePrice;
    if (addons.cornerStall) total += Math.round(activeOption.basePrice * 0.1);
    if (addons.extraPower) total += 250;
    if (addons.leadApp) total += 150;
    if (addons.catalogueAd) total += 400;
    return total;
  };

  const handleCheckboxChange = (name) => {
    setAddons((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addExhibitor({
      company: formData.company,
      contactPerson: formData.contactPerson,
      designation: formData.designation,
      email: formData.email,
      phone: formData.phone,
      stallType: activeOption.title,
      hall:
        formData.sector === 'healthcare-facilities'
          ? 'Hall 6 (Healthcare Facilities & Hospitals)'
          : formData.sector === 'apis'
          ? 'Hall 1 & 2 (APIs)'
          : formData.sector === 'finished'
          ? 'Hall 3 (Formulations)'
          : formData.sector === 'machinery'
          ? 'Hall 4 (Machinery)'
          : 'Hall 5 (Packaging)',
      amount: `$${calculateTotal()}`,
      notes: formData.notes || 'Booked via Online Stall Calculator.',
    });

    onNotify(
      'Space Booking Request Submitted!',
      `Thank you, ${formData.contactPerson}. Your provisional stall booking for "${formData.company}" (${activeOption.title}) at India-ASEAN Global Confluence 2027 has been recorded. Our floor manager will email the official contract and hall layout to ${formData.email} within 24 hours.`
    );
    setFormData({
      contactPerson: '',
      designation: '',
      company: '',
      email: '',
      phone: '',
      website: '',
      sector: 'healthcare-facilities',
      notes: '',
    });
  };

  const getWhatsAppBookingUrl = () => {
    const text = `Hello IndiGlobal Healthcare Expo Team,\n\nI want to book an Exhibitor Stall / Healthcare Facility Space for India-ASEAN Global Confluence 2027.\n\nCompany: ${formData.company || 'Not specified'}\nContact Person: ${formData.contactPerson || 'Not specified'} (${formData.designation || 'Representative'})\nPhone: ${formData.phone || 'Not specified'}\nEmail: ${formData.email || 'Not specified'}\nSelected Package: ${activeOption.title} (${activeOption.dimensions})\nEstimated Cost: $${calculateTotal()} USD\nSector: ${formData.sector}\n\nPlease share the available hall floorplan and allotment details on WhatsApp.`;
    return getWhatsAppUrl('exhibitor', text);
  };

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">
            <i className="fa-solid fa-sparkles"></i> COMING SOON 2027 &bull; Exhibitor Portal
          </span>
          <h1>Book Your Healthcare Facility & Pharma Stall</h1>
          <p>
            An initiative of <strong>IndiGlobal Expo</strong> under the <strong>India-ASEAN Global Confluence 2027</strong> (GTTCI).
            Select your desired booth format, calculate exact package inclusions, and secure prime exhibition positioning.
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
              <h3>Direct Exhibitor Booking via WhatsApp</h3>
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
              <i className="fa-brands fa-whatsapp"></i> Book Stall ({CONTACT_CONFIG.exhibitor.display})
            </a>
          </div>

          {/* Step 1: Select Booth Size */}
          <div className="section-subtitle-bar">
            <h3>Step 1: Choose Booth Format & Size</h3>
            <span>All Shell Scheme booths include carpet, walls, electricals, and fascia lettering</span>
          </div>

          <div className="booth-options-grid">
            {boothOptions.map((booth) => {
              const isSelected = selectedBooth === booth.id;
              return (
                <div
                  key={booth.id}
                  className={`booth-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedBooth(booth.id)}
                >
                  {booth.popular && <div className="popular-badge">High Demand</div>}
                  <div className="booth-header">
                    <h4>{booth.title}</h4>
                    <span className="booth-dim">{booth.dimensions}</span>
                  </div>
                  <div className="booth-price">
                    <strong>${booth.basePrice}</strong>
                    <span> / {booth.priceInr}</span>
                  </div>
                  <p className="booth-desc">{booth.description}</p>

                  <div className="booth-inclusions">
                    <h5>Included Equipment:</h5>
                    <ul>
                      {booth.inclusions.map((item, idx) => (
                        <li key={idx}>
                          <i className="fa-solid fa-check text-primary"></i> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    className={`btn btn-block ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {isSelected ? 'Selected Package' : 'Choose This Stall'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Step 2: Calculator & Form Grid */}
          <div className="booth-config-grid">
            {/* Addons & Live Cost Breakdown */}
            <div className="cost-breakdown-card">
              <h3>Custom Options & Add-ons</h3>
              <p>Enhance your visibility with premium booth enhancements:</p>

              <div className="addons-list">
                <label className="addon-item">
                  <input
                    type="checkbox"
                    checked={addons.cornerStall}
                    onChange={() => handleCheckboxChange('cornerStall')}
                  />
                  <div className="addon-info">
                    <strong>Corner Stall (2-Side Open)</strong>
                    <span>Maximum foot traffic & corner branding (+10% base cost)</span>
                  </div>
                  <span className="addon-cost">
                    +${Math.round(activeOption.basePrice * 0.1)}
                  </span>
                </label>

                <label className="addon-item">
                  <input
                    type="checkbox"
                    checked={addons.extraPower}
                    onChange={() => handleCheckboxChange('extraPower')}
                  />
                  <div className="addon-info">
                    <strong>Heavy 3-Phase Power Feed (10 kW)</strong>
                    <span>For running hospital equipment / active processing machinery</span>
                  </div>
                  <span className="addon-cost">+$250</span>
                </label>

                <label className="addon-item">
                  <input
                    type="checkbox"
                    checked={addons.leadApp}
                    onChange={() => handleCheckboxChange('leadApp')}
                  />
                  <div className="addon-info">
                    <strong>Digital Lead Scanner (2 Mobile Licenses)</strong>
                    <span>Scan visitor & buyer badges directly for CRM export</span>
                  </div>
                  <span className="addon-cost">+$150</span>
                </label>

                <label className="addon-item">
                  <input
                    type="checkbox"
                    checked={addons.catalogueAd}
                    onChange={() => handleCheckboxChange('catalogueAd')}
                  />
                  <div className="addon-info">
                    <strong>Full-Page IndiGlobal Show Directory Ad</strong>
                    <span>Printed in 25,000+ attendee guidebooks & PDF catalog</span>
                  </div>
                  <span className="addon-cost">+$400</span>
                </label>
              </div>

              <div className="cost-summary-box">
                <div className="summary-row">
                  <span>Selected Stall ({activeOption.dimensions}):</span>
                  <strong>${activeOption.basePrice}</strong>
                </div>
                <div className="summary-row">
                  <span>Add-ons Total:</span>
                  <strong>${calculateTotal() - activeOption.basePrice}</strong>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span>Estimated Total:</span>
                  <span className="total-amount">${calculateTotal()} USD</span>
                </div>
                <small className="tax-note">* Taxes as applicable. Flexible payment schedule available (40% advance).</small>
              </div>

              <div className="cost-whatsapp-shortcut">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-block"
                >
                  <i className="fa-brands fa-whatsapp"></i> Inquire This Config on WhatsApp
                </a>
              </div>
            </div>

            {/* Exhibitor Form */}
            <div className="reg-form-card">
              <div className="form-intro">
                <h3>Submit Space Booking Contract Request</h3>
                <p>Lock in this configuration and receive the formal floorplan allotment map.</p>
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
                    <label htmlFor="ex-comp">Exhibiting Hospital / Company Legal Name *</label>
                    <input
                      type="text"
                      id="ex-comp"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. MedTech Global / Apex Health Group"
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
                      placeholder="expo@medtechglobal.com"
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
                      placeholder="https://www.medtechglobal.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ex-sector">Pavilion Hall Preference *</label>
                    <select
                      id="ex-sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      required
                    >
                      <option value="healthcare-facilities">Hall 6: Healthcare Facilities & Hospital Infrastructure (Featured)</option>
                      <option value="apis">Hall 1-2: APIs & Fine Chemicals</option>
                      <option value="finished">Hall 3: Finished Dosages & Formulations</option>
                      <option value="machinery">Hall 4: Pharma Machinery & Cleanroom</option>
                      <option value="packaging">Hall 5: Packaging & Delivery Systems</option>
                    </select>
                  </div>
                  <div className="form-group col-full">
                    <label htmlFor="ex-notes">Stall Positioning & Technical Requirements</label>
                    <textarea
                      id="ex-notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Hospital equipment setup requirements, heavy machinery power, corner preference, etc."
                    ></textarea>
                  </div>
                </div>

                <div className="form-actions-split">
                  <button type="submit" className="btn btn-primary btn-block">
                    <i className="fa-solid fa-file-signature"></i> Request Formal Allotment & Invoice
                  </button>
                  <a
                    href={getWhatsAppBookingUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-block"
                  >
                    <i className="fa-brands fa-whatsapp"></i> Book via WhatsApp ({CONTACT_CONFIG.exhibitor.display})
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
