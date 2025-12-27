'use client';

import { SettingsValues } from '@/lib/settings-types';

interface CounterBadgePreviewProps {
    settings?: SettingsValues;
}

export function CounterBadgePreview({ settings }: CounterBadgePreviewProps) {
    const count = (settings?.count as number) || 5;
    const bgColor = (settings?.backgroundColor as string) || '#ef4444';
    const maxValue = (settings?.maxValue as number) || 99;

    const displayText = count > maxValue ? `${maxValue}+` : String(count);

    return (
        <div className="counter-badge-preview">
            <style jsx>{`
                .counter-badge-preview {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    padding: 40px;
                    gap: 24px;
                }
                .badge-container {
                    position: relative;
                    display: inline-block;
                }
                .icon-placeholder {
                    width: 32px;
                    height: 32px;
                    background: #374151;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                }
                .counter {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    min-width: 20px;
                    height: 20px;
                    padding: 0 6px;
                    border-radius: 10px;
                    font-family: 'Segoe UI', sans-serif;
                    font-weight: bold;
                    font-size: 11px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
            <div className="badge-container">
                <div className="icon-placeholder">🔔</div>
                <span
                    className="counter"
                    style={{ backgroundColor: bgColor }}
                >
                    {displayText}
                </span>
            </div>
            <div className="badge-container">
                <div className="icon-placeholder">✉️</div>
                <span
                    className="counter"
                    style={{ backgroundColor: bgColor }}
                >
                    {displayText}
                </span>
            </div>
        </div>
    );
}
