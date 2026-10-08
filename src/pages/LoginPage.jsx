import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ADMIN_CREDENTIALS, DEMO_VISITOR, DEMO_EXHIBITOR } from '../context/AuthContext';

export default function LoginPage({ onNotify }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('visitor'); // 'visitor' | 'exhibitor'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        if (res.user.role === 'admin') {
          onNotify(
            'Admin Authenticated!',
            `Welcome Expo Director. The Admin Dashboard is now unlocked in your navigation.`
          );
          navigate('/admin');
        } else {
          onNotify(
            'Login Successful!',
            `Welcome back, ${res.user.name}. You are logged in as ${res.user.role.toUpperCase()}.`
          );
          navigate('/dashboard');
        }
      } else {
        setError(res.message);
      }
    } catch {
      setLoading(false);
      setError('An unexpected error occurred during login. Please try again.');
    }
  };

  const handleFillCredentials = (creds) => {
    setEmail(creds.email);
    setPassword(creds.password);
    setError('');
  };

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">Portal Access</span>
          <h1>Sign In to Your Expo Account</h1>
          <p>
            Log in as a Trade Visitor, Exhibitor, or Exhibition Secretariat Administrator.
          </p>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          <div className="auth-box-container">
            <div className="auth-card">
              {/* Role Selection Tabs: Visitor vs Exhibitor */}
              <div className="login-role-tabs">
                <button
                  type="button"
                  className={`login-role-tab ${activeTab === 'visitor' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('visitor');
                    setError('');
                  }}
                >
                  <i className="fa-regular fa-id-card"></i> Visitor Login
                </button>
                <button
                  type="button"
                  className={`login-role-tab ${activeTab === 'exhibitor' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('exhibitor');
                    setError('');
                  }}
                >
                  <i className="fa-solid fa-store"></i> Exhibitor Login
                </button>
              </div>

              <div className="auth-header">
                <div className="auth-logo-badge">
                  <i
                    className={`fa-solid ${
                      activeTab === 'visitor' ? 'fa-id-card' : 'fa-store'
                    } text-primary`}
                  ></i>
                </div>
                <h2>
                  {activeTab === 'visitor' ? 'Trade Visitor Login' : 'Exhibitor Portal Login'}
                </h2>
                <p>
                  {activeTab === 'visitor'
                    ? 'Enter your visitor account credentials or administrator login.'
                    : 'Enter your exhibitor booth account credentials or administrator login.'}
                </p>
              </div>

              {error && (
                <div className="auth-error-banner">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="login-email">
                    {activeTab === 'visitor' ? 'Visitor / Admin Email' : 'Exhibitor / Admin Email'}
                  </label>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-envelope input-icon"></i>
                    <input
                      type="email"
                      id="login-email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="label-with-link">
                    <label htmlFor="login-password">Password</label>
                    <span className="forgot-password-link">Forgot password?</span>
                  </div>
                  <div className="input-with-icon">
                    <i className="fa-solid fa-key input-icon"></i>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="login-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Authenticating...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In to Portal
                    </>
                  )}
                </button>
              </form>

              {/* Secretariat Admin Access Callout */}
              <div className="admin-access-hint-card">
                <div className="hint-card-title">
                  <i className="fa-solid fa-shield-halved text-primary"></i>
                  <span>Secretariat Administrator Access</span>
                </div>
                <p className="hint-card-desc">
                  Entering Admin credentials in <strong>either Visitor or Exhibitor login</strong> unlocks the hidden <strong>Admin Dashboard</strong> in the top navigation.
                </p>
                <div className="hint-creds-row">
                  <span className="cred-chip">
                    <strong>Admin ID:</strong> <code>{ADMIN_CREDENTIALS.email}</code>
                  </span>
                  <span className="cred-chip">
                    <strong>Password:</strong> <code>{ADMIN_CREDENTIALS.password}</code>
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-xs admin-autofill-btn"
                  onClick={() => handleFillCredentials(ADMIN_CREDENTIALS)}
                >
                  <i className="fa-solid fa-key"></i> Pre-fill Admin Credentials
                </button>
              </div>

              {/* Fast Demo Logins */}
              <div className="quick-demo-accounts">
                <div className="demo-header-tag">
                  <i className="fa-solid fa-bolt text-primary"></i> Fast Account Selector:
                </div>
                <div className="demo-buttons-grid">
                  <button
                    type="button"
                    className="demo-btn"
                    onClick={() => {
                      setActiveTab('visitor');
                      handleFillCredentials(DEMO_VISITOR);
                    }}
                  >
                    <div className="demo-btn-title">
                      <i className="fa-regular fa-user"></i> Demo Visitor
                    </div>
                    <small>{DEMO_VISITOR.email}</small>
                  </button>

                  <button
                    type="button"
                    className="demo-btn"
                    onClick={() => {
                      setActiveTab('exhibitor');
                      handleFillCredentials(DEMO_EXHIBITOR);
                    }}
                  >
                    <div className="demo-btn-title">
                      <i className="fa-solid fa-store"></i> Demo Exhibitor
                    </div>
                    <small>{DEMO_EXHIBITOR.email}</small>
                  </button>
                </div>
              </div>

              <div className="auth-footer-prompt">
                <span>Don't have an expo account yet?</span>{' '}
                <Link to="/signup" className="auth-action-link">
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
