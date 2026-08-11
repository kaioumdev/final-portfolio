export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  features?: string[];
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  repoUrlBackend?: string;
  apiDocsUrl?: string;
}

export const PROJECTS: ProjectEntry[] = [
  {
    id: 'interview-ai',
    title: 'InterviewAI — AI-Powered Interview Preparation Platform',
    description:
      'An end-to-end AI platform that analyzes a résumé against a job description using Google Gemini AI ' +
      'and generates a fully structured, personalized interview strategy in ~30 seconds.',
    features: [
      'AI Match Score (0–100) — quantifies candidate fit against the job description',
      'Technical Interview Questions — 5–8 role-specific questions with interviewer intent and model answers',
      'Behavioral Questions — situational prompts with STAR-method guidance',
      'Skill Gap Analysis — missing skills ranked by severity: High / Medium / Low',
      '7-Day Preparation Roadmap — day-by-day study plan tailored to the specific role',
      'Mock Interview Mode — practice one-by-one with confidence self-rating and session summary',
      'AI PDF Résumé Generator — one-click ATS-friendly résumé download via Gemini',
      'Secure Auth — httpOnly cookie-based JWT (XSS-proof, 24 h expiry) with token blacklisting',
      'Rate Limiting — 20 req/15 min (auth), 10 req/hr (AI) per IP to prevent abuse',
      'Full API Documentation — OpenAPI 3.0 Swagger UI with Try-it-out support',
    ],
    technologies: [
      'React 19', 'Vite 7', 'React Router 7', 'Axios', 'SCSS', 'Sonner',
      'Node.js', 'Express 5', 'MongoDB', 'Mongoose', 'Google Gemini AI',
      'Puppeteer', 'JWT', 'Swagger (OpenAPI 3.0)',
    ],
    liveUrl: 'https://interview-scorer-ai-frontend.vercel.app',
    repoUrl: 'https://github.com/kaioumdev/Interview-Scorer-AI-Frontend',
    repoUrlBackend: 'https://github.com/kaioumdev/Interview-Scorer-AI-Backend',
    apiDocsUrl: 'https://interview-scorer-ai-backend.vercel.app/api/docs',
  },
  {
    id: 'devhunt',
    title: 'DevHunt — Full-Stack Job Hunt Platform',
    description:
      'A production-grade job portal where students discover and apply for jobs while recruiters post listings, manage applicants, and make hiring decisions — all in one platform.',
    features: [
      'Email OTP verification on registration (6-digit, 10-min expiry) with forgot/reset password flow',
      'JWT auth via HTTP-only cookie (XSS-safe, 24 h expiry) with role-based access — Student vs Recruiter',
      'Students: browse & search jobs (regex full-text on title + description), one-click apply, track status (Pending / Accepted / Rejected)',
      'Students: edit profile — bio, skills, resume URL, profile photo uploaded to Cloudinary',
      'Recruiters: register and manage multiple companies with logo upload and Cloudinary CDN delivery',
      'Recruiters: post job listings with requirements, salary, location, type, and experience level',
      'Recruiters: view full applicant profiles per job, accept or reject candidates from dashboard',
      'AI-powered job recommendations using Google Gemma via OpenRouter API — matches by role, skills, location, and type — with fallback algorithm',
      'Full Swagger / OpenAPI 3.0 documentation covering all 21 endpoints — interactive Try-it-out support',
      'Avg API response < 300ms (CRUD), < 1s (AI); Vercel serverless auto-scales to 1,000+ concurrent users',
    ],
    technologies: [
      'React 18', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'Shadcn UI', 'Framer Motion', 'Axios',
      'Node.js', 'Express.js', 'MongoDB', 'Mongoose',
      'JWT', 'bcryptjs', 'Cloudinary', 'Nodemailer', 'OpenRouter API (Google Gemma)', 'Swagger (OpenAPI 3.0)',
    ],
    liveUrl: 'https://job-hunt-frontend-nu.vercel.app',
    repoUrl: 'https://github.com/kaioumdev/Job-Hunt-Frontend',
    repoUrlBackend: 'https://github.com/kaioumdev/Job-Hunt-Backend',
    apiDocsUrl: 'https://job-hunt-backend-phi.vercel.app/api-docs',
  },
  {
    id: 'ubar',
    title: 'Ubar Ride Share — Full-Stack Ride-Hailing Platform',
    description:
      'A production-ready Uber-like ride-sharing application with real-time GPS tracking, ' +
      'live ride lifecycle management, and dual authentication for passengers and drivers.',
    features: [
      'Dual Authentication — separate JWT-based login for Passengers and Drivers with token blacklisting on logout',
      'Real-Time Ride Lifecycle — Socket.IO pushes live events (ride confirmed, started, ended) with zero polling',
      'Live GPS Tracking — captain location updates every 10 s, streamed to passenger map in real time',
      'Google Maps Integration — interactive live map with GPS markers for both user and captain',
      'Dynamic Fare Engine — calculates fares for Auto, Car, and Motorcycle using real driving distance + duration via Geoapify Routing API',
      'OTP Ride Verification — 6-digit OTP ensures the correct passenger boards before the ride starts',
      'Smart Captain Discovery — finds available drivers within 10 km radius using MongoDB geospatial queries, with fallback to all online captains',
      'Address Autocomplete — live address suggestions on pickup/destination powered by Geoapify',
      'GSAP Animations — smooth bottom-sheet panel transitions for a native mobile-app feel',
      'Full API Documentation — Swagger/OpenAPI 3.0 covering all 16 endpoints; 9 Socket.IO events; avg REST response < 200ms',
    ],
    technologies: [
      'React 18', 'Vite', 'Tailwind CSS', 'GSAP', 'Socket.IO Client', 'Google Maps API', 'Axios', 'React Router v6',
      'Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose', 'Socket.IO', 'JWT', 'bcrypt', 'Geoapify API', 'Swagger UI',
    ],
    liveUrl: 'https://ride-share-frontend-zeta.vercel.app/',
    repoUrl: 'https://github.com/kaioumdev/Ride-Share-Frontend',
    repoUrlBackend: 'https://github.com/kaioumdev/Ride-Share-Backend',
    apiDocsUrl: 'https://github.com/kaioumdev/Ride-Share-Backend/api-docs',
  },
  {
    id: 'lebaba',
    title: 'Shopping Mall — Full-Stack E-Commerce Platform',
    description:
      'A production-ready shopping mall platform with cinematic UI, Stripe checkout, role-based admin CMS, ' +
      'and fully documented REST API — built to real-world production standards.',
    features: [
      'Cinematic full-screen video intro on first visit — immersive mall entrance experience',
      '4-floor mall directory with outlet cards (Fashion, Jewels, Beauty, Accessories) and live countdown deals timer',
      'Advanced product filtering — category, color, and price range applied simultaneously',
      'Slide-in cart drawer with quantity management, live total calculation, and Stripe-hosted checkout (PCI-compliant)',
      'Post-payment order confirmation with automatic order record creation in MongoDB',
      'Customer dashboard — order history, payment tracking, profile editor, and review management',
      'Admin CMS — full product CRUD, order status management, user role control, and analytics charts',
      'Analytics dashboard — KPI cards (earnings, orders, users, products), monthly earnings line chart, and distribution pie chart (Chart.js)',
      'JWT auth via HTTP-only cookies (XSS-proof, 1 h expiry) + bcrypt (10 salt rounds) + role-based route guards',
      'RTK Query client-side cache eliminates duplicate API calls; Cloudinary CDN for all image delivery',
      'Full Swagger / OpenAPI 3.0 docs — 28 endpoints, interactive Try-it-out; avg REST response < 150ms',
      '1,000+ concurrent users — MongoDB Atlas auto-scales, Express is stateless; production bundle ~850KB JS (gzip ~265KB)',
    ],
    technologies: [
      'React 18', 'Vite 5', 'Tailwind CSS 3', 'Redux Toolkit', 'RTK Query', 'React Router 6', 'Stripe.js', 'Chart.js',
      'Node.js', 'Express 4', 'MongoDB Atlas', 'Mongoose 9', 'JWT', 'bcrypt', 'Stripe SDK', 'Cloudinary', 'Swagger UI',
    ],
    liveUrl: 'https://shopping-mall-frontend-nine.vercel.app/',
    repoUrl: 'https://github.com/kaioumdev/Shopping-Mall-Frontend',
    repoUrlBackend: 'https://github.com/kaioumdev/Shopping-Mall-Backend',
    apiDocsUrl: 'https://shopping-mall-backend.vercel.app/api-docs',
  },
];
