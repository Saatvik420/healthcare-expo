/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const INITIAL_VISITORS = [
  {
    id: 'vis_101',
    name: 'Dr. Sarah Jenkins',
    email: 'visitor@example.com',
    phone: '+1 415 890 2341',
    organization: 'Apex BioLabs US',
    designation: 'Senior Formulation Scientist',
    sector: 'apis',
    sectorLabel: 'APIs & Fine Chemicals',
    passType: 'vip',
    passCode: 'GHE-2026-881920',
    date: 'Sep 24, 2026',
    status: 'Confirmed',
  },
  {
    id: 'vis_102',
    name: 'Vikram Singhania',
    email: 'vikram.s@ranbaxy-procure.in',
    phone: '+91 98110 54321',
    organization: 'Singhania Pharma Dist.',
    designation: 'VP Global Procurement',
    sector: 'finished',
    sectorLabel: 'Finished Formulations',
    passType: 'vip',
    passCode: 'GHE-2026-443198',
    date: 'Sep 25, 2026',
    status: 'Confirmed',
  },
  {
    id: 'vis_103',
    name: 'Elena Rostova',
    email: 'e.rostova@eurosterile.de',
    phone: '+49 30 901820',
    organization: 'EuroSterile Systems GmbH',
    designation: 'Cleanroom Engineering Lead',
    sector: 'machinery',
    sectorLabel: 'Pharma Machinery',
    passType: 'standard',
    passCode: 'GHE-2026-620184',
    date: 'Sep 26, 2026',
    status: 'Confirmed',
  },
  {
    id: 'vis_104',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@gulfpharma.ae',
    phone: '+971 50 123 4567',
    organization: 'Gulf Health Logistics',
    designation: 'Cold-Chain Operations Director',
    sector: 'packaging',
    sectorLabel: 'Packaging & Delivery',
    passType: 'standard',
    passCode: 'GHE-2026-771239',
    date: 'Sep 27, 2026',
    status: 'Confirmed',
  },
  {
    id: 'vis_105',
    name: 'Aoi Takahashi',
    email: 'takahashi@kyotobiotech.jp',
    phone: '+81 3 5555 0192',
    organization: 'Kyoto Peptide Synthesis Corp',
    designation: 'R&D Director',
    sector: 'apis',
    sectorLabel: 'APIs & Fine Chemicals',
    passType: 'vip',
    passCode: 'GHE-2026-905412',
    date: 'Sep 27, 2026',
    status: 'Confirmed',
  },
];

const INITIAL_EXHIBITORS = [
  {
    id: 'exh_201',
    company: 'NovaForm Chem Ltd',
    contactPerson: 'Marcus Sterling',
    designation: 'VP International Sales',
    email: 'exhibitor@apexbio.com',
    phone: '+44 20 7946 0912',
    stallType: '12 sq.m Prime Scheme',
    hall: 'Hall 1 & 2 (APIs)',
    amount: '$3,740',
    status: 'Approved',
    bookingDate: 'Sep 20, 2026',
    notes: 'Requires 2 corner spotlights and priority proximity to buyer lounge.',
  },
  {
    id: 'exh_202',
    company: 'SynthoMech Machinery Works',
    contactPerson: 'Klaus Reinhardt',
    designation: 'Managing Director',
    email: 'klaus@synthomech.com',
    phone: '+49 89 2314 55',
    stallType: '18+ sq.m Raw Bare Space',
    hall: 'Hall 4 (Machinery)',
    amount: '$5,200',
    status: 'Approved',
    bookingDate: 'Sep 22, 2026',
    notes: 'Heavy rotary press display. Heavy 3-phase 10 kW electrical hookup required.',
  },
  {
    id: 'exh_203',
    company: 'AeroSeal Sterile Packaging',
    contactPerson: 'Meera Deshmukh',
    designation: 'Head of Business Development',
    email: 'meera@aerosealpack.com',
    phone: '+91 99201 88472',
    stallType: '9 sq.m Shell Scheme',
    hall: 'Hall 5 (Packaging)',
    amount: '$2,750',
    status: 'Pending Review',
    bookingDate: 'Sep 26, 2026',
    notes: 'Requesting corner booth near the primary visitor entrance avenue.',
  },
  {
    id: 'exh_204',
    company: 'BioGenix Active Intermediates',
    contactPerson: 'Carlos Mendez',
    designation: 'Regional Commercial Director',
    email: 'carlos@biogenix-rx.es',
    phone: '+34 91 123 4567',
    stallType: '6 sq.m Shell Scheme',
    hall: 'Hall 1 & 2 (APIs)',
    amount: '$1,800',
    status: 'Contract Dispatched',
    bookingDate: 'Sep 27, 2026',
    notes: 'Provisional advance received. Waiting for signed exhibitor indemnity clause.',
  },
];

const INITIAL_SPONSORSHIPS = [
  {
    id: 'sp_301',
    company: 'Alliance BioTech International',
    contactPerson: 'Dr. Gregory House',
    email: 'ghouse@alliancebio.com',
    tier: 'Platinum Partner',
    investment: '$18,000',
    status: 'Agreement Signed',
    date: 'Sep 18, 2026',
  },
  {
    id: 'sp_302',
    company: 'Pharmatronic Automation Group',
    contactPerson: 'Helen Wu',
    email: 'helen.wu@pharmatronic.sg',
    tier: 'Gold Partner',
    investment: '$11,000',
    status: 'In Discussion',
    date: 'Sep 25, 2026',
  },
  {
    id: 'sp_303',
    company: 'Veloce Therapeutics Global',
    contactPerson: 'Jean-Luc Picard',
    email: 'j.picard@veloce-tx.com',
    tier: 'Official Lanyard Sponsor',
    investment: '$8,500',
    status: 'Agreement Signed',
    date: 'Sep 26, 2026',
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

  useEffect(() => {
    localStorage.setItem('ghe_visitors', JSON.stringify(visitors));
  }, [visitors]);

  useEffect(() => {
    localStorage.setItem('ghe_exhibitors', JSON.stringify(exhibitors));
  }, [exhibitors]);

  useEffect(() => {
    localStorage.setItem('ghe_sponsorships', JSON.stringify(sponsorships));
  }, [sponsorships]);

  const addVisitor = (visitorData) => {
    const newVisitor = {
      ...visitorData,
      id: 'vis_' + Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Confirmed',
    };
    setVisitors((prev) => [newVisitor, ...prev]);
    return newVisitor;
  };

  const deleteVisitor = (id) => {
    setVisitors((prev) => prev.filter((v) => v.id !== id));
  };

  const addExhibitor = (exhibitorData) => {
    const newExhibitor = {
      ...exhibitorData,
      id: 'exh_' + Date.now(),
      bookingDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Pending Review',
    };
    setExhibitors((prev) => [newExhibitor, ...prev]);
    return newExhibitor;
  };

  const updateExhibitorStatus = (id, newStatus) => {
    setExhibitors((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  const deleteExhibitor = (id) => {
    setExhibitors((prev) => prev.filter((e) => e.id !== id));
  };

  const addSponsorship = (sponsorshipData) => {
    const newSponsorship = {
      ...sponsorshipData,
      id: 'sp_' + Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'In Discussion',
    };
    setSponsorships((prev) => [newSponsorship, ...prev]);
    return newSponsorship;
  };

  const updateSponsorshipStatus = (id, newStatus) => {
    setSponsorships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  const resetToDefaults = () => {
    setVisitors(INITIAL_VISITORS);
    setExhibitors(INITIAL_EXHIBITORS);
    setSponsorships(INITIAL_SPONSORSHIPS);
  };

  return (
    <DataContext.Provider
      value={{
        visitors,
        exhibitors,
        sponsorships,
        addVisitor,
        deleteVisitor,
        addExhibitor,
        updateExhibitorStatus,
        deleteExhibitor,
        addSponsorship,
        updateSponsorshipStatus,
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
