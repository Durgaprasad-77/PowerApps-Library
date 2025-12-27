'use client';

import { SettingsValues } from '@/lib/settings-types';

interface SimpleBadgePreviewProps {
    settings?: SettingsValues;
}

export function SimpleBadgePreview({ settings }: SimpleBadgePreviewProps) {
    const text = (settings?.text as string) || 'Default';
    const textColor = (settings?.textColor as string) || '#245096';

    // Convert hex to RGB for background fade calculation
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 36, g: 80, b: 150 };
    };

    const rgb = hexToRgb(textColor);
    // Create 80% lighter background (similar to ColorFade in Power Apps)
    const bgColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;

    return (
        <div className="simple-badge-preview">
            <style jsx>{`
                .simple-badge-preview {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    padding: 40px;
                }
                .badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-family: 'Segoe UI', sans-serif;
                    font-weight: 600;
                    font-size: 12px;
                    transition: all 0.2s;
                }
                .badge:hover {
                    transform: scale(1.05);
                }
            `}</style>
            <span
                className="badge"
                style={{
                    backgroundColor: bgColor,
                    color: textColor
                }}
            >
                {text}
            </span>
        </div>
    );
}
