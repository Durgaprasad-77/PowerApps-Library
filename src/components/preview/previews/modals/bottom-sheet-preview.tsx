"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface BottomSheetPreviewProps {
    settings: SettingsValues;
}

export function BottomSheetPreview({ settings }: BottomSheetPreviewProps) {
    const { theme } = usePreviewTheme();
    const [isOpen, setIsOpen] = useState(true);

    const title = (settings.title as string) || 'Options';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#111111' : '#ffffff');
    const handleColor = (settings.handleColor as string) || (theme === 'dark' ? '#404040' : '#e5e7eb');
    const borderRadius = (settings.borderRadius as number) || 20;

    const textColor = theme === 'dark' ? '#ffffff' : '#111827';
    const optionColor = theme === 'dark' ? '#a1a1a1' : '#6b7280';
    const optionHoverBg = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const backdropBg = theme === 'dark' ? '#0a0a0a' : '#f3f4f6';
    const skeletonBg = theme === 'dark' ? '#1a1a1a' : '#e5e7eb';
    const closeIconColor = theme === 'dark' ? '#6b6b6b' : '#9ca3af';

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => setIsOpen(true), 1000);
    };

    return (
        <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
            {/* Background content (simulated) */}
            <div className="absolute inset-0 p-4" style={{ backgroundColor: backdropBg }}>
                <div className="h-4 w-32 rounded mb-3" style={{ backgroundColor: skeletonBg }} />
                <div className="h-3 w-48 rounded mb-2" style={{ backgroundColor: skeletonBg }} />
                <div className="h-3 w-40 rounded" style={{ backgroundColor: skeletonBg }} />
            </div>

            {/* Sheet Overlay */}
            {isOpen && (
                <>
                    <div
                        className="absolute inset-0 bg-black/40 transition-opacity cursor-pointer"
                        onClick={handleClose}
                    />

                    {/* Bottom Sheet */}
                    <div
                        className="absolute bottom-0 left-0 right-0 p-5 shadow-2xl animate-in slide-in-from-bottom duration-300"
                        style={{
                            backgroundColor,
                            borderTopLeftRadius: `${borderRadius}px`,
                            borderTopRightRadius: `${borderRadius}px`,
                        }}
                    >
                        {/* Drag handle */}
                        <div className="flex justify-center mb-4">
                            <div
                                className="w-10 h-1 rounded-full cursor-pointer"
                                style={{ backgroundColor: handleColor }}
                                onClick={handleClose}
                            />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold" style={{ color: textColor }}>{title}</h3>
                            <button
                                onClick={handleClose}
                                className="p-1 rounded-full hover:bg-white/10 dark:hover:bg-black/5 transition-colors"
                                style={{ color: closeIconColor }}
                                title="Close sheet"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="space-y-2">
                            {['Option 1', 'Option 2', 'Option 3'].map((option, i) => (
                                <button
                                    key={i}
                                    onClick={handleClose}
                                    className="w-full text-left px-4 py-3 rounded-lg transition-colors text-sm hover:bg-[--hover-bg]"
                                    style={{
                                        color: optionColor,
                                        '--hover-bg': optionHoverBg
                                    } as React.CSSProperties}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Re-open hint */}
            {!isOpen && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm" style={{ color: closeIconColor }}>Reopening...</p>
                </div>
            )}
        </div>
    );
}
