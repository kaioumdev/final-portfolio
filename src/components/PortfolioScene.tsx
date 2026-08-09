'use client';

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

/**
 * PortfolioScene
 *
 * Replicates the DOM structure from the old src/index.html and kicks off
 * the Three.js Application singleton once the component mounts.
 *
 * Layers (bottom → top by z-index):
 *   #css        — CSS3DRenderer output (the iframe monitor)
 *   #webgl      — Main WebGLRenderer (pointer-events:none)
 *   #overlay    — Noise/static shader WebGLRenderer (pointer-events:none)
 *   #ui         — React loading screen + help prompt
 *   #ui-interactive — React HUD (mute/freecam/name/clock)
 */
const PortfolioScene: React.FC = () => {
    const initialised = useRef(false);

    useEffect(() => {
        // Guard: only run once even in React 18 strict-mode double-invoke
        if (initialised.current) return;
        initialised.current = true;

        // Dynamically import Application so it never runs on the server
        import('../Application/Application').then(({ default: Application }) => {
            new Application();
        });
    }, []);

    return (
        <>
            {/* Google Analytics */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-4FJBF6WF60"
                strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-4FJBF6WF60');
            `}</Script>

            {/* CSS3DRenderer mount point */}
            <div id="css" />

            {/* Main WebGL canvas */}
            <div id="webgl" style={{ pointerEvents: 'none' }} />

            {/* Screen-noise shader overlay */}
            <div id="overlay" />

            {/* HUD — name, time, mute, freecam */}
            <div id="ui-interactive" style={{ position: 'absolute', top: 0, left: 0, width: 256 }} />

            {/* Loading screen + help prompt */}
            <div
                id="ui"
                style={{
                    position: 'absolute',
                    overflow: 'hidden',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                }}
            />

            {/* Hidden video elements used as VideoTexture sources by MonitorScreen */}
            <div
                id="monitor-videos"
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    opacity: 0,
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0,
                }}
            >
                <video
                    id="video-1"
                    muted
                    loop
                    autoPlay
                    playsInline
                    width={0}
                    height={0}
                    src="/textures/monitor/video/base-static.mp4"
                    style={{ opacity: 0 }}
                />
                <video
                    id="video-2"
                    muted
                    loop
                    autoPlay
                    playsInline
                    width={0}
                    height={0}
                    src="/textures/monitor/video/static-texture-layer.mp4"
                    style={{ opacity: 0 }}
                />
            </div>

            <style>{`
                body {
                    background-color: rgb(0, 0, 0);
                    margin: 0;
                }
                #css {
                    cursor: pointer;
                }
                #webgl {
                    pointer-events: none;
                }
                video {
                    position: absolute;
                    top: 0;
                    pointer-events: none;
                }
            `}</style>
        </>
    );
};

export default PortfolioScene;
