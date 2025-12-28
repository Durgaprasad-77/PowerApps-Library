"use client";

import { useState, useMemo } from "react";
import { AnimatedIconCard } from "./animated-icon-card";
import { AnimatedIconCustomizer } from "./animated-icon-customizer";
import { AnimatedIcon, ANIMATED_ICONS, searchAnimatedIcons, getAnimatedIconCategories } from "../data/animated-icons";
import { Search } from "lucide-react";

export function AnimatedIconsGallery() {
    const [selectedIcon, setSelectedIcon] = useState<AnimatedIcon | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const categories = useMemo(() => {
        return [
            { id: 'all', label: 'All', count: ANIMATED_ICONS.length },
            ...getAnimatedIconCategories(),
        ];
    }, []);

    const filteredIcons = useMemo(() => {
        let icons = ANIMATED_ICONS;

        // Filter by category
        if (activeCategory !== 'all') {
            icons = icons.filter(icon => icon.category === activeCategory);
        }

        // Filter by search
        if (searchQuery.trim()) {
            icons = searchAnimatedIcons(searchQuery);
            if (activeCategory !== 'all') {
                icons = icons.filter(icon => icon.category === activeCategory);
            }
        }

        return icons;
    }, [searchQuery, activeCategory]);

    return (
        <div>
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search animated icons..."
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors"
                />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === category.id
                                ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                    >
                        {category.label}
                        <span className="ml-2 opacity-60">({category.count})</span>
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Showing {filteredIcons.length} animated icon{filteredIcons.length !== 1 ? 's' : ''}
                {searchQuery && ` matching "${searchQuery}"`}
            </p>

            {/* Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredIcons.map((icon) => (
                    <AnimatedIconCard
                        key={icon.id}
                        icon={icon}
                        onClick={() => setSelectedIcon(icon)}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredIcons.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                        No animated icons found. Try a different search.
                    </p>
                </div>
            )}

            {/* Customizer Modal */}
            {selectedIcon && (
                <AnimatedIconCustomizer
                    icon={selectedIcon}
                    isOpen={!!selectedIcon}
                    onClose={() => setSelectedIcon(null)}
                />
            )}
        </div>
    );
}
