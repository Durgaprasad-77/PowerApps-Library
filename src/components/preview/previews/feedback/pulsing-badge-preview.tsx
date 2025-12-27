'use client';

import { SettingsValues } from '@/lib/settings-types';

interface PulsingBadgePreviewProps {
    settings?: SettingsValues;
}

export function PulsingBadgePreview({ settings }: PulsingBadgePreviewProps) {
    const text = (settings?.text as string) || 'New';
    const badgeColor = (settings?.badgeColor as string) || '#ef4444';

    return (
        <div className="pulsing-badge-preview">
            <style jsx>{`
                .pulsing-badge-preview {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    padding: 40px;
                }
                .badge-container {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                .pulse-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 14px;
                    animation: pulse 1.5s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.4;
                    }
                    50% {
                        transform: scale(1.15);
                        opacity: 0.1;
                    }
                }
                .badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px 16px;
                    border-radius: 14px;
                    font-family: 'Segoe UI', sans-serif;
                    font-weight: 600;
                    font-size: 12px;
                    color: white;
                    z-index: 1;
                }
            `}</style>
            <div className="badge-container">
                <span
                    className="pulse-ring"
                    style={{ backgroundColor: badgeColor }}
                />
                <span
                    className="badge"
                    style={{ backgroundColor: badgeColor }}
                >
                    {text}
                </span>
            </div>
        </div>
    );
}
