"use client";

import { Info } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface InfoCardPreviewProps {
    settings: SettingsValues;
}

export function InfoCardPreview({ settings }: InfoCardPreviewProps) {
    const title = (settings.title as string) || 'Did you know?';
    const description = (settings.description as string) || 'This is an informational card that can display helpful tips or important notices.';
    const backgroundColor = (settings.backgroundColor as string) || '#ffffff';
    const iconBackgroundColor = (settings.iconBackgroundColor as string) || '#3b82f6';
    const borderRadius = (settings.borderRadius as number) || 12;

    return (
        <div
            className="w-full max-w-[350px] p-5 flex gap-4 shadow-md"
            style={{
                backgroundColor,
                borderRadius: `${borderRadius}px`,
                border: '1px solid #e5e7eb',
            }}
        >
            {/* Icon */}
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${iconBackgroundColor}15` }}
            >
                <Info className="w-6 h-6" style={{ color: iconBackgroundColor }} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h4 className="text-[#111827] font-semibold text-base mb-1">{title}</h4>
                <p className="text-[#6b7280] text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
