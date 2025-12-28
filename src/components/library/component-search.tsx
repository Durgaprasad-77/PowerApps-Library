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
import { Component } from "@/lib/types";
import { CardPreview } from "@/components/preview/card-preview";
import {
    CommandPalette,
    CommandGroup,
    CommandItem,
    useCommandPalette
} from "@/components/ui/command-palette";


interface Props {
    components: Component[];
}

type ViewMode = "grid" | "list";
type FilterType = "all" | "free" | "pro" | "new";

export function ComponentSearch({ components }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<FilterType>("all");
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

        return matchesSearch && matchesFilter;
    });

    // Handle component selection from command palette
    const handleSelectComponent = useCallback((component: Component) => {
        close();
        // Navigate programmatically
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
                                    <div className="w-8 h-8 rounded bg-[#262626] flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-[#6b6b6b]" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{component.name}</div>
                                        <div className="text-xs text-[#6b6b6b]">{component.category}</div>
                                    </div>
                                    {!component.isPro && (
                                        <span className="badge badge-free text-xs">Free</span>
                                    )}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                )}
            </CommandPalette>

            <div>
                {/* Search Bar and Controls */}
                <div className="mb-6">
                    {/* Search Input with Command Shortcut */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
                            <input
                                type="text"
                                placeholder="Search components..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-20 py-3 bg-[#111] border border-[#262626] rounded-xl text-white placeholder-[#6b6b6b] text-sm focus:outline-none focus:border-[#333] transition-colors"
                            />
                            {/* Cmd+K shortcut indicator */}
                            <button
                                onClick={open}
                                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded-md bg-[#1a1a1a] border border-[#333] text-[#6b6b6b] text-xs hover:text-white hover:border-[#404040] transition-colors"
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
                                    : "bg-[#111] border-[#262626] text-[#a1a1a1] hover:text-white hover:border-[#333]"
                                    }`}
                            >
                                <Filter className="w-4 h-4" />
                                <span className="hidden sm:inline">Filter</span>
                                {filterType !== "all" && (
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                )}
                            </button>

                            {/* View Mode Toggle */}
                            <div className="flex bg-[#111] border border-[#262626] rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                                        ? "bg-white text-black"
                                        : "text-[#6b6b6b] hover:text-white"
                                        }`}
                                    aria-label="Grid view"
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                                        ? "bg-white text-black"
                                        : "text-[#6b6b6b] hover:text-white"
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
                                                : "bg-[#1a1a1a] border border-[#262626] text-[#a1a1a1] hover:text-white hover:border-[#333]"
                                                }`}
                                        >
                                            {filterType === option.value && <Check className="w-3 h-3" />}
                                            {option.label}
                                            <span className={`text-xs ${filterType === option.value ? "text-black/60" : "text-[#6b6b6b]"}`}>
                                                {option.count}
                                            </span>
                                        </button>
                                    ))}

                                    {filterType !== "all" && (
                                        <button
                                            onClick={() => setFilterType("all")}
                                            className="px-3 py-2 rounded-lg text-sm text-[#a1a1a1] hover:text-white transition-colors flex items-center gap-1"
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
                {(searchQuery || filterType !== "all") && (
                    <div className="mb-4 text-sm text-[#6b6b6b]">
                        Found {filteredComponents.length} result{filteredComponents.length !== 1 ? "s" : ""}
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
                        className="py-20 text-center border border-dashed border-[#262626] rounded-xl bg-[#0a0a0a]"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] mb-4">
                            <Search className="w-6 h-6 text-[#6b6b6b]" />
                        </div>
                        <h3 className="text-white font-medium mb-1">No components found</h3>
                        <p className="text-[#6b6b6b] text-sm max-w-xs mx-auto">
                            Try adjusting your search terms or filters.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setFilterType("all");
                            }}
                            className="mt-4 text-blue-400 text-sm hover:underline"
                        >
                            Clear all filters
                        </button>
                    </motion.div>
                )}

                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-[#6b6b6b] text-sm">
                        Showing {filteredComponents.length} of {totalComponents} components
                    </p>
                </div>
            </div>
        </>
    );
}

// Grid Card Component
function GridCard({ component }: { component: Component }) {
    return (
        <Link
            href={`/library/${component.category}/${component.slug}`}
            className="group block overflow-hidden rounded-xl bg-[#111] border border-[#262626] hover:border-[#333] transition-all duration-300 hover:-translate-y-1"
        >
            {/* Preview */}
            <div className="h-36 bg-[#0a0a0a] flex items-center justify-center border-b border-[#262626] overflow-hidden relative">
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
                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-sm">
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
                <p className="text-xs text-[#6b6b6b] line-clamp-2">
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
            className="group flex items-center gap-4 p-4 rounded-xl bg-[#111] border border-[#262626] hover:border-[#333] transition-all duration-300"
        >
            {/* Preview Thumbnail */}
            <div className="w-20 h-16 flex-shrink-0 rounded-lg bg-[#0a0a0a] border border-[#262626] overflow-hidden">
                <CardPreview componentSlug={component.slug} category={component.category} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-sm truncate">
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
                <p className="text-xs text-[#6b6b6b] line-clamp-1">
                    {component.description}
                </p>
                <p className="text-xs text-[#525252] mt-1 capitalize">{component.category}</p>
            </div>

            {/* Arrow */}
            <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}
