"use client";

import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';
import { Menu, Bell, User } from 'lucide-react';

interface AppHeaderPreviewProps {
    settings: SettingsValues;
}

export function AppHeaderPreview({ settings }: AppHeaderPreviewProps) {
    const { theme } = usePreviewTheme();
    const title = (settings.title as string) || 'My Application';
    const showLogo = settings.showLogo !== false;

    const headerBg = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    const textColor = theme === 'dark' ? '#ffffff' : '#111827';
    const iconColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const hoverBg = theme === 'dark' ? '#252525' : '#f3f4f6';
    const avatarBg = theme === 'dark' ? '#374151' : '#e5e7eb';
    const borderColor = theme === 'dark' ? 'transparent' : '#e5e7eb';
    const borderStyle = theme === 'dark' ? 'none' : `1px solid ${borderColor}`;

    return (
        <div className="app-header-preview">
            <style jsx>{`
                .app-header-preview {
                    width: 100%;
                    padding: 8px;
                }
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: ${headerBg};
                    padding: 12px 20px;
                    border-radius: 8px;
                    border: ${borderStyle};
                    box-shadow: ${theme === 'dark' ? 'none' : '0 1px 3px rgba(0,0,0,0.1)'};
                }
                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .menu-btn {
                    background: transparent;
                    border: none;
                    color: #9ca3af;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .menu-btn:hover {
                    background: ${hoverBg};
                    color: ${textColor};
                }
                .logo {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: white;
                    font-size: 14px;
                }
                .title {
                    font-weight: 600;
                    color: ${textColor};
                    font-size: 16px;
                }
                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .icon-btn {
                    background: transparent;
                    border: none;
                    color: ${iconColor};
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .icon-btn:hover {
                    background: ${hoverBg};
                    color: ${textColor};
                }
                .notification-dot {
                    position: absolute;
                    top: 6px;
                    right: 6px;
                    width: 8px;
                    height: 8px;
                    background: #ef4444;
                    border-radius: 50%;
                }
                .avatar {
                    width: 32px;
                    height: 32px;
                    background: ${avatarBg};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>

            <div className="header">
                <div className="header-left">
                    <button className="menu-btn" title="Menu">
                        <Menu size={20} />
                    </button>
                    {showLogo && (
                        <div className="logo">A</div>
                    )}
                    <span className="title">{title}</span>
                </div>

                <div className="header-right">
                    <button className="icon-btn" title="Notifications">
                        <Bell size={20} />
                        <span className="notification-dot" />
                    </button>
                    <button className="icon-btn" title="Profile">
                        <div className="avatar">
                            <User size={16} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
