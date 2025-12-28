'use client';

import { SettingsValues } from '@/lib/settings-types';

interface AvatarStatusPreviewProps {
    settings?: SettingsValues;
}

export function AvatarStatusPreview({ settings }: AvatarStatusPreviewProps) {
    const status = (settings?.status as string) || 'online';
    const size = (settings?.size as string) || 'medium';

    const statusColors: Record<string, string> = {
        online: '#22c55e',
        away: '#f59e0b',
        busy: '#ef4444',
        offline: '#6b7280',
    };

    const sizeMap: Record<string, { avatar: number; dot: number; offset: number; dotBorder: number }> = {
        small: { avatar: 32, dot: 10, offset: 22, dotBorder: 2 },
        medium: { avatar: 48, dot: 14, offset: 34, dotBorder: 2 },
        large: { avatar: 64, dot: 18, offset: 46, dotBorder: 3 },
    };


    const dotColor = statusColors[status] || statusColors.online;

    return (
        <div className="avatar-status-preview">
            <style jsx>{`
                .avatar-status-preview {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    padding: 40px;
                    gap: 32px;
                }
                .avatar-container {
                    position: relative;
                    display: inline-block;
                }
                .avatar {
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-family: 'Segoe UI', sans-serif;
                }
                .status-dot {
                    position: absolute;
                    border-radius: 50%;
                    border-style: solid;
                    border-color: white;
                }
            `}</style>

            {/* Show all sizes for demo */}
            {['small', 'medium', 'large'].map((sizeKey) => {
                const s = sizeMap[sizeKey];
                return (
                    <div key={sizeKey} className="avatar-container">
                        <div
                            className="avatar"
                            style={{
                                width: s.avatar,
                                height: s.avatar,
                                fontSize: s.avatar * 0.4,
                            }}
                        >
                            JD
                        </div>
                        <span
                            className="status-dot"
                            style={{
                                width: s.dot,
                                height: s.dot,
                                right: 0,
                                bottom: 0,
                                backgroundColor: dotColor,
                                borderWidth: s.dotBorder,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}
