"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTheme } from 'next-themes';

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
    mounted: boolean;
}

const PreviewThemeContext = createContext<PreviewThemeContextValue | undefined>(undefined);

interface PreviewThemeProviderProps {
    children: ReactNode;
    defaultTheme?: PreviewTheme;
    syncWithSystem?: boolean;
}

export function PreviewThemeProvider({ children, defaultTheme, syncWithSystem = true }: PreviewThemeProviderProps) {
    // Get system theme from next-themes
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Determine effective theme based on sync setting and resolved theme
    const effectiveTheme: PreviewTheme = syncWithSystem && mounted && resolvedTheme
        ? (resolvedTheme === 'light' ? 'light' : 'dark')
        : (defaultTheme || 'dark');

    const [theme, setTheme] = useState<PreviewTheme>(effectiveTheme);

    // Mark as mounted after first render to handle SSR/hydration
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: hydration safety pattern
        setMounted(true);
    }, []);

    // Sync with system theme when it changes (after mount)
    useEffect(() => {
        if (mounted && syncWithSystem && resolvedTheme) {
            const newTheme = resolvedTheme === 'light' ? 'light' : 'dark';
            // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: syncing with external system theme
            setTheme(newTheme);
        }
    }, [resolvedTheme, syncWithSystem, mounted]);

    const colors = theme === 'dark' ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <PreviewThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme, mounted }}>
            {children}
        </PreviewThemeContext.Provider>
    );
}

export function usePreviewTheme() {
    const context = useContext(PreviewThemeContext);

    // Get system theme directly for components outside provider
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: hydration safety pattern
        setMounted(true);
    }, []);

    if (!context) {
        // Return theme matching system if available and mounted, otherwise dark
        const fallbackTheme = (mounted && resolvedTheme === 'light') ? 'light' : (mounted && resolvedTheme === 'dark') ? 'dark' : 'dark';
        return {
            theme: fallbackTheme,
            colors: fallbackTheme === 'dark' ? darkTheme : lightTheme,
            toggleTheme: () => { },
            setTheme: () => { },
            mounted,
        };
    }
    return context;
}

// Export themes for direct access
export { darkTheme, lightTheme };
