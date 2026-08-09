import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UIEventBus from '../EventBus';
import { Easing } from '../Animation';

// SVG assets live in public/textures/UI/ and are referenced as plain paths
const volumeOnSrc = '/textures/UI/volume_on.svg';
const volumeOffSrc = '/textures/UI/volume_off.svg';

interface MuteToggleProps {}

const MuteToggle: React.FC<MuteToggleProps> = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [muted, setMuted] = useState(false);

    const onMouseDownHandler = useCallback(
        (event: React.MouseEvent) => {
            setIsActive(true);
            event.preventDefault();
            setMuted((prev) => !prev);
        },
        []
    );

    const onMouseUpHandler = useCallback(() => {
        setIsActive(false);
    }, []);

    useEffect(() => {
        UIEventBus.dispatch('muteToggle', muted);
    }, [muted]);

    const iconSize =
        typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 10;

    return (
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={styles.container}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            className="icon-control-container"
            id="prevent-click"
        >
            <motion.img
                id="prevent-click"
                src={muted ? volumeOffSrc : volumeOnSrc}
                alt={muted ? 'Unmute' : 'Mute'}
                style={{ opacity: isActive ? 0.2 : isHovering ? 0.8 : 1 }}
                width={iconSize}
                animate={isActive ? 'active' : isHovering ? 'hovering' : 'default'}
                variants={iconVars}
            />
        </div>
    );
};

const iconVars = {
    hovering: {
        opacity: 0.8,
        transition: { duration: 0.1, ease: 'easeOut' },
    },
    active: {
        scale: 0.8,
        opacity: 0.5,
        transition: { duration: 0.1, ease: Easing.expOut },
    },
    default: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.2, ease: 'easeOut' },
    },
};

const styles: StyleSheetCSS = {
    container: {
        background: 'black',
        textAlign: 'center',
        display: 'flex',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
};

export default MuteToggle;
