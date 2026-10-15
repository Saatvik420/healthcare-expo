/**
 * API Service for connecting the React frontend to the backend API.
 * Provides resilient communication with automatic fallback.
 */

export const DEFAULT_PRODUCTION_API_URL = 'https://healthcare-backend-ftho.onrender.com/api';

// Dynamically resolve API URL to support Netlify + Render, custom domain, and local network
export const getApiBaseUrl = () => {
  // 1. Check if admin configured custom backend URL in localStorage (e.g. Render URL)
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const customUrl = localStorage.getItem('ghe_custom_api_url');
      if (customUrl && typeof customUrl === 'string' && customUrl.trim()) {
        let clean = customUrl.trim().replace(/\/+$/, '');
        if (!clean.endsWith('/api')) clean += '/api';
        return clean;
      }
    }
  } catch {
    // ignore
  }

  // 2. Build-time environment variable (VITE_API_URL set in Netlify / .env)
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    if (!clean.endsWith('/api')) clean += '/api';
    return clean;
  }

  // 3. Localhost and development defaults
  if (typeof window !== 'undefined' && window.location) {
    const { hostname, port } = window.location;

    // Vite dev server (5173), preview (4173), or direct Express backend (8080)
    if (port === '5173' || port === '4173' || port === '8080') {
      return '/api';
    }

    // Private local LAN IP when developing across devices on Wi-Fi
    const isPrivateIp =
      /^192\.168\./.test(hostname) ||
      /^10\./.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
      hostname.endsWith('.local');

    if (isPrivateIp && port) {
      return `http://${hostname}:8080/api`;
    }
  }

  // Default to relative '/api' (proxied by Netlify edge redirects)
  return '/api';
};

export const getApiBase = () => getApiBaseUrl();

// Dynamic object that resolves getApiBaseUrl() in template literals
export const API_BASE = {
  toString: () => getApiBaseUrl(),
};

/**
 * Standard fetch helper with timeout
 * Set to 15s to tolerate Render free-tier cold starts
 */
export async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 15000 } = options;
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

/**
 * Validates that the response contains valid JSON and is not an HTML SPA fallback document
 */
export async function safeJsonResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    throw new Error('API returned HTML document instead of JSON. The backend route may be unproxied or offline.');
  }
  return await response.json();
}

/**
 * Resilient request helper that tries the primary base URL (relative /api) and,
 * if on a public domain and encountering an HTML SPA fallback or network issue,
 * automatically retries directly with the live Render backend URL.
 */
export async function requestWithFallback(endpointPath, options = {}) {
  const cleanPath = endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`;
  const base = getApiBaseUrl();
  const primaryUrl = `${base}${cleanPath}`;

  try {
    const res = await fetchWithTimeout(primaryUrl, options);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && !contentType.includes('text/html')) {
      return res;
    }

    // If primary returned HTML (SPA fallback) or error on production site, try direct Render backend
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (!isLocal && base !== DEFAULT_PRODUCTION_API_URL) {
      const fallbackUrl = `${DEFAULT_PRODUCTION_API_URL}${cleanPath}`;
      const fallbackRes = await fetchWithTimeout(fallbackUrl, options);
      const fbContentType = fallbackRes.headers.get('content-type') || '';
      if (fallbackRes.ok && !fbContentType.includes('text/html')) {
        return fallbackRes;
      }
    }
    return res;
  } catch (err) {
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (!isLocal && base !== DEFAULT_PRODUCTION_API_URL) {
      try {
        const fallbackUrl = `${DEFAULT_PRODUCTION_API_URL}${cleanPath}`;
        const fallbackRes = await fetchWithTimeout(fallbackUrl, options);
        const fbContentType = fallbackRes.headers.get('content-type') || '';
        if (fallbackRes.ok && !fbContentType.includes('text/html')) {
          return fallbackRes;
        }
      } catch {
        // preserve original error
      }
    }
    throw err;
  }
}

// Health check
export const healthApi = {
  check: async (overrideUrl) => {
    try {
      let res;
      if (overrideUrl) {
        res = await fetchWithTimeout(`${overrideUrl}/health`, { timeout: 12000 });
      } else {
        res = await requestWithFallback('/health', { timeout: 12000 });
      }
      if (!res.ok) return { isOnline: false };
      const data = await safeJsonResponse(res);
      return { isOnline: true, ...data };
    } catch {
      return { isOnline: false };
    }
  },
};

// Analytics & Stats API
export const statsApi = {
  get: async () => {
    const res = await requestWithFallback('/stats');
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    return await safeJsonResponse(res);
  },
};

// Auth API
export const authApi = {
  login: async (email, password) => {
    const res = await requestWithFallback('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await safeJsonResponse(res);
    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  },

  signup: async (userData) => {
    const res = await requestWithFallback('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    const data = await safeJsonResponse(res);
    if (!res.ok) {
      throw new Error(data.message || 'Account registration failed');
    }
    return data;
  },
};

// Visitors API
export const visitorsApi = {
  getAll: async () => {
    const res = await requestWithFallback('/visitors');
    if (!res.ok) throw new Error('Failed to fetch visitors');
    const data = await safeJsonResponse(res);
    return data.map((v) => ({
      ...v,
      id: v.visitorCode || (v.id ? `vis_${v.id}` : `vis_${Date.now()}`),
      date: v.attendDate || v.date,
    }));
  },

  getById: async (id) => {
    const res = await requestWithFallback(`/visitors/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Failed to fetch visitor details');
    return await safeJsonResponse(res);
  },

  create: async (visitorData) => {
    const payload = {
      visitorCode: visitorData.id || `vis_${Date.now()}`,
      name: visitorData.name,
      email: visitorData.email,
      phone: visitorData.phone,
      organization: visitorData.organization,
      designation: visitorData.designation,
      country: visitorData.country || 'India',
      sector: visitorData.sector,
      sectorLabel: visitorData.sectorLabel,
      passType: visitorData.passType,
      passCode: visitorData.passCode,
      attendDate: visitorData.date,
      attendDay: visitorData.attendDay || 'all',
      status: visitorData.status || 'Confirmed',
      notes: visitorData.notes || '',
    };

    const res = await requestWithFallback('/visitors', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create visitor');
    return await safeJsonResponse(res);
  },

  update: async (id, visitorData) => {
    const res = await requestWithFallback(`/visitors/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(visitorData),
    });
    if (!res.ok) throw new Error('Failed to update visitor');
    return await safeJsonResponse(res);
  },

  delete: async (id) => {
    const res = await requestWithFallback(`/visitors/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};

// Exhibitors API
export const exhibitorsApi = {
  getAll: async () => {
    const res = await requestWithFallback('/exhibitors');
    if (!res.ok) throw new Error('Failed to fetch exhibitors');
    const data = await safeJsonResponse(res);
    return data.map((e) => ({
      ...e,
      id: e.exhibitorCode || (e.id ? `exh_${e.id}` : `exh_${Date.now()}`),
    }));
  },

  getById: async (id) => {
    const res = await requestWithFallback(`/exhibitors/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Failed to fetch exhibitor details');
    return await safeJsonResponse(res);
  },

  create: async (exhibitorData) => {
    const payload = {
      exhibitorCode: exhibitorData.id || `exh_${Date.now()}`,
      company: exhibitorData.company,
      contactPerson: exhibitorData.contactPerson,
      designation: exhibitorData.designation,
      email: exhibitorData.email,
      phone: exhibitorData.phone,
      website: exhibitorData.website,
      stallType: exhibitorData.stallType,
      hall: exhibitorData.hall,
      amount: exhibitorData.amount,
      status: exhibitorData.status || 'Pending Review',
      bookingDate: exhibitorData.bookingDate,
      notes: exhibitorData.notes,
    };

    const res = await requestWithFallback('/exhibitors', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create exhibitor booking');
    return await safeJsonResponse(res);
  },

  update: async (id, updateData) => {
    const res = await requestWithFallback(`/exhibitors/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
    if (!res.ok) throw new Error('Failed to update exhibitor');
    return await safeJsonResponse(res);
  },

  updateStatus: async (id, status) => {
    const res = await requestWithFallback(`/exhibitors/${encodeURIComponent(id)}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update exhibitor status');
    return await safeJsonResponse(res);
  },

  delete: async (id) => {
    const res = await requestWithFallback(`/exhibitors/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};

// Sponsorships API
export const sponsorshipsApi = {
  getAll: async () => {
    const res = await requestWithFallback('/sponsorships');
    if (!res.ok) throw new Error('Failed to fetch sponsorships');
    const data = await safeJsonResponse(res);
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
      phone: sponsorshipData.phone,
      tier: sponsorshipData.tier,
      investment: sponsorshipData.investment,
      status: sponsorshipData.status || 'In Discussion',
      date: sponsorshipData.date,
    };

    const res = await requestWithFallback('/sponsorships', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create sponsorship');
    return await safeJsonResponse(res);
  },

  updateStatus: async (id, status) => {
    const res = await requestWithFallback(`/sponsorships/${encodeURIComponent(id)}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update sponsorship status');
    return await safeJsonResponse(res);
  },

  delete: async (id) => {
    const res = await requestWithFallback(`/sponsorships/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};

// Contact Inquiry API
export const contactApi = {
  submit: async (inquiryData) => {
    const res = await requestWithFallback('/contact', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
    if (!res.ok) throw new Error('Failed to submit contact message');
    return await safeJsonResponse(res);
  },

  getAll: async () => {
    const res = await requestWithFallback('/contact');
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    return await safeJsonResponse(res);
  },

  delete: async (id) => {
    const res = await requestWithFallback(`/contact/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};

// Blogs API
export const blogsApi = {
  getAll: async (category) => {
    const path = category && category.toLowerCase() !== 'all'
      ? `/blogs?category=${encodeURIComponent(category)}`
      : `/blogs`;
    const res = await requestWithFallback(path);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return await safeJsonResponse(res);
  },

  getByIdOrSlug: async (idOrSlug) => {
    let res = await requestWithFallback(`/blogs/${encodeURIComponent(idOrSlug)}`);
    const isHtml = (res.headers.get('content-type') || '').includes('text/html');
    if (!res.ok || isHtml) {
      res = await requestWithFallback(`/blogs/slug/${encodeURIComponent(idOrSlug)}`);
    }
    if (!res.ok) {
      const err = new Error('Failed to fetch blog');
      err.status = res.status;
      throw err;
    }
    return await safeJsonResponse(res);
  },

  create: async (blogData) => {
    const blogId = blogData.blogId || blogData.id || `blog_${Date.now()}`;
    const slug =
      blogData.slug ||
      (blogData.title
        ? blogData.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
        : `blog-${Date.now()}`);
    const rest = { ...blogData };
    delete rest.id;
    delete rest.createdAt;
    delete rest.updatedAt;

    const payload = {
      ...rest,
      blogId: typeof blogId === 'string' && blogId.startsWith('blog_') ? blogId : `blog_${Date.now()}`,
      slug,
      title: blogData.title?.trim() || 'Untitled Article',
      excerpt: blogData.excerpt?.trim() || '',
      content: blogData.content?.trim() || '',
      category: blogData.category?.trim() || 'Our Blogs',
      author: blogData.author?.trim() || 'IndiGlobal Healthcare Expo',
      authorRole: blogData.authorRole?.trim() || 'Secretariat Contributor',
      coverImage:
        blogData.coverImage?.trim() ||
        'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
      readTime: blogData.readTime?.trim() || '5 min read',
      publishedDate:
        blogData.publishedDate ||
        new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      featured: Boolean(blogData.featured),
      tags: Array.isArray(blogData.tags)
        ? blogData.tags.join(', ')
        : typeof blogData.tags === 'string'
        ? blogData.tags
        : '',
    };

    const res = await requestWithFallback('/blogs', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create blog');
    return await safeJsonResponse(res);
  },

  update: async (id, blogData) => {
    const slug =
      blogData.slug ||
      (blogData.title
        ? blogData.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
        : undefined);
    const rest = { ...blogData };
    delete rest.id;
    delete rest.createdAt;
    delete rest.updatedAt;

    const payload = {
      ...rest,
      ...(slug ? { slug } : {}),
      ...(blogData.title ? { title: blogData.title.trim() } : {}),
      ...(blogData.excerpt ? { excerpt: blogData.excerpt.trim() } : {}),
      ...(blogData.content ? { content: blogData.content.trim() } : {}),
      ...(blogData.category ? { category: blogData.category.trim() } : {}),
      ...(blogData.author ? { author: blogData.author.trim() } : {}),
      ...(blogData.authorRole ? { authorRole: blogData.authorRole.trim() } : {}),
      ...(blogData.coverImage ? { coverImage: blogData.coverImage.trim() } : {}),
      ...(blogData.readTime ? { readTime: blogData.readTime.trim() } : {}),
      featured: Boolean(blogData.featured),
      tags: Array.isArray(blogData.tags)
        ? blogData.tags.join(', ')
        : typeof blogData.tags === 'string'
        ? blogData.tags
        : '',
    };

    const res = await requestWithFallback(`/blogs/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update blog');
    return await safeJsonResponse(res);
  },

  delete: async (id) => {
    const res = await requestWithFallback(`/blogs/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};
