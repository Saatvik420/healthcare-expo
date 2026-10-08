import { useState } from 'react';

export default function AddExhibitorModal({ onClose, onAdd, onNotify }) {
  const [formData, setFormData] = useState({
    company: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    website: '',
    stallType: '15 sq.m Healthcare Suite',
    hall: 'Hall 1 & 2 (APIs)',
    amount: '$4,250',
    status: 'Approved',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.contactPerson || !formData.email) {
      alert('Please fill in company name, contact person, and email.');
      return;
    }

    onAdd(formData);
    onNotify('Exhibitor Contract Added', `${formData.company} has been added to hall allocations.`);
    onClose();
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div className="admin-modal-title-group">
            <span className="badge-preview-tag">Space Allocation Desk</span>
            <h3>Add New Exhibitor Contract</h3>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-modal-body">
            <div className="form-row-2">
              <div className="form-group">
                <label>Company / Enterprise Name *</label>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="e.g. BioPharma Global Ltd"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Company Website</label>
                <input
                  type="text"
                  name="website"
                  placeholder="e.g. https://biopharma.com"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Contact Person *</label>
                <input
                  type="text"
                  name="contactPerson"
                  required
                  placeholder="e.g. Dr. Anita Roy"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Designation / Title</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="e.g. Managing Director"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Corporate Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. anita.roy@biopharma.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Direct Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="e.g. +91 98111 22334"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Stall Configuration</label>
                <select name="stallType" value={formData.stallType} onChange={handleChange}>
                  <option value="9 sq.m Shell Scheme">9 sq.m Shell Scheme</option>
                  <option value="15 sq.m Healthcare Suite">15 sq.m Healthcare Suite</option>
                  <option value="18+ sq.m Raw Bare Space">18+ sq.m Raw Bare Space</option>
                  <option value="Custom Country Pavilion">Custom Country Pavilion</option>
                </select>
              </div>
              <div className="form-group">
                <label>Allocated Pavilion Hall</label>
                <select name="hall" value={formData.hall} onChange={handleChange}>
                  <option value="Hall 1 & 2 (APIs)">Hall 1 & 2 (APIs & Fine Chemicals)</option>
                  <option value="Hall 3 (Formulations)">Hall 3 (Finished Formulations)</option>
                  <option value="Hall 4 (Machinery)">Hall 4 (Pharma Machinery & Cleanroom)</option>
                  <option value="Hall 5 (Packaging)">Hall 5 (Packaging & Delivery)</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Contract Value / Tariff</label>
                <input
                  type="text"
                  name="amount"
                  placeholder="e.g. $4,250"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Initial Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Approved">Approved</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Contract Dispatched">Contract Dispatched</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Technical Notes & Special Requirements</label>
              <textarea
                name="notes"
                rows="2"
                placeholder="Electrical connections, corner positioning, display mounts..."
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
              <i className="fa-solid fa-plus"></i> Allot Stall Space
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
