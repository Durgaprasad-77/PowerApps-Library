"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export type PreviewTheme = 'dark' | 'light';

export interface ThemeColors {
    bg: {
        primary: string;
        secondary: string;
        tertiary: string;
    };
    text: {
        primary: string;
        secondary: string;
        muted: string;
    };
    border: {
        default: string;
        subtle: string;
    };
    accent: string;
}

const darkTheme: ThemeColors = {
    bg: {
        primary: '#0a0a0a',
        secondary: '#111111',
        tertiary: '#1a1a1a',
    },
    text: {
        primary: '#ffffff',
        secondary: '#a1a1a1',
        muted: '#6b6b6b',
    },
    border: {
        default: '#262626',
        subtle: '#1a1a1a',
    },
    accent: '#6366f1',
};

const lightTheme: ThemeColors = {
    bg: {
        primary: '#ffffff',
        secondary: '#f5f5f5',
        tertiary: '#eeeeee',
    },
    text: {
        primary: '#0a0a0a',
        secondary: '#6b7280',
        muted: '#9ca3af',
    },
    border: {
        default: '#e5e7eb',
        subtle: '#f3f4f6',
    },
    accent: '#6366f1',
};

interface PreviewThemeContextValue {
    theme: PreviewTheme;
    colors: ThemeColors;
    toggleTheme: () => void;
    setTheme: (theme: PreviewTheme) => void;
}

const PreviewThemeContext = createContext<PreviewThemeContextValue | undefined>(undefined);

interface PreviewThemeProviderProps {
    children: ReactNode;
    defaultTheme?: PreviewTheme;
}

export function PreviewThemeProvider({ children, defaultTheme = 'dark' }: PreviewThemeProviderProps) {
    const [theme, setTheme] = useState<PreviewTheme>(defaultTheme);

    const colors = theme === 'dark' ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <PreviewThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
            {children}
        </PreviewThemeContext.Provider>
    );
}

export function usePreviewTheme() {
    const context = useContext(PreviewThemeContext);
    if (!context) {
        // Return default dark theme if not in provider
        return {
            theme: 'dark' as PreviewTheme,
            colors: darkTheme,
            toggleTheme: () => { },
            setTheme: () => { },
        };
    }
    return context;
}

// Export themes for direct access
export { darkTheme, lightTheme };
