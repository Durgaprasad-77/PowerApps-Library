"use client";

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface AlertDialogPreviewProps {
    settings: SettingsValues;
}

export function AlertDialogPreview({ settings }: AlertDialogPreviewProps) {
    const { theme } = usePreviewTheme();
    const [isOpen, setIsOpen] = useState(true);

    const title = (settings.title as string) || 'Success!';
    const message = (settings.message as string) || 'Your changes have been saved.';
    const buttonText = (settings.buttonText as string) || 'OK';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#1f2937' : '#ffffff');
    const iconColor = (settings.iconColor as string) || '#22c55e';
    const textColor = theme === 'dark' ? '#ffffff' : '#111827';
    const mutedColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const backdropBg = theme === 'dark' ? '#111827' : '#f3f4f6';
    const skeletonBg = theme === 'dark' ? '#374151' : '#e5e7eb';
    const buttonColor = (settings.buttonColor as string) || '#3b82f6';
    const overlayOpacity = (settings.overlayOpacity as number) || 50;
    const borderRadius = (settings.borderRadius as number) || 12;

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => setIsOpen(true), 1000);
    };

    return (
        <div className="relative w-full h-[260px] overflow-hidden rounded-lg">
            {/* Background content (simulated) */}
            <div className="absolute inset-0 p-4" style={{ backgroundColor: backdropBg }}>
                <div className="h-4 w-32 rounded mb-3" style={{ backgroundColor: skeletonBg }} />
                <div className="h-3 w-48 rounded mb-2" style={{ backgroundColor: skeletonBg }} />
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <>
                    <div
                        className="absolute inset-0 transition-opacity cursor-pointer"
                        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity / 100})` }}
                        onClick={handleClose}
                    />

                    {/* Alert Box */}
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                        style={{
                            backgroundColor,
                            borderRadius: `${borderRadius}px`,
                        }}
                    >
                        {/* Success Icon */}
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="w-12 h-12" style={{ color: iconColor }} />
                        </div>

                        {/* Content */}
                        <h3 className="font-bold text-lg text-center mb-2" style={{ color: textColor }}>{title}</h3>
                        <p className="text-sm text-center mb-5" style={{ color: mutedColor }}>{message}</p>

                        {/* Action */}
                        <button
                            onClick={handleClose}
                            className="w-full px-4 py-2.5 text-sm rounded-lg text-white font-medium transition-colors hover:opacity-90"
                            style={{ backgroundColor: buttonColor }}
                        >
                            {buttonText}
                        </button>
                    </div>
                </>
            )}

            {!isOpen && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5">
                    <p className="text-sm" style={{ color: mutedColor }}>Reopening...</p>
                </div>
            )}
        </div>
    );
}
