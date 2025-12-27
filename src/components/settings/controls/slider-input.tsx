"use client";

import { useCallback } from 'react';

interface SliderInputProps {
    id: string;
    label: string;
    description?: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onChange: (value: number) => void;
}

export function SliderInput({
    id,
    label,
    description,
    value,
    min,
    max,
    step = 1,
    unit = '',
    onChange,
}: SliderInputProps) {
    const percentage = ((value - min) / (max - min)) * 100;

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    }, [onChange]);

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="block text-sm font-medium text-white">
                    {label}
                </label>
                <span className="text-sm text-[#a1a1a1] font-mono">
                    {value}{unit}
                </span>
            </div>
            {description && (
                <p className="text-xs text-[#6b6b6b]">{description}</p>
            )}

            <div className="relative pt-1">
                <input
                    type="range"
                    id={id}
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    className="w-full h-2 appearance-none bg-transparent cursor-pointer relative z-10"
                    style={{
                        background: 'transparent',
                    }}
                />
                {/* Custom track */}
                <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 rounded-full bg-[#262626] pointer-events-none">
                    <div
                        className="h-full rounded-full bg-white transition-all"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            {/* Min/Max labels */}
            <div className="flex justify-between text-xs text-[#6b6b6b]">
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
            </div>

            <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid #0a0a0a;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          transition: transform 0.15s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid #0a0a0a;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
        </div>
    );
}
