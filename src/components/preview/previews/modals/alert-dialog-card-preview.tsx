"use client";

import { CheckCircle } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface AlertDialogCardPreviewProps {
    settings: SettingsValues;
}

export function AlertDialogCardPreview({ settings }: AlertDialogCardPreviewProps) {
    const backgroundColor = (settings.backgroundColor as string) || '#1a1a1a';
    const borderRadius = (settings.borderRadius as number) || 12;

    return (
        <div className="w-full max-w-[160px] overflow-hidden shadow-xl text-center" style={{ backgroundColor, borderRadius: `${borderRadius}px` }}>
            {/* Icon */}
            <div className="flex justify-center pt-3 pb-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
            </div>
            {/* Title + Message */}
            <div className="px-3 pb-2 space-y-1.5">
                <div className="h-2.5 w-16 bg-white/80 rounded mx-auto" />
                <div className="h-2 w-24 bg-white/20 rounded mx-auto" />
            </div>
            {/* Button */}
            <div className="px-3 py-2 border-t border-white/10">
                <div className="h-5 bg-green-500 rounded" />
            </div>
        </div>
    );
}
