"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';

interface ContentCardPreviewProps {
    settings: SettingsValues;
}

export function ContentCardPreview({ settings }: ContentCardPreviewProps) {
    const [isHovered, setIsHovered] = useState(false);

    const title = (settings.title as string) || 'Card Title';
    const description = (settings.description as string) || 'This is a description of the card content. Click the button to learn more.';
    const buttonText = (settings.buttonText as string) || 'Learn More';
    const backgroundColor = (settings.backgroundColor as string) || '#111111';
    const borderColor = (settings.borderColor as string) || '#1a1a1a';
    const borderRadius = (settings.borderRadius as number) || 12;

    return (
        <div
            className="w-full max-w-sm transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor,
                borderRadius: `${borderRadius}px`,
                border: `1px solid ${borderColor}`,
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.1)',
            }}
        >
            <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-[#a1a1a1] text-sm mb-4 leading-relaxed">{description}</p>
                <button
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-white text-black hover:bg-white/90 transition-colors"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}
