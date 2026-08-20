'use client';

import React from 'react';
import PortfolioApp from '../app/os/apps/PortfolioApp';

/**
 * MobilePortfolio
 * Wraps PortfolioApp for mobile devices — no WebGL, no CSS3D iframe.
 * Fills the full viewport with a clean background matching the OS theme.
 */
export default function MobilePortfolio() {
  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      background: '#fafafa',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
    }}>
      <PortfolioApp />
    </div>
  );
}
