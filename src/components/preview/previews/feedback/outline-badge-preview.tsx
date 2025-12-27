'use client';

import { SettingsValues } from '@/lib/settings-types';

interface OutlineBadgePreviewProps {
    settings?: SettingsValues;
}

export function OutlineBadgePreview({ settings }: OutlineBadgePreviewProps) {
    const text = (settings?.text as string) || 'Pending';
    const borderColor = (settings?.borderColor as string) || '#6b7280';

    return (
        <div className="outline-badge-preview">
            <style jsx>{`
                .outline-badge-preview {
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
                    background: transparent;
                    border: 1px solid;
                    transition: all 0.2s;
                }
                .badge:hover {
                    transform: scale(1.05);
                }
            `}</style>
            <span
                className="badge"
                style={{
                    borderColor: borderColor,
                    color: borderColor
                }}
            >
                {text}
            </span>
        </div>
    );
}
