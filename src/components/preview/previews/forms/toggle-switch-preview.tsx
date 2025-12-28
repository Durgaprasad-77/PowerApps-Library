"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface ToggleSwitchPreviewProps {
    settings: SettingsValues;
}

export function ToggleSwitchPreview({ settings }: ToggleSwitchPreviewProps) {
    const { theme } = usePreviewTheme();
    const [isOn, setIsOn] = useState(false);

    const activeColor = (settings.activeColor as string) || '#3b82f6';
    const inactiveColor = (settings.inactiveColor as string) || (theme === 'dark' ? '#4b5563' : '#d1d5db');
    const knobColor = (settings.knobColor as string) || '#ffffff';
    const labelColor = theme === 'dark' ? '#d1d5db' : '#374151';
    const label = (settings.label as string) || 'Enable notifications';

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={() => setIsOn(!isOn)}
                title={isOn ? 'Toggle off' : 'Toggle on'}
                className="relative inline-flex h-7 w-[52px] items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                style={{ backgroundColor: isOn ? activeColor : inactiveColor }}
            >
                <span
                    className="inline-block h-6 w-6 transform rounded-full transition-transform duration-200 shadow-md"
                    style={{
                        backgroundColor: knobColor,
                        transform: isOn ? 'translateX(26px)' : 'translateX(2px)',
                    }}
                />
            </button>
            <span className="text-sm font-medium" style={{ color: labelColor }}>{label}</span>
        </div>
    );
}
