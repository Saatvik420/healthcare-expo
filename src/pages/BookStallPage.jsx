import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { SECTOR_OPTIONS } from '../config/sectorsData';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

const boothOptions = [
  {
    id: '9sqm',
    title: '9 sq.m Shell Scheme',
    badge: 'Standard',
    dimensions: '3m x 3m',
    basePrice: 2600,
    priceInr: '₹2,15,000',
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
    basePrice: 4200,
    priceInr: '₹3,45,000',
    popular: true,
    description: 'Bespoke turnkey suite tailored for pharma leaders, hospital chains, diagnostic networks, and healthcare technology showcases.',
    inclusions: [
      'Prime location in high-footfall pavilion',
      '1 Executive discussion lounge with 6 leather chairs',
      'LED display mounting bracket & reinforced walls',
      '2 High-capacity electrical feeds & Wi-Fi hub',
      '3 VIP India–ASEAN Buyer Delegation passes',
      'Feature profile in IndiGlobal Expo Directory',
    ],
  },
  {
    id: 'raw18',
    title: '18+ sq.m Raw Bare Space',
    badge: 'Custom Build',
    dimensions: 'Custom / Island',
    basePrice: 4800,
    priceInr: '₹3,95,000',
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

const exhibitorBenefits = [
  'Explore export & import opportunities across Thailand, ASEAN & international markets',
  'Connect with importers, distributors, agents, wholesalers and institutional buyers',
  'Identify potential distribution and market-entry partners for regional expansion',
  'Showcase pharmaceutical products, medical technologies, healthcare solutions & innovations',
  'Develop B2B partnerships, joint ventures, strategic alliances and technology collaborations',
  'Explore contract manufacturing, licensing, private labelling and sourcing partnerships',
  'Generate high-value qualified business leads and establish relationships with prospective buyers',
  'Understand emerging healthcare-market requirements and identify localization opportunities',
  'Build stronger commercial connections between Indian, ASEAN and global healthcare businesses',
  'Position your brand for long-term international growth and regional market development',
];

export default function BookStallPage({ onNotify }) {
  const [searchParams] = useSearchParams();
  const sectorParam = searchParams.get('sector') || 'pharmaceuticals';
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

  const activeOption = boothOptions.find((b) => b.id === selectedBooth) || boothOptions[1] || boothOptions[0];

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

  const getSectorLabel = (sectorId) => {
    const found = SECTOR_OPTIONS.find((s) => s.id === sectorId);
    return found ? found.label : sectorId;
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
      hall: getSectorLabel(formData.sector),
      amount: `$${calculateTotal()}`,
      notes: formData.notes || 'Booked via Online Exhibitor Registration Portal.',
    });

    onNotify(
      'Space Booking Request Submitted!',
      `Thank you, ${formData.contactPerson}. Your provisional stall booking for "${formData.company}" (${activeOption.title}) at The Global Healthcare Expo 2027 in Bangkok, Thailand has been recorded. Our floor manager will email the official contract and hall layout to ${formData.email} within 24 hours.`
    );
    setFormData({
      contactPerson: '',
      designation: '',
      company: '',
      email: '',
      phone: '',
      website: '',
      sector: 'pharmaceuticals',
      notes: '',
    });
  };

  const getWhatsAppBookingUrl = () => {
    const text = `Hello Global Healthcare Expo Team,\n\nI want to register as an Exhibitor and book a booth for The Global Healthcare Expo 2027 in Bangkok, Thailand (India–ASEAN Global Confluence).\n\nCompany: ${formData.company || 'Not specified'}\nContact Person: ${formData.contactPerson || 'Not specified'} (${formData.designation || 'Representative'})\nPhone: ${formData.phone || 'Not specified'}\nEmail: ${formData.email || 'Not specified'}\nSelected Package: ${activeOption.title} (${activeOption.dimensions})\nEstimated Cost: $${calculateTotal()} USD\nSector: ${getSectorLabel(formData.sector)}\n\nPlease share the available hall floorplan and allotment details on WhatsApp.`;
    return getWhatsAppUrl('exhibitor', text);
  };

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">
            <i className="fa-solid fa-calendar-days"></i> 21st &amp; 22nd January 2027 &bull; Bangkok, Thailand
          </span>
          <h1>Exhibitor Registration &amp; Booth Booking</h1>
          <p className="page-header-lead">
            <strong>The Global Healthcare Expo 2027</strong> &bull; Organised Under the Aegis of <strong>India–ASEAN Global Confluence 2027</strong>
          </p>
          <p className="page-header-sub">
            Position your company directly in front of 5,000+ international buyers, importers, hospital procurement leaders, and distributors.
            Select your desired booth format, calculate exact package inclusions, and reserve your exhibition space.
          </p>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          {/* Exhibitor Benefits Ribbon */}
          <div className="exhibitor-benefits-banner mb-4">
            <div className="benefits-banner-header">
              <span className="badge-tag">Why Exhibit?</span>
              <h3>Turn Exhibition Participation into Tangible Business Growth</h3>
              <p>Exhibitors can leverage The Global Healthcare Expo 2027 in Bangkok to:</p>
            </div>
            <div className="benefits-grid-compact">
              {exhibitorBenefits.slice(0, 6).map((benefit, i) => (
                <div className="benefit-item" key={i}>
                  <i className="fa-solid fa-circle-check text-primary"></i>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

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
              <i className="fa-brands fa-whatsapp"></i> Book Stall via WhatsApp
            </a>
          </div>

          {/* Step 1: Select Booth Size */}
          <div className="section-subtitle-bar">
            <div className="step-heading-row">
              <span className="step-badge">Step 1</span>
              <h3>Choose Booth Format &amp; Size</h3>
            </div>
            <span>All Shell Scheme booths include carpet, partition walls, electricals, furniture, and custom fascia lettering</span>
          </div>

          <div className="booth-options-grid">
            {boothOptions.map((booth) => {
              const isSelected = selectedBooth === booth.id;
              return (
                <div
                  key={booth.id}
                  className={`booth-option-card ${isSelected ? 'selected' : ''} ${booth.popular ? 'featured-booth' : ''}`}
                  onClick={() => setSelectedBooth(booth.id)}
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
                  <div className="booth-price">
                    <strong>${booth.basePrice}</strong>
                    <span className="inr-tag">{booth.priceInr}</span>
                  </div>
                  <p className="booth-desc">{booth.description}</p>

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
                        <i className="fa-solid fa-circle-check"></i> Selected Package
                      </>
                    ) : (
                      'Choose This Stall'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Step 2: Calculator & Form Grid */}
          <div className="section-subtitle-bar">
            <div className="step-heading-row">
              <span className="step-badge">Step 2</span>
              <h3>Configure Add-ons &amp; Request Allotment</h3>
            </div>
            <span>Calculate live package investment and submit your official hall space reservation</span>
          </div>

          <div className="booth-config-grid">
            {/* Addons & Live Cost Breakdown */}
            <div className="cost-breakdown-card">
              <h3>Custom Options &amp; Add-ons</h3>
              <p>Enhance your visibility with premium booth enhancements:</p>

              <div className="addons-list">
                <label className={`addon-item ${addons.cornerStall ? 'selected-addon' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addons.cornerStall}
                    onChange={() => handleCheckboxChange('cornerStall')}
                  />
                  <div className="addon-info">
                    <strong>Corner Stall (2-Side Open)</strong>
                    <span>Maximum foot traffic &amp; corner branding (+10% base cost)</span>
                  </div>
                  <span className="addon-cost">
                    +${Math.round(activeOption.basePrice * 0.1)}
                  </span>
                </label>

                <label className={`addon-item ${addons.extraPower ? 'selected-addon' : ''}`}>
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

                <label className={`addon-item ${addons.leadApp ? 'selected-addon' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addons.leadApp}
                    onChange={() => handleCheckboxChange('leadApp')}
                  />
                  <div className="addon-info">
                    <strong>Digital Lead Scanner (2 Mobile Licenses)</strong>
                    <span>Scan visitor &amp; buyer badges directly for CRM export</span>
                  </div>
                  <span className="addon-cost">+$150</span>
                </label>

                <label className={`addon-item ${addons.catalogueAd ? 'selected-addon' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addons.catalogueAd}
                    onChange={() => handleCheckboxChange('catalogueAd')}
                  />
                  <div className="addon-info">
                    <strong>Full-Page Official Show Directory Ad</strong>
                    <span>Printed in attendee guidebooks &amp; digital show directory</span>
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
                <small className="tax-note">* Taxes as applicable. Flexible payment schedule available (40% advance to lock booth).</small>
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
                <h3>Submit Space Booking Request</h3>
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
                  <div className="form-group col-full">
                    <label htmlFor="ex-notes">Special Requests / Requirements</label>
                    <textarea
                      id="ex-notes"
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. Near main pavilion entrance, corner requested, machinery demo planned..."
                    ></textarea>
                  </div>
                </div>

                <div className="booking-summary-footer">
                  <div className="footer-price-tag">
                    <span>Package Estimate:</span>
                    <strong>${calculateTotal()} USD</strong>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <i className="fa-solid fa-file-contract"></i> Reserve Booth Space
                  </button>
                </div>
              </form>

              <div className="visitor-redirect-banner mt-4">
                <h4>Attending as a Trade Visitor / Institutional Buyer Instead?</h4>
                <p>Register for a complimentary trade pass to browse pavilions and attend sessions.</p>
                <Link to="/visitor-registration" className="btn btn-outline btn-sm">
                  <i className="fa-solid fa-id-card"></i> Switch to Visitor Registration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
