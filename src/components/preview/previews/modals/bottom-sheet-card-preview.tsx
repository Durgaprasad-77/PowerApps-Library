"use client";

import { SettingsValues } from '@/lib/settings-types';

interface BottomSheetCardPreviewProps {
    settings: SettingsValues;
}

export function BottomSheetCardPreview({ settings }: BottomSheetCardPreviewProps) {
    const backgroundColor = (settings.backgroundColor as string) || '#1a1a1a';
    const borderRadius = (settings.borderRadius as number) || 16;

    return (
        <div className="relative w-full max-w-[160px] h-20 bg-[#0a0a0a] rounded-lg overflow-hidden">
            {/* Simulated background content */}
            <div className="p-2 space-y-1">
                <div className="h-1.5 w-16 bg-[#252525] rounded" />
                <div className="h-1.5 w-20 bg-[#252525] rounded" />
            </div>
            {/* Bottom Sheet */}
            <div
                className="absolute bottom-0 left-0 right-0 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
                style={{
                    backgroundColor,
                    borderTopLeftRadius: `${borderRadius}px`,
                    borderTopRightRadius: `${borderRadius}px`,
                }}
            >
                {/* Handle */}
                <div className="flex justify-center py-1.5">
                    <div className="w-8 h-1 bg-white/30 rounded-full" />
                </div>
                {/* Content */}
                <div className="px-3 pb-2 space-y-1.5">
                    <div className="h-2 w-full bg-white/20 rounded" />
                    <div className="h-2 w-3/4 bg-white/20 rounded" />
                </div>
            </div>
        </div>
    );
}
