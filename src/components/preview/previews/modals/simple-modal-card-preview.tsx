"use client";

import { X } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface SimpleModalCardPreviewProps {
    settings: SettingsValues;
}

export function SimpleModalCardPreview({ settings }: SimpleModalCardPreviewProps) {
    const backgroundColor = (settings.backgroundColor as string) || '#1a1a1a';
    const borderRadius = (settings.borderRadius as number) || 12;

    return (
        <div className="w-full max-w-[160px] overflow-hidden shadow-xl" style={{ backgroundColor, borderRadius: `${borderRadius}px` }}>
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                <div className="h-2.5 w-16 bg-white/80 rounded" />
                <X className="w-3 h-3 text-white/50" />
            </div>
            {/* Content */}
            <div className="px-3 py-2.5 space-y-1.5">
                <div className="h-2 w-full bg-white/20 rounded" />
                <div className="h-2 w-3/4 bg-white/20 rounded" />
            </div>
            {/* Footer */}
            <div className="flex gap-2 px-3 py-2 border-t border-white/10">
                <div className="flex-1 h-5 bg-white/10 rounded" />
                <div className="flex-1 h-5 bg-blue-500 rounded" />
            </div>
        </div>
    );
}
