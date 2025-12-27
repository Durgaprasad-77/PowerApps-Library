"use client";

import { SettingsValues } from '@/lib/settings-types';
import { Menu, Bell, User } from 'lucide-react';

interface AppHeaderPreviewProps {
    settings: SettingsValues;
}

export function AppHeaderPreview({ settings }: AppHeaderPreviewProps) {
    const title = (settings.title as string) || 'My Application';
    const showLogo = settings.showLogo !== false;

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
                    background: #1a1a1a;
                    padding: 12px 20px;
                    border-radius: 8px;
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
                    background: #252525;
                    color: white;
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
                    color: white;
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
                    color: #9ca3af;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .icon-btn:hover {
                    background: #252525;
                    color: white;
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
                    background: #374151;
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
