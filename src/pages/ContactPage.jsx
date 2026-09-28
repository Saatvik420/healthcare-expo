import { useState } from 'react';
import { CONTACT_CONFIG, getWhatsAppUrl } from '../config/contactConfig';

export default function ContactPage({ onNotify }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'general',
    subject: '',
    message: '',
  });

  const [activeFaq, setActiveFaq] = useState(null);

  const contactFaqs = [
    {
      q: 'Do international exhibitors and visitors get an official Visa Invitation Letter?',
      a: 'Yes. Once your booth booking agreement or VIP delegate pass is confirmed, our Secretariat issues an official Ministry-approved Indian Conference Visa Invitation Letter along with necessary clearance certificates.',
    },
    {
      q: 'Is there parking available inside Pragati Maidan complex?',
      a: 'Yes, multi-level basement car parking with direct escalator access to Halls 1–5 is accessible via Gate 4 and Gate 10. Designated parking passes are provided to all exhibiting companies.',
    },
    {
      q: 'Can our company ship machinery and booth materials prior to the setup date?',
      a: 'Our official on-site logistics and freight forwarder provides bonded warehousing and customs clearance right inside Pragati Maidan starting 10 days before the setup window.',
    },
    {
      q: 'Are wheelchairs and special accessibility accommodations provided?',
      a: 'Yes, Pragati Maidan is fully barrier-free. Wheelchairs and buggy shuttle carts between gates and exhibition halls are provided complimentary at Helpdesk Gate 4.',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNotify(
      'Message Received!',
      `Thank you, ${formData.name}. Your inquiry regarding "${formData.subject || 'Expo Participation'}" has been forwarded to the appropriate desk. A representative will contact you at ${formData.email} within 24 hours.`
    );
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      inquiryType: 'general',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">Support & Assistance</span>
          <h1>Contact Desk & Venue Logistics</h1>
          <p>
            Have inquiries regarding booth allocation, travel arrangements, or visa documentation?
            Our organizing secretariat and dedicated helpdesk teams are at your disposal.
          </p>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          {/* Quick Contact Cards */}
          <div className="contact-cards-grid">
            <div className="contact-info-card">
              <div className="contact-card-icon">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <h3>Exhibitor Secretariat</h3>
              <p>For stall bookings, floorplan layout allotments, and sponsorship packages.</p>
              <div className="contact-meta">
                <div><i className="fa-brands fa-whatsapp text-whatsapp"></i> <strong>{CONTACT_CONFIG.exhibitor.display}</strong> (WhatsApp)</div>
                <div><i className="fa-solid fa-phone"></i> {CONTACT_CONFIG.general.landline}</div>
                <div><i className="fa-solid fa-envelope"></i> {CONTACT_CONFIG.general.exhibitorEmail}</div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <a
                  href={getWhatsAppUrl('exhibitor', 'Hello IndiGlobal Exhibitor Secretariat, I am interested in booking an exhibitor stall for India-ASEAN Global Confluence 2027.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-whatsapp btn-block"
                >
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp Exhibitor Desk
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon">
                <i className="fa-solid fa-id-card-clip"></i>
              </div>
              <h3>Visitor & Delegate Desk</h3>
              <p>For visitor badge assistance, group delegations, and matchmaking appointments.</p>
              <div className="contact-meta">
                <div><i className="fa-brands fa-whatsapp text-whatsapp"></i> <strong>{CONTACT_CONFIG.visitor.display}</strong> (WhatsApp)</div>
                <div><i className="fa-solid fa-envelope"></i> {CONTACT_CONFIG.general.visitorEmail}</div>
                <div><i className="fa-solid fa-circle-question"></i> Helpdesk at Gate 4 & Gate 10</div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <a
                  href={getWhatsAppUrl('visitor', 'Hello IndiGlobal Visitor Desk, I need assistance regarding my trade visitor pass for India-ASEAN Global Confluence 2027.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-whatsapp btn-block"
                >
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp Visitor Desk
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon">
                <i className="fa-solid fa-plane-departure"></i>
              </div>
              <h3>International Travel & Visa</h3>
              <p>Assistance with Indian Conference Visa letters, hotel bookings, and airport transfers.</p>
              <div className="contact-meta">
                <div><i className="fa-solid fa-passport"></i> visa@globalhealthcareexpo.com</div>
                <div><i className="fa-solid fa-hotel"></i> concierge@globalhealthcareexpo.com</div>
                <div><i className="fa-solid fa-shield-halved"></i> Fast-track official documentation</div>
              </div>
            </div>
          </div>

          {/* Form and Venue Info Split */}
          <div className="contact-main-grid">
            {/* Form */}
            <div className="reg-form-card">
              <div className="form-intro">
                <h3>Send Us an Inquiry</h3>
                <p>Fill out the form below and our relevant department head will respond promptly.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="ct-name">Your Full Name *</label>
                    <input
                      type="text"
                      id="ct-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rachel Chen"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-email">Official Email Address *</label>
                    <input
                      type="email"
                      id="ct-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rachel@biovance.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-phone">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="ct-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-org">Organization / Company</label>
                    <input
                      type="text"
                      id="ct-org"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="e.g. Biovance Laboratories"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-type">Inquiry Classification *</label>
                    <select
                      id="ct-type"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="general">General Information</option>
                      <option value="stall">Exhibit Stall Allotment</option>
                      <option value="visitor">Visitor Pass & Badges</option>
                      <option value="sponsor">Sponsorship & Advertising</option>
                      <option value="visa">Visa Invitation Letter</option>
                      <option value="press">Press & Media Accreditation</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-sub">Subject *</label>
                    <input
                      type="text"
                      id="ct-sub"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Visa request for 4 delegates"
                      required
                    />
                  </div>
                  <div className="form-group col-full">
                    <label htmlFor="ct-msg">Your Message *</label>
                    <textarea
                      id="ct-msg"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide details of your inquiry..."
                      required
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-4">
                  <i className="fa-solid fa-paper-plane"></i> Transmit Message
                </button>
              </form>
            </div>

            {/* Venue Location & Transport Guide */}
            <div className="venue-guide-card">
              <div className="venue-guide-header">
                <i className="fa-solid fa-location-dot venue-pin-icon"></i>
                <div>
                  <h3>Exhibition Center & Venue</h3>
                  <p>International Exhibition-cum-Convention Centre (IECC), Pragati Maidan</p>
                </div>
              </div>

              <div className="venue-address-box">
                <strong>Address:</strong>
                <p>Pragati Maidan, Mathura Road, New Delhi, Delhi 110002, India</p>
                <div className="venue-halls-tag">Halls 1, 2, 3, 4, 5 (Integrated Ground Floor)</div>
              </div>

              <div className="transport-options">
                <h4>Transit & Commute Directions:</h4>
                <div className="transit-item">
                  <i className="fa-solid fa-train-subway transit-icon"></i>
                  <div>
                    <strong>Delhi Metro (Fastest):</strong>
                    <p>Supreme Court Station (Blue Line) - Direct skywalk access to Gate 10.</p>
                  </div>
                </div>

                <div className="transit-item">
                  <i className="fa-solid fa-plane-up transit-icon"></i>
                  <div>
                    <strong>From Indira Gandhi Intl Airport (DEL):</strong>
                    <p>18 km (approx. 35 mins via Airport Express Metro or Pre-paid Taxi).</p>
                  </div>
                </div>

                <div className="transit-item">
                  <i className="fa-solid fa-hotel transit-icon"></i>
                  <div>
                    <strong>Official Accommodation Partners:</strong>
                    <p>Shangri-La Eros, The Lalit, and Taj Mahal Hotel offer dedicated expo shuttle buses.</p>
                  </div>
                </div>
              </div>

              <div className="venue-map-preview">
                <iframe
                  title="Pragati Maidan Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14010.536762391696!2d77.23547849688172!3d28.618244249117366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce32a39281a81%3A0xe2dc8ef7c703b4ee!2sBharat%20Mandapam%20(IECC)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="180"
                  style={{ border: 0, borderRadius: '8px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact FAQs */}
          <div className="contact-faqs-section">
            <div className="section-header">
              <span className="tag">Logistics Help</span>
              <h2>Venue & Accommodation FAQ</h2>
            </div>

            <div className="faq-container">
              {contactFaqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div className={`faq-item ${isOpen ? 'open' : ''}`} key={index}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                    >
                      <span>{faq.q}</span>
                      <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </button>
                    {isOpen && <div className="faq-answer">{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
