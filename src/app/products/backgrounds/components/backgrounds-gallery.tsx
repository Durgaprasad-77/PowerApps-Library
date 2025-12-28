"use client";

import { useState, useMemo, useCallback } from "react";
import { BackgroundCard } from "./background-card";
import { CategoryFilter } from "./category-filter";
import { BackgroundCustomizer } from "./background-customizer";
import { SearchBar } from "./search-bar";
import { DeviceToggle, DeviceMode } from "./device-toggle";
import { BackgroundPattern, getCategoryCounts, searchBackgrounds } from "../data";
import { defaultConfig } from "../lib/svg-to-yaml";
import { useFavorites } from "../hooks/use-favorites";

interface BackgroundsGalleryProps {
    initialBackgrounds: BackgroundPattern[];
}

export function BackgroundsGallery({ initialBackgrounds }: BackgroundsGalleryProps) {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPattern, setSelectedPattern] = useState<BackgroundPattern | null>(null);
    const [deviceMode, setDeviceMode] = useState<DeviceMode>("web");
    const { favorites, isFavorite, toggleFavorite, isLoaded } = useFavorites();

    const categories = useMemo(() => {
        // Recalculate counts based on passed data
        const counts: Record<string, number> = { all: initialBackgrounds.length };
        initialBackgrounds.forEach(b => {
            counts[b.category] = (counts[b.category] || 0) + 1;
        });

        const favCount = favorites.length;

        return [
            { id: "all", label: "All", count: counts.all },
            { id: "favorites", label: "Favorites", count: favCount },
            { id: "animated", label: "Animated", count: counts.animated || 0 },
            { id: "patterns", label: "Patterns", count: counts.patterns || 0 },
            { id: "gradients", label: "Gradients", count: counts.gradients || 0 },
            { id: "shapes", label: "Shapes", count: counts.shapes || 0 },
            { id: "textures", label: "Textures", count: counts.textures || 0 },
        ].filter(c => c.count > 0 || c.id === "all" || c.id === "favorites");
    }, [favorites.length, initialBackgrounds]);

    const filteredBackgrounds = useMemo(() => {
        let results = initialBackgrounds;

        // Apply category filter
        if (activeCategory === "favorites") {
            results = results.filter((b) => favorites.includes(b.id));
        } else if (activeCategory !== "all") {
            results = results.filter((b) => b.category === activeCategory);
        }

        // Apply search filter
        if (searchQuery.trim()) {
            // Re-implement search logic for client-side passed data to avoid dependency on static file functions
            const query = searchQuery.toLowerCase();
            results = results.filter(b =>
                b.name.toLowerCase().includes(query) ||
                b.description.toLowerCase().includes(query) ||
                b.tags.some(tag => tag.includes(query))
            );
        }

        return results;
    }, [activeCategory, searchQuery, favorites, initialBackgrounds]);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
    }, []);

    const handleCustomize = (pattern: BackgroundPattern) => {
        setSelectedPattern(pattern);
    };

    const handleCloseCustomizer = () => {
        setSelectedPattern(null);
    };

    if (!isLoaded) {
        return (
            <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            {/* Search and Device Toggle Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Search by name, tag, or description..."
                    />
                </div>
                <DeviceToggle mode={deviceMode} onModeChange={setDeviceMode} />
            </div>

            {/* Category Filter */}
            <div className="mb-8">
                <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Showing {filteredBackgrounds.length} background{filteredBackgrounds.length !== 1 ? "s" : ""} for {deviceMode === "web" ? "Web (16:9)" : "Mobile (9:16)"}
                {searchQuery && ` matching "${searchQuery}"`}
            </p>

            {/* Grid */}
            <div className={`grid gap-6 ${deviceMode === "mobile"
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}>
                {filteredBackgrounds.map((background) => (
                    <BackgroundCard
                        key={background.id}
                        pattern={background}
                        onCustomize={handleCustomize}
                        isFavorite={isFavorite(background.id)}
                        onToggleFavorite={toggleFavorite}
                        deviceMode={deviceMode}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredBackgrounds.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400">
                        {activeCategory === "favorites"
                            ? "No favorites yet. Click the ❤️ button on any background to add it here!"
                            : searchQuery
                                ? `No backgrounds found for "${searchQuery}"`
                                : "No backgrounds found in this category yet."
                        }
                    </p>
                </div>
            )}

            {/* Customizer Modal */}
            {selectedPattern && (
                <BackgroundCustomizer
                    pattern={selectedPattern}
                    isOpen={!!selectedPattern}
                    onClose={handleCloseCustomizer}
                    deviceMode={deviceMode}
                />
            )}
        </div>
    );
}




