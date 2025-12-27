"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';
import { Home, User, Settings, FileText, HelpCircle } from 'lucide-react';

interface SidebarNavPreviewProps {
    settings: SettingsValues;
}

const defaultItems = [
    { label: 'Home', icon: Home },
    { label: 'Profile', icon: User },
    { label: 'Documents', icon: FileText },
    { label: 'Settings', icon: Settings },
    { label: 'Help', icon: HelpCircle },
];

export function SidebarNavPreview({ settings }: SidebarNavPreviewProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const backgroundColor = (settings.backgroundColor as string) || '#0a0a0a';
    const activeColor = (settings.activeColor as string) || '#ffffff';
    const inactiveColor = (settings.inactiveColor as string) || '#6b6b6b';
    const hoverBackground = (settings.hoverBackground as string) || '#1a1a1a';
    const activeBackground = (settings.activeBackground as string) || '#1a1a1a';
    const width = (settings.width as number) || 220;
    const borderRadius = (settings.borderRadius as number) || 8;

    const items = (settings.items as string[])?.map((label, i) => ({
        label,
        icon: defaultItems[i % defaultItems.length].icon,
    })) || defaultItems;

    return (
        <div
            className="py-4 px-3 space-y-1"
            style={{
                backgroundColor,
                width: `${width}px`,
                borderRadius: `${borderRadius}px`,
                border: '1px solid #1a1a1a',
            }}
        >
            {items.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeIndex === index;
                const isHovered = hoveredIndex === index;

                return (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150"
                        style={{
                            backgroundColor: isActive ? activeBackground : isHovered ? hoverBackground : 'transparent',
                            color: isActive ? activeColor : inactiveColor,
                            fontWeight: isActive ? 500 : 400,
                        }}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
