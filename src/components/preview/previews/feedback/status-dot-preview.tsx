'use client';

import { SettingsValues } from '@/lib/settings-types';

interface StatusDotPreviewProps {
    settings?: SettingsValues;
}

const statusColors: Record<string, string> = {
    online: '#22c55e',
    offline: '#6b7280',
    away: '#f59e0b',
    busy: '#ef4444',
};

export function StatusDotPreview({ settings }: StatusDotPreviewProps) {
    const status = (settings?.status as string) || 'online';
    const showLabel = (settings?.showLabel as boolean) ?? true;
    const dotColor = statusColors[status] || statusColors.online;
    const labelText = status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <div className="status-dot-preview">
            <style jsx>{`
                .status-dot-preview {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    padding: 40px;
                    gap: 32px;
                }
                .status-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .label {
                    font-family: 'Segoe UI', sans-serif;
                    font-size: 12px;
                    color: #6b7280;
                }
            `}</style>
            {['online', 'away', 'busy', 'offline'].map((s) => (
                <div key={s} className="status-item">
                    <span
                        className="dot"
                        style={{ backgroundColor: statusColors[s] }}
                    />
                    {showLabel && (
                        <span className="label">
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
