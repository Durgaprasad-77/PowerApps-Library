"use client";

interface TextInputProps {
    id: string;
    label: string;
    description?: string;
    value: string;
    placeholder?: string;
    maxLength?: number;
    multiline?: boolean;
    onChange: (value: string) => void;
}

export function TextInput({
    id,
    label,
    description,
    value,
    placeholder,
    maxLength,
    multiline = false,
    onChange,
}: TextInputProps) {
    const inputClasses = `
    w-full px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded-lg
    text-white text-sm placeholder-[#6b6b6b]
    focus:outline-none focus:border-[#404040] transition-colors
  `;

    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="block text-sm font-medium text-white">
                {label}
            </label>
            {description && (
                <p className="text-xs text-[#6b6b6b]">{description}</p>
            )}
            {multiline ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    rows={3}
                    className={`${inputClasses} resize-none`}
                />
            ) : (
                <input
                    type="text"
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={inputClasses}
                />
            )}
            {maxLength && (
                <p className="text-xs text-[#6b6b6b] text-right">
                    {value.length}/{maxLength}
                </p>
            )}
        </div>
    );
}
