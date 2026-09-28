import { useState } from 'react';

const tiers = [
  {
    name: 'Title Partner',
    badge: 'Exclusive (1 Spot)',
    investment: '$28,000 / ₹22,50,000',
    popular: false,
    perks: [
      'Top-tier branding across all event marketing & main entrance arch',
      '36 sq.m Bare Island Pavilion in prime Hall 1 position',
      '20-minute opening plenary keynote address',
      '10 All-Access VIP Executive Passes & private dining suite',
      'Front cover branding on 15,000 official exhibition guidebooks',
      'Exclusive co-branding on official visitor lanyard ribbon',
    ],
  },
  {
    name: 'Platinum Partner',
    badge: '3 Opportunities',
    investment: '$18,000 / ₹14,50,000',
    popular: true,
    perks: [
      'Co-host of the Global Pharma Gala Dinner & Networking Cocktail',
      '24 sq.m Prime 2-side open pavilion booth',
      'Panel speaking slot in specialized Innovation Track',
      '6 All-Access VIP Executive Passes',
      'Full-page prime color ad in the official show guide',
      'Digital banner spotlight on mobile app and registration portal',
    ],
  },
  {
    name: 'Gold Partner',
    badge: '5 Opportunities',
    investment: '$11,000 / ₹9,00,000',
    popular: false,
    perks: [
      'Exclusive branding of the B2B Buyer-Seller Matchmaking Hub',
      '18 sq.m Shell scheme booth with priority placement',
      'Logo on conference stage backdrops and registration email passes',
      '4 All-Access VIP Passes',
      'Dedicated email broadcast to 25,000+ pre-registered buyers',
    ],
  },
  {
    name: 'Silver / Track Partner',
    badge: '10 Opportunities',
    investment: '$6,500 / ₹5,25,000',
    popular: false,
    perks: [
      'Sponsorship of 1 technical conference track session',
      '12 sq.m Shell Scheme exhibition stall',
      'Logo placement on website, physical banners, and badges',
      '2 All-Access VIP Passes',
      'Distribution of corporate literature in delegate bags',
    ],
  },
];

export default function SponsorshipPage({ onNotify }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    tier: 'Platinum Partner',
    message: '',
  });

  const [downloadingDeck, setDownloadingDeck] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownloadDeck = () => {
    setDownloadingDeck(true);
    setTimeout(() => {
      setDownloadingDeck(false);
      onNotify(
        'Sponsorship Deck Dispatched!',
        'The comprehensive 24-page PDF Sponsorship Prospectus and floorplan inventory has been dispatched for download.'
      );
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNotify(
      'Partnership Inquiry Received!',
      `Thank you, ${formData.name}. Our Partnerships Director will contact you and "${formData.company}" regarding the ${formData.tier} package within 4 business hours.`
    );
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      tier: 'Platinum Partner',
      message: '',
    });
  };

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">Brand Visibility</span>
          <h1>Sponsorship Deck & Corporate Partnerships</h1>
          <p>
            Position your organization as an elite market pioneer in front of 25,000+ key decision-makers,
            procurement executives, and regulatory ministers.
          </p>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          {/* Deck Download Quick Bar */}
          <div className="deck-quick-bar">
            <div>
              <h3>Looking for the Full Sponsorship & Media Kit?</h3>
              <p>Download the complete prospectus including stage specs, attendee demographics, and bespoke options.</p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDownloadDeck}
              disabled={downloadingDeck}
            >
              {downloadingDeck ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Generating PDF...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-file-arrow-down"></i> Download 2026 Deck (PDF)
                </>
              )}
            </button>
          </div>

          {/* Tier Cards */}
          <div className="sponsorship-tiers-grid">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`tier-card ${tier.popular ? 'featured-tier' : ''}`}
              >
                {tier.popular && <div className="popular-badge">Top Recommendation</div>}
                <div className="tier-header">
                  <span className="tier-badge-label">{tier.badge}</span>
                  <h3>{tier.name}</h3>
                  <div className="tier-investment">{tier.investment}</div>
                </div>

                <ul className="tier-perks">
                  {tier.perks.map((perk, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-circle-check text-primary"></i>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`btn btn-block ${tier.popular ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, tier: tier.name }));
                    const target = document.getElementById('sponsor-inquiry');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Inquire for {tier.name}
                </button>
              </div>
            ))}
          </div>

          {/* Special Branding Assets */}
          <div className="section-header mt-5">
            <span className="tag">Targeted Impact</span>
            <h2>Exclusive Branding Inventory</h2>
            <p>Stand out in high-footfall expo touchpoints with standalone sponsorship assets.</p>
          </div>

          <div className="grid-4-cols">
            <div className="inventory-card">
              <i className="fa-solid fa-id-badge inventory-icon"></i>
              <h4>Official Lanyard & Badges</h4>
              <p>Your corporate logo printed on 25,000+ visitor lanyards worn throughout all 3 days.</p>
              <div className="inventory-cost">$8,500 / Exclusive</div>
            </div>

            <div className="inventory-card">
              <i className="fa-solid fa-wifi inventory-icon"></i>
              <h4>Visitor Wi-Fi Portal</h4>
              <p>Branded captive portal splash page every time an attendee connects to high-speed hall Wi-Fi.</p>
              <div className="inventory-cost">$6,000 / Exclusive</div>
            </div>

            <div className="inventory-card">
              <i className="fa-solid fa-mug-hot inventory-icon"></i>
              <h4>VIP Networking Lounge</h4>
              <p>Naming rights, cup branding, and roll-ups in the executive lounge where delegates conduct private talks.</p>
              <div className="inventory-cost">$7,200 / Exclusive</div>
            </div>

            <div className="inventory-card">
              <i className="fa-solid fa-bag-shopping inventory-icon"></i>
              <h4>Delegate Welcome Bags</h4>
              <p>Eco-friendly branded totes distributed at all entrance registration desks to every visitor.</p>
              <div className="inventory-cost">$5,500 / Exclusive</div>
            </div>
          </div>

          {/* Inquire Form */}
          <div className="sponsor-form-wrapper" id="sponsor-inquiry">
            <div className="reg-form-card">
              <div className="form-intro">
                <h3>Submit Partnership Inquiry</h3>
                <p>Discuss customized benefits, bespoke stage integrations, or reserve a tier.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="sp-name">Full Name *</label>
                    <input
                      type="text"
                      id="sp-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Marcus Sterling"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sp-comp">Company / Brand *</label>
                    <input
                      type="text"
                      id="sp-comp"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Genix Therapeutics"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sp-email">Corporate Email *</label>
                    <input
                      type="email"
                      id="sp-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="marcus@genixrx.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sp-phone">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      id="sp-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 234-5678"
                      required
                    />
                  </div>
                  <div className="form-group col-full">
                    <label htmlFor="sp-tier">Tier of Interest *</label>
                    <select
                      id="sp-tier"
                      name="tier"
                      value={formData.tier}
                      onChange={handleChange}
                      required
                    >
                      <option value="Title Partner">Title Partner ($28,000)</option>
                      <option value="Platinum Partner">Platinum Partner ($18,000)</option>
                      <option value="Gold Partner">Gold Partner ($11,000)</option>
                      <option value="Silver / Track Partner">Silver / Track Partner ($6,500)</option>
                      <option value="Custom Branding Asset">Specific Branding Asset / Custom Package</option>
                    </select>
                  </div>
                  <div className="form-group col-full">
                    <label htmlFor="sp-msg">Specific Goals or Requests</label>
                    <textarea
                      id="sp-msg"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your brand objective, stage presentation interests, or co-hosting preferences..."
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-4">
                  <i className="fa-solid fa-paper-plane"></i> Submit Sponsorship Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
