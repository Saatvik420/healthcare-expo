import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteTopLoader() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Asynchronously trigger smooth progress bar on route change
    const t0 = setTimeout(() => {
      setVisible(true);
      setProgress(35);
    }, 10);

    const t1 = setTimeout(() => {
      setProgress(75);
    }, 120);

    const t2 = setTimeout(() => {
      setProgress(100);
    }, 280);

    const t3 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname, location.search]);

  if (!visible && progress === 0) return null;

  return (
    <div className="route-top-loader-container">
      <div
        className="route-top-loader-bar"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="route-top-loader-glow"></div>
      </div>
    </div>
  );
}
