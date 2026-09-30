import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function SignupPage({ onNotify }) {
  const { signup } = useAuth();
  const { addVisitor, addExhibitor } = useData();
  const navigate = useNavigate();

  const [role, setRole] = useState('visitor');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    designation: '',
    sector: 'apis',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    try {
      const passCode = 'GHE-2026-' + Math.floor(100000 + Math.random() * 900000);

      const signupPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.company,
        company: formData.company,
        designation: formData.designation,
        sector: formData.sector,
        role: role,
        passCode: passCode,
        password: formData.password,
      };

      const result = await signup(signupPayload);
      setLoading(false);

      if (result.success) {
        // Also register in Expo Data Context
        if (role === 'visitor') {
          addVisitor({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            organization: formData.company,
            designation: formData.designation,
            sector: formData.sector,
            sectorLabel:
              formData.sector === 'apis'
                ? 'APIs & Fine Chemicals'
                : formData.sector === 'finished'
                ? 'Finished Formulations'
                : formData.sector === 'machinery'
                ? 'Pharma Machinery'
                : 'Packaging Systems',
            passType: 'standard',
            passCode: passCode,
          });
        } else {
          addExhibitor({
            company: formData.company,
            contactPerson: formData.name,
            designation: formData.designation,
            email: formData.email,
            phone: formData.phone,
            stallType: '9 sq.m Shell Scheme',
            hall: 'Pavilion Hall ' + (formData.sector === 'apis' ? '1-2' : formData.sector === 'finished' ? '3' : formData.sector === 'machinery' ? '4' : '5'),
            amount: '$2,600',
            notes: 'Registered via Exhibitor account signup.',
          });
        }

        onNotify(
          'Account Created Successfully!',
          `Welcome to The Global Healthcare Expo, ${formData.name}! Your account has been registered with ${role.toUpperCase()} privileges.`
        );

        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } catch {
      setLoading(false);
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">New Registration</span>
          <h1>Create Your Expo Account</h1>
          <p>
            Join 25,000+ verified trade attendees, procurement directors, and international exhibiting
            organizations.
          </p>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          <div className="auth-box-container wide-box">
            <div className="auth-card">
              <div className="auth-header">
                <h2>Select Your Participation Role</h2>
                <p>Tailor your expo portal features according to your primary business objective</p>
              </div>

              {/* Role Selector Tabs */}
              <div className="signup-role-selector">
                <button
                  type="button"
                  className={`role-option-btn ${role === 'visitor' ? 'selected' : ''}`}
                  onClick={() => setRole('visitor')}
                >
                  <div className="role-btn-icon">
                    <i className="fa-regular fa-user"></i>
                  </div>
                  <div>
                    <strong>Trade Visitor / Delegate</strong>
                    <span>Source products, attend tech keynotes & network</span>
                  </div>
                  <i className="fa-solid fa-circle-check check-indicator"></i>
                </button>

                <button
                  type="button"
                  className={`role-option-btn ${role === 'exhibitor' ? 'selected' : ''}`}
                  onClick={() => setRole('exhibitor')}
                >
                  <div className="role-btn-icon">
                    <i className="fa-solid fa-store"></i>
                  </div>
                  <div>
                    <strong>Exhibiting Company</strong>
                    <span>Book stalls, manage booth staff & capture leads</span>
                  </div>
                  <i className="fa-solid fa-circle-check check-indicator"></i>
                </button>
              </div>

              {error && (
                <div className="auth-error-banner">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="auth-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="su-name">Full Representative Name *</label>
                    <input
                      type="text"
                      id="su-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Priya Nair"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="su-comp">
                      {role === 'visitor' ? 'Company / Institution Name *' : 'Exhibiting Legal Company Name *'}
                    </label>
                    <input
                      type="text"
                      id="su-comp"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. MedVance Laboratories"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="su-email">Professional Business Email *</label>
                    <input
                      type="email"
                      id="su-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="priya@medvance.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="su-phone">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      id="su-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="su-desig">Designation / Role Title</label>
                    <input
                      type="text"
                      id="su-desig"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. Head of Sourcing"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="su-sector">Primary Sector Focus *</label>
                    <select
                      id="su-sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      required
                    >
                      <option value="apis">APIs, Intermediates & Fine Chemicals</option>
                      <option value="finished">Finished Formulations & Generic Drugs</option>
                      <option value="machinery">Pharma Processing Machinery & Equipment</option>
                      <option value="packaging">Packaging Materials & Medical Devices</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="su-pass">Create Account Password *</label>
                    <input
                      type="password"
                      id="su-pass"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="At least 6 characters"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="su-cpass">Confirm Password *</label>
                    <input
                      type="password"
                      id="su-cpass"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>

                <div className="terms-checkbox-wrapper">
                  <label>
                    <input type="checkbox" required />
                    <span>
                      I agree to the Expo Terms of Service, Exhibition Code of Conduct, and Privacy
                      Policy.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Initializing Account...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-user-plus"></i> Complete Registration & Open Portal
                    </>
                  )}
                </button>
              </form>

              <div className="auth-footer-prompt">
                <span>Already have an account?</span>{' '}
                <Link to="/login" className="auth-action-link">
                  Sign In Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
