"use client";

import { SettingsValues } from '@/lib/settings-types';
import { Home, Settings, User, Bell, Search, ChevronRight, Star, Heart, Mail, Calendar } from 'lucide-react';

interface ModernIconPreviewProps {
    settings: SettingsValues;
}

export function ModernIconPreview({ settings }: ModernIconPreviewProps) {

    const size = (settings.size as number) || 24;
    const color = (settings.color as string) || '#6366f1';

    const icons: Record<string, React.ReactNode> = {
        Home: <Home size={size} color={color} />,
        Settings: <Settings size={size} color={color} />,
        User: <User size={size} color={color} />,
        Bell: <Bell size={size} color={color} />,
        Search: <Search size={size} color={color} />,
        ChevronRight: <ChevronRight size={size} color={color} />,
        Star: <Star size={size} color={color} />,
        Heart: <Heart size={size} color={color} />,
        Mail: <Mail size={size} color={color} />,
        Calendar: <Calendar size={size} color={color} />,
    };

    return (
        <div className="modern-icon-preview">
            <style jsx>{`
                .modern-icon-preview {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                    padding: 24px;
                }
                .icon-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 16px;
                }
                .icon-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 12px;
                    background: #1a1a1a;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .icon-item:hover {
                    background: #252525;
                    transform: scale(1.05);
                }
                .icon-label {
                    font-size: 10px;
                    color: #6b7280;
                }
            `}</style>

            <div className="text-sm text-gray-400">Modern Fluent Icons</div>
            <div className="icon-grid">
                {Object.entries(icons).map(([name, icon]) => (
                    <div key={name} className="icon-item">
                        {icon}
                        <span className="icon-label">{name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
