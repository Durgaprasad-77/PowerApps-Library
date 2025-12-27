"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';

interface SegmentedTabsPreviewProps {
    settings: SettingsValues;
}

export function SegmentedTabsPreview({ settings }: SegmentedTabsPreviewProps) {
    const tabs = (settings.tabs as string[]) || ['Day', 'Week', 'Month'];
    const backgroundColor = (settings.backgroundColor as string) || '#e5e7eb';
    const activeSegmentColor = (settings.activeSegmentColor as string) || '#ffffff';
    const activeTextColor = (settings.activeTextColor as string) || '#111827';
    const inactiveTextColor = (settings.inactiveTextColor as string) || '#6b7280';
    const borderRadius = (settings.borderRadius as number) || 8;

    const [activeTab, setActiveTab] = useState(0);
    const [hoveredTab, setHoveredTab] = useState<number | null>(null);

    return (
        <div
            className="inline-flex p-0.5 gap-0.5"
            style={{
                backgroundColor,
                borderRadius: `${borderRadius}px`,
                height: '36px',
            }}
        >
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    onMouseEnter={() => setHoveredTab(index)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className="px-4 flex items-center justify-center transition-all duration-200"
                    style={{
                        backgroundColor: activeTab === index
                            ? activeSegmentColor
                            : (hoveredTab === index ? 'rgba(255,255,255,0.5)' : 'transparent'),
                        color: activeTab === index ? activeTextColor : inactiveTextColor,
                        fontWeight: 600,
                        fontSize: '13px',
                        borderRadius: `${borderRadius - 2}px`,
                        boxShadow: activeTab === index ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                    }}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
