"use client";

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface DropdownPreviewProps {
    settings: SettingsValues;
}

export function DropdownPreview({ settings }: DropdownPreviewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const label = (settings.label as string) || 'Select Option';
    const options = (settings.options as string[]) || ['Option 1', 'Option 2', 'Option 3'];
    const backgroundColor = (settings.backgroundColor as string) || '#111111';
    const borderColor = (settings.borderColor as string) || '#262626';
    const textColor = (settings.textColor as string) || '#ffffff';
    const borderRadius = (settings.borderRadius as number) || 8;

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        setIsOpen(false);
    };

    return (
        <div className="w-full max-w-sm">
            <label className="block text-sm font-medium mb-2 text-[#a1a1a1]">
                {label}
            </label>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm transition-all"
                    style={{
                        backgroundColor,
                        borderRadius: `${borderRadius}px`,
                        border: `1px solid ${isOpen ? textColor : borderColor}`,
                        color: textColor,
                    }}
                >
                    <span>{options[selectedIndex]}</span>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {isOpen && (
                    <div
                        className="absolute top-full left-0 right-0 mt-1 py-1 z-10 shadow-lg"
                        style={{
                            backgroundColor,
                            borderRadius: `${borderRadius}px`,
                            border: `1px solid ${borderColor}`,
                        }}
                    >
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelect(index)}
                                className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                                style={{ color: textColor }}
                            >
                                <span>{option}</span>
                                {selectedIndex === index && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
