"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface ModalDialogPreviewProps {
    settings: SettingsValues;
}

export function ModalDialogPreview({ settings }: ModalDialogPreviewProps) {
    const [isOpen, setIsOpen] = useState(true);

    const title = (settings.title as string) || 'Confirm Action';
    const message = (settings.message as string) || 'Are you sure you want to proceed with this action?';
    const confirmText = (settings.confirmText as string) || 'Confirm';
    const cancelText = (settings.cancelText as string) || 'Cancel';
    const backgroundColor = (settings.backgroundColor as string) || '#111111';
    const overlayOpacity = (settings.overlayOpacity as number) || 50;
    const borderRadius = (settings.borderRadius as number) || 16;

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => setIsOpen(true), 1000);
    };

    return (
        <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
            {/* Background content (simulated) */}
            <div className="absolute inset-0 bg-[#0a0a0a] p-4">
                <div className="h-4 w-32 bg-[#1a1a1a] rounded mb-3" />
                <div className="h-3 w-48 bg-[#1a1a1a] rounded mb-2" />
                <div className="h-3 w-40 bg-[#1a1a1a] rounded" />
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <>
                    <div
                        className="absolute inset-0 transition-opacity cursor-pointer"
                        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity / 100})` }}
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                        style={{
                            backgroundColor,
                            borderRadius: `${borderRadius}px`,
                            border: '1px solid #262626',
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10 transition-colors text-[#6b6b6b]"
                            title="Close modal"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Content */}
                        <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                        <p className="text-[#a1a1a1] text-sm mb-5">{message}</p>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleClose}
                                className="flex-1 px-4 py-2 text-sm rounded-lg border border-[#262626] text-[#a1a1a1] hover:bg-white/5 transition-colors"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={handleClose}
                                className="flex-1 px-4 py-2 text-sm rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors"
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Re-open hint */}
            {!isOpen && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-[#6b6b6b] text-sm">Reopening...</p>
                </div>
            )}
        </div>
    );
}
