"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "powerui-backgrounds-favorites";

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_KEY);
            if (stored) {
                // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: syncing with localStorage on mount
                setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error("Failed to load favorites:", error);
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: syncing with localStorage on mount
        setIsLoaded(true);
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
            } catch (error) {
                console.error("Failed to save favorites:", error);
            }
        }
    }, [favorites, isLoaded]);

    const addFavorite = useCallback((id: string) => {
        setFavorites((prev) => {
            if (prev.includes(id)) return prev;
            return [...prev, id];
        });
    }, []);

    const removeFavorite = useCallback((id: string) => {
        setFavorites((prev) => prev.filter((fav) => fav !== id));
    }, []);

    const toggleFavorite = useCallback((id: string) => {
        setFavorites((prev) => {
            if (prev.includes(id)) {
                return prev.filter((fav) => fav !== id);
            }
            return [...prev, id];
        });
    }, []);

    const isFavorite = useCallback((id: string) => {
        return favorites.includes(id);
    }, [favorites]);

    return {
        favorites,
        isLoaded,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
    };
}
