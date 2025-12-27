"use client";

import { AlertTriangle } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface ConfirmDialogCardPreviewProps {
    settings: SettingsValues;
}

export function ConfirmDialogCardPreview({ settings }: ConfirmDialogCardPreviewProps) {
    const backgroundColor = (settings.backgroundColor as string) || '#1a1a1a';
    const borderRadius = (settings.borderRadius as number) || 12;

    return (
        <div className="w-full max-w-[160px] overflow-hidden shadow-xl" style={{ backgroundColor, borderRadius: `${borderRadius}px` }}>
            {/* Icon + Title */}
            <div className="flex items-center gap-2 px-3 py-2.5">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div className="h-2.5 w-16 bg-white/80 rounded" />
            </div>
            {/* Message */}
            <div className="px-3 pb-2 space-y-1.5">
                <div className="h-2 w-full bg-white/20 rounded" />
                <div className="h-2 w-2/3 bg-white/20 rounded" />
            </div>
            {/* Buttons */}
            <div className="flex gap-2 px-3 py-2 border-t border-white/10">
                <div className="flex-1 h-5 bg-white/10 rounded" />
                <div className="flex-1 h-5 bg-red-500 rounded" />
            </div>
        </div>
    );
}
