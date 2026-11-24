# National Symposium on Quantum Computing, Applications and Algorithms (NSQC 2026)
### Official Website & Admin Management System

**Host Institution:** Vignan's Foundation for Science, Technology & Research  
**Event Dates:** 28–29 December 2026  
**Aesthetic:** Deep Navy, Electric Cyan, Purple Gradients, 3D Interactive Bloch Sphere, Undulating Quantum Wave Mesh

---

## 🚀 Live Local Deployment

The website and admin portal are currently live and running locally:
- **Public Symposium Website:** [http://localhost:3000](http://localhost:3000)
- **Organiser Admin Portal:** [http://localhost:3000/admin](http://localhost:3000/admin)
  - **Default Admin Key:** `quantum2026admin` (configurable in `.env.local`)

---

## 🌟 Key Features Implemented

### 1. Visual Identity & 3D Interactive Quantum Aesthetics
- **Follows PowerPoint Approved Reference Deck (`Quantum_Symposium_Website_Visual_Reference_Deck.pptx`) slide-by-slide.**
- **3D Interactive Bloch Sphere (`BlochSphere3D.tsx`):**
  - Displays poles $|0\rangle$ and $|1\rangle$, state superposition vector $|ψ\rangle = \alpha|0\rangle + \beta|1\rangle$, concentric orbital rings, and glowing electron/qubit spheres.
  - Interactive mouse rotation and drag support.
- **Undulating 3D Quantum Wave & Particle Mesh (`QuantumParticleCanvas.tsx`):**
  - Shimmering cyan-to-purple interference pattern along the bottom horizon matching PPT slides 1–4.
  - Interactive mouse ripple effect.
- **Floating Quantum Badges:**
  - Formula badge $|ψ\rangle = \alpha|0\rangle + \beta|1\rangle$.
  - Quantum circuit diagram ($|0\rangle \to \text{H} \to \text{CNOT}$).
  - Radiating Quantum Processor Chip $[Q]$.

### 2. Website Sections
- **A. Navigation Bar:** Vignan's University emblem, symposium identity, glassmorphism pills (Home, About, Tracks, Speakers, Schedule, Registration, Contact), "Register Now ↗" radiant button, and mobile responsive menu.
- **B. Hero Section:** Exact layout from Slide 1 / Image 1. Headline: *"Explore the Quantum Frontier. | Where computation meets possibility."*, Date badge `28–29 December 2026`, University badge, dual CTAs, and 4 quick feature cards.
- **C. About the Symposium:** Slide 2 / Image 2 reference. 3D Bloch sphere on left with state callout, narrative, and 3 circular highlight badges (*Exchange Ideas*, *Showcase Research*, *Foster Collaborations*).
- **D. Technical Tracks:** 5 Thematic Tracks with custom SVG circuit art, glow borders, and an interactive **Track Details Drawer/Modal** detailing sub-topics and research areas:
  1. Quantum Algorithms & Complexity
  2. Quantum Hardware, QEC & Software
  3. Quantum Applications
  4. Quantum Machine Learning
  5. Quantum Communication & Cryptography
- **E. Speakers & Guests:** Slide 3 / Image 3 reference. 5 Categories (*Keynote Speakers*, *Plenary Speakers*, *Invited Speakers*, *Chief Guest*, *Panelists*) with prominent **"To Be Announced"** pills. Includes an announcement notification subscription.
- **F. Programme Schedule:** Slide 3 / Image 3 reference. Professional 2-day timeline (28 Dec & 29 Dec 2026) with filter pills, tea break & lunch break highlights, and clear disclaimer regarding indicative placeholders.
- **G. Functional Registration:** Slide 4 / Image 4 reference.
  - Mandatory fields: Full Name, Email, Mobile, Institution, Department, Designation, Category, City & State, plus optional Areas of Interest.
  - Real-time client-side and server-side validation.
  - Duplicate registration rejection.
  - Instant generation of unique Delegate ID (e.g., `NSQC-2026-XXXX`).
  - Confetti celebration and digital delegate pass with printable view.
- **H. Contact & FAQs:** Slide 4 / Image 4 reference. Official helpdesk card (`quantum2026@vignan.ac.in`), telephone helpline placeholder, university address, and 6-question interactive FAQ accordion.

### 3. Organiser Admin Dashboard (`/admin`)
- Secure token authentication via HTTP-only cookie.
- Real-time delegate counters and category breakdown (Students, Scholars, Faculty, Industry, Others).
- Search and multi-filter registrations by Category and Status.
- Participant profile inspector modal.
- Delegate status updater (`Confirmed`, `Pending`, `Waitlisted`).
- One-click **Export to CSV**.
- Active announcement broadcast banner manager.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19 & TypeScript
- **Styling:** Tailwind CSS v4 with custom glassmorphism and quantum glowing gradients
- **Icons:** Lucide React
- **3D & Canvas:** HTML5 Canvas WebGL projection (Bloch Sphere + Wave field)
- **Animation & FX:** Canvas-Confetti, CSS Keyframe rotations, smooth scroll
- **Storage:** Local persistent JSON storage with atomic writes (zero setup needed) + Plug-and-play Supabase PostgreSQL schema (`src/lib/supabase-schema.sql`)

---

## 📦 Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── register/route.ts         # Public registration endpoint
│   │   │   ├── admin/
│   │   │   │   ├── login/route.ts        # Admin authentication
│   │   │   │   ├── registrations/route.ts# Search, filter, update, delete
│   │   │   │   ├── export/route.ts       # CSV delegate download
│   │   │   │   └── announcements/route.ts# Broadcast banner API
│   │   ├── admin/page.tsx                # Organiser Admin Control Center
│   │   ├── layout.tsx                    # Typography, metadata, viewport
│   │   ├── globals.css                   # Quantum CSS utilities & glows
│   │   └── page.tsx                      # Main symposium homepage
│   ├── components/
│   │   ├── Navbar.tsx                    # Glassmorphic header
│   │   ├── HeroSection.tsx               # Slide 1 hero & feature cards
│   │   ├── BlochSphere3D.tsx             # Interactive 3D Bloch sphere
│   │   ├── QuantumParticleCanvas.tsx     # Undulating wave & particle mesh
│   │   ├── QuantumFloatingBadges.tsx     # Qubit circuit & chip badges
│   │   ├── VignanLogo.tsx                # Vignan's University emblem
│   │   ├── AboutSection.tsx              # Slide 2 about & pillars
│   │   ├── TracksSection.tsx             # Slide 2 technical tracks
│   │   ├── SpeakersSection.tsx           # Slide 3 speakers (TBA)
│   │   ├── ScheduleSection.tsx           # Slide 3 two-day schedule
│   │   ├── RegistrationSection.tsx       # Slide 4 registration form
│   │   ├── RegistrationSuccessModal.tsx  # Delegate pass & confetti
│   │   ├── ContactFaqSection.tsx         # Slide 4 contact & accordion
│   │   ├── AnnouncementBanner.tsx        # Top notification bar
│   │   └── Footer.tsx                    # Footer & legal
│   └── lib/
│       ├── types.ts                      # Data definitions
│       ├── db.ts                         # Storage layer
│       └── supabase-schema.sql           # PostgreSQL table schema
├── data/
│   ├── registrations.json                # Stored registrations
│   └── announcements.json                # Stored announcements
├── public/
│   └── images/                           # Extracted reference slide PNGs
├── .env.example                          # Environment config template
└── package.json
```

---

## ⚙️ Running Locally

```bash
# 1. Navigate to website folder
cd website

# 2. Install dependencies (already completed)
npm install

# 3. Start development server
npm run dev

# 4. Or build and run production server
npm run build
npm run start
```

---

## 🌐 Production Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Set the Root Directory to `website`.
4. Configure Environment Variables in Vercel project settings:
   - `ADMIN_PASSWORD`: Your secret admin password (e.g. `YourCustomAdminKey2026`)
   - `NEXT_PUBLIC_SITE_URL`: Your production domain
   - (Optional) `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` if using Supabase
   - (Optional) `RESEND_API_KEY` if enabling automated confirmation emails
5. Deploy.

---

## 📋 Items Pending Official University Confirmation

As per prompt instructions, the following items have been given appropriate configurable placeholders and require official university input prior to final public broadcast:

1. **Speaker Profiles:** Currently configured with "To Be Announced" categories (Keynote, Plenary, Invited, Chief Guest, Panelists). Names, photos, designations, and affiliations should be updated via the admin portal once signed off.
2. **Detailed Schedule:** Day 1 & Day 2 contain marked indicative sessions. Detailed talk titles and speaker assignments to be confirmed by the Technical Program Committee.
3. **Paper & Abstract Submission Workflow:** Call-for-papers guidelines, manuscript submission portal (e.g. Microsoft CMT or EasyChair), template LaTeX/Word files, and review dates are marked as "Details To Be Announced".
4. **Registration Fee:** Currently noted as expected to be FREE for verified delegates, pending official university ratification.
5. **Helpline Extension Number:** Telephone listed as `+91 - 863 - 2345 678 (Ext. to be updated)`.
6. **Official Social Media Handles:** Omitted in accordance with guidelines until verified university links are provided.
