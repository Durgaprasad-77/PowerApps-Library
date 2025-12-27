"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';
import { Home, Search, Bell, User } from 'lucide-react';

interface BottomNavPreviewProps {
    settings: SettingsValues;
}

const defaultItems = [
    { label: 'Home', icon: Home },
    { label: 'Search', icon: Search },
    { label: 'Notifications', icon: Bell },
    { label: 'Profile', icon: User },
];

export function BottomNavPreview({ settings }: BottomNavPreviewProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const backgroundColor = (settings.backgroundColor as string) || '#0a0a0a';
    const activeColor = (settings.activeColor as string) || '#ffffff';
    const inactiveColor = (settings.inactiveColor as string) || '#6b6b6b';
    const showLabels = settings.showLabels !== false;
    const height = (settings.height as number) || 64;

    const items = (settings.items as string[])?.map((label, i) => ({
        label,
        icon: defaultItems[i % defaultItems.length].icon,
    })) || defaultItems;

    return (
        <div
            className="flex items-center justify-around"
            style={{
                backgroundColor,
                height: `${height}px`,
                borderTop: '1px solid #1a1a1a',
            }}
        >
            {items.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeIndex === index;

                return (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className="flex flex-col items-center gap-1 py-2 px-4 transition-all duration-200"
                        style={{
                            color: isActive ? activeColor : inactiveColor,
                            transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        }}
                    >
                        <Icon
                            className="w-5 h-5 transition-transform"
                            strokeWidth={isActive ? 2.5 : 2}
                        />
                        {showLabels && (
                            <span
                                className="text-[10px]"
                                style={{ fontWeight: isActive ? 600 : 400 }}
                            >
                                {item.label}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
