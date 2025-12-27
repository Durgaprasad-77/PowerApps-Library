"use client";

import { SettingsValues } from '@/lib/settings-types';

interface SpinnerPreviewProps {
    settings: SettingsValues;
}

export function SpinnerPreview({ settings }: SpinnerPreviewProps) {
    const size = (settings.size as number) || 40;
    const color = (settings.color as string) || '#ffffff';
    const trackColor = (settings.trackColor as string) || '#262626';
    const strokeWidth = (settings.strokeWidth as number) || 4;
    const speed = (settings.speed as number) || 1000;

    return (
        <div className="flex flex-col items-center gap-4">
            <svg
                width={size}
                height={size}
                viewBox="0 0 50 50"
                style={{
                    animation: `spin ${speed}ms linear infinite`,
                }}
            >
                {/* Track */}
                <circle
                    cx="25"
                    cy="25"
                    r={25 - strokeWidth / 2}
                    fill="none"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                />
                {/* Spinner */}
                <circle
                    cx="25"
                    cy="25"
                    r={25 - strokeWidth / 2}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={`${(25 - strokeWidth / 2) * 2 * Math.PI * 0.25} ${(25 - strokeWidth / 2) * 2 * Math.PI * 0.75}`}
                    style={{
                        transformOrigin: 'center',
                    }}
                />
            </svg>

            <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

            <p className="text-xs text-[#6b6b6b]">Loading...</p>
        </div>
    );
}
