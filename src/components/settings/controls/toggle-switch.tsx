"use client";

interface ToggleSwitchProps {
    id: string;
    label: string;
    description?: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export function ToggleSwitch({
    id,
    label,
    description,
    value,
    onChange,
}: ToggleSwitchProps) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
                <label htmlFor={id} className="block text-sm font-medium text-white cursor-pointer">
                    {label}
                </label>
                {description && (
                    <p className="text-xs text-[#6b6b6b] mt-0.5">{description}</p>
                )}
            </div>

            <button
                type="button"
                id={id}
                role="switch"
                aria-checked={value ? "true" : "false"}
                onClick={() => onChange(!value)}
                className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer 
          rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#111111]
          ${value ? 'bg-white' : 'bg-[#404040]'}
        `}
            >
                <span className="sr-only">Toggle {label}</span>
                <span
                    aria-hidden="true"
                    className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full 
            shadow ring-0 transition duration-200 ease-in-out
            ${value ? 'translate-x-5 bg-[#0a0a0a]' : 'translate-x-0 bg-[#a1a1a1]'}
          `}
                />
            </button>
        </div>
    );
}
