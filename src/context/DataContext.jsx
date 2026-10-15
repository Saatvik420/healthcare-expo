/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { visitorsApi, exhibitorsApi, sponsorshipsApi, contactApi, blogsApi, healthApi } from '../services/api';
import { INITIAL_BLOGS, getBlogSlug, formatBlogPublishedDate, isSameBlog } from '../services/blogService';

const DataContext = createContext();

const INITIAL_VISITORS = [
  {
    id: 'vis_101',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@apexbio.com',
    phone: '+1 415 890 2341',
    organization: 'Apex BioLabs US',
    designation: 'Senior Formulation Scientist',
    country: 'United States',
    sector: 'apis',
    sectorLabel: 'APIs & Fine Chemicals',
    passType: 'vip',
    passCode: 'IGHE-2027-881920',
    date: 'Jan 15, 2027',
    status: 'Confirmed',
    attendDay: 'all',
    notes: 'Interested in API sourcing partnerships and cold-chain compliance.',
  },
  {
    id: 'vis_102',
    name: 'Vikram Singhania',
    email: 'vikram.s@ranbaxy-procure.in',
    phone: '+91 98110 54321',
    organization: 'Singhania Pharma Dist.',
    designation: 'VP Global Procurement',
    country: 'India',
    sector: 'finished',
    sectorLabel: 'Finished Formulations',
    passType: 'vip',
    passCode: 'IGHE-2027-443198',
    date: 'Jan 16, 2027',
    status: 'Checked-in',
    attendDay: 'all',
    notes: 'Leading high-level delegation for hospital supply contracts.',
  },
  {
    id: 'vis_103',
    name: 'Elena Rostova',
    email: 'e.rostova@eurosterile.de',
    phone: '+49 30 901820',
    organization: 'EuroSterile Systems GmbH',
    designation: 'Cleanroom Engineering Lead',
    country: 'Germany',
    sector: 'machinery',
    sectorLabel: 'Pharma Machinery',
    passType: 'standard',
    passCode: 'IGHE-2027-620184',
    date: 'Jan 17, 2027',
    status: 'Confirmed',
    attendDay: 'Day 1',
    notes: 'Evaluating modular cleanroom suppliers across ASEAN.',
  },
  {
    id: 'vis_104',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@gulfpharma.ae',
    phone: '+971 50 123 4567',
    organization: 'Gulf Health Logistics',
    designation: 'Cold-Chain Operations Director',
    country: 'United Arab Emirates',
    sector: 'packaging',
    sectorLabel: 'Packaging & Delivery',
    passType: 'standard',
    passCode: 'IGHE-2027-771239',
    date: 'Jan 18, 2027',
    status: 'Confirmed',
    attendDay: 'Day 2',
    notes: 'Looking for temperature-controlled pharma packaging distributors.',
  },
  {
    id: 'vis_105',
    name: 'Aoi Takahashi',
    email: 'takahashi@kyotobiotech.jp',
    phone: '+81 3 5555 0192',
    organization: 'Kyoto Peptide Synthesis Corp',
    designation: 'R&D Director',
    country: 'Japan',
    sector: 'apis',
    sectorLabel: 'APIs & Fine Chemicals',
    passType: 'vip',
    passCode: 'IGHE-2027-905412',
    date: 'Jan 19, 2027',
    status: 'Confirmed',
    attendDay: 'all',
    notes: 'Attending India-ASEAN biotech research keynote sessions.',
  },
  {
    id: 'vis_106',
    name: 'Somchai Prasert',
    email: 'somchai.p@bangkokmedtech.th',
    phone: '+66 2 543 9801',
    organization: 'Bangkok MedTech Alliance',
    designation: 'Managing Director',
    country: 'Thailand',
    sector: 'devices',
    sectorLabel: 'Medical Devices & Diagnostics',
    passType: 'vip',
    passCode: 'IGHE-2027-310488',
    date: 'Jan 20, 2027',
    status: 'Confirmed',
    attendDay: 'all',
    notes: 'Local host liaison and medical devices buyer panelist.',
  },
];

const INITIAL_EXHIBITORS = [
  {
    id: 'exh_201',
    company: 'NovaForm Chem Ltd',
    contactPerson: 'Marcus Sterling',
    designation: 'VP International Sales',
    email: 'marcus@novaformchem.com',
    phone: '+44 20 7946 0912',
    website: 'https://novaformchem.com',
    stallType: '15 sq.m Healthcare Suite',
    hall: 'Hall 1 & 2 (APIs)',
    amount: '$4,250',
    status: 'Approved',
    bookingDate: 'Jan 10, 2027',
    notes: 'Requires 2 corner spotlights, 10kW 3-phase line, and buyer lounge proximity.',
  },
  {
    id: 'exh_202',
    company: 'SynthoMech Machinery Works',
    contactPerson: 'Klaus Reinhardt',
    designation: 'Managing Director',
    email: 'klaus@synthomech.de',
    phone: '+49 89 2314 55',
    website: 'https://synthomech.de',
    stallType: '18+ sq.m Raw Bare Space',
    hall: 'Hall 4 (Machinery)',
    amount: '$5,800',
    status: 'Approved',
    bookingDate: 'Jan 12, 2027',
    notes: 'Heavy rotary tablet press display. Requires freight elevator and reinforced floor load.',
  },
  {
    id: 'exh_203',
    company: 'AeroSeal Sterile Packaging',
    contactPerson: 'Meera Deshmukh',
    designation: 'Head of Business Development',
    email: 'meera@aerosealpack.com',
    phone: '+91 99201 88472',
    website: 'https://aerosealpack.com',
    stallType: '9 sq.m Shell Scheme',
    hall: 'Hall 5 (Packaging)',
    amount: '$2,750',
    status: 'Pending Review',
    bookingDate: 'Jan 16, 2027',
    notes: 'Requesting corner booth near the primary visitor registration entrance.',
  },
  {
    id: 'exh_204',
    company: 'BioGenix Active Intermediates',
    contactPerson: 'Carlos Mendez',
    designation: 'Regional Commercial Director',
    email: 'carlos@biogenix-rx.es',
    phone: '+34 91 123 4567',
    website: 'https://biogenix-rx.es',
    stallType: '15 sq.m Healthcare Suite',
    hall: 'Hall 1 & 2 (APIs)',
    amount: '$4,250',
    status: 'Contract Dispatched',
    bookingDate: 'Jan 18, 2027',
    notes: 'Provisional advance received. Waiting for signed exhibitor contract indemnity clause.',
  },
  {
    id: 'exh_205',
    company: 'Siam BioHealth Tech',
    contactPerson: 'Anong Chokchai',
    designation: 'Chief Technology Officer',
    email: 'anong@siambiohealth.co.th',
    phone: '+66 2 899 4432',
    website: 'https://siambiohealth.co.th',
    stallType: '9 sq.m Shell Scheme',
    hall: 'Hall 3 (Formulations)',
    amount: '$2,750',
    status: 'Approved',
    bookingDate: 'Jan 19, 2027',
    notes: 'Thai national healthcare innovation pavilion co-sponsor.',
  },
];

const INITIAL_SPONSORSHIPS = [
  {
    id: 'sp_301',
    company: 'Alliance BioTech International',
    contactPerson: 'Dr. Gregory House',
    email: 'ghouse@alliancebio.com',
    phone: '+1 212 555 0144',
    tier: 'Platinum Partner',
    investment: '$18,000',
    status: 'Agreement Signed',
    date: 'Jan 05, 2027',
  },
  {
    id: 'sp_302',
    company: 'Pharmatronic Automation Group',
    contactPerson: 'Helen Wu',
    email: 'helen.wu@pharmatronic.sg',
    phone: '+65 6789 0123',
    tier: 'Gold Partner',
    investment: '$11,000',
    status: 'In Discussion',
    date: 'Jan 12, 2027',
  },
  {
    id: 'sp_303',
    company: 'Veloce Therapeutics Global',
    contactPerson: 'Jean-Luc Picard',
    email: 'j.picard@veloce-tx.com',
    phone: '+33 1 4268 5500',
    tier: 'Official Lanyard Sponsor',
    investment: '$8,500',
    status: 'Agreement Signed',
    date: 'Jan 14, 2027',
  },
];

const INITIAL_INQUIRIES = [
  {
    id: 'inq_401',
    name: 'Dr. Aris Thorne',
    email: 'a.thorne@oxfordhealth.uk',
    phone: '+44 1865 270000',
    organization: 'Oxford Clinical Institute',
    inquiryType: 'speaking',
    subject: 'Keynote Panel Proposal on AI in Oncology Diagnostics',
    message: 'We would like to propose a 30-minute keynote on automated diagnostic imaging for the India-ASEAN clinical conference track.',
    date: 'Jan 19, 2027',
    status: 'New',
  },
  {
    id: 'inq_402',
    name: 'Priya Nambiar',
    email: 'priya.n@keralamed.org',
    phone: '+91 94471 22334',
    organization: 'Kerala State Health Board',
    inquiryType: 'delegation',
    subject: 'Official State Delegation Visit (12 Officers)',
    message: 'Planning to bring a 12-member delegation of hospital administrators to study Southeast Asian pharmaceutical supply chains.',
    date: 'Jan 20, 2027',
    status: 'Replied',
  },
];

export function DataProvider({ children }) {
  const [visitors, setVisitors] = useState(() => {
    try {
      const stored = localStorage.getItem('ghe_visitors');
      return stored ? JSON.parse(stored) : INITIAL_VISITORS;
    } catch {
      return INITIAL_VISITORS;
    }
  });

  const [exhibitors, setExhibitors] = useState(() => {
    try {
      const stored = localStorage.getItem('ghe_exhibitors');
      return stored ? JSON.parse(stored) : INITIAL_EXHIBITORS;
    } catch {
      return INITIAL_EXHIBITORS;
    }
  });

  const [sponsorships, setSponsorships] = useState(() => {
    try {
      const stored = localStorage.getItem('ghe_sponsorships');
      return stored ? JSON.parse(stored) : INITIAL_SPONSORSHIPS;
    } catch {
      return INITIAL_SPONSORSHIPS;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const stored = localStorage.getItem('ghe_inquiries');
      return stored ? JSON.parse(stored) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [blogs, setBlogs] = useState(() => {
    try {
      const stored = localStorage.getItem('ghe_blogs') || localStorage.getItem('ighe_blogs_cache');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const unique = [];
          for (const b of parsed) {
            if (!unique.some((u) => isSameBlog(u, b))) {
              unique.push(b);
            }
          }
          return unique;
        }
      }
      return INITIAL_BLOGS;
    } catch {
      return INITIAL_BLOGS;
    }
  });

  const [backendStatus, setBackendStatus] = useState({
    isOnline: false,
    checked: false,
    database: null,
  });

  // Re-fetch everything from backend as authoritative source of truth
  const refreshData = useCallback(async () => {
    try {
      const health = await healthApi.check();
      if (health && health.isOnline) {
        setBackendStatus({
          isOnline: true,
          checked: true,
          database: health.database || 'active',
        });

        const [bVisitors, bExhibitors, bSponsorships, bInquiries, bBlogs] = await Promise.allSettled([
          visitorsApi.getAll(),
          exhibitorsApi.getAll(),
          sponsorshipsApi.getAll(),
          contactApi.getAll(),
          blogsApi.getAll(),
        ]);

        if (bVisitors.status === 'fulfilled' && Array.isArray(bVisitors.value)) {
          setVisitors(bVisitors.value);
          try {
            localStorage.setItem('ghe_visitors', JSON.stringify(bVisitors.value));
          } catch (storageErr) {
            console.warn('Failed to cache visitors:', storageErr);
          }
        }
        if (bExhibitors.status === 'fulfilled' && Array.isArray(bExhibitors.value)) {
          setExhibitors(bExhibitors.value);
          try {
            localStorage.setItem('ghe_exhibitors', JSON.stringify(bExhibitors.value));
          } catch (storageErr) {
            console.warn('Failed to cache exhibitors:', storageErr);
          }
        }
        if (bSponsorships.status === 'fulfilled' && Array.isArray(bSponsorships.value)) {
          setSponsorships(bSponsorships.value);
          try {
            localStorage.setItem('ghe_sponsorships', JSON.stringify(bSponsorships.value));
          } catch (storageErr) {
            console.warn('Failed to cache sponsorships:', storageErr);
          }
        }
        if (bInquiries.status === 'fulfilled' && Array.isArray(bInquiries.value)) {
          setInquiries(bInquiries.value);
          try {
            localStorage.setItem('ghe_inquiries', JSON.stringify(bInquiries.value));
          } catch (storageErr) {
            console.warn('Failed to cache inquiries:', storageErr);
          }
        }
        if (bBlogs.status === 'fulfilled' && Array.isArray(bBlogs.value)) {
          const normalized = bBlogs.value.map((b) => ({
            ...b,
            id: b.id || b.blogId,
            slug: b.slug || getBlogSlug(b),
            publishedDate: formatBlogPublishedDate(b),
          }));
          setBlogs(normalized);
          try {
            localStorage.setItem('ghe_blogs', JSON.stringify(normalized));
            localStorage.setItem('ighe_blogs_cache', JSON.stringify(normalized));
          } catch (storageErr) {
            console.warn('Cache write failed:', storageErr);
          }
        }
        return true;
      } else {
        setBackendStatus({ isOnline: false, checked: true, database: 'local-storage' });
        return false;
      }
    } catch {
      setBackendStatus({ isOnline: false, checked: true, database: 'local-storage' });
      return false;
    }
  }, []);

  // Sync on mount
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const health = await healthApi.check();
        if (!active) return;
        if (health && health.isOnline) {
          setBackendStatus({
            isOnline: true,
            checked: true,
            database: health.database || 'active',
          });

          const [bVisitors, bExhibitors, bSponsorships, bInquiries, bBlogs] = await Promise.allSettled([
            visitorsApi.getAll(),
            exhibitorsApi.getAll(),
            sponsorshipsApi.getAll(),
            contactApi.getAll(),
            blogsApi.getAll(),
          ]);

          if (!active) return;
          if (bVisitors.status === 'fulfilled' && Array.isArray(bVisitors.value)) {
            setVisitors(bVisitors.value);
            try {
              localStorage.setItem('ghe_visitors', JSON.stringify(bVisitors.value));
            } catch (storageErr) {
              console.warn('Failed to cache visitors:', storageErr);
            }
          }
          if (bExhibitors.status === 'fulfilled' && Array.isArray(bExhibitors.value)) {
            setExhibitors(bExhibitors.value);
            try {
              localStorage.setItem('ghe_exhibitors', JSON.stringify(bExhibitors.value));
            } catch (storageErr) {
              console.warn('Failed to cache exhibitors:', storageErr);
            }
          }
          if (bSponsorships.status === 'fulfilled' && Array.isArray(bSponsorships.value)) {
            setSponsorships(bSponsorships.value);
            try {
              localStorage.setItem('ghe_sponsorships', JSON.stringify(bSponsorships.value));
            } catch (storageErr) {
              console.warn('Failed to cache sponsorships:', storageErr);
            }
          }
          if (bInquiries.status === 'fulfilled' && Array.isArray(bInquiries.value)) {
            setInquiries(bInquiries.value);
            try {
              localStorage.setItem('ghe_inquiries', JSON.stringify(bInquiries.value));
            } catch (storageErr) {
              console.warn('Failed to cache inquiries:', storageErr);
            }
          }
          if (bBlogs.status === 'fulfilled' && Array.isArray(bBlogs.value)) {
            const normalized = bBlogs.value.map((b) => ({
              ...b,
              id: b.id || b.blogId,
              slug: b.slug || getBlogSlug(b),
              publishedDate: formatBlogPublishedDate(b),
            }));
            setBlogs(normalized);
            try {
              localStorage.setItem('ghe_blogs', JSON.stringify(normalized));
              localStorage.setItem('ighe_blogs_cache', JSON.stringify(normalized));
            } catch (storageErr) {
              console.warn('Cache write failed:', storageErr);
            }
          }
        } else {
          setBackendStatus({ isOnline: false, checked: true, database: 'local-storage' });
        }
      } catch {
        if (active) {
          setBackendStatus({ isOnline: false, checked: true, database: 'local-storage' });
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // Auto-sync when window / tab gains focus to immediately reflect edits/deletions from another browser
  useEffect(() => {
    let lastRefresh = 0;
    const handleSync = () => {
      const now = Date.now();
      if (now - lastRefresh < 3000) return;
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        lastRefresh = now;
        refreshData();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', handleSync);
      document.addEventListener('visibilitychange', handleSync);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('focus', handleSync);
        document.removeEventListener('visibilitychange', handleSync);
      }
    };
  }, [refreshData]);

  // Persist local storage fallbacks
  useEffect(() => {
    localStorage.setItem('ghe_visitors', JSON.stringify(visitors));
  }, [visitors]);

  useEffect(() => {
    localStorage.setItem('ghe_exhibitors', JSON.stringify(exhibitors));
  }, [exhibitors]);

  useEffect(() => {
    localStorage.setItem('ghe_sponsorships', JSON.stringify(sponsorships));
  }, [sponsorships]);

  useEffect(() => {
    localStorage.setItem('ghe_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('ghe_blogs', JSON.stringify(blogs));
    localStorage.setItem('ighe_blogs_cache', JSON.stringify(blogs));
  }, [blogs]);

  // Visitor Operations
  const addVisitor = async (visitorData) => {
    const newVisitor = {
      ...visitorData,
      id: visitorData.id || 'vis_' + Date.now(),
      date: visitorData.date || new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: visitorData.status || 'Confirmed',
    };
    setVisitors((prev) => [newVisitor, ...prev]);

    try {
      await visitorsApi.create(newVisitor);
    } catch {
      // Saved in localStorage
    }
    return newVisitor;
  };

  const updateVisitor = async (id, updateData) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updateData } : v))
    );
    try {
      await visitorsApi.update(id, updateData);
    } catch {
      // Saved in localStorage
    }
  };

  const deleteVisitor = async (id) => {
    setVisitors((prev) => prev.filter((v) => v.id !== id));
    try {
      await visitorsApi.delete(id);
    } catch {
      // Saved in localStorage
    }
  };

  // Exhibitor Operations
  const addExhibitor = async (exhibitorData) => {
    const newExhibitor = {
      ...exhibitorData,
      id: exhibitorData.id || 'exh_' + Date.now(),
      bookingDate: exhibitorData.bookingDate || new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: exhibitorData.status || 'Pending Review',
    };
    setExhibitors((prev) => [newExhibitor, ...prev]);

    try {
      await exhibitorsApi.create(newExhibitor);
    } catch {
      // Saved in localStorage
    }
    return newExhibitor;
  };

  const updateExhibitor = async (id, updateData) => {
    setExhibitors((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updateData } : e))
    );
    try {
      await exhibitorsApi.update(id, updateData);
    } catch {
      // Saved in localStorage
    }
  };

  const updateExhibitorStatus = async (id, newStatus) => {
    setExhibitors((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    try {
      await exhibitorsApi.updateStatus(id, newStatus);
    } catch {
      // Saved in localStorage
    }
  };

  const deleteExhibitor = async (id) => {
    setExhibitors((prev) => prev.filter((e) => e.id !== id));
    try {
      await exhibitorsApi.delete(id);
    } catch {
      // Saved in localStorage
    }
  };

  // Sponsorship Operations
  const addSponsorship = async (sponsorshipData) => {
    const newSponsorship = {
      ...sponsorshipData,
      id: sponsorshipData.id || 'sp_' + Date.now(),
      date: sponsorshipData.date || new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: sponsorshipData.status || 'In Discussion',
    };
    setSponsorships((prev) => [newSponsorship, ...prev]);

    try {
      await sponsorshipsApi.create(newSponsorship);
    } catch {
      // Saved in localStorage
    }
    return newSponsorship;
  };

  const updateSponsorshipStatus = async (id, newStatus) => {
    setSponsorships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    try {
      await sponsorshipsApi.updateStatus(id, newStatus);
    } catch {
      // Saved in localStorage
    }
  };

  const deleteSponsorship = async (id) => {
    setSponsorships((prev) => prev.filter((s) => s.id !== id));
    try {
      await sponsorshipsApi.delete(id);
    } catch {
      // Saved in localStorage
    }
  };

  // Contact Inquiries Operations
  const deleteInquiry = async (id) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    try {
      await contactApi.delete(id);
    } catch {
      // Saved in localStorage
    }
  };

  // Blog Operations
  const addBlog = async (blogData) => {
    const slug = blogData.slug || getBlogSlug(blogData);
    const blogId = blogData.id || blogData.blogId || 'blog_' + Date.now();
    const tagsArray = Array.isArray(blogData.tags)
      ? blogData.tags
      : typeof blogData.tags === 'string'
      ? blogData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const newBlog = {
      ...blogData,
      id: blogId,
      blogId,
      slug,
      author: blogData.author?.trim() || 'IndiGlobal Healthcare Expo',
      authorRole: blogData.authorRole?.trim() || 'Secretariat Contributor',
      category: blogData.category?.trim() || 'Our Blogs',
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
      textAlign: blogData.textAlign || 'left',
      tags: tagsArray,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 1. Immediately update state so it appears on screen without delay
    setBlogs((prev) => [newBlog, ...prev.filter((b) => !isSameBlog(b, newBlog))]);

    // 2. Immediately persist to localStorage, preserving initial blogs if first article
    try {
      const rawStored = localStorage.getItem('ghe_blogs') || localStorage.getItem('ighe_blogs_cache');
      let baseList = INITIAL_BLOGS;
      if (rawStored) {
        try {
          const parsed = JSON.parse(rawStored);
          if (Array.isArray(parsed) && parsed.length > 0) baseList = parsed;
        } catch {
          // fallback
        }
      }
      const updated = [newBlog, ...baseList.filter((b) => !isSameBlog(b, newBlog))];
      localStorage.setItem('ghe_blogs', JSON.stringify(updated));
      localStorage.setItem('ighe_blogs_cache', JSON.stringify(updated));
    } catch (e) {
      console.warn('Local storage write error:', e);
    }

    // 3. Sync to API with fallback
    try {
      const created = await blogsApi.create(newBlog);
      if (created) {
        const enriched = {
          ...newBlog,
          ...created,
          id: created.id || created.blogId || newBlog.id,
          slug: created.slug || newBlog.slug,
          publishedDate: formatBlogPublishedDate(created) || newBlog.publishedDate,
          tags: Array.isArray(created.tags)
            ? created.tags
            : typeof created.tags === 'string'
            ? created.tags.split(',').map((t) => t.trim()).filter(Boolean)
            : newBlog.tags,
        };
        setBlogs((prev) =>
          prev.map((b) => (isSameBlog(b, newBlog) ? enriched : b))
        );
        try {
          const rawStored = localStorage.getItem('ghe_blogs') || '[]';
          const stored = JSON.parse(rawStored);
          const updated = stored.map((b) => (isSameBlog(b, newBlog) ? enriched : b));
          localStorage.setItem('ghe_blogs', JSON.stringify(updated));
          localStorage.setItem('ighe_blogs_cache', JSON.stringify(updated));
        } catch (storageErr) {
          console.warn('Failed to re-cache enriched blog:', storageErr);
        }
        return enriched;
      }
    } catch (err) {
      console.warn('Backend API save failed, safely preserved in local storage:', err);
    }
    return newBlog;
  };

  const updateBlog = async (id, updateData) => {
    if (!id && !updateData) return null;

    const slug = updateData.slug || (updateData.title ? getBlogSlug(updateData) : undefined);
    const tagsArray = Array.isArray(updateData.tags)
      ? updateData.tags
      : typeof updateData.tags === 'string'
      ? updateData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const updated = {
      ...updateData,
      ...(slug ? { slug } : {}),
      tags: tagsArray,
      updatedAt: new Date().toISOString(),
    };

    setBlogs((prev) => {
      const currentList = Array.isArray(prev) ? prev : [];
      const next = currentList.map((b) => {
        if (!b) return b;
        const matches =
          isSameBlog(b, { id, slug: id, blogId: id }) ||
          (id !== undefined && id !== null && (b.slug === id || String(b.id) === String(id) || String(b.blogId) === String(id)));
        return matches ? { ...b, ...updated } : b;
      });
      try {
        localStorage.setItem('ghe_blogs', JSON.stringify(next));
        localStorage.setItem('ighe_blogs_cache', JSON.stringify(next));
      } catch (e) {
        console.warn('Local storage write error:', e);
      }
      return next;
    });

    try {
      const res = await blogsApi.update(id, updated);
      if (res && typeof res === 'object') {
        const enriched = {
          ...updated,
          ...res,
          id: res.id || res.blogId || updated.id || id,
          blogId: res.blogId || updated.blogId || (res.id ? `blog_${res.id}` : id),
          slug: res.slug || slug || updated.slug,
          publishedDate: formatBlogPublishedDate(res) || updated.publishedDate,
          tags: Array.isArray(res.tags)
            ? res.tags
            : typeof res.tags === 'string'
            ? res.tags.split(',').map((t) => t.trim()).filter(Boolean)
            : tagsArray,
        };
        setBlogs((prev) => {
          const currentList = Array.isArray(prev) ? prev : [];
          const next = currentList.map((b) => {
            if (!b) return b;
            const matches =
              isSameBlog(b, { id, slug: id, blogId: id }) ||
              (id !== undefined && id !== null && (b.slug === id || String(b.id) === String(id) || String(b.blogId) === String(id)));
            return matches ? { ...b, ...enriched } : b;
          });
          try {
            localStorage.setItem('ghe_blogs', JSON.stringify(next));
            localStorage.setItem('ighe_blogs_cache', JSON.stringify(next));
          } catch (storageErr) {
            console.warn('Failed to cache enriched blog:', storageErr);
          }
          return next;
        });
        return enriched;
      }
    } catch (err) {
      console.warn('Backend API update failed, safely preserved in local storage:', err);
    }
    return updated;
  };

  const deleteBlog = async (id) => {
    setBlogs((prev) => {
      const currentList = Array.isArray(prev) ? prev : [];
      const next = currentList.filter(
        (b) =>
          b &&
          !isSameBlog(b, { id, slug: id, blogId: id }) &&
          (id === undefined || id === null || (b.slug !== id && String(b.id) !== String(id) && String(b.blogId) !== String(id)))
      );
      try {
        localStorage.setItem('ghe_blogs', JSON.stringify(next));
        localStorage.setItem('ighe_blogs_cache', JSON.stringify(next));
      } catch (e) {
        console.warn('Local storage write error:', e);
      }
      return next;
    });

    try {
      await blogsApi.delete(id);
    } catch (err) {
      console.warn('Backend API delete failed, removed from local storage:', err);
    }
  };

  const resetToDefaults = () => {
    setVisitors(INITIAL_VISITORS);
    setExhibitors(INITIAL_EXHIBITORS);
    setSponsorships(INITIAL_SPONSORSHIPS);
    setInquiries(INITIAL_INQUIRIES);
    setBlogs(INITIAL_BLOGS);
  };

  return (
    <DataContext.Provider
      value={{
        visitors,
        exhibitors,
        sponsorships,
        inquiries,
        blogs,
        backendStatus,
        refreshData,
        addVisitor,
        updateVisitor,
        deleteVisitor,
        addExhibitor,
        updateExhibitor,
        updateExhibitorStatus,
        deleteExhibitor,
        addSponsorship,
        updateSponsorshipStatus,
        deleteSponsorship,
        deleteInquiry,
        addBlog,
        updateBlog,
        deleteBlog,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
