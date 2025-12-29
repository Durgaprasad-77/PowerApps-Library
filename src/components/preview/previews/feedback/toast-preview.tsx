"use client";

import { useState, useEffect } from 'react';
import { X, Check, AlertTriangle, Info } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface ToastPreviewProps {
    settings: SettingsValues;
}

const typeIcons = {
    success: Check,
    error: X,
    warning: AlertTriangle,
    info: Info,
};

const typeColors = {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#eab308',
    info: '#3b82f6',
};

export function ToastPreview({ settings }: ToastPreviewProps) {
    const { theme } = usePreviewTheme();
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    const message = (settings.message as string) || 'Operation completed successfully!';
    const type = (settings.type as keyof typeof typeIcons) || 'success';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#111111' : '#ffffff');
    const textColor = (settings.textColor as string) || (theme === 'dark' ? '#ffffff' : '#111827');
    const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const helperColor = theme === 'dark' ? '#6b6b6b' : '#9ca3af';
    const borderRadius = (settings.borderRadius as number) || 12;
    const showIcon = settings.showIcon !== false;
    const dismissible = settings.dismissible !== false;


    const Icon = typeIcons[type] || Check;
    const iconColor = typeColors[type] || '#22c55e';

    // Auto-reset after animation
    useEffect(() => {
        if (!isVisible) {
            const timer = setTimeout(() => {
                setIsAnimating(true);
                setTimeout(() => {
                    setIsVisible(true);
                    setIsAnimating(false);
                }, 300);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    const handleDismiss = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="relative">
            {/* Toast notification */}
            <div
                className={`flex items-center gap-3 shadow-lg transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                style={{
                    backgroundColor,
                    borderRadius: `${borderRadius}px`,
                    padding: '16px 20px',
                    border: `1px solid ${borderColor}`,
                }}
            >
                {/* Icon */}
                {showIcon && (
                    <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${iconColor}20` }}
                    >
                        <Icon
                            className="w-4 h-4"
                            style={{ color: iconColor }}
                        />
                    </div>
                )}

                {/* Message */}
                <span
                    className="flex-1 text-sm font-medium"
                    style={{ color: textColor }}
                >
                    {message}
                </span>

                {/* Dismiss button */}
                {dismissible && (
                    <button
                        aria-label="Dismiss toast"
                        onClick={handleDismiss}
                        className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
                        style={{ color: textColor }}
                    >
                        <X className="w-4 h-4 opacity-60" />
                    </button>
                )}
            </div>

            {/* Helper text */}
            <p className="text-center text-xs mt-4" style={{ color: helperColor }}>
                Click ✕ to dismiss • Auto-reappears
            </p>
        </div>
    );
}
