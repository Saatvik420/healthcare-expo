/**
 * Blog Service for IndiGlobal Healthcare Expo
 * Connects to the backend REST API with persistent localStorage fallback.
 */

import { blogsApi } from './api';

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

export const getDeletedBlogTombstones = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const raw = localStorage.getItem('ghe_deleted_blog_ids');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const addBlogTombstone = (blogOrId) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const current = getDeletedBlogTombstones();
    const set = new Set(current.map((s) => String(s).toLowerCase().trim()));

    if (typeof blogOrId === 'string' || typeof blogOrId === 'number') {
      const s = String(blogOrId).toLowerCase().trim();
      set.add(s);
      set.add(s.replace(/^blog_/, ''));
    } else if (blogOrId && typeof blogOrId === 'object') {
      if (blogOrId.id !== undefined && blogOrId.id !== null) {
        const s = String(blogOrId.id).toLowerCase().trim();
        set.add(s);
        set.add(s.replace(/^blog_/, ''));
      }
      if (blogOrId.blogId) {
        const s = String(blogOrId.blogId).toLowerCase().trim();
        set.add(s);
        set.add(s.replace(/^blog_/, ''));
      }
      if (blogOrId.slug) {
        set.add(String(blogOrId.slug).toLowerCase().trim());
      }
      if (blogOrId.title && typeof blogOrId.title === 'string') {
        const slug = getBlogSlug(blogOrId).toLowerCase().trim();
        if (slug) set.add(slug);
      }
    }

    localStorage.setItem('ghe_deleted_blog_ids', JSON.stringify([...set].filter(Boolean)));
  } catch (e) {
    console.warn('Failed to record blog deletion tombstone:', e);
  }
};

export const removeBlogTombstone = (blogOrId) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const current = getDeletedBlogTombstones();
    if (!current || current.length === 0) return;

    const toRemove = new Set();
    if (typeof blogOrId === 'string' || typeof blogOrId === 'number') {
      const s = String(blogOrId).toLowerCase().trim();
      toRemove.add(s);
      toRemove.add(s.replace(/^blog_/, ''));
    } else if (blogOrId && typeof blogOrId === 'object') {
      if (blogOrId.id !== undefined && blogOrId.id !== null) {
        const s = String(blogOrId.id).toLowerCase().trim();
        toRemove.add(s);
        toRemove.add(s.replace(/^blog_/, ''));
      }
      if (blogOrId.blogId) {
        const s = String(blogOrId.blogId).toLowerCase().trim();
        toRemove.add(s);
        toRemove.add(s.replace(/^blog_/, ''));
      }
      if (blogOrId.slug) {
        toRemove.add(String(blogOrId.slug).toLowerCase().trim());
      }
    }

    const filtered = current.filter((id) => !toRemove.has(String(id).toLowerCase().trim()));
    localStorage.setItem('ghe_deleted_blog_ids', JSON.stringify(filtered));
  } catch (e) {
    console.warn('Failed to remove blog deletion tombstone:', e);
  }
};

export const isBlogDeleted = (blog) => {
  if (!blog) return false;
  try {
    const list = getDeletedBlogTombstones();
    if (!list || list.length === 0) return false;
    const set = new Set(list.map((s) => String(s).toLowerCase().trim()));

    const idStr = blog.id !== undefined && blog.id !== null ? String(blog.id).toLowerCase().trim() : '';
    const blogIdStr = blog.blogId ? String(blog.blogId).toLowerCase().trim() : '';
    const slugStr = blog.slug ? String(blog.slug).toLowerCase().trim() : '';
    const idNorm = idStr.replace(/^blog_/, '');
    const blogIdNorm = blogIdStr.replace(/^blog_/, '');

    if (idStr && set.has(idStr)) return true;
    if (blogIdStr && set.has(blogIdStr)) return true;
    if (slugStr && set.has(slugStr)) return true;
    if (idNorm && set.has(idNorm)) return true;
    if (blogIdNorm && set.has(blogIdNorm)) return true;
  } catch {
    // ignore
  }
  return false;
};

export const formatBlogPublishedDate = (blog) => {
  if (!blog) return '';
  if (blog.publishedDate && typeof blog.publishedDate === 'string' && blog.publishedDate.trim()) {
    return blog.publishedDate.trim();
  }
  if (blog.createdAt) {
    try {
      if (Array.isArray(blog.createdAt) && blog.createdAt.length >= 3) {
        const d = new Date(blog.createdAt[0], (blog.createdAt[1] || 1) - 1, blog.createdAt[2] || 1);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
        }
      }
      const normalized = String(blog.createdAt).replace(/(\.\d{3})\d+/, '$1');
      const d = new Date(normalized);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }
    } catch {
      // ignore
    }
  }
  return 'Recently Published';
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
  return String(blog.id || blog.blogId || '');
};

export const getBlogTimestamp = (blog) => {
  if (!blog) return 0;
  if (blog.createdAt) {
    if (Array.isArray(blog.createdAt) && blog.createdAt.length >= 3) {
      const d = new Date(blog.createdAt[0], (blog.createdAt[1] || 1) - 1, blog.createdAt[2] || 1);
      const t = d.getTime();
      if (!isNaN(t) && t > 0) return t;
    }
    const normalized = String(blog.createdAt).replace(/(\.\d{3})\d+/, '$1');
    const t = new Date(normalized).getTime();
    if (!isNaN(t) && t > 0) return t;
  }
  if (blog.publishedDate && typeof blog.publishedDate === 'string') {
    const t = new Date(blog.publishedDate).getTime();
    if (!isNaN(t) && t > 0) return t;
  }
  if (blog.id && typeof blog.id === 'string' && blog.id.startsWith('blog_')) {
    const num = parseInt(blog.id.replace('blog_', ''), 10);
    if (!isNaN(num) && num > 1000000) return num;
  }
  if (blog.blogId && typeof blog.blogId === 'string' && blog.blogId.startsWith('blog_')) {
    const num = parseInt(blog.blogId.replace('blog_', ''), 10);
    if (!isNaN(num) && num > 1000000) return num;
  }
  if (typeof blog.id === 'number') {
    return blog.id;
  }
  return 0;
};

// Comprehensive blog deduplication matcher
export const isSameBlog = (a, b) => {
  if (!a || !b) return false;

  // 1. Direct ID match (handles number vs string e.g. 1 == "1")
  if (a.id !== undefined && b.id !== undefined && String(a.id) === String(b.id)) return true;

  // 2. blogId match (e.g. "blog_1" === "blog_1")
  if (a.blogId && b.blogId && String(a.blogId) === String(b.blogId)) return true;

  // 3. Cross id vs blogId match
  if (a.id && b.blogId && (String(a.id) === String(b.blogId) || String(a.blogId) === String(b.id))) return true;

  // 4. Normalized numeric ID matching (e.g. "blog_1" vs "1" or 1)
  const normA = String(a.id || a.blogId || '').replace(/^blog_/, '');
  const normB = String(b.id || b.blogId || '').replace(/^blog_/, '');
  if (normA && normB && normA === normB) return true;

  // 5. Slug match
  const slugA = (a.slug || '').trim().toLowerCase();
  const slugB = (b.slug || '').trim().toLowerCase();
  if (slugA && slugB && slugA === slugB) return true;

  // 6. Cross slug vs id / blogId matching
  if (slugA && (String(b.id).toLowerCase() === slugA || String(b.blogId).toLowerCase() === slugA)) return true;
  if (slugB && (String(a.id).toLowerCase() === slugB || String(a.blogId).toLowerCase() === slugB)) return true;

  // 7. Title match (case-insensitive, trimmed)
  const titleA = (a.title || '').trim().toLowerCase();
  const titleB = (b.title || '').trim().toLowerCase();
  if (titleA && titleB && titleA === titleB) return true;

  return false;
};

// Merge utility: Authoritative backend data takes priority; does not resurrect deleted blogs
export const mergeBlogLists = (backendList = [], localList = []) => {
  const merged = [];
  const bList = Array.isArray(backendList) ? backendList.filter((b) => b && !isBlogDeleted(b)) : [];
  const lList = Array.isArray(localList) ? localList.filter((b) => b && !isBlogDeleted(b)) : [];

  for (const b of bList) {
    if (!merged.some((m) => isSameBlog(m, b))) {
      merged.push({
        ...b,
        id: b.id || b.blogId,
        slug: b.slug || getBlogSlug(b),
        publishedDate: formatBlogPublishedDate(b),
      });
    }
  }

  for (const l of lList) {
    if (!merged.some((m) => isSameBlog(m, l))) {
      merged.push({
        ...l,
        id: l.id || l.blogId,
        slug: l.slug || getBlogSlug(l),
        publishedDate: formatBlogPublishedDate(l),
      });
    }
  }

  return merged.sort((a, b) => getBlogTimestamp(b) - getBlogTimestamp(a));
};

// Helper to get local stored blogs with deduplication and tombstone filtering
const getLocalBlogs = () => {
  try {
    const raw = localStorage.getItem('ghe_blogs') || localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const unique = [];
        for (const b of parsed) {
          if (b && !isBlogDeleted(b) && !unique.some((u) => isSameBlog(u, b))) {
            unique.push(b);
          }
        }
        return unique;
      }
    }
  } catch (e) {
    console.error('Error reading blogs from localStorage', e);
  }
  return INITIAL_BLOGS.filter((b) => !isBlogDeleted(b));
};

// Helper to save local stored blogs
const saveLocalBlogs = (blogs) => {
  try {
    const clean = (Array.isArray(blogs) ? blogs : []).filter((b) => b && !isBlogDeleted(b));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    localStorage.setItem('ghe_blogs', JSON.stringify(clean));
  } catch (e) {
    console.error('Error saving blogs to localStorage', e);
  }
};

export const blogService = {
  getBlogSlug,
  getBlogTimestamp,
  formatBlogPublishedDate,
  isSameBlog,
  mergeBlogLists,
  isBlogDeleted,
  addBlogTombstone,
  getDeletedBlogTombstones,

  // Get all blogs with optional category filter
  getAllBlogs: async (category = '') => {
    try {
      const data = await blogsApi.getAll(category);
      if (Array.isArray(data)) {
        const enriched = data
          .filter((b) => b && !isBlogDeleted(b))
          .map((b) => ({
            ...b,
            id: b.id || b.blogId,
            slug: b.slug || getBlogSlug(b),
            publishedDate: formatBlogPublishedDate(b),
          }));

        // Merge with locally stored blogs that have not synced yet
        const local = getLocalBlogs();
        const merged = [...enriched];
        for (const loc of local) {
          if (loc && !isBlogDeleted(loc) && !merged.some((m) => isSameBlog(m, loc))) {
            merged.push(loc);
          }
        }

        saveLocalBlogs(merged);
        if (category && category.toLowerCase() !== 'all') {
          return merged.filter(
            (b) => b.category && b.category.toLowerCase() === category.toLowerCase()
          );
        }
        return merged;
      }
    } catch (err) {
      console.warn('API blogs fetch failed, falling back to local cache:', err.message);
    }

    const local = getLocalBlogs()
      .filter((b) => b && !isBlogDeleted(b))
      .map((b) => ({
        ...b,
        slug: b.slug || getBlogSlug(b),
        id: b.id || b.blogId,
        publishedDate: formatBlogPublishedDate(b),
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
    if (!idOrSlug) throw new Error('Blog article not found');
    if (isBlogDeleted({ id: idOrSlug, slug: idOrSlug, blogId: idOrSlug })) {
      throw new Error('Blog article not found');
    }

    let apiError = null;
    try {
      const data = await blogsApi.getByIdOrSlug(idOrSlug);
      if (data && !isBlogDeleted(data)) {
        return {
          ...data,
          slug: data.slug || getBlogSlug(data),
          id: data.id || data.blogId,
          publishedDate: formatBlogPublishedDate(data),
        };
      }
    } catch (err) {
      apiError = err;
      console.warn('API blog detail fetch failed:', err.message);
    }

    // If backend explicitly returned 404 (Not Found), the blog was deleted or never existed.
    // Do NOT resurrect it from stale local cache!
    if (
      apiError &&
      (apiError.status === 404 ||
        apiError.message?.includes('404') ||
        apiError.message?.toLowerCase().includes('not found'))
    ) {
      addBlogTombstone(idOrSlug);
      try {
        const local = getLocalBlogs().filter(
          (b) =>
            !isSameBlog(b, { id: idOrSlug, slug: idOrSlug, blogId: idOrSlug }) &&
            b.slug !== idOrSlug &&
            String(b.id) !== String(idOrSlug) &&
            String(b.blogId) !== String(idOrSlug)
        );
        saveLocalBlogs(local);
      } catch (cacheErr) {
        console.warn('Failed to prune deleted blog from local cache:', cacheErr);
      }
      throw new Error('Blog article not found');
    }

    // Offline fallback to local cache
    const local = getLocalBlogs().filter((b) => !isBlogDeleted(b));
    const found = local.find(
      (b) =>
        b.slug === idOrSlug ||
        b.id === idOrSlug ||
        b.blogId === idOrSlug ||
        String(b.id) === String(idOrSlug) ||
        getBlogSlug(b) === idOrSlug
    );
    if (found) {
      return {
        ...found,
        slug: found.slug || getBlogSlug(found),
        id: found.id || found.blogId,
        publishedDate: formatBlogPublishedDate(found),
      };
    }
    throw new Error('Blog article not found');
  },

  // Create blog (Admin)
  createBlog: async (blogData) => {
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
      textAlign: blogData.textAlign || 'left',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let created = null;
    try {
      created = await blogsApi.create(newBlog);
    } catch (err) {
      console.warn('Failed to save blog to API, persisting locally:', err.message);
    }

    const item = {
      ...(created || newBlog),
      publishedDate: formatBlogPublishedDate(created || newBlog),
      slug: (created && created.slug) || newBlog.slug,
      id: (created && (created.id || created.blogId)) || newBlog.id,
    };
    removeBlogTombstone(item);
    const local = getLocalBlogs();
    const updatedList = [item, ...local.filter((b) => !isSameBlog(b, item))];
    saveLocalBlogs(updatedList);
    return item;
  },

  // Update blog (Admin)
  updateBlog: async (id, blogData) => {
    const updatedData = {
      ...blogData,
      updatedAt: new Date().toISOString(),
    };

    removeBlogTombstone(id);
    removeBlogTombstone(updatedData);

    let updated = null;
    try {
      updated = await blogsApi.update(id, updatedData);
    } catch (err) {
      console.warn('Failed to update blog on API, saving locally:', err.message);
    }

    const item = {
      ...(updated || { ...updatedData, id }),
      publishedDate: formatBlogPublishedDate(updated || { ...updatedData, id }),
    };
    removeBlogTombstone(item);
    const local = getLocalBlogs();
    const updatedList = local.map((b) =>
      isSameBlog(b, { id }) || b.slug === id || String(b.id) === String(id) ? item : b
    );
    saveLocalBlogs(updatedList);
    return item;
  },

  // Delete blog (Admin)
  deleteBlog: async (id) => {
    const local = getLocalBlogs();
    const target = local.find(
      (b) =>
        isSameBlog(b, { id, slug: id, blogId: id }) ||
        b.slug === id ||
        String(b.id) === String(id) ||
        String(b.blogId) === String(id)
    );

    // Record tombstone so it can never resurrect
    if (target) {
      addBlogTombstone(target);
      if (target.id) addBlogTombstone(target.id);
      if (target.blogId) addBlogTombstone(target.blogId);
      if (target.slug) addBlogTombstone(target.slug);
    }
    addBlogTombstone(id);

    // Remove locally
    const filtered = local.filter(
      (b) =>
        !isSameBlog(b, { id, slug: id, blogId: id }) &&
        b.slug !== id &&
        String(b.id) !== String(id) &&
        String(b.blogId) !== String(id)
    );
    saveLocalBlogs(filtered);

    // Remove from API
    try {
      await blogsApi.delete(id);
      if (target && target.id && String(target.id) !== String(id)) {
        await blogsApi.delete(target.id);
      }
    } catch (err) {
      console.warn('Failed to delete blog on API, removing locally:', err.message);
    }

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
