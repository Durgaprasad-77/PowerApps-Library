"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface OutlineButtonPreviewProps {
    settings: SettingsValues;
}

export function OutlineButtonPreview({ settings }: OutlineButtonPreviewProps) {
    const { theme } = usePreviewTheme();
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Extract settings with defaults
    const text = (settings.text as string) || 'Learn More';
    const borderColor = (settings.borderColor as string) || (theme === 'dark' ? '#404040' : '#d1d5db');
    const textColor = (settings.textColor as string) || (theme === 'dark' ? '#ffffff' : '#111827');
    const hoverBackgroundColor = (settings.hoverBackgroundColor as string) || (theme === 'dark' ? '#1a1a1a' : '#f3f4f6');
    const borderRadius = (settings.borderRadius as number) || 8;
    const borderWidth = (settings.borderWidth as number) || 1;

    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            className="transition-all duration-200 cursor-pointer"
            style={{
                backgroundColor: isHovered ? hoverBackgroundColor : 'transparent',
                color: textColor,
                border: `${borderWidth}px solid ${isHovered ? textColor : borderColor}`,
                borderRadius: `${borderRadius}px`,
                padding: '10px 24px',
                fontWeight: 500,
                transform: isPressed ? 'scale(0.98)' : 'scale(1)',
            }}
        >
            {text}
        </button>
    );
}
