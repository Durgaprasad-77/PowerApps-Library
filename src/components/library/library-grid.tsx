"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Component, Category } from "@/lib/types";
import { CardPreview } from "@/components/preview/card-preview";

interface LibraryGridProps {
    components: Component[];
    categories: Category[];
}

type FilterType = "all" | "free" | "pro" | "new";

export function LibraryGrid({ components, categories }: LibraryGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<FilterType>("all");

    // Filter logic
    const filteredComponents = components.filter((component) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            component.name.toLowerCase().includes(query) ||
            component.description.toLowerCase().includes(query);

        const matchesFilter =
            filterType === "all" ||
            (filterType === "free" && !component.isPro) ||
            (filterType === "pro" && component.isPro) ||
            (filterType === "new" && component.isNew);

        return matchesSearch && matchesFilter;
    });

    const filters: { value: FilterType; label: string; count: number }[] = [
        { value: "all", label: "All", count: components.length },
        { value: "free", label: "Free", count: components.filter(c => !c.isPro).length },
        { value: "pro", label: "Pro", count: components.filter(c => c.isPro).length },
        { value: "new", label: "New", count: components.filter(c => c.isNew).length },
    ];

    return (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search components..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setFilterType(filter.value)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filterType === filter.value
                                    ? "bg-white text-black"
                                    : "text-neutral-400 hover:text-white"
                                }`}
                        >
                            {filter.label}
                            <span className="ml-1.5 text-xs opacity-60">{filter.count}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Component Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredComponents.map((component, index) => (
                    <motion.div
                        key={component.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <Link
                            href={`/library/${component.category}/${component.slug}`}
                            className="group block bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all hover:shadow-lg hover:shadow-black/20"
                        >
                            {/* Preview Area */}
                            <div className="aspect-[4/3] bg-neutral-950 border-b border-neutral-800 relative overflow-hidden">
                                <CardPreview
                                    componentSlug={component.slug}
                                    category={component.category}
                                />
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">
                                        {component.name}
                                    </h3>
                                    <div className="flex items-center gap-1">
                                        {component.isNew && (
                                            <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-medium">
                                                New
                                            </span>
                                        )}
                                        {component.isPro ? (
                                            <span className="text-[9px] px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded font-medium">
                                                Pro
                                            </span>
                                        ) : (
                                            <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded font-medium">
                                                Free
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-neutral-500 text-xs line-clamp-2">
                                    {component.description}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* No Results */}
            {filteredComponents.length === 0 && (
                <div className="text-center py-16">
                    <Filter className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                    <h3 className="text-white font-medium mb-1">No components found</h3>
                    <p className="text-neutral-500 text-sm">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
            )}
        </div>
    );
}
