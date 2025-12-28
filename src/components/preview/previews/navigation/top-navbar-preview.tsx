"use client";

import { useState } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface TopNavbarPreviewProps {
    settings: SettingsValues;
}

export function TopNavbarPreview({ settings }: TopNavbarPreviewProps) {
    const { theme } = usePreviewTheme();
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const brandName = (settings.brandName as string) || 'AppName';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#0f172a' : '#ffffff');
    const brandColor = (settings.brandColor as string) || (theme === 'dark' ? '#ffffff' : '#111827');
    const iconColor = (settings.iconColor as string) || (theme === 'dark' ? '#94a3b8' : '#64748b');
    const hoverBg = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const searchBg = isSearchFocused
        ? (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)')
        : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)');
    const borderColor = isSearchFocused
        ? (theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)')
        : 'transparent';
    const inputPlaceholderColor = theme === 'dark' ? 'placeholder-[#64748b]' : 'placeholder-[#94a3b8]';
    const inputText = theme === 'dark' ? 'text-white' : 'text-gray-900';

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
                        backgroundColor: searchBg,
                        border: `1px solid ${borderColor}`,
                    }}
                >
                    <Search className="w-4 h-4" style={{ color: iconColor }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`flex-1 bg-transparent ml-2 text-sm ${inputText} ${inputPlaceholderColor} outline-none`}
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
