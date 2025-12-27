"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface TabBarPreviewProps {
    settings: SettingsValues;
}

export function TabBarPreview({ settings }: TabBarPreviewProps) {
    const { colors } = usePreviewTheme();

    const tabs = (settings.tabs as string[]) || ['Home', 'Profile', 'Settings'];
    // Use theme colors as defaults, settings override if specified
    const backgroundColor = (settings.backgroundColor as string) || colors.bg.secondary;
    const activeTabColor = (settings.activeTabColor as string) || colors.text.primary;
    const inactiveTabColor = (settings.inactiveTabColor as string) || colors.text.muted;
    const indicatorColor = (settings.indicatorColor as string) || colors.text.primary;
    const tabHeight = (settings.tabHeight as number) || 48;
    const borderRadius = (settings.borderRadius as number) || 0;
    const showIndicator = settings.showIndicator !== false;
    const selectedIndex = (settings.selectedIndex as number) || 1;

    const [activeTab, setActiveTab] = useState(selectedIndex - 1);
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
                        className="flex-1 flex items-center justify-center transition-colors duration-200 relative"
                        style={{
                            color: activeTab === index ? activeTabColor : inactiveTabColor,
                            fontWeight: activeTab === index ? 600 : 400,
                            fontSize: '14px',
                            backgroundColor: hoveredTab === index && activeTab !== index
                                ? `${colors.text.primary}08`
                                : 'transparent',
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Animated indicator */}
            {showIndicator && (
                <div
                    className="absolute bottom-0 h-[3px] transition-all duration-300 ease-out"
                    style={{
                        backgroundColor: indicatorColor,
                        width: `${tabWidth}%`,
                        left: `${activeTab * tabWidth}%`,
                    }}
                />
            )}
        </div>
    );
}

