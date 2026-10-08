# IndiGlobal Healthcare Expo 2027

> **Official Initiative under the India-ASEAN Global Confluence 2027**  
> *Connect &bull; Collaborate &bull; Grow* &mdash; In official co-presentation with the **Global Trade & Technology Council of India (GTTCI)** and organized by **IndiGlobal Expo** ([indiglobalexpo.com](https://indiglobalexpo.com)).

---

## 🏥 About the Expo

**IndiGlobal Healthcare Expo 2027** is an international trade fair and healthcare technology platform bringing together manufacturers, hospital leaders, healthcare infrastructure builders, pharmaceutical innovators, and procurement delegations from across **40+ countries**.

Held under the landmark **India-ASEAN Global Confluence 2027**, the summit fosters bilateral trade, cross-border technology transfers, and strategic public-private partnerships across the India-ASEAN corridor (Singapore, Malaysia, Thailand, Vietnam, Indonesia, Philippines, and beyond).

---

## 🌟 Key Focus Areas & Pavilions

- **Hall 1 & 2: APIs, Bulk Drugs & Fine Chemicals**  
  Active Pharmaceutical Ingredients, intermediates, peptides, herbal extracts, and custom chemical synthesis.
- **Hall 3: Finished Formulations & Generics**  
  Solid dosage forms, sterile injectables, biosimilars, biologics, and nutraceuticals.
- **Hall 4: Pharma Machinery & Cleanroom Automation**  
  High-speed tableting, granulation systems, sterile cleanrooms, water-for-injection (WFI) plants, and automated packaging.
- **Hall 5: Packaging & Medical Devices**  
  Pre-filled syringes, diagnostics equipment, hospital solutions, and anti-counterfeiting tracking.

---

## 🛡️ Executive Admin Dashboard & Secretariat Console

The application includes an **Executive Admin Dashboard** (accessible at `/admin` or via the top navigation / footer) designed for exhibition directors, event organizers, and on-site registration desks:

- 👥 **Visitor Database & Detail Modal**:
  - Full attendee profile: Name, designation, company/hospital, country, sector, and pass tier (VIP Delegate / Standard Trade Pass).
  - Direct contact options (Email and WhatsApp 1-click chat).
  - Gate check-in status toggle (Confirmed / Checked-In).
  - Printable official E-Badge card with simulated QR code and conference branding.
- 🏢 **Exhibitor Allocations & Detail Modal**:
  - Comprehensive contract view: enterprise details, website, authorized representative, stall size/format, hall allocation, and tariff amount.
  - Interactive approval workflow: Approve, Dispatch Contract, Mark Under Review, or Put On Hold.
  - Direct communication shortcuts to email contracts or message representatives on WhatsApp.
- 🤝 **Corporate Sponsorships Pipeline**: Track brand sponsorships, tiers, contract commitment values, and agreement statuses.
- 📩 **Contact Helpdesk Inquiries**: View incoming inquiries submitted via the Contact page and respond directly via email.
- 📊 **Real-time KPI Analytics & Hall Occupancy**: Live metrics on registered delegates, approved stalls, sponsorship pipeline, and hall occupancy rates.
- 📥 **Real CSV Data Export**: 1-click real CSV report generation and file download for visitors, exhibitors, sponsorships, and inquiries.
- ➕ **On-Site Desks**: Register new trade visitors and book exhibitor stalls directly from inside the admin console.

---

## ⚡ Why Using a Backend is Better for Exhibition Management

Using a dedicated centralized backend (Node.js/Express with persistent storage) rather than just browser `localStorage` provides essential real-world advantages:

1. **Centralized Multi-User Storage**: With `localStorage`, registration data is trapped on a single user's browser. When trade visitors register from their own laptops or mobile devices, exhibition directors on another computer wouldn't see them. A central backend stores all submissions in one unified database accessible to the entire secretariat.
2. **Data Durability & Backup**: Browser cache can be cleared by the user, lost in incognito browsing, or deleted upon browser updates. A backend ensures records are safely written to disk.
3. **Real-Time Check-In at the Venue**: Gate staff at the exhibition hall entrance can mark attendees as "Checked-In" in real-time, instantly visible on director KPI dashboards.
4. **Security & Role-Based Access**: Sensitive visitor contact numbers, corporate emails, and commercial booth fees are protected by backend validation and access control.
5. **Seamless Offline Fallback**: The frontend is architected to automatically connect to the live backend API, but gracefully falls back to local storage if running in an offline environment.

---

## 💻 Tech Stack & Architecture

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) with REST API & file-based persistent JSON database
- **Routing**: [React Router v7](https://reactrouter.com/) (Multi-page routing with dynamic params)
- **Styling**: Modern responsive CSS design system with custom variables, animations, and typography
- **State Management**: React Context API (`AuthContext` for authentication and `DataContext` for live registrations and backend synchronization)
- **Java Alternative**: Optional Spring Boot backend included in `healthcare backend` for Java environments

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- `npm`

### Installation
```bash
# Clone the repository
git clone https://github.com/Saatvik420/healthcare-expo.git

# Navigate into project directory
cd healthcare-expo

# Install dependencies
npm install
```

### Running the Application

**Option A: Run Backend Server (Port 8080)**
```bash
npm run server
```
*Backend API will run at `http://localhost:8080/api` with health checks, visitors, exhibitors, sponsorships, and stats endpoints.*

**Option B: Run Frontend Development Server**
```bash
npm run dev
```
*Frontend runs on `http://localhost:5173`, automatically proxying `/api` requests to the backend.*

---

## 🔐 Credentials (Demo / Admin)
- **Admin Dashboard**: Accessible directly via the **"Admin Dashboard"** navigation link or URL `/admin`
- **1-Click Demo Access**: Click the **"⚡ 1-Click Instant Admin Access"** button on `/admin` to sign in instantly without typing.
- **Manual Credentials**:
  - **Email**: `admin@globalhealthcareexpo.com`
  - **Password**: `Admin@Expo2026`

---

## 🏛️ Event Organization & Accreditation
- **Umbrella Platform**: IndiGlobal Expo ([indiglobalexpo.com](https://indiglobalexpo.com))
- **Co-Presented By**: Global Trade & Technology Council of India (GTTCI)
- **Secretariat Address**: C/O GTTCI, Areness House, 5, Sardar Patel Marg, Diplomatic Enclave, Chanakyapuri, New Delhi - 110021, India
- **Official Inquiries**: `info@indiglobalexpo.com` | WhatsApp: `+91 98765 43210`
