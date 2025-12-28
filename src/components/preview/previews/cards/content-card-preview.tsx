"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface ContentCardPreviewProps {
    settings: SettingsValues;
}

export function ContentCardPreview({ settings }: ContentCardPreviewProps) {
    const { theme } = usePreviewTheme();
    const [isHovered, setIsHovered] = useState(false);

    const title = (settings.title as string) || 'Card Title';
    const description = (settings.description as string) || 'This is a description of the card content. Click the button to learn more.';
    const buttonText = (settings.buttonText as string) || 'Learn More';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#111111' : '#ffffff');
    const borderColor = (settings.borderColor as string) || (theme === 'dark' ? '#1a1a1a' : '#e5e7eb');
    const textColor = theme === 'dark' ? '#ffffff' : '#111827';
    const mutedColor = theme === 'dark' ? '#a1a1a1' : '#6b7280';
    const buttonBg = theme === 'dark' ? '#ffffff' : '#111827';
    const buttonTextColor = theme === 'dark' ? '#000000' : '#ffffff';
    const borderRadius = (settings.borderRadius as number) || 12;

    return (
        <div
            className="w-full max-w-sm transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor,
                borderRadius: `${borderRadius}px`,
                border: `1px solid ${borderColor}`,
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.1)',
            }}
        >
            <div className="p-5">
                <h3 className="font-semibold text-lg mb-2" style={{ color: textColor }}>{title}</h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: mutedColor }}>{description}</p>
                <button
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ backgroundColor: buttonBg, color: buttonTextColor }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}
