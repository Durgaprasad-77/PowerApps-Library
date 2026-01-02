"use client";

import { useState, useCallback, useEffect, useMemo } from 'react';
import { ComponentSettingsSchema, SettingsValues, getDefaultSettings } from '@/lib/settings-types';

interface UseComponentSettingsReturn {
    settings: SettingsValues;
    updateSetting: (id: string, value: string | number | boolean | string[]) => void;
    resetToDefaults: () => void;
    hasChanges: boolean;
}

export function useComponentSettings(
    schema: ComponentSettingsSchema
): UseComponentSettingsReturn {
    const storageKey = `component-settings-${schema.componentId}`;
    const defaults = getDefaultSettings(schema);

    // Always initialize with defaults to prevent hydration mismatch
    const [settings, setSettings] = useState<SettingsValues>(defaults);
    const [isHydrated, setIsHydrated] = useState(false);

    // Hydrate from localStorage after mount to prevent server/client mismatch
    useEffect(() => {
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Merge with defaults to handle new fields
                setSettings(prev => ({ ...prev, ...parsed }));
            }
        } catch {
            // Ignore parse errors
        }
        setIsHydrated(true);
    }, [storageKey]);


    const hasChanges = useMemo(() => {
        return Object.keys(settings).some(key => {
            const current = settings[key];
            const defaultVal = defaults[key];

            if (Array.isArray(current) && Array.isArray(defaultVal)) {
                return current.length !== defaultVal.length ||
                    current.some((v, i) => v !== defaultVal[i]);
            }
            return current !== defaultVal;
        });
    }, [settings, defaults]);

    // Persist settings to localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem(storageKey, JSON.stringify(settings));
        } catch {
            // Ignore storage errors
        }
    }, [settings, storageKey]);



    const updateSetting = useCallback((
        id: string,
        value: string | number | boolean | string[]
    ) => {
        setSettings(prev => ({
            ...prev,
            [id]: value,
        }));
    }, []);

    const resetToDefaults = useCallback(() => {
        setSettings(defaults);
        if (typeof window !== 'undefined') {
            localStorage.removeItem(storageKey);
        }
    }, [defaults, storageKey]);

    return {
        settings,
        updateSetting,
        resetToDefaults,
        hasChanges,
    };
}
