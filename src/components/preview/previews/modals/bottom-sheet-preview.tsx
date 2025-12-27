"use client";

import { useState } from 'react';
import { X, Minus } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface BottomSheetPreviewProps {
    settings: SettingsValues;
}

export function BottomSheetPreview({ settings }: BottomSheetPreviewProps) {
    const [isOpen, setIsOpen] = useState(true);

    const title = (settings.title as string) || 'Options';
    const backgroundColor = (settings.backgroundColor as string) || '#111111';
    const handleColor = (settings.handleColor as string) || '#404040';
    const borderRadius = (settings.borderRadius as number) || 20;

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
                            <h3 className="text-white font-semibold">{title}</h3>
                            <button
                                onClick={handleClose}
                                className="p-1 rounded-full hover:bg-white/10 transition-colors text-[#6b6b6b]"
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
                                    className="w-full text-left px-4 py-3 rounded-lg text-[#a1a1a1] hover:bg-white/5 transition-colors text-sm"
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
                    <p className="text-[#6b6b6b] text-sm">Reopening...</p>
                </div>
            )}
        </div>
    );
}
