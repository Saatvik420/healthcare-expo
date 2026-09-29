import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Smooth initial load animation
    const timer = setTimeout(() => {
      setFading(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(removeTimer);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`global-loading-screen ${fading ? 'fade-out' : ''}`}>
      <div className="loader-inner-container">
        {/* Animated Pulsing Logo Symbol */}
        <div className="loader-logo-ring">
          <div className="loader-pulse-bubble"></div>
          <div className="loader-icon-box">
            <i className="fa-solid fa-hospital-user"></i>
          </div>
        </div>

        <div className="loader-brand-details">
          <h2 className="loader-title">The Global Healthcare Expo 2027</h2>
          <span className="loader-subtitle">
            Bangkok, Thailand &bull; Under the Aegis of India–ASEAN Global Confluence
          </span>
        </div>

        {/* Progress Bar Line */}
        <div className="loader-progress-track">
          <div className="loader-progress-bar"></div>
        </div>

        <div className="loader-theme-caption">
          <span>&ldquo;Connecting Healthcare Markets. Driving Innovation.&rdquo;</span>
        </div>
      </div>
    </div>
  );
}
