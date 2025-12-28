"use client";

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface SearchInputPreviewProps {
    settings: SettingsValues;
}

export function SearchInputPreview({ settings }: SearchInputPreviewProps) {
    const { theme } = usePreviewTheme();
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const placeholder = (settings.placeholder as string) || 'Search...';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#111111' : '#ffffff');
    const borderColor = (settings.borderColor as string) || (theme === 'dark' ? '#262626' : '#e5e7eb');
    const focusBorderColor = (settings.focusBorderColor as string) || (theme === 'dark' ? '#404040' : '#9ca3af');
    const textColor = (settings.textColor as string) || (theme === 'dark' ? '#ffffff' : '#111827');
    const iconColor = (settings.iconColor as string) || (theme === 'dark' ? '#6b6b6b' : '#9ca3af');
    const borderRadius = (settings.borderRadius as number) || 24;

    const handleClear = () => {
        setValue('');
    };

    return (
        <div className="w-full max-w-sm">
            <div
                className="relative flex items-center transition-all duration-200"
                style={{
                    backgroundColor,
                    borderRadius: `${borderRadius}px`,
                    border: `1px solid ${isFocused ? focusBorderColor : borderColor}`,
                }}
            >
                <Search
                    className="absolute left-4 w-4 h-4 transition-colors"
                    style={{ color: isFocused ? textColor : iconColor }}
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full py-3 pl-11 pr-10 text-sm bg-transparent outline-none"
                    style={{ color: textColor }}
                />
                {value && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        style={{ color: iconColor }}
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
