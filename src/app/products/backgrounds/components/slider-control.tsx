"use client";

interface SliderControlProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
    onChange: (value: number) => void;
}

export function SliderControl({
    label,
    value,
    min,
    max,
    step,
    unit = "",
    onChange,
}: SliderControlProps) {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[var(--foreground-muted)]">
                    {label}
                </label>
                <span className="text-sm font-mono text-[var(--foreground)]">
                    {value.toFixed(2)}{unit}
                </span>
            </div>

            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[var(--accent)] rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-blue-500
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:shadow-blue-500/30
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-webkit-slider-thumb]:hover:scale-110
                        [&::-moz-range-thumb]:w-4
                        [&::-moz-range-thumb]:h-4
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-blue-500
                        [&::-moz-range-thumb]:border-none
                        [&::-moz-range-thumb]:cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, var(--accent) ${percentage}%, var(--accent) 100%)`,
                    }}
                />
            </div>
        </div>
    );
}
