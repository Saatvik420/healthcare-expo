import { useState } from 'react';
import { getWhatsAppUrl } from '../config/contactConfig';

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
      q: 'How do I register for an official trade visitor badge?',
      a: 'Trade visitors can pre-register online via our Registration Portal or register directly in 1-click through our official WhatsApp helpdesk (+91 7357590375) to receive an e-badge.',
    },
    {
      q: 'How can our company book an exhibition booth or pavilion space?',
      a: 'Exhibitors can reserve standard shell scheme booths or custom bare pavilion spaces through our Book Stall portal or by contacting the Exhibitor Secretariat at info@indiglobalexpo.com.',
    },
    {
      q: 'Are speaking and panel presentation opportunities available at the conference?',
      a: 'Yes. Healthcare leaders, hospital administrators, medical technologists, and clinical researchers interested in keynote or panel speaking opportunities can submit an inquiry directly to our Secretariat.',
    },
    {
      q: 'What are the official dates and venue for The Global Healthcare Expo 2027?',
      a: 'The Global Healthcare Expo 2027 will take place on 21st and 22nd January 2027 in Bangkok, Thailand, held under the prestigious India-ASEAN Global Confluence in collaboration with GTTCI & Asepsis Marketing.',
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
      `Thank you, ${formData.name}. Your inquiry regarding "${formData.subject || 'Expo Participation'}" has been forwarded to our Secretariat. A representative will contact you at ${formData.email} within 24 hours.`
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
          <h1>Contact Desk</h1>
          <p>
            Have inquiries regarding booth allocation, visiting the exhibition, conference participation and speaking opportunities?
          </p>
          <p>
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
              <p>For stall bookings, floorplan layout allotments, and exhibition packages.</p>
              <div className="contact-meta">
                <div><i className="fa-solid fa-envelope"></i> info@indiglobalexpo.com</div>
                <div><i className="fa-solid fa-phone"></i> +91 7357590375</div>
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <a
                  href={getWhatsAppUrl('exhibitor', 'Hello IndiGlobal Exhibitor Secretariat, I am interested in booking an exhibitor stall for India-ASEAN Global Confluence 2027 in Bangkok, Thailand.')}
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
                <div><i className="fa-solid fa-envelope"></i> info@indiglobalexpo.com</div>
                <div><i className="fa-solid fa-phone"></i> +91 7357590375</div>
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <a
                  href={getWhatsAppUrl('visitor', 'Hello IndiGlobal Visitor Desk, I need assistance regarding my trade visitor pass for India-ASEAN Global Confluence 2027 in Bangkok, Thailand.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-whatsapp btn-block"
                >
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp Visitor Desk
                </a>
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
                      placeholder="rachel@hospitalgroup.com"
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
                      placeholder="e.g. Medical Care Solutions"
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
                      <option value="speaking">Conference & Speaking Opportunities</option>
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
                      placeholder="e.g. Booth booking inquiry or speaking opportunity"
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

            {/* Event Location & Secretariat Guide */}
            <div className="venue-guide-card">
              <div className="venue-guide-header">
                <i className="fa-solid fa-location-dot venue-pin-icon"></i>
                <div>
                  <h3>Official Venue & Dates</h3>
                  <p>Bangkok, Thailand &bull; 21st & 22nd January 2027</p>
                </div>
              </div>

              <div className="venue-address-box">
                <strong>Event Location:</strong>
                <p>Bangkok, Thailand</p>
                <div className="venue-halls-tag">Under India-ASEAN Global Confluence 2027</div>
              </div>

              <div className="transport-options">
                <h4>Expo Secretariat Details:</h4>
                <div className="transit-item">
                  <i className="fa-solid fa-envelope transit-icon"></i>
                  <div>
                    <strong>Official Email:</strong>
                    <p>info@indiglobalexpo.com</p>
                  </div>
                </div>

                <div className="transit-item">
                  <i className="fa-solid fa-phone transit-icon"></i>
                  <div>
                    <strong>Direct Helpline / WhatsApp:</strong>
                    <p>+91 7357590375</p>
                  </div>
                </div>

                <div className="transit-item">
                  <i className="fa-solid fa-handshake transit-icon"></i>
                  <div>
                    <strong>Organized & Presented In Collaboration With:</strong>
                    <p>GTTCI (Global Trade & Technology Council of India) & Asepsis Marketing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact FAQs */}
          <div className="contact-faqs-section">
            <div className="section-header">
              <span className="tag">Help & Information</span>
              <h2>Frequently Asked Questions</h2>
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
