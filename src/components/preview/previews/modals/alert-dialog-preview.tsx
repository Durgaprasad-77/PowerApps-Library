"use client";

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface AlertDialogPreviewProps {
    settings: SettingsValues;
}

export function AlertDialogPreview({ settings }: AlertDialogPreviewProps) {
    const [isOpen, setIsOpen] = useState(true);

    const title = (settings.title as string) || 'Success!';
    const message = (settings.message as string) || 'Your changes have been saved.';
    const buttonText = (settings.buttonText as string) || 'OK';
    const backgroundColor = (settings.backgroundColor as string) || '#ffffff';
    const iconColor = (settings.iconColor as string) || '#22c55e';
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
            <div className="absolute inset-0 bg-[#f3f4f6] p-4">
                <div className="h-4 w-32 bg-[#e5e7eb] rounded mb-3" />
                <div className="h-3 w-48 bg-[#e5e7eb] rounded mb-2" />
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
                        <h3 className="text-[#111827] font-bold text-lg text-center mb-2">{title}</h3>
                        <p className="text-[#6b7280] text-sm text-center mb-5">{message}</p>

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
                <div className="absolute inset-0 flex items-center justify-center bg-[#f3f4f6]/80">
                    <p className="text-[#6b7280] text-sm">Reopening...</p>
                </div>
            )}
        </div>
    );
}
