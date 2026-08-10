<div align="center">

# Md Kaioum Islam — Interactive 3D Portfolio

**A cinematic, WebGL-powered developer portfolio rendered inside a simulated desktop OS on a virtual 3D monitor.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-kaioumdev.vercel.app-black?style=for-the-badge&logo=vercel)](https://kaioumdev.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-r166-black?style=for-the-badge&logo=three.js)](https://threejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-black?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://kaioumdev.vercel.app)

</div>

---

## Overview

This is not a typical portfolio website. It is a fully interactive **3D WebGL scene** built with Three.js and rendered at 60 FPS, where the entire portfolio UI lives inside a **simulated OS environment** displayed on a virtual computer monitor model. Visitors experience a cinematic camera transition from the loading screen to the desk, then can click into the monitor to browse the portfolio through a custom-built windowed OS interface.

Every animation — from the loading screen to the project cards — is GPU-accelerated, using only `transform` and `opacity` as animation targets to keep the render loop smooth.

**Live:** [https://kaioumdev.vercel.app](https://kaioumdev.vercel.app)

---

## Feature Highlights

### 3D Scene & Environment
- Real-time WebGL scene with a baked-texture desk environment (computer, decor, world models)
- Cinematic camera system with keyframe-based transitions (Loading → Idle → Desk → Monitor)
- CSS3DRenderer overlay that embeds the portfolio UI directly onto the virtual monitor surface
- Custom GLSL shaders and environment maps for realistic lighting
- Ambient office soundscape, keyboard SFX, and startup audio via a full audio management system
- Interactive coffee steam particle effect
- Stats.js FPS counter for performance monitoring (dev mode)

### Portfolio OS Interface
The UI rendered on the monitor is a fully functional simulated operating system with:
- **Sidebar navigation** across six pages: Home, About, Experience, Projects, Contact, Resume
- **Animated project cards** with staggered 3D entrance animations, continuous idle float, cursor-tracked tilt, and spotlight radial gradient overlay
- **Categorized skills section** — Frontend, Backend, Database, Auth & DevOps, Testing
- **Experience timeline** with work history and open-source contributions
- **Functional contact form** wired to a Next.js API route with Nodemailer email delivery
- **Resume page** with direct PDF download

### Animation System (Projects Section)
- Entrance: `opacity 0→1`, `translateY 40→0`, `rotateX -20→0` with 120ms stagger per card via Framer Motion
- Idle float: GSAP `yoyo` tween cycling between `translateY: 0` and `translateY: -8px`, out-of-phase per card
- Hover tilt: cursor-derived `rotateX`/`rotateY` clamped ±15°, `scale(1.03)`, dynamic box-shadow shifting opposite to tilt
- Cursor spotlight: radial gradient overlay tracking mouse position at 0.12 opacity
- Full `prefers-reduced-motion` support — all transforms collapse to a 150ms opacity fade
- Only `transform` and `opacity` are animated — zero layout properties touched

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.3 (App Router, Turbopack) |
| Language | TypeScript 5.4 |
| 3D Engine | Three.js r166 |
| Animation | Framer Motion 11, GSAP 3.12 |
| Camera Transitions | @tweenjs/tween.js 21, bezier-easing |
| Rendering | WebGLRenderer + CSS3DRenderer |
| Email API | Nodemailer via Next.js Route Handler |
| Deployment | Vercel |
| Styling | Inline React styles (no CSS framework in OS UI) |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Root page — mounts the 3D scene
│   ├── os/
│   │   ├── page.tsx              # OS overlay page
│   │   └── apps/
│   │       └── PortfolioApp.tsx  # Full portfolio OS UI (all pages + animations)
│   └── api/
│       └── send-email/
│           └── route.ts          # Nodemailer contact form API
│
├── Application/                  # Three.js engine (class-based)
│   ├── Application.ts            # Singleton root — owns all subsystems
│   ├── Renderer.ts               # WebGLRenderer + CSS3DRenderer setup
│   ├── Camera/
│   │   ├── Camera.ts             # Keyframe camera with TWEEN transitions
│   │   └── CameraKeyframes.ts    # Idle / Monitor / Desk / Loading keyframes
│   ├── World/
│   │   ├── World.ts              # Scene graph root
│   │   ├── MonitorScreen.ts      # CSS3D monitor surface
│   │   ├── Computer.ts           # Baked computer model
│   │   ├── Environment.ts        # Baked environment model
│   │   ├── Decor.ts              # Baked decor model
│   │   ├── CoffeeSteam.ts        # Particle system
│   │   └── Cursor.ts             # 3D cursor mesh
│   ├── Audio/
│   │   ├── AudioManager.ts       # Master audio controller
│   │   └── AudioSources.ts       # Keyboard, mouse, ambient, radio SFX
│   └── Utils/
│       ├── Resources.ts          # Asset loader (GLB, textures, audio)
│       ├── Sizes.ts              # Responsive resize handler
│       ├── Time.ts               # RAF-based tick loop
│       └── BakedModel.ts         # Baked texture model helper
│
├── components/
│   └── PortfolioScene.tsx        # React component that boots the Application
│
public/
├── models/                       # GLB scene models (Computer, Decor, World)
├── textures/                     # Baked texture maps + environment cubemap
├── audio/                        # Atmosphere, keyboard, mouse, radio, startup SFX
└── resume.pdf
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn

### Installation

```bash
git clone https://github.com/kaioumdev/final-portfolio.git
cd final-portfolio
yarn install
```

### Environment Variables

Create a `.env.local` file in the project root for the contact form email:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-gmail@gmail.com
```

> Use a [Gmail App Password](https://support.google.com/accounts/answer/185833) — not your account password.

### Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
yarn build
yarn start
```

---

## Deployment

This project is deployed on **Vercel** with zero configuration. Every push to `main` triggers an automatic build and deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kaioumdev/final-portfolio)

---

## Performance

- All card animations target only `transform` and `opacity` — GPU compositor thread only
- GSAP tweens are stored in refs and killed on component unmount — no memory leaks
- `will-change: transform` is applied only during active animations, removed on completion
- `ResizeObserver` for grid breakpoints fires only on bucket changes (not every pixel)
- Three.js render loop maintains ≥60 FPS during all UI animations

---

## Author

**Md Kaioum Islam** — Full-Stack Software Engineer

- Portfolio: [kaioumdev.vercel.app](https://kaioumdev.vercel.app)
- GitHub: [github.com/kaioumdev](https://github.com/kaioumdev)
- LinkedIn: [linkedin.com/in/kaioumdev](https://www.linkedin.com/in/kaioumdev/)
- Email: [mdkaioumislam.dev@gmail.com](mailto:mdkaioumislam.dev@gmail.com)

---

## License

This project is **not open-source**. The source code is provided for viewing purposes only. Reproduction, redistribution, or commercial use is not permitted without explicit written permission.

© 2026 Md Kaioum Islam. All rights reserved.
