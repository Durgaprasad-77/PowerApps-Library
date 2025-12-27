"use client";

import { useState } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface TopNavbarPreviewProps {
    settings: SettingsValues;
}

export function TopNavbarPreview({ settings }: TopNavbarPreviewProps) {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const brandName = (settings.brandName as string) || 'AppName';
    const backgroundColor = (settings.backgroundColor as string) || '#0f172a';
    const brandColor = (settings.brandColor as string) || '#ffffff';
    const iconColor = (settings.iconColor as string) || '#94a3b8';

    return (
        <header
            className="w-full flex items-center justify-between px-4 py-2"
            style={{ backgroundColor }}
        >
            {/* Left: Menu + Brand */}
            <div className="flex items-center gap-3">
                <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" title="Menu">
                    <Menu className="w-5 h-5" style={{ color: iconColor }} />
                </button>
                <span className="font-bold text-base" style={{ color: brandColor }}>
                    {brandName}
                </span>
            </div>

            {/* Center: Search (hidden on small) */}
            <div className="hidden sm:flex flex-1 max-w-xs mx-4">
                <div
                    className="flex items-center w-full px-3 py-1.5 rounded-lg transition-all"
                    style={{
                        backgroundColor: isSearchFocused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${isSearchFocused ? 'rgba(255,255,255,0.2)' : 'transparent'}`,
                    }}
                >
                    <Search className="w-4 h-4" style={{ color: iconColor }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 bg-transparent ml-2 text-sm text-white placeholder-[#64748b] outline-none"
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                </div>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors relative" title="Notifications">
                    <Bell className="w-5 h-5" style={{ color: iconColor }} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors" title="Profile">
                    <User className="w-5 h-5" style={{ color: iconColor }} />
                </button>
            </div>
        </header>
    );
}
