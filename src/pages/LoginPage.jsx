import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ADMIN_CREDENTIALS, DEMO_VISITOR, DEMO_EXHIBITOR } from '../context/AuthContext';

export default function LoginPage({ onNotify }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        onNotify(
          'Login Successful!',
          `Welcome back, ${res.user.name}. You are logged in as ${res.user.role.toUpperCase()}.`
        );
        if (res.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const handleQuickLogin = (demoUser) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setError('');
    const res = login(demoUser.email, demoUser.password);
    if (res.success) {
      onNotify(
        'Quick Login Successful!',
        `Logged in as ${res.user.name} (${res.user.role.toUpperCase()}).`
      );
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="page-wrapper">
      <section className="page-header">
        <div className="container">
          <span className="tag">Portal Access</span>
          <h1>Sign In to Your Expo Account</h1>
          <p>
            Access your verified trade credentials, exhibitor booth allocation agreements, or
            organizer management controls.
          </p>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          <div className="auth-box-container">
            <div className="auth-card">
              <div className="auth-header">
                <div className="auth-logo-badge">
                  <i className="fa-solid fa-lock text-primary"></i>
                </div>
                <h2>Account Sign In</h2>
                <p>Enter your registered email and password to continue</p>
              </div>

              {error && (
                <div className="auth-error-banner">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="login-email">Email Address</label>
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
                      <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Quick Demo Credentials Assistant */}
              <div className="quick-demo-accounts">
                <div className="demo-header-tag">
                  <i className="fa-solid fa-bolt text-primary"></i> 1-Click Fast Demo Logins:
                </div>
                <div className="demo-buttons-grid">
                  <button
                    type="button"
                    className="demo-btn admin-demo"
                    onClick={() => handleQuickLogin(ADMIN_CREDENTIALS)}
                  >
                    <div className="demo-btn-title">
                      <i className="fa-solid fa-shield-halved"></i> Admin Portal
                    </div>
                    <small>{ADMIN_CREDENTIALS.email}</small>
                  </button>

                  <button
                    type="button"
                    className="demo-btn"
                    onClick={() => handleQuickLogin(DEMO_VISITOR)}
                  >
                    <div className="demo-btn-title">
                      <i className="fa-regular fa-user"></i> Trade Visitor
                    </div>
                    <small>{DEMO_VISITOR.email}</small>
                  </button>

                  <button
                    type="button"
                    className="demo-btn"
                    onClick={() => handleQuickLogin(DEMO_EXHIBITOR)}
                  >
                    <div className="demo-btn-title">
                      <i className="fa-solid fa-store"></i> Exhibitor Rep
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
