"use client";

import { SettingsValues } from '@/lib/settings-types';

interface AuroraTextPreviewProps {
    settings: SettingsValues;
}

export function AuroraTextPreview({ settings }: AuroraTextPreviewProps) {
    const text = (settings.text as string) || 'beautiful';
    const color1 = (settings.color1 as string) || '#3b82f6';
    const color2 = (settings.color2 as string) || '#8b5cf6';
    const color3 = (settings.color3 as string) || '#06b6d4';

    return (
        <div className="flex items-center justify-center w-full h-full min-h-[120px]">
            <svg width="220" height="50" className="overflow-visible">
                <defs>
                    <linearGradient id="aurora-preview" x1="0%" y1="0%" x2="100%" y2="0%">
                        <animate
                            attributeName="x1"
                            values="0%;100%;0%"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="x2"
                            values="100%;200%;100%"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                        <stop offset="0%" stopColor={color1} />
                        <stop offset="50%" stopColor={color2} />
                        <stop offset="100%" stopColor={color3} />
                    </linearGradient>
                </defs>
                <text
                    x="0"
                    y="38"
                    fontFamily="Segoe UI, sans-serif"
                    fontSize="36"
                    fontWeight="700"
                    fontStyle="italic"
                    fill="url(#aurora-preview)"
                >
                    {text}
                </text>
            </svg>
        </div>
    );
}
