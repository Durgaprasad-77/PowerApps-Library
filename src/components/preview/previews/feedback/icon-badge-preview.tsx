'use client';

import { SettingsValues } from '@/lib/settings-types';

interface IconBadgePreviewProps {
    settings?: SettingsValues;
}

const iconOptions: Record<string, { icon: string; color: string }> = {
    success: { icon: '✓', color: '#22c55e' },
    error: { icon: '✕', color: '#ef4444' },
    warning: { icon: '⚠', color: '#f59e0b' },
    info: { icon: 'ℹ', color: '#3b82f6' },
};

export function IconBadgePreview({ settings }: IconBadgePreviewProps) {
    const text = (settings?.text as string) || 'Success';
    const type = (settings?.type as string) || 'success';
    const { icon, color } = iconOptions[type] || iconOptions.success;

    // Create lighter background
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 34, g: 197, b: 94 };
    };

    const rgb = hexToRgb(color);
    const bgColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;

    return (
        <div className="icon-badge-preview">
            <style jsx>{`
                .icon-badge-preview {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    padding: 40px;
                }
                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    padding: 6px 12px 6px 10px;
                    border-radius: 6px;
                    font-family: 'Segoe UI', sans-serif;
                    font-weight: 600;
                    font-size: 12px;
                    transition: all 0.2s;
                }
                .badge:hover {
                    transform: scale(1.05);
                }
                .icon {
                    font-weight: bold;
                }
            `}</style>
            <span
                className="badge"
                style={{
                    backgroundColor: bgColor,
                    color: color
                }}
            >
                <span className="icon">{icon}</span>
                {text}
            </span>
        </div>
    );
}
