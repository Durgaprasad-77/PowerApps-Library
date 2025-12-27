"use client";

import { useState, useRef, useEffect } from 'react';
import { MONOCHROME_PRESETS, ACCENT_PRESETS } from '@/lib/settings-types';

interface ColorPickerProps {
    id: string;
    label: string;
    description?: string;
    value: string;
    presets?: string[];
    onChange: (value: string) => void;
}

export function ColorPicker({
    id,
    label,
    description,
    value,
    presets,
    onChange,
}: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [hexInput, setHexInput] = useState(value);
    const panelRef = useRef<HTMLDivElement>(null);

    // Close panel on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Sync hex input with value
    useEffect(() => {
        setHexInput(value);
    }, [value]);

    const handleHexChange = (hex: string) => {
        setHexInput(hex);
        // Validate hex color
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            onChange(hex);
        }
    };

    const handlePresetClick = (color: string) => {
        onChange(color);
        setHexInput(color);
    };

    const allPresets = presets || [...MONOCHROME_PRESETS, ...ACCENT_PRESETS];

    return (
        <div className="space-y-1.5 relative" ref={panelRef}>
            <label htmlFor={id} className="block text-sm font-medium text-white">
                {label}
            </label>
            {description && (
                <p className="text-xs text-[#6b6b6b]">{description}</p>
            )}

            {/* Color swatch + hex input */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 rounded-lg border border-[#262626] flex-shrink-0 transition-transform hover:scale-105"
                    style={{ backgroundColor: value }}
                    aria-label="Open color picker"
                />
                <input
                    type="text"
                    id={id}
                    value={hexInput}
                    onChange={(e) => handleHexChange(e.target.value)}
                    placeholder="#000000"
                    className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded-lg text-white text-sm font-mono focus:outline-none focus:border-[#404040] uppercase"
                    maxLength={7}
                />
            </div>

            {/* Color palette dropdown */}
            {isOpen && (
                <div className="absolute z-50 top-full left-0 mt-2 p-3 bg-[#111111] border border-[#262626] rounded-xl shadow-xl animate-fade-in">
                    {/* Monochrome row */}
                    <p className="text-xs text-[#6b6b6b] mb-2">Monochrome</p>
                    <div className="grid grid-cols-6 gap-1.5 mb-3">
                        {MONOCHROME_PRESETS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => handlePresetClick(color)}
                                className={`w-7 h-7 rounded-md border transition-transform hover:scale-110 ${value === color ? 'border-white ring-2 ring-white/20' : 'border-[#333333]'
                                    }`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                            />
                        ))}
                    </div>

                    {/* Accent row */}
                    <p className="text-xs text-[#6b6b6b] mb-2">Accent</p>
                    <div className="grid grid-cols-8 gap-1.5">
                        {ACCENT_PRESETS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => handlePresetClick(color)}
                                className={`w-7 h-7 rounded-md border transition-transform hover:scale-110 ${value === color ? 'border-white ring-2 ring-white/20' : 'border-[#333333]'
                                    }`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
