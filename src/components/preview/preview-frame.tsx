"use client";

import { ReactNode } from 'react';
import { Sun, Moon } from 'lucide-react';
import { PreviewThemeProvider, usePreviewTheme } from '@/contexts/preview-theme-context';

interface PreviewFrameProps {
    children: ReactNode;
    className?: string;
}

function PreviewFrameContent({ children, className = '' }: PreviewFrameProps) {
    const { theme, colors, toggleTheme } = usePreviewTheme();

    return (
        <div
            className={`relative h-full min-h-[300px] flex items-center justify-center transition-colors duration-300 ${className}`}
            style={{ backgroundColor: colors.bg.primary }}
        >
            {/* Theme toggle button */}
            <button
                onClick={toggleTheme}
                className="absolute top-3 right-3 z-20 p-2 rounded-lg transition-all hover:scale-110"
                style={{
                    backgroundColor: colors.bg.tertiary,
                    color: colors.text.secondary,
                }}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme === 'dark' ? (
                    <Sun className="w-4 h-4" />
                ) : (
                    <Moon className="w-4 h-4" />
                )}
            </button>

            {/* Theme indicator badge */}
            <div
                className="absolute top-3 left-3 z-20 px-2 py-1 rounded text-xs font-medium"
                style={{
                    backgroundColor: colors.bg.tertiary,
                    color: colors.text.muted,
                }}
            >
                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </div>

            {/* Subtle grid pattern background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, ${colors.text.primary} 1px, transparent 1px),
                        linear-gradient(to bottom, ${colors.text.primary} 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                }}
            />

            {/* Preview content */}
            <div className="relative z-10 w-full max-w-md px-4">
                {children}
            </div>

            {/* Bottom hint */}
            <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="text-xs" style={{ color: colors.text.muted }}>
                    Interactive Preview • Hover and click to test
                </span>
            </div>
        </div>
    );
}

export function PreviewFrame({ children, className = '' }: PreviewFrameProps) {
    return (
        <PreviewThemeProvider>
            <PreviewFrameContent className={className}>
                {children}
            </PreviewFrameContent>
        </PreviewThemeProvider>
    );
}

// Re-export theme hook for use in preview components
export { usePreviewTheme } from '@/contexts/preview-theme-context';
