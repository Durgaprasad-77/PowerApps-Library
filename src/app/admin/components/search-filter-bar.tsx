"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchFilterBarProps {
    onSearch: (query: string) => void;
    onFilterChange: (filters: FilterState) => void;
    categories: { slug: string; name: string }[];
    placeholder?: string;
}

export interface FilterState {
    category: string | null;
    status: "all" | "pro" | "free" | "new";
}

export function SearchFilterBar({
    onSearch,
    onFilterChange,
    categories,
    placeholder = "Search components...",
}: SearchFilterBarProps) {
    const [query, setQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        category: null,
        status: "all",
    });

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    const handleFilterChange = useCallback(
        (newFilters: Partial<FilterState>) => {
            const updated = { ...filters, ...newFilters };
            setFilters(updated);
            onFilterChange(updated);
        },
        [filters, onFilterChange]
    );

    const clearFilters = () => {
        setFilters({ category: null, status: "all" });
        onFilterChange({ category: null, status: "all" });
    };

    const hasActiveFilters = filters.category !== null || filters.status !== "all";

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-10 py-2.5 bg-[#111] border border-[#262626] rounded-lg text-white placeholder-[#6b6b6b] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Filter Toggle */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${hasActiveFilters
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "bg-[#111] border-[#262626] text-[#a1a1a1] hover:text-white hover:border-[#333]"
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    Filters
                    {hasActiveFilters && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded">
                            {(filters.category ? 1 : 0) + (filters.status !== "all" ? 1 : 0)}
                        </span>
                    )}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </button>
            </div>

            {/* Filter Dropdowns */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-wrap items-center gap-3 p-4 bg-[#0a0a0a] border border-[#262626] rounded-lg">
                            {/* Category Filter */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-[#6b6b6b]">Category:</label>
                                <select
                                    value={filters.category || ""}
                                    onChange={(e) => handleFilterChange({ category: e.target.value || null })}
                                    className="px-3 py-1.5 bg-[#111] border border-[#262626] rounded-md text-white text-sm focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat.slug} value={cat.slug}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-[#6b6b6b]">Status:</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange({ status: e.target.value as FilterState["status"] })}
                                    className="px-3 py-1.5 bg-[#111] border border-[#262626] rounded-md text-white text-sm focus:outline-none focus:border-blue-500"
                                >
                                    <option value="all">All</option>
                                    <option value="pro">Pro Only</option>
                                    <option value="free">Free Only</option>
                                    <option value="new">New Only</option>
                                </select>
                            </div>

                            {/* Clear Filters */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="ml-auto flex items-center gap-1 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
