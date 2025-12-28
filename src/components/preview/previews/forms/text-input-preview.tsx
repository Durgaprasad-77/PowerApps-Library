"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface TextInputPreviewProps {
    settings: SettingsValues;
}

export function TextInputPreview({ settings }: TextInputPreviewProps) {
    const { theme } = usePreviewTheme();
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const label = (settings.label as string) || 'Email Address';
    const placeholder = (settings.placeholder as string) || 'Enter your email';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#0a0a0a' : '#ffffff');
    const borderColor = (settings.borderColor as string) || (theme === 'dark' ? '#262626' : '#e5e5e5');
    const focusBorderColor = (settings.focusBorderColor as string) || '#3b82f6';
    const textColor = (settings.textColor as string) || (theme === 'dark' ? '#ffffff' : '#0a0a0a');
    const labelColor = (settings.labelColor as string) || (theme === 'dark' ? '#a1a1a1' : '#374151');
    const helperColor = theme === 'dark' ? '#737373' : '#6b6b6b';
    const borderRadius = (settings.borderRadius as number) || 8;

    return (
        <div className="w-full max-w-sm">
            <label
                className="block text-sm font-medium mb-2"
                style={{ color: labelColor }}
            >
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                style={{
                    backgroundColor,
                    borderRadius: `${borderRadius}px`,
                    border: `1px solid ${isFocused ? focusBorderColor : borderColor}`,
                    color: textColor,
                    boxShadow: isFocused ? `0 0 0 2px ${focusBorderColor}20` : 'none',
                }}
            />
            <p className="text-xs mt-2" style={{ color: helperColor }}>Click to focus and type</p>
        </div>
    );
}
