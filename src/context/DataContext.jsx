/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { visitorsApi, exhibitorsApi, sponsorshipsApi, contactApi, healthApi } from '../services/api';

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

  const [backendStatus, setBackendStatus] = useState({
    isOnline: false,
    checked: false,
    database: null,
  });

  // Re-fetch everything from backend
  const refreshData = useCallback(async () => {
    try {
      const health = await healthApi.check();
      if (health && health.isOnline) {
        setBackendStatus({
          isOnline: true,
          checked: true,
          database: health.database || 'active',
        });

        const [bVisitors, bExhibitors, bSponsorships, bInquiries] = await Promise.allSettled([
          visitorsApi.getAll(),
          exhibitorsApi.getAll(),
          sponsorshipsApi.getAll(),
          contactApi.getAll(),
        ]);

        if (bVisitors.status === 'fulfilled' && bVisitors.value?.length > 0) {
          setVisitors(bVisitors.value);
        }
        if (bExhibitors.status === 'fulfilled' && bExhibitors.value?.length > 0) {
          setExhibitors(bExhibitors.value);
        }
        if (bSponsorships.status === 'fulfilled' && bSponsorships.value?.length > 0) {
          setSponsorships(bSponsorships.value);
        }
        if (bInquiries.status === 'fulfilled' && bInquiries.value?.length > 0) {
          setInquiries(bInquiries.value);
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

          const [bVisitors, bExhibitors, bSponsorships, bInquiries] = await Promise.allSettled([
            visitorsApi.getAll(),
            exhibitorsApi.getAll(),
            sponsorshipsApi.getAll(),
            contactApi.getAll(),
          ]);

          if (!active) return;
          if (bVisitors.status === 'fulfilled' && bVisitors.value?.length > 0) {
            setVisitors(bVisitors.value);
          }
          if (bExhibitors.status === 'fulfilled' && bExhibitors.value?.length > 0) {
            setExhibitors(bExhibitors.value);
          }
          if (bSponsorships.status === 'fulfilled' && bSponsorships.value?.length > 0) {
            setSponsorships(bSponsorships.value);
          }
          if (bInquiries.status === 'fulfilled' && bInquiries.value?.length > 0) {
            setInquiries(bInquiries.value);
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

  const resetToDefaults = () => {
    setVisitors(INITIAL_VISITORS);
    setExhibitors(INITIAL_EXHIBITORS);
    setSponsorships(INITIAL_SPONSORSHIPS);
    setInquiries(INITIAL_INQUIRIES);
  };

  return (
    <DataContext.Provider
      value={{
        visitors,
        exhibitors,
        sponsorships,
        inquiries,
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
