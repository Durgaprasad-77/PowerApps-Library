"use client";

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface ConfirmDialogPreviewProps {
    settings: SettingsValues;
}

export function ConfirmDialogPreview({ settings }: ConfirmDialogPreviewProps) {
    const { theme } = usePreviewTheme();
    const [isOpen, setIsOpen] = useState(true);

    const title = (settings.title as string) || 'Are you sure?';
    const message = (settings.message as string) || 'This action cannot be undone.';
    const confirmText = (settings.confirmText as string) || 'Delete';
    const cancelText = (settings.cancelText as string) || 'Cancel';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#1f2937' : '#ffffff');
    const confirmColor = (settings.confirmColor as string) || '#ef4444';
    const textColor = theme === 'dark' ? '#ffffff' : '#111827';
    const mutedColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const backdropBg = theme === 'dark' ? '#111827' : '#f3f4f6';
    const skeletonBg = theme === 'dark' ? '#374151' : '#e5e7eb';
    const cancelBg = theme === 'dark' ? '#374151' : '#f3f4f6';
    const cancelTextCol = theme === 'dark' ? '#ffffff' : '#374151';
    const overlayOpacity = (settings.overlayOpacity as number) || 50;
    const borderRadius = (settings.borderRadius as number) || 12;

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => setIsOpen(true), 1000);
    };

    return (
        <div className="relative w-full h-[280px] overflow-hidden rounded-lg">
            {/* Background content (simulated) */}
            <div className="absolute inset-0 p-4" style={{ backgroundColor: backdropBg }}>
                <div className="h-4 w-32 rounded mb-3" style={{ backgroundColor: skeletonBg }} />
                <div className="h-3 w-48 rounded mb-2" style={{ backgroundColor: skeletonBg }} />
                <div className="h-3 w-40 rounded" style={{ backgroundColor: skeletonBg }} />
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
                        <h3 className="font-bold text-lg text-center mb-2" style={{ color: textColor }}>{title}</h3>
                        <p className="text-sm text-center mb-5" style={{ color: mutedColor }}>{message}</p>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleClose}
                                className="flex-1 px-4 py-2.5 text-sm rounded-lg font-medium hover:opacity-90 transition-colors"
                                style={{ backgroundColor: cancelBg, color: cancelTextCol }}
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
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5">
                    <p className="text-sm" style={{ color: mutedColor }}>Reopening...</p>
                </div>
            )}
        </div>
    );
}
