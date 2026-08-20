'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioApp from './apps/PortfolioApp';

// ── Types ─────────────────────────────────────────────────────────────────────
type AppId = 'portfolio';

interface OpenWindow {
  id: AppId;
  zIndex: number;
  x: number;
  y: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const DESKTOP_BG = '#0a0a0a';
const TASKBAR_BG = '#000000';
const TITLEBAR_BG = '#1a1a2e';
const TITLEBAR_TEXT = '#ffffff';
const WINDOW_W = 920;
const WINDOW_H = 650;
const MONO = "'Courier New', Courier, monospace";

const ICONS: { id: AppId; label: string; emoji: string }[] = [
  { id: 'portfolio', label: 'Portfolio', emoji: '🖥️' },
];

const TITLES: Record<AppId, string> = {
  portfolio: 'Md Kaioum Islam — Portfolio',
};

// ── Desktop Icon ──────────────────────────────────────────────────────────────
function DesktopIcon({ id, label, emoji, onOpen }: {
  id: AppId; label: string; emoji: string; onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const handleClick = () => {
    clickCount.current += 1;
    if (clickCount.current === 2) {
      clearTimeout(timer.current);
      clickCount.current = 0;
      onOpen();
    } else {
      timer.current = setTimeout(() => { clickCount.current = 0; }, 360);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`Double-click to open ${label}`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: 72, padding: '8px 4px', borderRadius: 8, cursor: 'default',
        userSelect: 'none',
        background: hovered ? 'rgba(255,255,255,0.10)' : 'transparent',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.18)' : 'transparent'}`,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      <span style={{ fontSize: 26, lineHeight: 1 }}>{emoji}</span>
      <span style={{
        marginTop: 5, fontSize: 10, fontFamily: MONO, color: '#e0e0e0',
        textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-word',
        textShadow: '0 1px 3px rgba(0,0,0,0.9)',
      }}>{label}</span>
    </div>
  );
}

// ── App Window ────────────────────────────────────────────────────────────────
function AppWindow({ win, onClose, onMinimize, onFocus, children, forceMobile }: {
  win: OpenWindow;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  forceMobile: boolean;
}) {
  const [pos, setPos] = useState({ x: win.x, y: win.y });
  // On mobile, start maximized and stay maximized
  const [isMaximized, setIsMaximized] = useState(forceMobile);
  const [closHov, setClosHov] = useState(false);
  const [minHov, setMinHov] = useState(false);
  const [maxHov, setMaxHov] = useState(false);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  // Keep maximized in sync when forceMobile changes (e.g. orientation change)
  useEffect(() => {
    if (forceMobile) setIsMaximized(true);
  }, [forceMobile]);

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    onFocus();
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y };
    const move = (ev: MouseEvent) => {
      if (!drag.current) return;
      setPos({ x: drag.current.ox + ev.clientX - drag.current.sx, y: drag.current.oy + ev.clientY - drag.current.sy });
    };
    const up = () => {
      drag.current = null;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const title = TITLES[win.id];

  const maximizedStyle: React.CSSProperties = {
    position: 'absolute', left: 0, top: 0,
    width: '100%', height: '100%',
    marginLeft: 0, marginTop: 0,
    zIndex: win.zIndex,
    display: 'flex', flexDirection: 'column',
    borderRadius: 0, overflow: 'hidden',
    boxShadow: 'none', border: 'none',
  };

  const normalStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%', top: '50%',
    marginLeft: `calc(${pos.x}px - ${WINDOW_W / 2}px)`,
    marginTop: `calc(${pos.y}px - ${WINDOW_H / 2}px)`,
    zIndex: win.zIndex,
    width: WINDOW_W, maxWidth: 'calc(100vw - 80px)',
    height: WINDOW_H, maxHeight: 'calc(100vh - 56px)',
    display: 'flex', flexDirection: 'column',
    borderRadius: 10, overflow: 'hidden',
    boxShadow: '0 24px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onMouseDown={onFocus}
      style={isMaximized ? maximizedStyle : normalStyle}
    >
      {/* Title bar */}
      <div
        onMouseDown={handleTitleMouseDown}
        style={{
          height: 36, flexShrink: 0, background: TITLEBAR_BG,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 12px', cursor: isMaximized ? 'default' : 'grab', userSelect: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Left: minimize */}
        <button
          onClick={e => { e.stopPropagation(); onMinimize(); }}
          onMouseEnter={() => setMinHov(true)} onMouseLeave={() => setMinHov(false)}
          style={{
            width: 12, height: 12, borderRadius: '50%', border: 'none', padding: 0,
            cursor: 'pointer', flexShrink: 0,
            background: minHov ? '#febc2e' : 'rgba(254,188,46,0.55)',
            transition: 'background 0.15s',
          }}
        />

        {/* Center title */}
        <span style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontFamily: MONO, fontSize: 11, color: TITLEBAR_TEXT, opacity: 0.8,
          pointerEvents: 'none', whiteSpace: 'nowrap', overflow: 'hidden',
          textOverflow: 'ellipsis', maxWidth: '50%',
        }}>
          {title}
        </span>

        {/* Right: maximize (desktop only) + close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {!forceMobile && (
            <button
              onClick={e => { e.stopPropagation(); setIsMaximized(m => !m); }}
              onMouseEnter={() => setMaxHov(true)} onMouseLeave={() => setMaxHov(false)}
              title={isMaximized ? 'Restore' : 'Maximize'}
              style={{
                width: 26, height: 22, borderRadius: 5, border: 'none', padding: 0,
                cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: maxHov ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)',
                color: '#ffffff', fontSize: 11, lineHeight: 1,
                fontFamily: MONO, fontWeight: 700,
                transition: 'background 0.15s',
              }}
            >
              {isMaximized ? '⊟' : '⊞'}
            </button>
          )}
          <button
            onClick={e => { e.stopPropagation(); onClose(); }}
            onMouseEnter={() => setClosHov(true)} onMouseLeave={() => setClosHov(false)}
            title="Close"
            style={{
              width: 26, height: 22, borderRadius: 5, border: 'none', padding: 0,
              cursor: 'pointer', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: closHov ? '#ff5f57' : 'rgba(255,255,255,0.15)',
              color: '#ffffff', fontSize: 15, lineHeight: 1,
              fontFamily: MONO, fontWeight: 700,
              transition: 'background 0.15s',
            }}
          >×</button>
        </div>
      </div>

      {/* Window content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
    </motion.div>
  );
}

// ── Main OS Page ──────────────────────────────────────────────────────────────
export default function MonitorApp() {
  const [windows, setWindows] = useState<OpenWindow[]>([
    { id: 'portfolio', zIndex: 100, x: 0, y: 0 },
  ]);
  const [minimized, setMinimized] = useState<AppId[]>([]);
  const [time, setTime] = useState('');
  const topZ = useRef(100);

  // Detect mobile viewport inside the CSS3D iframe
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const openWindow = (id: AppId) => {
    setMinimized(m => m.filter(x => x !== id));
    setWindows(w => {
      const existing = w.find(x => x.id === id);
      if (existing) return bringToFront(w, id);
      topZ.current += 1;
      const offset = w.length * 26;
      return [...w, { id, zIndex: topZ.current, x: 50 + offset, y: 18 + offset }];
    });
  };

  const closeWindow = (id: AppId) => {
    setWindows(w => w.filter(x => x.id !== id));
    setMinimized(m => m.filter(x => x !== id));
  };

  const minimizeWindow = (id: AppId) => {
    setMinimized(m => m.includes(id) ? m : [...m, id]);
  };

  const focusWindow = (id: AppId) => {
    setWindows(w => bringToFront(w, id));
    setMinimized(m => m.filter(x => x !== id));
  };

  const bringToFront = (ws: OpenWindow[], id: AppId) => {
    topZ.current += 1;
    return ws.map(w => w.id === id ? { ...w, zIndex: topZ.current } : w);
  };

  return (
    <div style={{
      width: '100%', height: '100vh',
      display: 'flex', flexDirection: 'column',
      background: DESKTOP_BG, overflow: 'hidden', position: 'relative',
      fontFamily: MONO,
    }}>
      {/* ── Desktop area ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

        {/* Desktop icons — hidden on mobile (window is auto-maximized) */}
        {!isMobile && (
          <div style={{
            position: 'absolute', top: 14, left: 10,
            display: 'flex', flexDirection: 'column', gap: 4,
            zIndex: 10,
          }}>
            {ICONS.map(icon => (
              <DesktopIcon
                key={icon.id}
                id={icon.id}
                label={icon.label}
                emoji={icon.emoji}
                onOpen={() => openWindow(icon.id)}
              />
            ))}
          </div>
        )}

        {/* Windows */}
        <AnimatePresence>
          {windows
            .filter(w => !minimized.includes(w.id))
            .map(w => (
              <AppWindow
                key={w.id}
                win={w}
                onClose={() => closeWindow(w.id)}
                onMinimize={() => minimizeWindow(w.id)}
                onFocus={() => focusWindow(w.id)}
                forceMobile={isMobile}
              >
                {w.id === 'portfolio' && <PortfolioApp />}
              </AppWindow>
            ))}
        </AnimatePresence>
      </div>

      {/* ── Taskbar ── */}
      <div style={{
        height: 36, flexShrink: 0,
        background: TASKBAR_BG, borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px', zIndex: 9999,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: '#ffffff', marginRight: 6 }}>
            Md Kaioum Islam
          </span>
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.2)' }} />
          {windows.map(w => {
            const isMin = minimized.includes(w.id);
            return (
              <button
                key={w.id}
                onClick={() => isMin ? focusWindow(w.id) : minimizeWindow(w.id)}
                style={{
                  padding: '3px 10px', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 4, background: isMin ? 'transparent' : 'rgba(255,255,255,0.12)',
                  color: isMin ? 'rgba(255,255,255,0.45)' : '#ffffff',
                  fontFamily: MONO, fontSize: 10, cursor: 'pointer',
                  maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}
              >
                {TITLES[w.id]}
              </button>
            );
          })}
        </div>
        <span style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(255,255,255,0.7)', fontVariantNumeric: 'tabular-nums' }}>
          {time}
        </span>
      </div>
    </div>
  );
}
