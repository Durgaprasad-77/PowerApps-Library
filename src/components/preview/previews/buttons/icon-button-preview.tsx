"use client";

import { useState } from 'react';
import { Plus, Download, Share2, Settings } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface IconButtonPreviewProps {
    settings: SettingsValues;
}

const iconMap = {
    'plus': Plus,
    'download': Download,
    'share': Share2,
    'settings': Settings,
};

export function IconButtonPreview({ settings }: IconButtonPreviewProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const text = (settings.text as string) || 'Add Item';
    const iconName = (settings.icon as string) || 'plus';
    const backgroundColor = (settings.backgroundColor as string) || '#10b981';
    const textColor = (settings.textColor as string) || '#ffffff';
    const borderRadius = (settings.borderRadius as number) || 8;

    const Icon = iconMap[iconName as keyof typeof iconMap] || Plus;

    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            className="flex items-center gap-2 px-5 py-3 transition-all duration-200"
            style={{
                backgroundColor: isPressed
                    ? adjustBrightness(backgroundColor, -15)
                    : isHovered
                        ? adjustBrightness(backgroundColor, -8)
                        : backgroundColor,
                color: textColor,
                borderRadius: `${borderRadius}px`,
                fontWeight: 600,
                fontSize: '14px',
                border: 'none',
                transform: isHovered && !isPressed ? 'translateY(-1px)' : 'translateY(0)',
                boxShadow: isHovered && !isPressed
                    ? '0 4px 12px rgba(0,0,0,0.15)'
                    : '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <Icon className="w-5 h-5" />
            <span>{text}</span>
        </button>
    );
}

function adjustBrightness(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}
