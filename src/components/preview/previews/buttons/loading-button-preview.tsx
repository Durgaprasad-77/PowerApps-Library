"use client";

import { useState } from 'react';

import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface LoadingButtonPreviewProps {
    settings: SettingsValues;
}

export function LoadingButtonPreview({ settings }: LoadingButtonPreviewProps) {
    const { theme } = usePreviewTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Extract settings with defaults
    const text = (settings.text as string) || 'Submit';

    const loadingText = (settings.loadingText as string) || 'Loading...';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#ffffff' : '#111827');
    const textColor = (settings.textColor as string) || (theme === 'dark' ? '#0a0a0a' : '#ffffff');
    const spinnerColor = (settings.spinnerColor as string) || (theme === 'dark' ? '#0a0a0a' : '#ffffff');
    const borderRadius = (settings.borderRadius as number) || 8;


    const handleClick = () => {
        if (isLoading) return;
        setIsLoading(true);
        // Simulate loading for 2 seconds
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isLoading}
            className="relative transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
            style={{
                backgroundColor: isLoading ? adjustBrightness(backgroundColor, -10) : backgroundColor,
                color: textColor,
                borderRadius: `${borderRadius}px`,
                padding: '12px 24px',
                fontWeight: 500,
                border: 'none',
                opacity: isLoading ? 0.9 : 1,
                transform: isHovered && !isLoading ? 'translateY(-1px)' : 'translateY(0)',
                boxShadow: isHovered && !isLoading
                    ? '0 4px 12px rgba(0,0,0,0.15)'
                    : '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <span className="flex items-center gap-2 justify-center">
                {isLoading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        style={{ color: spinnerColor }}
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                <span>{isLoading ? loadingText : text}</span>
            </span>
        </button>
    );
}

function adjustBrightness(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}
