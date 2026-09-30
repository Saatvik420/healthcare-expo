/**
 * API Service for connecting the React frontend to the Spring Boot backend.
 * Provides smooth, resilient communication with automatic fallback.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * Standard fetch helper with timeout
 */
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 4000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers || {}),
      },
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// Health check
export const healthApi = {
  check: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/health`, { timeout: 2000 });
      return res.ok;
    } catch {
      return false;
    }
  },
};

// Auth API
export const authApi = {
  login: async (email, password) => {
    const res = await fetchWithTimeout(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  },

  signup: async (userData) => {
    const res = await fetchWithTimeout(`${API_BASE}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Account registration failed');
    }
    return data;
  },
};

// Visitors API
export const visitorsApi = {
  getAll: async () => {
    const res = await fetchWithTimeout(`${API_BASE}/visitors`);
    if (!res.ok) throw new Error('Failed to fetch visitors');
    const data = await res.json();
    // Normalize id mapping to match frontend expectations
    return data.map((v) => ({
      ...v,
      id: v.visitorCode || (v.id ? `vis_${v.id}` : `vis_${Date.now()}`),
      date: v.attendDate || v.date,
    }));
  },

  create: async (visitorData) => {
    const payload = {
      visitorCode: visitorData.id || `vis_${Date.now()}`,
      name: visitorData.name,
      email: visitorData.email,
      phone: visitorData.phone,
      organization: visitorData.organization,
      designation: visitorData.designation,
      sector: visitorData.sector,
      sectorLabel: visitorData.sectorLabel,
      passType: visitorData.passType,
      passCode: visitorData.passCode,
      attendDate: visitorData.date,
      status: visitorData.status || 'Confirmed',
    };

    const res = await fetchWithTimeout(`${API_BASE}/visitors`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create visitor');
    return await res.json();
  },

  delete: async (id) => {
    const res = await fetchWithTimeout(`${API_BASE}/visitors/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};

// Exhibitors API
export const exhibitorsApi = {
  getAll: async () => {
    const res = await fetchWithTimeout(`${API_BASE}/exhibitors`);
    if (!res.ok) throw new Error('Failed to fetch exhibitors');
    const data = await res.json();
    return data.map((e) => ({
      ...e,
      id: e.exhibitorCode || (e.id ? `exh_${e.id}` : `exh_${Date.now()}`),
    }));
  },

  create: async (exhibitorData) => {
    const payload = {
      exhibitorCode: exhibitorData.id || `exh_${Date.now()}`,
      company: exhibitorData.company,
      contactPerson: exhibitorData.contactPerson,
      designation: exhibitorData.designation,
      email: exhibitorData.email,
      phone: exhibitorData.phone,
      stallType: exhibitorData.stallType,
      hall: exhibitorData.hall,
      amount: exhibitorData.amount,
      status: exhibitorData.status || 'Pending Review',
      bookingDate: exhibitorData.bookingDate,
      notes: exhibitorData.notes,
    };

    const res = await fetchWithTimeout(`${API_BASE}/exhibitors`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create exhibitor booking');
    return await res.json();
  },

  updateStatus: async (id, status) => {
    const res = await fetchWithTimeout(`${API_BASE}/exhibitors/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update exhibitor status');
    return await res.json();
  },

  delete: async (id) => {
    const res = await fetchWithTimeout(`${API_BASE}/exhibitors/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};

// Sponsorships API
export const sponsorshipsApi = {
  getAll: async () => {
    const res = await fetchWithTimeout(`${API_BASE}/sponsorships`);
    if (!res.ok) throw new Error('Failed to fetch sponsorships');
    const data = await res.json();
    return data.map((s) => ({
      ...s,
      id: s.sponsorshipCode || (s.id ? `sp_${s.id}` : `sp_${Date.now()}`),
    }));
  },

  create: async (sponsorshipData) => {
    const payload = {
      sponsorshipCode: sponsorshipData.id || `sp_${Date.now()}`,
      company: sponsorshipData.company,
      contactPerson: sponsorshipData.contactPerson,
      email: sponsorshipData.email,
      tier: sponsorshipData.tier,
      investment: sponsorshipData.investment,
      status: sponsorshipData.status || 'In Discussion',
      date: sponsorshipData.date,
    };

    const res = await fetchWithTimeout(`${API_BASE}/sponsorships`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create sponsorship');
    return await res.json();
  },

  updateStatus: async (id, status) => {
    const res = await fetchWithTimeout(`${API_BASE}/sponsorships/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update sponsorship status');
    return await res.json();
  },
};

// Contact Inquiry API
export const contactApi = {
  submit: async (inquiryData) => {
    const res = await fetchWithTimeout(`${API_BASE}/contact`, {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
    if (!res.ok) throw new Error('Failed to submit contact message');
    return await res.json();
  },

  getAll: async () => {
    const res = await fetchWithTimeout(`${API_BASE}/contact`);
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    return await res.json();
  },
};
