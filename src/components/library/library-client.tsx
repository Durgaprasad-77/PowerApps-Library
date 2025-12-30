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
import { getCategoryIcon } from "@/components/category-icons";
import {
    CommandPalette,
    CommandGroup,
    CommandItem,
    useCommandPalette
} from "@/components/ui/command-palette";

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
    const freeComponents = components.filter(c => !c.isPro).length;

    // Filter logic
    const filteredComponents = components.filter((component) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            component.name.toLowerCase().includes(query) ||
            component.description.toLowerCase().includes(query);

        // Category filter
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

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full lg:w-56 flex-shrink-0">
                    <div className="card p-4 sticky top-24 bg-neutral-950 border border-neutral-800 rounded-xl">
                        <h2 className="font-medium text-white text-sm mb-4">Categories</h2>
                        <nav className="space-y-1">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === null
                                    ? "text-white bg-neutral-900"
                                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                                    }`}
                            >
                                <span>All Components</span>
                                <span className="text-neutral-500">{totalComponents}</span>
                            </button>
                            {categories.map((category) => {
                                const IconComponent = getCategoryIcon(category.slug);
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.slug)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category.slug
                                            ? "text-white bg-neutral-900 font-medium"
                                            : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <IconComponent className="w-4 h-4" />
                                            <span>{category.name}</span>
                                        </span>
                                        <span className="text-neutral-500">{category.componentsCount}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <div>
                        {/* Search Bar and Controls */}
                        <div className="mb-6">
                            {/* Search Input with Command Shortcut */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search components..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-20 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-700 focus:ring-2 focus:ring-white/10 transition-colors"
                                    />
                                    {/* Cmd+K shortcut indicator */}
                                    <button
                                        onClick={open}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-500 text-xs hover:text-white hover:border-neutral-700 transition-colors"
                                    >
                                        <Command className="w-3 h-3" />
                                        <span>K</span>
                                    </button>
                                </div>

                                {/* View Toggle and Filter */}
                                <div className="flex gap-2">
                                    {/* Filter Toggle */}
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className={`px-4 py-2.5 rounded-xl border transition-colors flex items-center gap-2 text-sm font-medium ${showFilters || filterType !== "all"
                                            ? "bg-white text-black border-white"
                                            : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                                            }`}
                                    >
                                        <Filter className="w-4 h-4" />
                                        <span className="hidden sm:inline">Filter</span>
                                        {filterType !== "all" && (
                                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                                        )}
                                    </button>

                                    {/* View Mode Toggle */}
                                    <div className="flex bg-neutral-950 border border-neutral-800 rounded-xl p-1">
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                                                ? "bg-white text-black"
                                                : "text-neutral-500 hover:text-white"
                                                }`}
                                            aria-label="Grid view"
                                        >
                                            <Grid3X3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("list")}
                                            className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                                                ? "bg-white text-black"
                                                : "text-neutral-500 hover:text-white"
                                                }`}
                                            aria-label="List view"
                                        >
                                            <List className="w-4 h-4" />
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
                                    ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
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
                    </div>
                </main>
            </div>
        </>
    );
}

// Grid Card Component
function GridCard({ component }: { component: Component }) {
    return (
        <Link
            href={`/library/${component.category}/${component.slug}`}
            className="group block overflow-hidden rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Preview */}
            <div className="h-36 bg-neutral-900 flex items-center justify-center border-b border-neutral-800 overflow-hidden relative">
                <CardPreview componentSlug={component.slug} category={component.category} />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                    <span className="text-white text-xs font-medium px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        View Component
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white group-hover:text-neutral-300 transition-colors text-sm">
                        {component.name}
                    </h3>
                    <div className="flex gap-1 flex-shrink-0 ml-2">
                        {component.isNew && (
                            <span className="badge badge-new text-xs font-medium px-2 py-0.5 rounded">
                                New
                            </span>
                        )}
                        {component.isPro ? (
                            <span className="badge badge-pro text-xs font-medium px-2 py-0.5 rounded">
                                PRO
                            </span>
                        ) : (
                            <span className="badge badge-free text-xs font-medium px-2 py-0.5 rounded">
                                Free
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-xs text-neutral-500 line-clamp-2">
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
            className="group flex items-center gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
        >
            {/* Preview Thumbnail */}
            <div className="w-20 h-16 flex-shrink-0 rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden">
                <CardPreview componentSlug={component.slug} category={component.category} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white group-hover:text-neutral-300 transition-colors text-sm truncate">
                        {component.name}
                    </h3>
                    <div className="flex gap-1 flex-shrink-0">
                        {component.isNew && (
                            <span className="badge badge-new text-xs font-medium px-2 py-0.5 rounded">
                                New
                            </span>
                        )}
                        {component.isPro ? (
                            <span className="badge badge-pro text-xs font-medium px-2 py-0.5 rounded">
                                PRO
                            </span>
                        ) : (
                            <span className="badge badge-free text-xs font-medium px-2 py-0.5 rounded">
                                Free
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-xs text-neutral-500 line-clamp-1">
                    {component.description}
                </p>
                <p className="text-xs text-neutral-600 mt-1 capitalize">{component.category}</p>
            </div>

            {/* Arrow */}
            <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center group-hover:bg-white group-hover:text-black text-neutral-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}
