import { useState } from 'react';
import { SECTOR_OPTIONS } from '../../config/sectorsData';

export default function AddVisitorModal({ onClose, onAdd, onNotify }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    country: 'India',
    sector: 'pharmaceuticals',
    passType: 'standard',
    attendDay: 'all',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getSectorLabel = (id) => {
    const s = SECTOR_OPTIONS.find((item) => item.id === id);
    return s ? s.label : id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in attendee name and email.');
      return;
    }

    const passCode = 'IGHE-2027-' + Math.floor(100000 + Math.random() * 900000);
    const newVisitor = {
      ...formData,
      passCode,
      sectorLabel: getSectorLabel(formData.sector),
      status: 'Confirmed',
    };

    onAdd(newVisitor);
    onNotify('Attendee Registered', `${formData.name} added with badge code ${passCode}.`);
    onClose();
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div className="admin-modal-title-group">
            <span className="badge-preview-tag">Desk On-Site Registration</span>
            <h3>Add New Trade Visitor / Delegate</h3>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-modal-body">
            <div className="form-row-2">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Dr. Rajesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. r.kumar@apollohospitals.in"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Direct Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Country / Region</label>
                <input
                  type="text"
                  name="country"
                  placeholder="e.g. India, Thailand, Singapore"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Organization / Hospital</label>
                <input
                  type="text"
                  name="organization"
                  placeholder="e.g. Apollo Hospitals"
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Designation / Role</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="e.g. Head of Procurement"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Industry Sector</label>
                <select name="sector" value={formData.sector} onChange={handleChange}>
                  {SECTOR_OPTIONS.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Pass Tier</label>
                <select name="passType" value={formData.passType} onChange={handleChange}>
                  <option value="standard">Standard Trade Pass (Complimentary)</option>
                  <option value="vip">VIP Executive Delegate ($150)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Special Notes / Delegation Details</label>
              <textarea
                name="notes"
                rows="2"
                placeholder="Optional notes or requirements..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fa-solid fa-plus"></i> Save & Issue Badge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
