"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Grid3X3,
    List,
    Command,
    Filter,
    X,
    Sparkles,
    Check
} from "lucide-react";
import { Component, Category } from "@/lib/types";
import { CardPreview } from "@/components/preview/card-preview";
import { LibrarySidebar } from "./library-sidebar";
import { LibraryPromoSidebar } from "./library-promo-sidebar";
import {
    CommandPalette,
    CommandGroup,
    CommandItem,
    useCommandPalette
} from "@/components/ui/command-palette";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface Props {
    components: Component[];
    categories: Category[];
}

type ViewMode = "grid" | "list";
type FilterType = "all" | "free" | "pro" | "new";

export function LibraryClient({ components, categories }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<FilterType>("all");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [showFilters, setShowFilters] = useState(false);

    const { isOpen, open, close } = useCommandPalette();

    const totalComponents = components.length;

    // Filter logic
    const filteredComponents = components.filter((component) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            component.name.toLowerCase().includes(query) ||
            component.description.toLowerCase().includes(query);

        const matchesCategory = !selectedCategory || component.category === selectedCategory;

        let matchesFilter = true;
        switch (filterType) {
            case "free":
                matchesFilter = !component.isPro;
                break;
            case "pro":
                matchesFilter = component.isPro;
                break;
            case "new":
                matchesFilter = component.isNew || false;
                break;
        }

        return matchesSearch && matchesCategory && matchesFilter;
    });

    // Handle component selection from command palette
    const handleSelectComponent = useCallback((component: Component) => {
        close();
        window.location.href = `/library/${component.category}/${component.slug}`;
    }, [close]);

    const filterOptions: { value: FilterType; label: string; count: number }[] = [
        { value: "all", label: "All", count: components.length },
        { value: "free", label: "Free", count: components.filter(c => !c.isPro).length },
        { value: "pro", label: "Pro", count: components.filter(c => c.isPro).length },
        { value: "new", label: "New", count: components.filter(c => c.isNew).length },
    ];

    return (
        <>
            {/* Command Palette */}
            <CommandPalette
                isOpen={isOpen}
                onClose={close}
                placeholder="Search components..."
            >
                {components.length > 0 && (
                    <CommandGroup heading="Components">
                        {components
                            .filter(c =>
                                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                c.description.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .slice(0, 10)
                            .map((component) => (
                                <CommandItem
                                    key={component.id}
                                    onSelect={() => handleSelectComponent(component)}
                                >
                                    <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{component.name}</div>
                                        <div className="text-xs text-gray-500">{component.category}</div>
                                    </div>
                                    {!component.isPro && (
                                        <span className="badge badge-free text-xs">Free</span>
                                    )}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                )}
            </CommandPalette>

            {/* 3-Column Layout */}
            <div className="flex gap-8">
                {/* Left Sidebar - Navigation */}
                <LibrarySidebar
                    categories={categories}
                    components={components}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {/* Search Bar and Controls */}
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="relative flex-1">
                                <PlaceholdersAndVanishInput
                                    placeholders={[
                                        "Search for buttons...",
                                        "Find navigation components...",
                                        "Looking for cards?",
                                        "Search form inputs...",
                                        "Browse all components...",
                                    ]}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                    className="max-w-full"
                                />
                            </div>

                            {/* View Toggle and Filter */}
                            <div className="flex gap-2">
                                {/* Filter Toggle */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`px-3 py-2 rounded-lg border transition-colors flex items-center gap-1.5 text-[12px] font-medium ${showFilters || filterType !== "all"
                                        ? "bg-white text-black border-white"
                                        : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                                        }`}
                                >
                                    <Filter className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Filter</span>
                                    {filterType !== "all" && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    )}
                                </button>

                                {/* View Mode Toggle */}
                                <div className="flex bg-neutral-950 border border-neutral-800 rounded-lg p-0.5">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-1.5 rounded-md transition-colors ${viewMode === "grid"
                                            ? "bg-white text-black"
                                            : "text-neutral-500 hover:text-white"
                                            }`}
                                        aria-label="Grid view"
                                    >
                                        <Grid3X3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-1.5 rounded-md transition-colors ${viewMode === "list"
                                            ? "bg-white text-black"
                                            : "text-neutral-500 hover:text-white"
                                            }`}
                                        aria-label="List view"
                                    >
                                        <List className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Expandable Filter Options */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex flex-wrap gap-2 pb-4">
                                        {filterOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setFilterType(option.value)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filterType === option.value
                                                    ? "bg-white text-black"
                                                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                                                    }`}
                                            >
                                                {filterType === option.value && <Check className="w-3 h-3" />}
                                                {option.label}
                                                <span className={`text-xs ${filterType === option.value ? "text-black/60" : "text-neutral-500"}`}>
                                                    {option.count}
                                                </span>
                                            </button>
                                        ))}

                                        {filterType !== "all" && (
                                            <button
                                                onClick={() => setFilterType("all")}
                                                className="px-3 py-2 rounded-lg text-sm text-neutral-500 hover:text-white transition-colors flex items-center gap-1"
                                            >
                                                <X className="w-3 h-3" />
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Results Count */}
                    {(searchQuery || filterType !== "all" || selectedCategory) && (
                        <div className="mb-4 text-sm text-gray-500">
                            Found {filteredComponents.length} result{filteredComponents.length !== 1 ? "s" : ""}
                            {selectedCategory && (
                                <span> in <span className="capitalize">{selectedCategory}</span></span>
                            )}
                        </div>
                    )}

                    {/* Component Grid/List */}
                    {filteredComponents.length > 0 ? (
                        <motion.div
                            layout
                            className={viewMode === "grid"
                                ? "grid sm:grid-cols-2 gap-4"
                                : "flex flex-col gap-3"
                            }
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredComponents.map((component, index) => (
                                    <motion.div
                                        key={component.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2, delay: index * 0.02 }}
                                    >
                                        {viewMode === "grid" ? (
                                            <GridCard component={component} />
                                        ) : (
                                            <ListCard component={component} />
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 text-center border border-dashed border-neutral-800 rounded-xl bg-neutral-950"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 mb-4">
                                <Search className="w-6 h-6 text-gray-500" />
                            </div>
                            <h3 className="text-white font-medium mb-1">No components found</h3>
                            <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                                Try adjusting your search terms or filters.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setFilterType("all");
                                    setSelectedCategory(null);
                                }}
                                className="mt-4 text-white text-sm hover:underline"
                            >
                                Clear all filters
                            </button>
                        </motion.div>
                    )}

                    {/* Footer Info */}
                    <div className="mt-8 text-center">
                        <p className="text-neutral-500 text-sm">
                            Showing {filteredComponents.length} of {totalComponents} components
                        </p>
                    </div>
                </main>

                {/* Right Sidebar - Promo */}
                <LibraryPromoSidebar />
            </div>
        </>
    );
}

// Grid Card Component
function GridCard({ component }: { component: Component }) {
    return (
        <Link
            href={`/library/${component.category}/${component.slug}`}
            className="group block overflow-hidden rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-0.5"
        >
            {/* Preview */}
            <div className="h-32 bg-neutral-900 flex items-center justify-center border-b border-neutral-800 overflow-hidden relative">
                <CardPreview componentSlug={component.slug} category={component.category} />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                    <span className="text-white text-[10px] font-medium px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        View Component
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-3">
                <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-white group-hover:text-neutral-300 transition-colors text-[13px]">
                        {component.name}
                    </h3>
                    <div className="flex gap-0.5 flex-shrink-0 ml-1.5">
                        {component.isNew && (
                            <span className="text-[8px] px-1 py-0.5 bg-green-500/20 text-green-400 rounded font-medium">
                                New
                            </span>
                        )}
                        {component.isPro ? (
                            <span className="text-[8px] px-1 py-0.5 bg-neutral-700 text-neutral-400 rounded font-medium">
                                Pro
                            </span>
                        ) : (
                            <span className="text-[8px] px-1 py-0.5 bg-blue-500/20 text-blue-400 rounded font-medium">
                                Free
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-[11px] text-neutral-500 line-clamp-2">
                    {component.description}
                </p>
            </div>
        </Link>
    );
}

// List Card Component
function ListCard({ component }: { component: Component }) {
    return (
        <Link
            href={`/library/${component.category}/${component.slug}`}
            className="group flex items-center gap-3 p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
        >
            {/* Preview Thumbnail */}
            <div className="w-16 h-12 flex-shrink-0 rounded-md bg-neutral-900 border border-neutral-800 overflow-hidden">
                <CardPreview componentSlug={component.slug} category={component.category} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-medium text-white group-hover:text-neutral-300 transition-colors text-[13px] truncate">
                        {component.name}
                    </h3>
                    <div className="flex gap-0.5 flex-shrink-0">
                        {component.isNew && (
                            <span className="text-[8px] px-1 py-0.5 bg-green-500/20 text-green-400 rounded font-medium">
                                New
                            </span>
                        )}
                        {component.isPro ? (
                            <span className="text-[8px] px-1 py-0.5 bg-neutral-700 text-neutral-400 rounded font-medium">
                                Pro
                            </span>
                        ) : (
                            <span className="text-[8px] px-1 py-0.5 bg-blue-500/20 text-blue-400 rounded font-medium">
                                Free
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-[11px] text-neutral-500 line-clamp-1">
                    {component.description}
                </p>
                <p className="text-[10px] text-neutral-600 mt-0.5 capitalize">{component.category}</p>
            </div>

            {/* Arrow */}
            <div className="w-6 h-6 rounded-md bg-neutral-900 flex items-center justify-center group-hover:bg-white group-hover:text-black text-neutral-500 transition-colors">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}
