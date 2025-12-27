"use client";

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface ConfirmDialogPreviewProps {
    settings: SettingsValues;
}

export function ConfirmDialogPreview({ settings }: ConfirmDialogPreviewProps) {
    const [isOpen, setIsOpen] = useState(true);

    const title = (settings.title as string) || 'Are you sure?';
    const message = (settings.message as string) || 'This action cannot be undone.';
    const confirmText = (settings.confirmText as string) || 'Delete';
    const cancelText = (settings.cancelText as string) || 'Cancel';
    const backgroundColor = (settings.backgroundColor as string) || '#ffffff';
    const confirmColor = (settings.confirmColor as string) || '#ef4444';
    const overlayOpacity = (settings.overlayOpacity as number) || 50;
    const borderRadius = (settings.borderRadius as number) || 12;

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => setIsOpen(true), 1000);
    };

    return (
        <div className="relative w-full h-[280px] overflow-hidden rounded-lg">
            {/* Background content (simulated) */}
            <div className="absolute inset-0 bg-[#f3f4f6] p-4">
                <div className="h-4 w-32 bg-[#e5e7eb] rounded mb-3" />
                <div className="h-3 w-48 bg-[#e5e7eb] rounded mb-2" />
                <div className="h-3 w-40 bg-[#e5e7eb] rounded" />
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <>
                    <div
                        className="absolute inset-0 transition-opacity cursor-pointer"
                        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity / 100})` }}
                        onClick={handleClose}
                    />

                    {/* Dialog */}
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                        style={{
                            backgroundColor,
                            borderRadius: `${borderRadius}px`,
                        }}
                    >
                        {/* Warning Icon */}
                        <div className="flex justify-center mb-4">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${confirmColor}15` }}
                            >
                                <AlertTriangle className="w-6 h-6" style={{ color: confirmColor }} />
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-[#111827] font-bold text-lg text-center mb-2">{title}</h3>
                        <p className="text-[#6b7280] text-sm text-center mb-5">{message}</p>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleClose}
                                className="flex-1 px-4 py-2.5 text-sm rounded-lg bg-[#f3f4f6] text-[#374151] font-medium hover:bg-[#e5e7eb] transition-colors"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={handleClose}
                                className="flex-1 px-4 py-2.5 text-sm rounded-lg text-white font-medium transition-colors"
                                style={{ backgroundColor: confirmColor }}
                            >
                                {confirmText}
                            </button>
                        </div>
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
