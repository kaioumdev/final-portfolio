'use client';

import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import { EXPERIENCE, EDUCATION } from '../data/experience';

type NavPage = 'home' | 'about' | 'experience' | 'projects' | 'contact' | 'resume';

const C = {
  sidebar:       '#f0ede8',
  sidebarBorder: '#d4cfc9',
  content:       '#fafafa',
  heading:       '#000000',
  body:          '#111111',
  muted:         '#555555',
  link:          '#4a0080',
  hr:            '#cccccc',
  chip:          '#ede9e4',
  chipBorder:    '#c8c3bc',
  chipText:      '#1a1a2e',
  formBg:        '#f5f2ee',
  formBorder:    '#ccc',
  btnBg:         '#1a1a2e',
  btnText:       '#ffffff',
  success:       '#166534',
  successBg:     '#dcfce7',
  error:         '#991b1b',
  errorBg:       '#fee2e2',
  cardBg:        '#f5f2ee',
  cardBorder:    '#ddd8d0',
};

const MONO  = "'Courier New', Courier, monospace";
const SERIF = "Georgia, 'Times New Roman', serif";

const SKILL_GROUPS: { label: string; color: string; skills: string[] }[] = [
  {
    label: 'Frontend',
    color: '#6366f1',
    skills: ['React.js', 'React Native', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'ShadCN', 'Framer Motion'],
  },
  {
    label: 'Backend',
    color: '#10b981',
    skills: ['Node.js', 'Express.js', 'REST API', 'GraphQL'],
  },
  {
    label: 'Database',
    color: '#f59e0b',
    skills: ['MongoDB', 'Mongoose', 'PostgreSQL', 'MySQL', 'Prisma'],
  },
  {
    label: 'Auth & DevOps',
    color: '#ef4444',
    skills: ['Firebase', 'NextAuth', 'JWT', 'Docker', 'Git', 'GitHub', 'Puppeteer'],
  },
  {
    label: 'Testing',
    color: '#8b5cf6',
    skills: ['Jest', 'React Testing Library', 'Vitest'],
  },
];

function Footer() {
  return (
    <p style={{ fontFamily: MONO, fontSize: 11, color: C.muted, marginTop: 40, paddingTop: 16, borderTop: `1px solid ${C.hr}` }}>
      © Copyright 2026 Md Kaioum Islam
    </p>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 3,
      fontSize: 11, fontFamily: MONO, background: C.chip,
      border: `1px solid ${C.chipBorder}`, color: C.chipText,
      margin: '3px 4px 3px 0',
    }}>{text}</span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: C.heading, margin: '0 0 12px 0' }}>
      {children}
    </h2>
  );
}

function inputSt(hasError?: boolean): React.CSSProperties {
  return {
    width: '100%', boxSizing: 'border-box', padding: '8px 10px',
    fontFamily: MONO, fontSize: 12, color: C.body,
    background: C.formBg, border: `1px solid ${hasError ? C.error : C.formBorder}`,
    borderRadius: 3, outline: 'none', resize: 'vertical',
  };
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.07-.608.07-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.91-1.294 2.748-1.026 2.748-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.024-3.037-1.852-3.037-1.852 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Pages ─────────────────────────────────────────────────────────────────────

function HomePage({ onNav }: { onNav: (p: NavPage) => void }) {
  return (
    <div style={{ minHeight: '100%' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', paddingTop: '18%', paddingBottom: 40,
        textAlign: 'center',
      }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 42, fontWeight: 900, color: '#1a1a1a', margin: '0 0 10px 0', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
          Md Kaioum Islam
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: 18, color: '#444', margin: '0 0 36px 0', fontWeight: 400 }}>
          Full-Stack Software Engineer
        </p>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {(['about','experience','projects','contact','resume'] as const).map(id => (
            <button key={id} onClick={() => onNav(id)} style={{
              fontFamily: MONO, fontSize: 13, color: C.link,
              textDecoration: 'underline', cursor: 'pointer', letterSpacing: '0.08em',
              textTransform: 'uppercase', fontWeight: 600,
              background: 'transparent', border: 'none', padding: 0,
            }}>{id}</button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function AboutPage() {
  const [photoErr, setPhotoErr] = useState(false);
  return (
    <div>
      <H2>About</H2>
      <hr style={{ border: 'none', borderTop: `1px solid ${C.hr}`, margin: '0 0 20px 0' }} />

      {/* Photo + name row */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 24 }}>
        {photoErr ? (
          <div style={{ width: 100, height: 100, borderRadius: '50%', flexShrink: 0, background: C.chip, border: `2px solid ${C.sidebarBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: C.muted }}>MK</div>
        ) : (
          <img src="/images/profile.jpg" alt="Md Kaioum Islam" onError={() => setPhotoErr(true)}
            style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${C.sidebarBorder}`, flexShrink: 0 }} />
        )}
        <div style={{ flex: 1, minWidth: 180 }}>
          <p style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 700, color: C.heading, margin: '0 0 6px 0' }}>Md Kaioum Islam</p>
          <p style={{ fontFamily: MONO, fontSize: 12, color: C.muted, margin: '0 0 8px 0' }}>Full-Stack Software Engineer · MERN Stack Developer</p>
          {/* Contact & social links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <a href="mailto:mdkaioumislam.dev@gmail.com" style={{ fontFamily: MONO, fontSize: 11, color: C.link, textDecoration: 'none' }}>
              ✉ mdkaioumislam.dev@gmail.com
            </a>
            <a href="tel:+8801988037160" style={{ fontFamily: MONO, fontSize: 11, color: C.link, textDecoration: 'none' }}>
              📞 +880 1988-037160
            </a>
            <a href="https://github.com/kaioumdev" target="_blank" rel="noopener noreferrer" style={{ fontFamily: MONO, fontSize: 11, color: C.link, textDecoration: 'none' }}>
              ⬡ github.com/kaioumdev
            </a>
            <a href="https://www.linkedin.com/in/kaioumdev/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: MONO, fontSize: 11, color: C.link, textDecoration: 'none' }}>
              in linkedin.com/in/kaioumdev
            </a>
            <a href="https://leetcode.com/u/kaioumdev/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: MONO, fontSize: 11, color: C.link, textDecoration: 'none' }}>
              ⌨ leetcode.com/u/kaioumdev
            </a>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p style={{ fontFamily: MONO, fontSize: 13, color: C.body, lineHeight: 1.85, margin: '0 0 16px 0' }}>
        I'm a Full-Stack Software Engineer specializing in building scalable, high-performance web applications
        that solve real-world problems. My core stack is the MERN ecosystem — MongoDB, Express.js, React.js,
        and Node.js — and I bring the same depth to TypeScript, Next.js, and modern tooling like Docker,
        Prisma, and GraphQL.
      </p>
      <p style={{ fontFamily: MONO, fontSize: 13, color: C.body, lineHeight: 1.85, margin: '0 0 16px 0' }}>
        In 2025, I joined a startup where I worked extensively with React and React Native (Expo),
        shipping cross-platform mobile and web experiences in a fast-moving product environment.
        Currently in 2026, I'm part of another startup building an Airbnb-style platform,
        where I work on complex UI flows, real-time features, and robust API integrations using React.
      </p>
      <p style={{ fontFamily: MONO, fontSize: 13, color: C.body, lineHeight: 1.85, margin: '0 0 24px 0' }}>
        Beyond the day job, I've contributed to open source through GSSoC 2024 (ranked #344 globally)
        and Hacktoberfest (Level 1–4 badges). I care about clean architecture, maintainable code, and
        building UIs that people actually enjoy using.
      </p>

      <hr style={{ border: 'none', borderTop: `1px solid ${C.hr}`, margin: '0 0 20px 0' }} />
      <p style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: C.heading, margin: '0 0 16px 0' }}>Skills &amp; Technologies</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {SKILL_GROUPS.map(group => (
          <div key={group.label} style={{
            background: C.cardBg,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            {/* Category header with left accent bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 14px',
              borderBottom: `1px solid ${C.cardBorder}`,
              background: C.sidebar,
            }}>
              <span style={{
                display: 'inline-block', width: 3, height: 14,
                borderRadius: 2, background: group.color, flexShrink: 0,
              }} />
              <span style={{
                fontFamily: MONO, fontSize: 11, fontWeight: 700,
                color: group.color, letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>{group.label}</span>
            </div>
            {/* Chips */}
            <div style={{ padding: '10px 12px' }}>
              {group.skills.map(s => <Chip key={s} text={s} />)}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

function ExperiencePage() {
  return (
    <div>
      <H2>Experience</H2>
      <hr style={{ border: 'none', borderTop: `1px solid ${C.hr}`, margin: '0 0 20px 0' }} />
      {EXPERIENCE.map((e, i) => (
        <div key={e.id} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: i < EXPERIENCE.length - 1 ? `1px solid ${C.hr}` : 'none' }}>
          <p style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: C.heading, margin: '0 0 2px 0' }}>{e.role}</p>
          <p style={{ fontFamily: MONO, fontSize: 12, color: C.link, margin: '0 0 2px 0' }}>{e.organization}</p>
          <p style={{ fontFamily: MONO, fontSize: 11, color: C.muted, margin: '0 0 8px 0' }}>{e.startDate} — {e.endDate}</p>
          <p style={{ fontFamily: MONO, fontSize: 12, color: C.body, lineHeight: 1.75, margin: 0 }}>{e.description}</p>
          {(e as any).certLink && (
            <a href={(e as any).certLink} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: 8, fontFamily: MONO, fontSize: 11, color: C.link, textDecoration: 'none' }}>
              ↗ View Certificate / Achievement
            </a>
          )}
        </div>
      ))}
      <p style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: C.heading, margin: '8px 0 16px 0' }}>Education</p>
      <hr style={{ border: 'none', borderTop: `1px solid ${C.hr}`, margin: '0 0 20px 0' }} />
      {EDUCATION.map(e => (
        <div key={e.id}>
          <p style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: C.heading, margin: '0 0 2px 0' }}>{e.role}</p>
          <p style={{ fontFamily: MONO, fontSize: 12, color: C.link, margin: '0 0 2px 0' }}>{e.organization}</p>
          <p style={{ fontFamily: MONO, fontSize: 11, color: C.muted, margin: '0 0 8px 0' }}>{e.startDate} — {e.endDate}</p>
          <p style={{ fontFamily: MONO, fontSize: 12, color: C.body, lineHeight: 1.75, margin: 0 }}>{e.description}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}

function ProjectsPage() {
  return (
    <div>
      <H2>Projects</H2>
      <hr style={{ border: 'none', borderTop: `1px solid ${C.hr}`, margin: '0 0 20px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {PROJECTS.map(p => (
          <div key={p.id} style={{ background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 4, padding: '18px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
              <p style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: C.heading, margin: 0 }}>{p.title}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: MONO, fontSize: 11, color: C.link, textDecoration: 'none' }}>🌐 Live</a>}
                {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: MONO, fontSize: 11, color: C.link, textDecoration: 'none' }}>⬡ Frontend Repo</a>}
                {(p as any).repoUrlBackend && <a href={(p as any).repoUrlBackend} target="_blank" rel="noopener noreferrer" style={{ fontFamily: MONO, fontSize: 11, color: C.link, textDecoration: 'none' }}>⬡ Backend Repo</a>}
                {(p as any).apiDocsUrl && <a href={(p as any).apiDocsUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: MONO, fontSize: 11, color: C.link, textDecoration: 'none' }}>📖 API Docs</a>}
              </div>
            </div>
            <p style={{ fontFamily: MONO, fontSize: 12, color: C.body, lineHeight: 1.75, margin: '8px 0 12px 0' }}>{p.description}</p>
            {p.features && p.features.length > 0 && (
              <ul style={{ margin: '0 0 12px 0', paddingLeft: 18, listStyleType: 'disc' }}>
                {p.features.map((f, i) => (
                  <li key={i} style={{ fontFamily: MONO, fontSize: 11, color: C.body, lineHeight: 1.75, marginBottom: 3 }}>{f}</li>
                ))}
              </ul>
            )}
            <div>{p.technologies.map(t => <Chip key={t} text={t} />)}</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setStatus('sending');
    try {
      const res = await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  const disabled = status === 'sending' || status === 'sent';

  return (
    <div>
      <H2>Contact</H2>
      <hr style={{ border: 'none', borderTop: `1px solid ${C.hr}`, margin: '0 0 20px 0' }} />
      <p style={{ fontFamily: MONO, fontSize: 13, color: C.body, lineHeight: 1.8, margin: '0 0 20px 0' }}>Feel free to reach out! I'm open to full-time roles, freelance projects, and open-source collaborations.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
        {[
          { icon: '✉', label: 'mdkaioumislam.dev@gmail.com', href: 'mailto:mdkaioumislam.dev@gmail.com' },
          { icon: '⬡', label: 'github.com/kaioumdev', href: 'https://github.com/kaioumdev' },
          { icon: 'in', label: 'linkedin.com/in/kaioumdev', href: 'https://www.linkedin.com/in/kaioumdev/' },
          { icon: '📞', label: '+880 1988-037160', href: '+880 1988-037160' },
        ].map(c => (
          <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', fontFamily: MONO, fontSize: 12, color: C.link }}>
            <span style={{ width: 18, textAlign: 'center' }}>{c.icon}</span>
            <span>{c.label}</span>
          </a>
        ))}
      </div>
      <hr style={{ border: 'none', borderTop: `1px solid ${C.hr}`, margin: '0 0 20px 0' }} />
      <p style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 700, color: C.heading, margin: '0 0 16px 0' }}>Send a message</p>
      {status === 'sent' && <div style={{ padding: '10px 14px', background: C.successBg, border: `1px solid ${C.success}`, borderRadius: 3, fontFamily: MONO, fontSize: 12, color: C.success, marginBottom: 16 }}>✓ Message sent — I'll get back to you soon.</div>}
      {status === 'error' && <div style={{ padding: '10px 14px', background: C.errorBg, border: `1px solid ${C.error}`, borderRadius: 3, fontFamily: MONO, fontSize: 12, color: C.error, marginBottom: 16 }}>Something went wrong. Email me directly at mdkaioumislam.dev@gmail.com</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 420 }}>
        {(['name','email','message'] as const).map(field => (
          <div key={field}>
            <label style={{ display: 'block', fontFamily: MONO, fontSize: 11, color: C.muted, marginBottom: 5, textTransform: 'capitalize' }}>{field} *</label>
            {field === 'message'
              ? <textarea rows={4} value={form[field]} disabled={disabled} onChange={e => { setForm(p => ({...p,[field]:e.target.value})); setErrors(p => ({...p,[field]:''})); }} style={inputSt(!!errors[field])} />
              : <input type={field==='email'?'email':'text'} value={form[field]} disabled={disabled} onChange={e => { setForm(p => ({...p,[field]:e.target.value})); setErrors(p => ({...p,[field]:''})); }} style={inputSt(!!errors[field])} />
            }
            {errors[field] && <p style={{ fontFamily: MONO, fontSize: 11, color: C.error, margin: '3px 0 0 0' }}>{errors[field]}</p>}
          </div>
        ))}
        <button type="submit" disabled={disabled} style={{ alignSelf: 'flex-start', padding: '9px 22px', background: C.btnBg, color: C.btnText, border: 'none', borderRadius: 3, fontFamily: MONO, fontSize: 12, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.6 : 1 }}>
          {status === 'sending' ? 'Sending…' : status === 'sent' ? '✓ Sent' : 'Send Message'}
        </button>
      </form>
      <Footer />
    </div>
  );
}

function ResumePage() {
  return (
    <div>
      <H2>Resume</H2>
      <hr style={{ border: 'none', borderTop: `1px solid ${C.hr}`, margin: '0 0 20px 0' }} />
      <p style={{ fontFamily: MONO, fontSize: 13, color: C.body, lineHeight: 1.8, margin: '0 0 20px 0' }}>Download or view my resume below.</p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <a href="/resume.pdf" download style={{ padding: '9px 20px', background: C.btnBg, color: C.btnText, fontFamily: MONO, fontSize: 12, textDecoration: 'none', borderRadius: 3 }}>↓ Download PDF</a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ padding: '9px 20px', background: 'transparent', color: C.body, fontFamily: MONO, fontSize: 12, textDecoration: 'none', borderRadius: 3, border: `1px solid ${C.hr}` }}>Open in New Tab</a>
      </div>
      {/* <iframe src="/resume.pdf" title="Resume Preview" style={{ width: '100%', height: 440, border: `1px solid ${C.hr}`, borderRadius: 3, background: C.chip }} /> */}
      <p style={{ fontFamily: MONO, fontSize: 11, color: C.muted, marginTop: 12 }}>
        Can't view the PDF?{' '}<a href="mailto:mdkaioumislam.dev@gmail.com" style={{ color: C.link }}>Email me for a copy.</a>
      </p>
      <Footer />
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function PortfolioApp() {
  const [page, setPage] = useState<NavPage>('home');

  const navItems: { id: NavPage; label: string }[] = [
    { id: 'home',       label: 'HOME' },
    { id: 'about',      label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects',   label: 'PROJECTS' },
    { id: 'contact',    label: 'CONTACT' },
    { id: 'resume',     label: 'RESUME' },
  ];

  const pages: Record<NavPage, React.ReactNode> = {
    home:       <HomePage onNav={setPage} />,
    about:      <AboutPage />,
    experience: <ExperiencePage />,
    projects:   <ProjectsPage />,
    contact:    <ContactPage />,
    resume:     <ResumePage />,
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* LEFT SIDEBAR */}
      <div style={{ width: 200, flexShrink: 0, background: C.sidebar, borderRight: `1px solid ${C.sidebarBorder}`, display: 'flex', flexDirection: 'column', padding: '24px 0', overflowY: 'auto' }}>
        <div style={{ padding: '0 20px 20px 20px', borderBottom: `1px solid ${C.sidebarBorder}` }}>
          <p style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: C.heading, lineHeight: 1.15, margin: 0 }}>
            Md Kaioum<br />Islam
          </p>
          <p style={{ fontFamily: MONO, fontSize: 11, color: C.muted, margin: '8px 0 0 0' }}>Portfolio '26</p>
        </div>
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {navItems.map(n => {
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => setPage(n.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 20px', border: 'none', background: 'transparent', fontFamily: MONO, fontSize: 12, cursor: 'pointer', color: C.link, fontWeight: active ? 700 : 400, letterSpacing: '0.04em' }}>
                {active ? `• ${n.label}` : `  ${n.label}`}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: '16px 20px 0 20px', borderTop: `1px solid ${C.sidebarBorder}`, display: 'flex', gap: 14, alignItems: 'center' }}>
          <a href="https://github.com/kaioumdev" target="_blank" rel="noopener noreferrer" title="GitHub" style={{ color: C.heading, lineHeight: 0 }}><GithubIcon size={17} /></a>
          <a href="https://www.linkedin.com/in/kaioumdev/" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: '#0a66c2', lineHeight: 0 }}><LinkedInIcon size={17} /></a>
          <a href="mailto:mdkaioumislam.dev@gmail.com" title="Email" style={{ fontFamily: MONO, fontSize: 13, color: C.heading, textDecoration: 'none', lineHeight: 1 }}>✉</a>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ flex: 1, background: C.content, overflowY: 'auto', padding: '32px 36px', boxSizing: 'border-box' }}>
        {pages[page]}
      </div>

    </div>
  );
}
