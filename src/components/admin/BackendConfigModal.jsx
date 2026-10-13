/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { getApiBase, healthApi } from '../../services/api';

export default function BackendConfigModal({ isOpen, onClose, onSave, onNotify }) {
  const [urlInput, setUrlInput] = useState('');
  const [testState, setTestState] = useState({
    status: 'idle', // idle, testing, success, error
    message: '',
    latency: null,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('ghe_custom_api_url') || '';
        setUrlInput(stored || (import.meta.env.VITE_API_URL || ''));
      } catch {
        setUrlInput('');
      }
      setTestState({ status: 'idle', message: '', latency: null });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentActiveUrl = getApiBase();

  const handleTestConnection = async () => {
    let target = urlInput.trim();
    if (!target) {
      target = currentActiveUrl;
    }
    let clean = target.replace(/\/+$/, '');
    if (!clean.endsWith('/api')) clean += '/api';

    setTestState({
      status: 'testing',
      message: 'Connecting to backend... (If on Render free tier, waking up can take ~20-30s)',
      latency: null,
    });

    const startTime = performance.now();
    try {
      const res = await healthApi.check(clean);
      const elapsed = Math.round(performance.now() - startTime);

      if (res && res.isOnline) {
        setTestState({
          status: 'success',
          message: `Connected successfully! Database: ${res.database || 'Active'}`,
          latency: elapsed,
        });
      } else {
        setTestState({
          status: 'error',
          message: 'Server returned unreachable status. Check URL or verify Render service is running.',
          latency: elapsed,
        });
      }
    } catch (err) {
      setTestState({
        status: 'error',
        message: err.message || 'Connection failed. Please verify the URL and CORS headers.',
        latency: null,
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let clean = urlInput.trim().replace(/\/+$/, '');
      if (clean && !clean.endsWith('/api')) {
        clean = `${clean}/api`;
      }

      if (clean) {
        localStorage.setItem('ghe_custom_api_url', clean);
      } else {
        localStorage.removeItem('ghe_custom_api_url');
      }

      if (onSave) {
        await onSave(clean);
      }

      if (onNotify) {
        onNotify('Backend Connected', clean ? `Now connected to central backend: ${clean}` : 'Reset to default API resolution.');
      }
      onClose();
    } catch (err) {
      setTestState({
        status: 'error',
        message: 'Failed to save configuration: ' + err.message,
        latency: null,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    try {
      localStorage.removeItem('ghe_custom_api_url');
      setUrlInput('');
      if (onSave) await onSave('');
      if (onNotify) onNotify('Configuration Reset', 'Using default build / environment API URL.');
      onClose();
    } catch (err) {
      console.warn('Error resetting URL:', err);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="admin-modal admin-modal-md admin-modal-scrollable"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <div className="admin-modal-header">
          <div className="admin-modal-title-group">
            <span className="badge-preview-tag">
              <i className="fa-solid fa-cloud-arrow-up"></i> Cloud Deployment Link
            </span>
            <h3>Connect Render Backend to Netlify</h3>
            <p className="admin-modal-sub">
              Synchronize live blog articles, attendee registrations, and exhibitor bookings across all devices.
            </p>
          </div>
          <button
            type="button"
            className="admin-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSave} className="admin-modal-body">
          {/* Active Status Display */}
          <div className="backend-active-status-card mb-3">
            <div className="status-header-row">
              <span className="status-label">Current Active API:</span>
              <code className="active-url-code">{currentActiveUrl}</code>
            </div>
            <div className="status-explanation">
              All browser requests on this device will fetch and save data to this central endpoint.
            </div>
          </div>

          {/* Render URL Input */}
          <div className="form-group mb-3">
            <label htmlFor="backend-url-input" className="form-label-bold">
              Render Backend URL
            </label>
            <div className="input-with-icon">
              <i className="fa-solid fa-link input-icon"></i>
              <input
                type="url"
                id="backend-url-input"
                placeholder="https://your-service-name.onrender.com"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="form-control"
              />
            </div>
            <small className="text-muted">
              Paste your Render Web Service URL (e.g. <code>https://healthcare-backend.onrender.com</code>). <code>/api</code> is added automatically if omitted.
            </small>
          </div>

          {/* Test Status Banner */}
          {testState.status !== 'idle' && (
            <div
              className={`test-feedback-banner mb-3 ${
                testState.status === 'success'
                  ? 'feedback-success'
                  : testState.status === 'error'
                  ? 'feedback-error'
                  : 'feedback-pending'
              }`}
            >
              <div className="feedback-icon">
                {testState.status === 'testing' && <i className="fa-solid fa-spinner fa-spin"></i>}
                {testState.status === 'success' && <i className="fa-solid fa-circle-check"></i>}
                {testState.status === 'error' && <i className="fa-solid fa-circle-exclamation"></i>}
              </div>
              <div className="feedback-body">
                <strong>
                  {testState.status === 'testing' && 'Testing Connection...'}
                  {testState.status === 'success' && 'Connection Active!'}
                  {testState.status === 'error' && 'Connection Notice'}
                </strong>
                <p>{testState.message}</p>
                {testState.latency !== null && (
                  <span className="latency-pill">
                    <i className="fa-solid fa-bolt"></i> {testState.latency} ms roundtrip
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Helpful Netlify Instructions Box */}
          <div className="deployment-guide-box mb-3">
            <div className="guide-box-title">
              <i className="fa-solid fa-circle-info text-primary"></i> <strong>Pro-Tip for Netlify + Render:</strong>
            </div>
            <p className="guide-box-text">
              To automatically connect this Render backend for <em>all</em> public visitors on your Netlify domain:
            </p>
            <ol className="guide-box-steps">
              <li>Open <strong>Netlify Dashboard</strong> &rarr; Site configuration &rarr; <strong>Environment variables</strong></li>
              <li>Add variable <code>VITE_API_URL</code> with value: <code>https://your-render-service.onrender.com/api</code></li>
              <li>Trigger a quick redeploy on Netlify.</li>
            </ol>
          </div>

          {/* Actions Bar */}
          <div className="admin-modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleReset}
              title="Clear custom override"
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-outline btn-test-conn"
              onClick={handleTestConnection}
              disabled={testState.status === 'testing'}
            >
              {testState.status === 'testing' ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Testing...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-network-wired"></i> Test Connection
                </>
              )}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Saving...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-floppy-disk"></i> Save &amp; Connect
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
