"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';

interface AnimatedPillTabsPreviewProps {
    settings: SettingsValues;
}

export function AnimatedPillTabsPreview({ settings }: AnimatedPillTabsPreviewProps) {
    const tabs = (settings.tabs as string[]) || ['Photos', 'Music', 'Videos'];
    const backgroundColor = (settings.backgroundColor as string) || '#f3f4f6';
    const pillColor = (settings.pillColor as string) || '#3b82f6';
    const activeTextColor = (settings.activeTextColor as string) || '#ffffff';
    const inactiveTextColor = (settings.inactiveTextColor as string) || '#6b7280';
    const borderRadius = (settings.borderRadius as number) || 22;

    const [activeTab, setActiveTab] = useState(0);

    const tabWidth = 100 / tabs.length;

    return (
        <div
            className="w-full relative overflow-hidden p-1"
            style={{
                backgroundColor,
                borderRadius: `${borderRadius}px`,
                height: '44px',
            }}
        >
            {/* Animated pill background */}
            <div
                className="absolute top-1 bottom-1 transition-all duration-300 ease-out"
                style={{
                    backgroundColor: pillColor,
                    borderRadius: `${borderRadius - 4}px`,
                    width: `calc(${tabWidth}% - 8px)`,
                    left: `calc(${activeTab * tabWidth}% + 4px)`,
                }}
            />

            {/* Tabs */}
            <div className="relative flex h-full z-10">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className="flex-1 flex items-center justify-center transition-colors duration-200 relative"
                        style={{
                            color: activeTab === index ? activeTextColor : inactiveTextColor,
                            fontWeight: 600,
                            fontSize: '14px',
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}
