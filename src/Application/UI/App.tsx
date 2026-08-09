import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import LoadingScreen from './components/LoadingScreen';
import HelpPrompt from './components/HelpPrompt';
import InterfaceUI from './components/InterfaceUI';
import eventBus from './EventBus';
import './style.css';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        eventBus.on('loadingScreenDone', () => {
            setLoading(false);
        });
    }, []);

    return (
        <div id="ui-app">
            {!loading && <HelpPrompt />}
            <LoadingScreen />
        </div>
    );
};

/**
 * Mount the loading screen + help-prompt tree into #ui.
 * Uses React 18 createRoot (replaces the old ReactDOM.render).
 */
const createUI = () => {
    const container = document.getElementById('ui');
    if (!container) return;
    const root = createRoot(container);
    root.render(<App />);
};

/**
 * Mount the HUD (name / mute / free-cam) into #ui-interactive.
 */
const createVolumeUI = () => {
    const container = document.getElementById('ui-interactive');
    if (!container) return;
    const root = createRoot(container);
    root.render(<InterfaceUI />);
};

export { createUI, createVolumeUI };
