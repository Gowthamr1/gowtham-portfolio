export interface Project {
  id: string;
  plate: string;
  title: string;
  subtitle: string;
  status: string;
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  clientStack: string[];
  serverStack: string[];
  database: string;
  deployment: string;
  problem: string;
  scope: string;
  architecturalDecisions: {
    title: string;
    description: string;
    codeQuote?: string;
    fileRef?: string;
  }[];
  screenshots: {
    id: string;
    title: string;
    aspectRatio: string;
    recommendedResolution: string;
    description: string;
    imageSrc?: string; // Optional image source if provided
  }[];
}

export interface ConcurrencyAuditItem {
  id: string;
  number: string;
  title: string;
  file: string;
  summary: string;
  codeQuote: string;
  category: 'Concurrency' | 'Security' | 'Architecture' | 'Performance';
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level: 'Solid' | 'Working';
    proof: string;
  }[];
}

export interface CareerStage {
  stage: string;
  title: string;
  period: string;
  institutionOrCompany: string;
  description: string;
  evidence: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Gowtham R",
    role: "Full Stack Web Developer | Systems & Real-Time Architect",
    specialization: "Django + React Systems & Real-Time Web Architecture",
    location: "Yelahanka, Bangalore, Karnataka, India",
    timezone: "Asia/Kolkata (UTC+5:30)",
    email: "gtham4708@gmail.com",
    phone: "+91 70194 78545",
    phoneFormatted: "+91 70194 78545",
    github: "https://github.com/Gowthamr1",
    linkedin: "https://www.linkedin.com/in/gow-tham-8a1450410",
    liveDemo: "https://lms-django-react-one.vercel.app/",
    resumeFile: "Gowtham-R-Resume.pdf",
    philosophy: {
      headline: "I build the unglamorous half of the web — auth, roles, seat locks, payment state, PDF certificates — and then design the half people actually see.",
      subtext: "Two production systems, thirteen Django apps, three role hierarchies, and a WebSocket layer that keeps two people from booking the same cinema seat.",
      personal: "MCA student in Bangalore. I learn by shipping systems that are harder than they need to be, then making them feel simple."
    },
    metrics: [
      { label: "Production Systems", value: "2", highlight: "Deployed & Tested" },
      { label: "Django Applications", value: "13", highlight: "Modular Architecture" },
      { label: "Role Hierarchies", value: "3", highlight: "Strict RBAC Enforced" },
      { label: "Concurrency Collisions", value: "0", highlight: "Row-Level Locking" }
    ]
  },

  projects: [
    {
      id: "lms",
      plate: "Plate A",
      title: "Online Learning Management System",
      subtitle: "Multi-Role Educational Platform with Verified Digital Credentials",
      status: "Live in Production",
      role: "Solo Full-Stack Developer",
      liveUrl: "https://lms-django-react-one.vercel.app/",
      githubUrl: "https://github.com/Gowthamr1/LMS-django-react",
      clientStack: ["React 18", "React Router 6", "Axios", "MUI 7", "Recharts", "Tailwind CSS"],
      serverStack: ["Python", "Django 5.2", "Django REST Framework", "SimpleJWT", "ReportLab", "qrcode", "WhiteNoise", "Gunicorn"],
      database: "PostgreSQL (Production) / SQLite (Local)",
      deployment: "Vercel (Frontend SPA) + Render (Backend API) + Brevo Email API",
      problem: "A course platform is three different products under one auth barrier: students need seamless lesson resumption and quiz tracking; instructors require analytics on bottlenecks; administrators oversee platform health. Generic dashboards compromise all three. Additionally, standard PDF certificates can be forged trivially without public verification.",
      scope: "Designed relational schemas, REST APIs, three separate React role portals, automated in-memory PDF generation with QR verification, transactional email verification, and production cloud deployments.",
      architecturalDecisions: [
        {
          title: "Self-Verifying Digital Certificates (In-Memory PDF)",
          description: "ReportLab constructs an A4 landscape certificate dynamically in memory with zero disk I/O bottlenecks. An embedded QR code directs to a public verification endpoint (/verify-certificate/<uuid>) requiring no auth, allowing employers to verify authenticity instantly.",
          codeQuote: "A durable, verifiable certificate issued for one completed enrollment.",
          fileRef: "lms_backend/courses/models.py"
        },
        {
          title: "Proactive Token Refresh (Zero-Latency Interceptor)",
          description: "Rather than waiting for a 401 Unauthorized response to trigger a retry, the Axios request interceptor inspects the JWT expiry payload and triggers a refresh 30 seconds before expiration, sharing a single in-flight promise across concurrent API calls.",
          codeQuote: "ACCESS_TOKEN_REFRESH_BUFFER_MS = 30 * 1000",
          fileRef: "lms-frontend/src/axiosInstance.js"
        },
        {
          title: "Three Dedicated Portals (Strict RBAC)",
          description: "Separate route trees and UI components for Student, Instructor, and Admin. Eliminates messy in-component conditionals while DRF permissions enforce strict query scoping on the server.",
          codeQuote: "Separate route trees & server-side queryset scoping by role"
        },
        {
          title: "Free-Tier Cold-Start Optimization",
          description: "Free cloud instances sleep after inactivity, causing 10-30s initial delays. Client sets a 45-second timeout ceiling and issues a lightweight warm-up ping when the landing page loads, waking the API while the user browses.",
          codeQuote: "Render can take 10-30 seconds to wake and Neon can take a moment",
          fileRef: "lms-frontend/src/axiosInstance.js"
        }
      ],
      screenshots: [
        {
          id: "lms-student-player",
          title: "Student Course Player & Interactive Lesson Progress",
          aspectRatio: "16:10",
          recommendedResolution: "1200 × 750px",
          description: "Interactive video player interface with lesson navigation drawer, real-time quiz progression bar, and completed module checkmarks."
        },
        {
          id: "lms-role-dashboard",
          title: "Three-Tier Role Management Dashboard",
          aspectRatio: "16:9",
          recommendedResolution: "1200 × 675px",
          description: "Instructor and Admin analytics view with revenue metrics, enrollment trends, student completion funnels, and course publishing controls."
        },
        {
          id: "lms-certificate-qr",
          title: "Dynamic In-Memory PDF Certificate with Scannable QR",
          aspectRatio: "1.41:1",
          recommendedResolution: "842 × 595px (A4)",
          description: "ReportLab dynamically generated certificate with embedded cryptographic QR code linking to public verification endpoint."
        }
      ]
    },
    {
      id: "mtbs",
      plate: "Plate B",
      title: "Cinema Booking Engine (MTBS)",
      subtitle: "Real-Time Distributed Seat Locking & Ticket Management System",
      status: "Live Demo · 10 Django Apps",
      role: "Solo Full-Stack Developer",
      liveUrl: "https://cinemora-alpha.vercel.app/",
      githubUrl: "https://github.com/Gowthamr1",
      clientStack: ["React 19", "React Router 7", "Axios", "Tailwind CSS", "qrcode.react", "html5-qrcode"],
      serverStack: ["Python", "Django 5.2", "Django REST Framework", "Django Channels", "Daphne (ASGI)", "SimpleJWT", "django-filter"],
      database: "MySQL (Target Production) / SQLite (Local)",
      deployment: "Unified ASGI Daphne Server + WebSocket Channel Layer",
      problem: "Cinema ticketing is fundamentally a high-concurrency collision problem disguised as a seat grid. If two users tap seat D7 simultaneously for the same 7:30 show, the second user must be notified immediately and unambiguously. Seat state cannot be a static snapshot; it must reflect live server state across dropped connections, page reloads, and mobile sleep.",
      scope: "Engineered 10 modular Django applications, ASGI Daphne WebSocket server, atomic wallet balance ledger with row-level locking, React 19 UI with 3 global context providers, custom scroll-scrub rendering engine, and unit test suite.",
      architecturalDecisions: [
        {
          title: "Full Seat Map Broadcasts (Never Deltas)",
          description: "The server pushes the complete state of all seats upon any change rather than incremental deltas. Guarantees that clients reconnecting after sleep or packet drop are instantly synchronized without missing replay deltas or accumulating drift.",
          codeQuote: "The server pushes the *whole* seat map on every change, never a delta, so a socket that drops and comes back is correct from its first frame...",
          fileRef: "mtbs_frontend/src/hooks/useShowtimeSeats.js"
        },
        {
          title: "Atomic Wallet Ledger with Row-Level Locking",
          description: "apply_delta() is the sole entry point for modifying balances. Locks the wallet row with select_for_update(), writes the ledger delta, and commits atomically, preventing race conditions during concurrent refunds or payments.",
          codeQuote: "This is the ONLY path that writes to Wallet.balance. It locks the wallet row, applies the delta, writes a ledger row with the snapshot, and commits all three in one transaction.",
          fileRef: "mtbs_backend/wallet/services.py"
        },
        {
          title: "Commit-Coupled Event Broadcasting",
          description: "Seat update events are hooked to Django's transaction.on_commit. Guarantees that a seat is never announced as reserved to connected clients if the database transaction rolls back.",
          codeQuote: "Broadcasts are fired from transaction.on_commit so a seat is never announced as taken before the row that takes it is durable.",
          fileRef: "mtbs_backend/showtimes/realtime.py"
        },
        {
          title: "httpOnly Cookie JWT with Double-Submit CSRF",
          description: "Authentication tokens are stored exclusively in httpOnly cookies, preventing XSS theft. Mitigates CSRF via double-submit validation with Axios reading csrftoken into X-CSRFToken header.",
          codeQuote: "A cookie is sent automatically, so writes have to prove intent.",
          fileRef: "mtbs_backend/accounts/tests.py"
        }
      ],
      screenshots: [
        {
          id: "mtbs-seat-grid",
          title: "Real-Time Interactive Seat Grid & Hold Status",
          aspectRatio: "16:9",
          recommendedResolution: "1200 × 675px",
          description: "Interactive seat map showing live occupancy, temporary hold countdowns, VIP and Standard pricing tiers, and real-time WebSocket state badges."
        },
        {
          id: "mtbs-admin-showtimes",
          title: "Admin Showtime & Screen Occupancy Management",
          aspectRatio: "16:9",
          recommendedResolution: "1200 × 675px",
          description: "Administrative console for managing multi-theater screens, movie schedules, pricing multipliers, and real-time revenue stats."
        },
        {
          id: "mtbs-ticket-pass",
          title: "Digital Ticket Pass & Atomic Wallet Ledger",
          aspectRatio: "16:9",
          recommendedResolution: "1200 × 675px",
          description: "E-ticket screen featuring scannable digital barcode/QR pass, ticket summary, and atomic wallet transaction history."
        }
      ]
    },
    {
      id: "travel",
      plate: "Plate C",
      title: "Travel Booking Platform",
      subtitle: "Multi-Service Booking Engine for Flights, Hotels & Vehicles",
      status: "Completed Full-Stack Foundation",
      role: "Solo Full-Stack Developer",
      githubUrl: "https://github.com/Gowthamr1",
      clientStack: ["React", "Axios", "CSS Modules", "Tailwind CSS"],
      serverStack: ["Python", "Django", "Django REST Framework", "SimpleJWT"],
      database: "MySQL",
      deployment: "Vercel + Cloud API Backend",
      problem: "Coordinating multi-service travel bookings across different resource categories (flights, accommodation, vehicle rental) requiring consistent booking states, availability checks, and administrative management.",
      scope: "Full-featured booking application with user reservations, availability querying, booking status transitions, and an administrative management dashboard. Provided the foundational domain experience in booking state machines that directly inspired the high-concurrency architecture of the Cinema Engine.",
      architecturalDecisions: [
        {
          title: "State Machine for Multi-Service Reservations",
          description: "Structured reservation state machine ensuring that pending bookings are held with timeout windows before final confirmation.",
          codeQuote: "State transitions: INITIATED -> PENDING_PAYMENT -> CONFIRMED -> COMPLETED"
        },
        {
          title: "Relational Resource Modeling in MySQL",
          description: "Clean relational schemas mapping travelers to itineraries, vehicle fleets, and hotel room inventories with strict foreign key integrity.",
          codeQuote: "Normalized relational schemas with multi-tenant search indexing"
        }
      ],
      screenshots: [
        {
          id: "travel-portal-main",
          title: "Travel Portal Search & Multi-Service Booking View",
          aspectRatio: "16:9",
          recommendedResolution: "1200 × 675px",
          description: "Unified search and reservation interface showing flight schedules, hotel availability filters, and car booking cards."
        },
        {
          id: "travel-admin-panel",
          title: "Travel Administration & Booking Management",
          aspectRatio: "16:9",
          recommendedResolution: "1200 × 675px",
          description: "Administrative dashboard for viewing active bookings, updating fleet and room inventories, and managing user itineraries."
        }
      ]
    }
  ] as Project[],

  concurrencyAudits: [
    {
      id: "asgi-routing",
      number: "01",
      category: "Architecture",
      title: "Unified Single-Process ASGI Routing",
      file: "mtbs_backend/mtbs_backend/asgi.py",
      summary: "HTTP is routed to standard Django WSGI handlers, while WebSocket connections route to the Channels protocol router via ProtocolTypeRouter.",
      codeQuote: "daphne sits first in INSTALLED_APPS so manage.py runserver picks this up, meaning WebSockets work in development with no extra process."
    },
    {
      id: "origin-validation",
      number: "02",
      category: "Security",
      title: "Per-Handshake Origin Validation",
      file: "mtbs_backend/mtbs_backend/asgi.py",
      summary: "Avoids module-level caching of ALLOWED_HOSTS. Custom AllowedHostsOrigin wrapper resolves origins dynamically per connection, preventing cross-site WebSocket hijacking.",
      codeQuote: "A browser will open a socket from any page, no preflight required, so without this a script on someone else's site could read our seat feed."
    },
    {
      id: "derived-state",
      number: "03",
      category: "Concurrency",
      title: "Derived State Over Stored Seat Status",
      file: "mtbs_backend/showtimes/realtime.py",
      summary: "The booked_seats array is calculated dynamically from valid, unexpired booking rows rather than stored as a mutable column, eliminating desync across server restarts.",
      codeQuote: "a client that reconnects after a dropped connection is correct again immediately, with no replay log and no way to drift."
    },
    {
      id: "commit-coupled",
      number: "04",
      category: "Concurrency",
      title: "Commit-Coupled Event Broadcasting",
      file: "mtbs_backend/showtimes/realtime.py",
      summary: "Seat update events are hooked to Django's transaction.on_commit, guaranteeing that a seat is never announced as reserved if the transaction rolls back.",
      codeQuote: "Broadcasts are fired from transaction.on_commit so a seat is never announced as taken before the row that takes it is durable."
    },
    {
      id: "read-parity",
      number: "05",
      category: "Architecture",
      title: "Public Read-Only Projection Parity",
      file: "mtbs_backend/showtimes/realtime.py",
      summary: "The real-time seat serializer exposes the exact same public fields as the HTTP GET /showtimes/<id>/ endpoint, keeping the WebSocket unauthenticated and fast.",
      codeQuote: "Deliberately mirrors the fields ShowtimeSerializer already exposes over HTTP, so the socket reveals nothing that GET /showtimes/<id>/ doesn't."
    },
    {
      id: "expiry-sweeper",
      number: "06",
      category: "Performance",
      title: "Periodic Expiry Sweeper (30s Interval vs 15m Window)",
      file: "mtbs_backend/showtimes/consumers.py",
      summary: "Temporary seat holds expire after 15 minutes. Open WebSocket connections trigger an expiry reconciliation pass every 30 seconds without client busy-waiting.",
      codeQuote: "The payment window is 15 minutes, so a 30s check makes a freed seat visible well inside a minute without turning idle browsers into a busy loop."
    },
    {
      id: "atomic-wallet",
      number: "07",
      category: "Concurrency",
      title: "Atomic Wallet Ledger with Row-Level Locking",
      file: "mtbs_backend/wallet/services.py",
      summary: "apply_delta() is the sole entry point for modifying balances. Locks the wallet row with select_for_update(), writes the ledger delta, and commits atomically.",
      codeQuote: "This is the ONLY path that writes to Wallet.balance. It locks the wallet row, applies the delta, writes a ledger row with the snapshot, and commits all three in one transaction."
    },
    {
      id: "scoped-throttling",
      number: "08",
      category: "Security",
      title: "Scoped Endpoint Throttling (Anti-Enumeration)",
      file: "mtbs_backend/mtbs_backend/settings.py",
      summary: "Granular DRF rate limits: 10/min for auth, 60/min for ticket verification, 120/min for anonymous browsing, and 600/min for authenticated users.",
      codeQuote: "unthrottled, that's an enumeration oracle no matter how large the keyspace is"
    },
    {
      id: "proactive-jwt",
      number: "09",
      category: "Performance",
      title: "Proactive Zero-Latency Token Refresh Interceptor",
      file: "lms-frontend/src/axiosInstance.js",
      summary: "Calculates JWT expiry and requests a refreshed access token 30 seconds before expiration, deduplicating concurrent requests into a single promise.",
      codeQuote: "ACCESS_TOKEN_REFRESH_BUFFER_MS = 30 * 1000"
    },
    {
      id: "centralized-logic",
      number: "10",
      category: "Architecture",
      title: "Centralized Domain Business Logic Services",
      file: "mtbs_backend/bookings/services.py",
      summary: "Cancellation penalties, refund calculation, and seat releases reside in a shared service layer across REST views and background cleanup commands.",
      codeQuote: "A booking that can't be cancelled can't be refunded either, so don't quote a figure the user could never actually claim."
    }
  ] as ConcurrencyAuditItem[],

  skillCategories: [
    {
      title: "Backend & Systems",
      subtitle: "13 Django Apps across production systems",
      skills: [
        { name: "Python", level: "Solid", proof: "Primary backend language for all systems: models, serializers, views, services, dynamic PDF generation." },
        { name: "Django 5.2", level: "Solid", proof: "Built LMS (3 apps: courses, users, emailer) & Cinema Engine (10 apps: accounts, showtimes, bookings, wallet, etc.)." },
        { name: "Django REST Framework", level: "Solid", proof: "ModelSerializers, nested writes, custom permission classes, and django-filter query params." },
        { name: "Django Channels & Daphne (ASGI)", level: "Working", proof: "Single-process ASGI WebSocket infrastructure broadcasting live seat updates to connected clients." },
        { name: "REST API Design", level: "Solid", proof: "Resource-per-app URL trees, role-scoped querysets, and uniform JSON error envelopes." },
        { name: "ReportLab & qrcode", level: "Working", proof: "In-memory programmatic A4 PDF certificates with embedded public verification QR codes." }
      ]
    },
    {
      title: "Frontend & Client Engineering",
      subtitle: "Modern React with strict TypeScript & responsive UI",
      skills: [
        { name: "React 18 / 19", level: "Solid", proof: "LMS (34 page components, 3 role dashboards) & Cinema Engine (React 19, Contexts for auth, wallet, watchlist)." },
        { name: "JavaScript (ES2020+)", level: "Solid", proof: "Async/await data pipelines, custom hooks, and 241-frame scroll-scrub mathematical arithmetic engine." },
        { name: "TypeScript", level: "Working", proof: "Strict mode, fully typed content layer, zero compile errors, no unmanaged any in application code." },
        { name: "React Router v6 / v7", level: "Solid", proof: "Role-guarded route wrappers instead of fragile in-component conditional checks." },
        { name: "Tailwind CSS & CSS", level: "Solid", proof: "Custom glassmorphism design tokens, CSS variables, and fluid responsive layouts." },
        { name: "Axios & Interceptors", level: "Solid", proof: "Proactive 30s pre-expiry token refresh in LMS; httpOnly cookie 401 replay handler in Cinema Engine." }
      ]
    },
    {
      title: "Auth, Access Control & Security",
      subtitle: "Zero-compromise access boundaries & CSRF protection",
      skills: [
        { name: "SimpleJWT", level: "Solid", proof: "Bearer token pairs in LMS; httpOnly cookie storage in Cinema Booking Engine." },
        { name: "Role-Based Access Control (RBAC)", level: "Solid", proof: "Student / Instructor / Admin in LMS; Customer / Staff / Admin in Cinema Engine." },
        { name: "CSRF & Cookie Security", level: "Working", proof: "Double-submit protection pairing httpOnly cookies with Axios reading csrftoken into X-CSRFToken header." },
        { name: "Endpoint Rate Throttling", level: "Working", proof: "Granular DRF throttling: 10/min auth, 60/min ticket verification, 120/min anonymous browsing." }
      ]
    },
    {
      title: "Database, DevOps & Testing",
      subtitle: "Normalized relational schemas & cloud deployments",
      skills: [
        { name: "PostgreSQL & MySQL", level: "Working", proof: "PostgreSQL for deployed production LMS; MySQL for Cinema Engine with mysqlclient 2.2.7." },
        { name: "Django ORM & SQL", level: "Solid", proof: "Aggregation pipelines for revenue, occupancy, and enrollment analytics grouped by movie/theatre/date." },
        { name: "Git & GitHub", level: "Solid", proof: "Clean commit histories, branching, and production pull-request workflows across all repos." },
        { name: "Vercel & Render", level: "Working", proof: "Vercel static SPA frontend deployment; Render Gunicorn backend with WhiteNoise static serving." },
        { name: "Jest & RTL", level: "Working", proof: "7 test suites covering booking flows, wallet ledger, admin dashboard, and scroll-scrub math engine." },
        { name: "Postman", level: "Solid", proof: "Complete API test collections validating status codes, payloads, and auth headers before integration." }
      ]
    }
  ] as SkillCategory[],

  careerArc: [
    {
      stage: "Stage 01",
      title: "Foundation & Academic Rigor",
      period: "2022 — Present",
      institutionOrCompany: "Aditya Group (BCA) → Bangalore City University (MCA)",
      description: "BCA graduate (CGPA 7.0/10) moving directly into an MCA while keeping a compiler and code editor open daily. Built foundational understanding in Data Structures, Algorithms, DBMS, and Operating Systems while actively coding full-stack projects outside the syllabus.",
      evidence: "BCA 2025 (CGPA 7.0/10.0) · MCA expected 2028"
    },
    {
      stage: "Stage 02",
      title: "First Contact (Software Development Intern)",
      period: "Internship",
      institutionOrCompany: "Sive Academy",
      description: "Frontend and backend web application development across React and backend APIs. Diagnosed, debugged, tested, and implemented core features into codebases I did not write. Gained hands-on proficiency with industry review standards and Git collaboration.",
      evidence: "Production debugging, API testing & team Git workflows"
    },
    {
      stage: "Stage 03",
      title: "Depth (Full Systems Over Demos)",
      period: "Production Milestones",
      institutionOrCompany: "Independent Engineering",
      description: "Transitioned from toy demos to resilient, production-grade distributed systems. Shipped an LMS with three distinct role portals and public QR-verified certificates, followed by a 10-app Cinema Booking Engine with real-time seat locking.",
      evidence: "2 production systems · 13 Django apps · 3 role hierarchies"
    },
    {
      stage: "Stage 04",
      title: "Current Focus: Architecture, Concurrency & Resilience",
      period: "2026 & Beyond",
      institutionOrCompany: "Advanced Engineering",
      description: "Mastering the hard parts: concurrency around shared state, row-level database locking, honest API design, cold-start mitigation, and interfaces that survive real-world network fluctuations.",
      evidence: "Django Channels · SimpleJWT · Row-Level select_for_update()"
    }
  ] as CareerStage[],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Bangalore City University",
      period: "2025 — 2028 (Expected 2028 · In Progress)",
      focus: "Advanced computer applications, operating systems, and distributed system architectures while shipping production web systems.",
      coursework: ["Data Structures & Algorithms", "Database Management Systems (DBMS)", "Operating Systems", "Computer Networks", "Software Engineering", "Web Technologies", "Artificial Intelligence"]
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Aditya Group of Institutions",
      period: "2022 — 2025 (Graduated)",
      focus: "Graduated with CGPA 7.0 / 10.0. Built first full-stack applications and learned relational database fundamentals.",
      coursework: ["Object-Oriented Programming", "Relational Databases", "Web Development Fundamentals", "Data Structures"]
    }
  ]
};
