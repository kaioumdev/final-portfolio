'use client';

import { useEffect, useState } from 'react';
import PortfolioScene from '../components/PortfolioScene';
import MobilePortfolio from '../components/MobilePortfolio';

export default function Home() {
    const [showMobile, setShowMobile] = useState(false);

    useEffect(() => {
        // Desktop: nothing — 3D scene handles everything as before
        if (!window.matchMedia('(max-width: 767px)').matches) return;

        // Mobile flow (same experience as desktop, just portfolio opens after):
        //
        // START click
        //   → loadingScreenDone fires
        //   → 3D idle view shows + "Click anywhere to begin..." types out
        //   → user taps anywhere
        //   → mobile portfolio fullscreen opens
        //
        // We add the tap listener 600ms AFTER loadingScreenDone so that
        // the START button click itself does NOT accidentally trigger it.

        const onLoadingDone = () => {
            setTimeout(() => {
                const open = () => setShowMobile(true);
                document.addEventListener('touchstart', open, { passive: true, once: true });
                document.addEventListener('click',      open, { once: true });
            }, 600);
        };

        document.addEventListener('loadingScreenDone', onLoadingDone, { once: true });
        return () => document.removeEventListener('loadingScreenDone', onLoadingDone);
    }, []);

    return (
        <>
            {/* 3D scene — always renders on all devices */}
            <PortfolioScene />

            {/* Mobile: fullscreen portfolio after first tap post-loading */}
            {showMobile && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: '#fafafa',
                    animation: 'mobileFadeIn 0.3s ease-out forwards',
                }}>
                    <MobilePortfolio />
                    <style>{`
                        @keyframes mobileFadeIn {
                            from { opacity: 0; transform: translateY(16px); }
                            to   { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                </div>
            )}
        </>
    );
}
