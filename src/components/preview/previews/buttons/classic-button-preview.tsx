"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface ClassicButtonPreviewProps {
    settings: SettingsValues;
}

export function ClassicButtonPreview({ settings }: ClassicButtonPreviewProps) {
    const { theme, colors } = usePreviewTheme();
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Extract settings with theme-aware defaults
    const text = (settings.text as string) || 'Click Me';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#ffffff' : '#0a0a0a');
    const textColor = (settings.textColor as string) || (theme === 'dark' ? '#0a0a0a' : '#ffffff');
    const hoverColor = (settings.hoverColor as string) || (theme === 'dark' ? '#e5e5e5' : '#333333');
    const borderRadius = (settings.borderRadius as number) || 8;
    const paddingX = (settings.paddingX as number) || 20;
    const paddingY = (settings.paddingY as number) || 10;
    const fontWeight = (settings.fontWeight as string) || '500';
    const showBorder = (settings.showBorder as boolean) || false;
    const borderColor = (settings.borderColor as string) || colors.border.default;

    // Calculate current background color based on state
    const currentBg = isPressed
        ? adjustBrightness(hoverColor, -20)
        : isHovered
            ? hoverColor
            : backgroundColor;

    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            className="transition-all duration-150 cursor-pointer"
            style={{
                backgroundColor: currentBg,
                color: textColor,
                borderRadius: `${borderRadius}px`,
                padding: `${paddingY}px ${paddingX}px`,
                fontWeight: fontWeight,
                border: showBorder ? `1px solid ${borderColor}` : 'none',
                transform: isPressed ? 'scale(0.98)' : 'scale(1)',
                boxShadow: isHovered && !isPressed
                    ? '0 4px 12px rgba(0,0,0,0.15)'
                    : isPressed
                        ? '0 1px 2px rgba(0,0,0,0.1)'
                        : '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            {text}
        </button>
    );
}

// Helper to adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}

