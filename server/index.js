/* global process */
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  INITIAL_VISITORS,
  INITIAL_EXHIBITORS,
  INITIAL_SPONSORSHIPS,
  INITIAL_CONTACT_INQUIRIES,
  INITIAL_USERS,
} from './data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data', 'database.json');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database cache
let db = {
  visitors: [],
  exhibitors: [],
  sponsorships: [],
  contactInquiries: [],
  users: [],
};

// Load database from file or initialize
function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      db = JSON.parse(data);
      console.log('📦 Loaded existing database from disk');
    } else {
      console.log('🌱 Initializing database with seed data...');
      db = {
        visitors: INITIAL_VISITORS,
        exhibitors: INITIAL_EXHIBITORS,
        sponsorships: INITIAL_SPONSORSHIPS,
        contactInquiries: INITIAL_CONTACT_INQUIRIES,
        users: INITIAL_USERS,
      };
      saveDatabase();
    }
  } catch (err) {
    console.error('Error loading database, resetting to seeds:', err);
    db = {
      visitors: INITIAL_VISITORS,
      exhibitors: INITIAL_EXHIBITORS,
      sponsorships: INITIAL_SPONSORSHIPS,
      contactInquiries: INITIAL_CONTACT_INQUIRIES,
      users: INITIAL_USERS,
    };
  }
}

// Persist database to disk
function saveDatabase() {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving database:', err);
  }
}

loadDatabase();

// -------------------------------------------------------------
// Health Check
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    database: 'persistent-json',
    visitorCount: db.visitors.length,
    exhibitorCount: db.exhibitors.length,
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// Aggregated Dashboard Stats
// -------------------------------------------------------------
app.get('/api/stats', (req, res) => {
  const vipCount = db.visitors.filter((v) => v.passType === 'vip').length;
  const approvedExhibitors = db.exhibitors.filter((e) => e.status === 'Approved').length;
  const totalSponsorshipValue = db.sponsorships.reduce((acc, s) => {
    const num = parseInt((s.investment || '0').replace(/[^0-9]/g, ''), 10) || 0;
    return acc + num;
  }, 0);

  res.json({
    totalVisitors: db.visitors.length,
    vipDelegates: vipCount,
    standardVisitors: db.visitors.length - vipCount,
    totalExhibitors: db.exhibitors.length,
    approvedExhibitors,
    pendingExhibitors: db.exhibitors.length - approvedExhibitors,
    totalSponsorships: db.sponsorships.length,
    totalSponsorshipValue,
    totalInquiries: db.contactInquiries.length,
    floorOccupancy: '86.4%',
  });
});

// -------------------------------------------------------------
// Auth Routes
// -------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === cleanEmail && u.password === password
  );

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const safeUser = { ...user };
  delete safeUser.password;

  res.json({
    success: true,
    user: safeUser,
    token: `token_${safeUser.id}_${Date.now()}`,
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { email, password, name, role = 'visitor', organization, designation } = req.body || {};
  if (!email || !password || !name) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  }

  const cleanEmail = email.trim().toLowerCase();
  if (db.users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return res.status(409).json({ success: false, message: 'User with this email already exists' });
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    name,
    email: cleanEmail,
    password,
    role,
    organization: organization || '',
    designation: designation || '',
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  saveDatabase();

  const safeUser = { ...newUser };
  delete safeUser.password;

  res.status(201).json({
    success: true,
    user: safeUser,
    token: `token_${safeUser.id}_${Date.now()}`,
  });
});

// -------------------------------------------------------------
// Visitors API
// -------------------------------------------------------------
app.get('/api/visitors', (req, res) => {
  res.json(db.visitors);
});

app.get('/api/visitors/:id', (req, res) => {
  const visitor = db.visitors.find(
    (v) => v.id === req.params.id || v.passCode === req.params.id || v.visitorCode === req.params.id
  );
  if (!visitor) {
    return res.status(404).json({ error: 'Visitor not found' });
  }
  res.json(visitor);
});

app.post('/api/visitors', (req, res) => {
  const data = req.body || {};
  const newVisitor = {
    id: data.id || data.visitorCode || 'vis_' + Date.now(),
    visitorCode: data.visitorCode || data.id || 'vis_' + Date.now(),
    name: data.name || 'Anonymous Visitor',
    email: data.email || '',
    phone: data.phone || '',
    organization: data.organization || '',
    designation: data.designation || 'Trade Delegate',
    country: data.country || 'India',
    sector: data.sector || 'pharmaceuticals',
    sectorLabel: data.sectorLabel || data.sector || 'Pharmaceuticals',
    passType: data.passType || 'standard',
    passCode: data.passCode || 'IGHE-2027-' + Math.floor(100000 + Math.random() * 900000),
    date: data.attendDate || data.date || new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    attendDay: data.attendDay || 'all',
    status: data.status || 'Confirmed',
    notes: data.notes || '',
  };

  db.visitors.unshift(newVisitor);
  saveDatabase();
  res.status(201).json(newVisitor);
});

app.put('/api/visitors/:id', (req, res) => {
  const index = db.visitors.findIndex(
    (v) => v.id === req.params.id || v.visitorCode === req.params.id
  );
  if (index === -1) {
    return res.status(404).json({ error: 'Visitor not found' });
  }

  db.visitors[index] = { ...db.visitors[index], ...req.body };
  saveDatabase();
  res.json(db.visitors[index]);
});

app.delete('/api/visitors/:id', (req, res) => {
  const initialLen = db.visitors.length;
  db.visitors = db.visitors.filter(
    (v) => v.id !== req.params.id && v.visitorCode !== req.params.id
  );

  if (db.visitors.length === initialLen) {
    return res.status(404).json({ error: 'Visitor not found' });
  }

  saveDatabase();
  res.status(200).json({ success: true, message: 'Visitor deleted successfully' });
});

// -------------------------------------------------------------
// Exhibitors API
// -------------------------------------------------------------
app.get('/api/exhibitors', (req, res) => {
  res.json(db.exhibitors);
});

app.get('/api/exhibitors/:id', (req, res) => {
  const exhibitor = db.exhibitors.find(
    (e) => e.id === req.params.id || e.exhibitorCode === req.params.id
  );
  if (!exhibitor) {
    return res.status(404).json({ error: 'Exhibitor not found' });
  }
  res.json(exhibitor);
});

app.post('/api/exhibitors', (req, res) => {
  const data = req.body || {};
  const newExhibitor = {
    id: data.id || data.exhibitorCode || 'exh_' + Date.now(),
    exhibitorCode: data.exhibitorCode || data.id || 'exh_' + Date.now(),
    company: data.company || 'Enterprise Exhibitor',
    contactPerson: data.contactPerson || 'Authorized Representative',
    designation: data.designation || 'Exhibitor Lead',
    email: data.email || '',
    phone: data.phone || '',
    website: data.website || '',
    stallType: data.stallType || '15 sq.m Healthcare Suite',
    hall: data.hall || 'Hall 1 & 2 (APIs)',
    amount: data.amount || '$3,500',
    status: data.status || 'Pending Review',
    bookingDate: data.bookingDate || new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    notes: data.notes || '',
  };

  db.exhibitors.unshift(newExhibitor);
  saveDatabase();
  res.status(201).json(newExhibitor);
});

app.put('/api/exhibitors/:id', (req, res) => {
  const index = db.exhibitors.findIndex(
    (e) => e.id === req.params.id || e.exhibitorCode === req.params.id
  );
  if (index === -1) {
    return res.status(404).json({ error: 'Exhibitor not found' });
  }

  db.exhibitors[index] = { ...db.exhibitors[index], ...req.body };
  saveDatabase();
  res.json(db.exhibitors[index]);
});

app.put('/api/exhibitors/:id/status', (req, res) => {
  const { status } = req.body || {};
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  const index = db.exhibitors.findIndex(
    (e) => e.id === req.params.id || e.exhibitorCode === req.params.id
  );
  if (index === -1) {
    return res.status(404).json({ error: 'Exhibitor not found' });
  }

  db.exhibitors[index].status = status;
  saveDatabase();
  res.json(db.exhibitors[index]);
});

app.delete('/api/exhibitors/:id', (req, res) => {
  const initialLen = db.exhibitors.length;
  db.exhibitors = db.exhibitors.filter(
    (e) => e.id !== req.params.id && e.exhibitorCode !== req.params.id
  );

  if (db.exhibitors.length === initialLen) {
    return res.status(404).json({ error: 'Exhibitor not found' });
  }

  saveDatabase();
  res.status(200).json({ success: true, message: 'Exhibitor deleted successfully' });
});

// -------------------------------------------------------------
// Sponsorships API
// -------------------------------------------------------------
app.get('/api/sponsorships', (req, res) => {
  res.json(db.sponsorships);
});

app.post('/api/sponsorships', (req, res) => {
  const data = req.body || {};
  const newSponsorship = {
    id: data.id || 'sp_' + Date.now(),
    company: data.company,
    contactPerson: data.contactPerson,
    email: data.email,
    phone: data.phone || '',
    tier: data.tier || 'Gold Partner',
    investment: data.investment || '$10,000',
    status: data.status || 'In Discussion',
    date: data.date || new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };

  db.sponsorships.unshift(newSponsorship);
  saveDatabase();
  res.status(201).json(newSponsorship);
});

app.put('/api/sponsorships/:id/status', (req, res) => {
  const { status } = req.body || {};
  const index = db.sponsorships.findIndex((s) => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Sponsorship not found' });
  }

  db.sponsorships[index].status = status;
  saveDatabase();
  res.json(db.sponsorships[index]);
});

app.delete('/api/sponsorships/:id', (req, res) => {
  db.sponsorships = db.sponsorships.filter((s) => s.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});

// -------------------------------------------------------------
// Contact Inquiries API
// -------------------------------------------------------------
app.get('/api/contact', (req, res) => {
  res.json(db.contactInquiries);
});

app.post('/api/contact', (req, res) => {
  const data = req.body || {};
  const newInquiry = {
    id: 'inq_' + Date.now(),
    name: data.name || 'Anonymous',
    email: data.email || '',
    phone: data.phone || '',
    organization: data.organization || '',
    inquiryType: data.inquiryType || 'general',
    subject: data.subject || 'Exhibition Inquiry',
    message: data.message || '',
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    status: 'New',
  };

  db.contactInquiries.unshift(newInquiry);
  saveDatabase();
  res.status(201).json(newInquiry);
});

app.delete('/api/contact/:id', (req, res) => {
  db.contactInquiries = db.contactInquiries.filter((c) => c.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});

// -------------------------------------------------------------
// Start Server
// -------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 The Global Healthcare Expo Backend running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Stats Endpoint: http://localhost:${PORT}/api/stats`);
  console.log(`👥 Visitors API: http://localhost:${PORT}/api/visitors`);
  console.log(`🏢 Exhibitors API: http://localhost:${PORT}/api/exhibitors`);
});
