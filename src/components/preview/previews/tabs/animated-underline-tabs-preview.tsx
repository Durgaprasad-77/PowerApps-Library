"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';

interface AnimatedUnderlineTabsPreviewProps {
    settings: SettingsValues;
}

export function AnimatedUnderlineTabsPreview({ settings }: AnimatedUnderlineTabsPreviewProps) {
    const tabs = (settings.tabs as string[]) || ['Home', 'Profile', 'Settings', 'About'];
    const backgroundColor = (settings.backgroundColor as string) || '#ffffff';
    const activeTabColor = (settings.activeTabColor as string) || '#3b82f6';
    const inactiveTabColor = (settings.inactiveTabColor as string) || '#6b7280';
    const indicatorColor = (settings.indicatorColor as string) || '#3b82f6';
    const tabHeight = (settings.tabHeight as number) || 50;
    const borderRadius = (settings.borderRadius as number) || 0;

    const [activeTab, setActiveTab] = useState(0);
    const [hoveredTab, setHoveredTab] = useState<number | null>(null);

    const tabWidth = 100 / tabs.length;

    return (
        <div
            className="w-full relative overflow-hidden"
            style={{
                backgroundColor,
                borderRadius: `${borderRadius}px`,
                height: `${tabHeight}px`,
            }}
        >
            {/* Tabs */}
            <div className="flex h-full">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        onMouseEnter={() => setHoveredTab(index)}
                        onMouseLeave={() => setHoveredTab(null)}
                        className="flex-1 flex items-center justify-center transition-all duration-200 relative"
                        style={{
                            color: activeTab === index ? activeTabColor : inactiveTabColor,
                            fontWeight: activeTab === index ? 600 : 400,
                            fontSize: '14px',
                            backgroundColor: hoveredTab === index && activeTab !== index
                                ? 'rgba(0,0,0,0.03)'
                                : 'transparent',
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Animated underline indicator with ease-out animation */}
            <div
                className="absolute bottom-0 h-[3px] transition-all duration-300"
                style={{
                    backgroundColor: indicatorColor,
                    width: `${tabWidth}%`,
                    left: `${activeTab * tabWidth}%`,
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
        </div>
    );
}
