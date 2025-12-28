"use client";

import { useState, useRef, useEffect } from "react";

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (color: string) => void;
}

const presetColors = [
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#EF4444", // Red
    "#F97316", // Orange
    "#EAB308", // Yellow
    "#22C55E", // Green
    "#14B8A6", // Teal
    "#06B6D4", // Cyan
    "#6366F1", // Indigo
    "#FFFFFF", // White
    "#000000", // Black
];

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // Only update if it's a valid hex color
        if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
            onChange(newValue);
        }
    };

    const handleColorSelect = (color: string) => {
        setInputValue(color);
        onChange(color);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative">
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-2">
                {label}
            </label>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 rounded-lg border-2 border-[var(--border)] hover:border-blue-500 transition-colors shadow-sm"
                    style={{ backgroundColor: value }}
                    aria-label={`Select ${label} color`}
                />

                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm text-[var(--foreground)] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="#3B82F6"
                />
            </div>

            {/* Color Picker Dropdown */}
            {isOpen && (
                <div className="absolute z-50 mt-2 p-3 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl animate-fade-in">
                    {/* Preset Colors */}
                    <div className="grid grid-cols-6 gap-2 mb-3">
                        {presetColors.map((color) => (
                            <button
                                key={color}
                                onClick={() => handleColorSelect(color)}
                                className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${value === color
                                        ? "border-blue-500 ring-2 ring-blue-500/30"
                                        : "border-transparent hover:border-[var(--border)]"
                                    }`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                            />
                        ))}
                    </div>

                    {/* Native Color Picker */}
                    <div className="border-t border-[var(--border)] pt-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="color"
                                value={value}
                                onChange={(e) => handleColorSelect(e.target.value)}
                                className="w-8 h-8 rounded cursor-pointer"
                            />
                            <span className="text-xs text-[var(--foreground-muted)]">
                                Custom color
                            </span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}
