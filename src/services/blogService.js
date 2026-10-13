/**
 * Blog Service for IndiGlobal Healthcare Expo
 * Connects to the backend REST API with persistent localStorage fallback.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const STORAGE_KEY = 'ighe_blogs_cache';

export const INITIAL_BLOGS = [
  {
    id: 'blog_1',
    title: 'Breakthroughs in Active Pharmaceutical Ingredients: Sourcing Resilience in 2026-2027',
    slug: 'breakthroughs-in-active-pharmaceutical-ingredients-sourcing-resilience',
    category: 'Pharma & APIs',
    author: 'Dr. Sarah Jenkins',
    authorRole: 'Senior Formulation Scientist & API Auditor',
    coverImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 min read',
    publishedDate: 'March 28, 2026',
    featured: true,
    excerpt: 'Explore how advanced chemical synthesis, peptide engineering, and strategic India-ASEAN manufacturing corridors are reshaping global API procurement.',
    content: `The global pharmaceutical manufacturing ecosystem is undergoing an unprecedented restructuring. In the wake of supply chain vulnerabilities exposed over recent years, major health authorities and multinational pharmaceutical conglomerates are actively diversifying raw material sourcing strategies.

India and the ASEAN nations represent the fastest-growing corridor for high-purity Active Pharmaceutical Ingredients (APIs), key starting materials (KSMs), and advanced intermediates. At IndiGlobal Healthcare Expo 2027, Halls 1 & 2 will serve as the premier nexus for over 150 certified bulk drug producers and global procurement directors.

### Core Drivers of the API Renaissance

Several macroeconomic and regulatory catalysts are propelling this transformation:

1. **Production Linked Incentives & Infrastructure Clusters:** Mega bulk-drug industrial parks with centralized effluent treatment, dedicated power grids, and stream-lined regulatory clearances have lowered production costs by 15-22%.
2. **Shift Toward Continuous Flow Chemistry:** Traditional batch synthesis is rapidly giving way to automated microreactor and continuous-flow architectures, minimizing batch-to-batch variation and slashing solvent consumption.
3. **Enhanced Drug Master File (DMF) Compliance:** Indian and ASEAN manufacturers have dramatically improved regulatory filings, securing record numbers of US FDA, EU GMP, and WHO pre-qualifications.

### Overcoming Geopolitical and Quality Roadblocks

Procurement executives are no longer evaluating suppliers based solely on per-kilogram price points. Resilience audits now emphasize:

* **Dual-Source Supply Guarantee:** Validating that manufacturers maintain redundant production lines across geographically distinct zones.
* **Environmental, Social & Governance (ESG) Audits:** International buyers mandate green synthesis processes with certified zero-liquid discharge (ZLD) installations.
* **Rapid Impurity Profiling:** Advanced LC-MS/MS testing protocols that detect nitrosamine and trace elemental impurities early in synthesis stages.

IndiGlobal Healthcare Expo 2027 will host dedicated bilateral buyer-seller roundtables to help procurement executives build long-term, direct-from-source contracts with audited API manufacturers.`,
    tags: ['APIs', 'Bulk Drugs', 'Supply Chain', 'Formulations', 'India-ASEAN']
  },
  {
    id: 'blog_2',
    title: 'Next-Generation Cleanroom Automation and Sterile Fill-Finish Systems',
    slug: 'next-generation-cleanroom-automation-sterile-fill-finish-systems',
    category: 'Pharma Machinery',
    author: 'Elena Rostova',
    authorRole: 'Cleanroom Engineering Lead, EuroSterile Systems',
    coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    publishedDate: 'March 22, 2026',
    featured: false,
    excerpt: 'From robotic isolators to continuous WFI water loops, discover how Hall 4 machinery innovators are redefining sterility assurance and energy efficiency.',
    content: `Sterile injectables, monoclonal antibodies, and cell therapies demand production environments where human intervention is minimized to virtually zero. As regulatory agencies intensify Annex 1 requirements for sterile medicinal products, pharmaceutical cleanrooms have transformed into automated technological marvels.

At IndiGlobal Healthcare Expo 2027, Hall 4 (Pharma Machinery & Cleanroom Automation) showcases turnkey machinery from leading German, Japanese, and Indian automation engineers.

### Key Technological Shifts in Sterile Fill-Finish

* **Restricted Access Barrier Systems (RABS) and Gloveless Isolators:** Replacing human glove ports with multi-axis articulated robotic arms eliminates the leading vector of microbial contamination.
* **Single-Use Systems (SUS) Integration:** Pre-sterilized fluid handling paths reduce cross-contamination risks and eliminate steam-in-place (SIP) downtime between varied batch runs.
* **AI-Guided In-Line Particle and Defect Inspection:** High-speed vision systems scrutinize up to 600 vials per minute, detecting sub-visible particulate matter and cosmetic vial flaws in real time.

Facilities modernizing their fill-finish lines are experiencing up to a 40% reduction in batch rejection rates alongside substantial energy savings from smart HVAC variable-frequency air circulation.`,
    tags: ['Cleanrooms', 'Pharma Machinery', 'Sterile Automation', 'Injectables', 'Robotics']
  },
  {
    id: 'blog_3',
    title: 'India-ASEAN Medical Device Harmonization: Fast-Tracking Cross-Border Approvals',
    slug: 'india-asean-medical-device-harmonization-cross-border-approvals',
    category: 'Healthcare Policies',
    author: 'Somchai Prasert',
    authorRole: 'Managing Director, Bangkok MedTech Alliance',
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    publishedDate: 'March 15, 2026',
    featured: false,
    excerpt: 'A deep dive into mutual recognition agreements, CDSCO guidelines, and FDA Thailand protocols expediting bilateral medical technology trade.',
    content: `The ASEAN region represents a medical device market exceeding USD 10 billion, with annual growth topping 8.5%. Simultaneously, India's medical technology manufacturing sector has expanded rapidly, graduating from basic consumables to advanced cardiology implants, surgical robotics, and in-vitro diagnostics.

Under the landmark India-ASEAN Global Confluence 2027, bilateral healthcare regulatory harmonization is taking center stage.

### Why Harmonization Matters for Device Innovators

1. **Adoption of the ASEAN Medical Device Directive (AMDD):** Standardized Common Submission Dossier Templates (CSDT) allow medical device manufacturers to apply for market access across multiple Southeast Asian nations with unified documentation.
2. **Mutual Acceptance of Testing Data:** Streamlined protocols between India's CDSCO and regional agencies reduce duplicate clinical trials for Class B and Class C medical devices.
3. **Preferential Tariff Schedules:** Free trade corridor provisions lower customs barriers for hospital diagnostic units, patient monitors, and point-of-care rapid test kits.

Delegates attending the Ministerial and Regulatory Sessions at the expo will gain direct insights into expediting product licenses and appointing regional authorized representatives across Bangkok, Jakarta, Manila, and Kuala Lumpur.`,
    tags: ['Medical Devices', 'ASEAN Confluence', 'Regulatory Affairs', 'CDSCO', 'Trade Policy']
  },
  {
    id: 'blog_4',
    title: 'The Digital Cold-Chain Frontier: Preserving Biologics & Vaccines Across Tropical Climates',
    slug: 'digital-cold-chain-frontier-preserving-biologics-vaccines',
    category: 'Cold Chain & Logistics',
    author: 'Tariq Al-Mansoor',
    authorRole: 'Cold-Chain Operations Director, Gulf Health Logistics',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    publishedDate: 'March 08, 2026',
    featured: false,
    excerpt: 'How IoT temperature telemetry, vacuum insulation panels, and blockchain chain-of-custody safeguard temperature-sensitive therapeutics across equatorial trade routes.',
    content: `Over 35% of all pharmaceutical cargo now requires precise temperature management, from mRNA therapeutics requiring ultra-cold -80°C storage to standard monoclonal antibody formulations maintained at 2°C to 8°C. In the equatorial climate of Southeast Asia, any transit bottleneck can lead to catastrophic thermal excursions.

The IndiGlobal Healthcare Expo Cold Chain Pavilion highlights turnkey temperature-controlled packaging and transport technologies engineered specifically for high ambient heat and humidity.

### Emerging Technologies Safeguarding Cargo

* **Cellular & Satellite IoT Data Loggers:** Continuous monitoring of temperature, relative humidity, light exposure, and tilt, transmitting live alerts before thermal boundaries are breached.
* **Passive Phase Change Material (PCM) Shippers:** High-performance thermal shippers capable of maintaining payload temperature integrity for up to 144 hours without external electrical power.
* **Green Refrigerated Cargo Containers:** Hybrid electric reefers that slash carbon emissions by 45% during overland multimodal haulage.

Connecting cold chain operators with hospital logistics directors ensures that lifesaving therapeutics reach clinics and patients with uncompromised clinical efficacy.`,
    tags: ['Cold Chain', 'Logistics', 'IoT Telemetry', 'Biologics', 'Packaging']
  },
  {
    id: 'blog_5',
    title: 'Hospital Infrastructure 2030: Modular ICUs, Smart Diagnostics, and Green Hospitals',
    slug: 'hospital-infrastructure-2030-modular-icus-smart-diagnostics',
    category: 'Hospital Infrastructure',
    author: 'Dr. Vikram Malhotra',
    authorRole: 'Healthcare Infrastructure & Hospital Systems Consultant',
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    readTime: '7 min read',
    publishedDate: 'February 25, 2026',
    featured: false,
    excerpt: 'Hospital directors and infrastructure builders from 40+ countries are convening at Hall 5 to evaluate modular surgical suites, AI triage systems, and net-zero hospital designs.',
    content: `Modern healthcare architecture is transitioning from sprawling, rigid concrete complexes toward highly agile, technology-embedded clinical ecosystems. Driven by rising patient numbers, acute infectious disease preparedness, and carbon neutrality pledges, hospitals are rethinking physical layouts from the foundation up.

At IndiGlobal Healthcare Expo 2027, Hall 5 (Packaging & Medical Solutions / Hospital Infra) hosts leading designers of modular medical spaces and smart diagnostic systems.

### Pillars of Future Hospital Infrastructure

1. **Prefabricated Modular Critical Care Units:** Rapid-deployment negative-pressure isolation suites that can be constructed, certified, and operational within weeks rather than months.
2. **Hospital-Wide IoT and Central Telemetry Hubs:** Continuous patient telemetry transmitted to centralized nursing command centers, reducing alarm fatigue and anticipating patient deterioration hours in advance.
3. **Sustainable Net-Zero Energy Standards:** Rooftop solar installations, greywater recycling systems, and antimicrobial non-PVC flooring materials that minimize nosocomial infection risks while reducing operational overhead.

Healthcare facility directors will have the opportunity to engage directly with engineering consortia to tour live modular room mockups during the 3-day exhibition.`,
    tags: ['Hospital Infra', 'Smart Diagnostics', 'Green Hospitals', 'MedTech', 'Critical Care']
  },
  {
    id: 'blog_6',
    title: 'Smart B2B Healthcare Expos: How Matchmaking Drives Multilateral Pharma Contracts',
    slug: 'smart-b2b-healthcare-expos-matchmaking-pharma-contracts',
    category: 'Exhibition Strategy',
    author: 'IndiGlobal Secretariat',
    authorRole: 'Trade Delegation & B2B Coordination Team',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    publishedDate: 'February 12, 2026',
    featured: false,
    excerpt: 'Why high-value healthcare procurement relies on pre-vetted buyer-seller matchmaking and how delegations maximize commercial returns at trade shows.',
    content: `In an era of digital communication, the healthcare industry continues to depend fundamentally on in-person trust and verification. When multi-million dollar annual contracts for sterile bulk formulations or critical medical imaging equipment are on the table, face-to-face negotiations with certified executives remain irreplaceable.

The IndiGlobal Healthcare Expo 2027 Secretariat has engineered an intelligent pre-qualification and matchmaking system designed to maximize commercial yield for both attendees and exhibitors.

### Maximizing Your Exhibition Experience

* **Pre-Scheduled B2B Business Meetings:** Registered exhibitors and VIP trade delegates receive custom buyer-seller meeting calendars prior to day one.
* **Instant Digital E-Badge Interactions:** Optical QR badge scanning enables frictionless contact exchange and immediate technical brochure transfer.
* **Official Executive Delegations:** Hosted buyer programs connecting government health ministries, hospital networks, and pharmaceutical importers from over 40 participating nations.

Whether your organization is seeking regional distribution partners or evaluating advanced manufacturing machinery, structured summit preparation ensures every conversation yields tangible commercial outcomes.`,
    tags: ['B2B Matchmaking', 'Trade Delegation', 'Exhibitor Strategy', 'Pharma Expo']
  }
];

// Helper to get local stored blogs
const getLocalBlogs = () => {
  try {
    const raw = localStorage.getItem('ghe_blogs') || localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading blogs from localStorage', e);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
    localStorage.setItem('ghe_blogs', JSON.stringify(INITIAL_BLOGS));
  } catch {
    // Ignore storage quota or access issues
  }
  return INITIAL_BLOGS;
};

// Helper to save local stored blogs
const saveLocalBlogs = (blogs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    localStorage.setItem('ghe_blogs', JSON.stringify(blogs));
  } catch (e) {
    console.error('Error saving blogs to localStorage', e);
  }
};

export const getBlogSlug = (blog) => {
  if (!blog) return '';
  if (blog.slug && typeof blog.slug === 'string' && blog.slug.trim()) {
    return blog.slug.trim();
  }
  if (blog.title && typeof blog.title === 'string' && blog.title.trim()) {
    return blog.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  return blog.id || blog.blogId || '';
};

export const getBlogTimestamp = (blog) => {
  if (!blog) return 0;
  if (blog.createdAt) {
    const t = new Date(blog.createdAt).getTime();
    if (!isNaN(t)) return t;
  }
  if (blog.publishedDate) {
    const t = new Date(blog.publishedDate).getTime();
    if (!isNaN(t)) return t;
  }
  if (blog.id && typeof blog.id === 'string' && blog.id.startsWith('blog_')) {
    const num = parseInt(blog.id.replace('blog_', ''), 10);
    if (!isNaN(num) && num > 1000000) return num;
  }
  if (blog.blogId && typeof blog.blogId === 'string' && blog.blogId.startsWith('blog_')) {
    const num = parseInt(blog.blogId.replace('blog_', ''), 10);
    if (!isNaN(num) && num > 1000000) return num;
  }
  return 0;
};

// Timeout fetch helper
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

export const blogService = {
  getBlogSlug,
  getBlogTimestamp,

  // Get all blogs with optional category filter
  getAllBlogs: async (category = '') => {
    try {
      const url =
        category && category.toLowerCase() !== 'all'
          ? `${API_BASE}/blogs?category=${encodeURIComponent(category)}`
          : `${API_BASE}/blogs`;
      const res = await fetchWithTimeout(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const enriched = data.map((b) => ({
            ...b,
            slug: b.slug || getBlogSlug(b),
            id: b.id || b.blogId,
          }));
          const local = getLocalBlogs();
          const apiKeys = new Set(enriched.map((b) => b.id || b.slug));
          const localOnly = local.filter((b) => !apiKeys.has(b.id) && !apiKeys.has(b.slug));
          const merged = [...localOnly, ...enriched];
          saveLocalBlogs(merged);
          return merged;
        }
      }
    } catch (err) {
      console.warn('API blogs fetch failed, falling back to local cache:', err.message);
    }

    const local = getLocalBlogs().map((b) => ({
      ...b,
      slug: b.slug || getBlogSlug(b),
      id: b.id || b.blogId,
    }));

    if (category && category.toLowerCase() !== 'all') {
      return local.filter(
        (b) => b.category && b.category.toLowerCase() === category.toLowerCase()
      );
    }
    return local;
  },

  // Get single blog by ID or Slug
  getBlogByIdOrSlug: async (idOrSlug) => {
    try {
      let res;
      try {
        res = await fetchWithTimeout(`${API_BASE}/blogs/slug/${encodeURIComponent(idOrSlug)}`, { timeout: 1500 });
      } catch {
        res = null;
      }

      if (!res || !res.ok) {
        res = await fetchWithTimeout(`${API_BASE}/blogs/${encodeURIComponent(idOrSlug)}`, { timeout: 1500 });
      }

      if (res && res.ok) {
        const data = await res.json();
        if (data) {
          return {
            ...data,
            slug: data.slug || getBlogSlug(data),
            id: data.id || data.blogId,
          };
        }
      }
    } catch (err) {
      console.warn('API blog detail fetch failed, falling back to local cache:', err.message);
    }

    const local = getLocalBlogs();
    const found = local.find(
      (b) =>
        b.slug === idOrSlug ||
        b.id === idOrSlug ||
        b.blogId === idOrSlug ||
        getBlogSlug(b) === idOrSlug
    );
    if (found) {
      return {
        ...found,
        slug: found.slug || getBlogSlug(found),
        id: found.id || found.blogId,
      };
    }
    throw new Error('Blog article not found');
  },

  // Create blog (Admin)
  createBlog: async (blogData) => {
    const slug =
      blogData.slug ||
      blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

    const newBlog = {
      ...blogData,
      id: blogData.id || 'blog_' + Date.now(),
      slug,
      author: blogData.author || 'indiglobal healthcare Expo',
      authorRole: blogData.authorRole || 'admin',
      category: blogData.category || 'Our Blogs',
      coverImage:
        blogData.coverImage ||
        'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
      publishedDate:
        blogData.publishedDate ||
        new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let created = null;
    try {
      const res = await fetchWithTimeout(`${API_BASE}/blogs`, {
        method: 'POST',
        body: JSON.stringify(newBlog),
      });
      if (res.ok) {
        created = await res.json();
      }
    } catch (err) {
      console.warn('Failed to save blog to API, persisting locally:', err.message);
    }

    const item = created || newBlog;
    const local = getLocalBlogs();
    const updatedList = [item, ...local.filter((b) => b.id !== item.id && b.slug !== item.slug)];
    saveLocalBlogs(updatedList);
    return item;
  },

  // Update blog (Admin)
  updateBlog: async (id, blogData) => {
    const updatedData = {
      ...blogData,
      updatedAt: new Date().toISOString(),
    };

    let updated = null;
    try {
      const res = await fetchWithTimeout(`${API_BASE}/blogs/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        updated = await res.json();
      }
    } catch (err) {
      console.warn('Failed to update blog on API, saving locally:', err.message);
    }

    const item = updated || { ...updatedData, id };
    const local = getLocalBlogs();
    const updatedList = local.map((b) => (b.id === id || b.slug === id ? item : b));
    saveLocalBlogs(updatedList);
    return item;
  },

  // Delete blog (Admin)
  deleteBlog: async (id) => {
    try {
      await fetchWithTimeout(`${API_BASE}/blogs/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('Failed to delete blog on API, removing locally:', err.message);
    }

    const local = getLocalBlogs();
    const filtered = local.filter((b) => b.id !== id && b.slug !== id && b.blogId !== id);
    saveLocalBlogs(filtered);
    return true;
  },

  // Available categories
  getCategories: () => [
    'All',
    'Pharma & APIs',
    'Pharma Machinery',
    'Healthcare Policies',
    'Cold Chain & Logistics',
    'Hospital Infrastructure',
    'Exhibition Strategy',
  ],
};

export default blogService;
