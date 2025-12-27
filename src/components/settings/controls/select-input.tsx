"use client";

import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectInputProps {
    id: string;
    label: string;
    description?: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
}

export function SelectInput({
    id,
    label,
    description,
    value,
    options,
    onChange,
}: SelectInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleSelect = (optValue: string) => {
        onChange(optValue);
        setIsOpen(false);
    };

    return (
        <div className="space-y-1.5" ref={ref}>
            <label htmlFor={id} className="block text-sm font-medium text-white">
                {label}
            </label>
            {description && (
                <p className="text-xs text-[#6b6b6b]">{description}</p>
            )}

            <div className="relative">
                <button
                    type="button"
                    id={id}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
            w-full flex items-center justify-between gap-2 px-3 py-2
            bg-[#0a0a0a] border border-[#262626] rounded-lg
            text-white text-sm text-left
            focus:outline-none focus:border-[#404040] transition-colors
            ${isOpen ? 'border-[#404040]' : ''}
          `}
                >
                    <span>{selectedOption?.label || 'Select...'}</span>
                    <ChevronDown
                        className={`w-4 h-4 text-[#6b6b6b] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 py-1 bg-[#111111] border border-[#262626] rounded-lg shadow-xl animate-fade-in">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`
                  w-full px-3 py-2 text-left text-sm transition-colors
                  ${option.value === value
                                        ? 'bg-white/10 text-white'
                                        : 'text-[#a1a1a1] hover:bg-white/5 hover:text-white'
                                    }
                `}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
