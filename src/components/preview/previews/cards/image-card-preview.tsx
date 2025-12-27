"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';

interface ImageCardPreviewProps {
    settings: SettingsValues;
}

export function ImageCardPreview({ settings }: ImageCardPreviewProps) {
    const [isHovered, setIsHovered] = useState(false);

    const title = (settings.title as string) || 'Beautiful Sunset';
    const subtitle = (settings.subtitle as string) || 'Photography';
    const overlayColor = (settings.overlayColor as string) || '#000000';
    const borderRadius = (settings.borderRadius as number) || 12;

    return (
        <div
            className="relative w-full max-w-[280px] h-[180px] overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ borderRadius: `${borderRadius}px` }}
        >
            {/* Placeholder image (gradient) */}
            <div
                className="absolute inset-0 transition-transform duration-500"
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
            />

            {/* Overlay */}
            <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    backgroundColor: overlayColor,
                    opacity: isHovered ? 0.6 : 0.3,
                }}
            />

            {/* Content */}
            <div
                className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300"
                style={{
                    transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                }}
            >
                <p className="text-white/70 text-xs uppercase tracking-wider mb-1">{subtitle}</p>
                <h3 className="text-white font-semibold text-lg">{title}</h3>
            </div>

            {/* View button (appears on hover) */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered
                        ? 'translate(-50%, -50%) scale(1)'
                        : 'translate(-50%, -50%) scale(0.8)',
                }}
            >
                <button className="px-4 py-2 bg-white/90 text-black text-sm font-medium rounded-lg hover:bg-white transition-colors">
                    View
                </button>
            </div>
        </div>
    );
}
