"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Info } from "lucide-react";
import { Component } from "@/lib/types";
import { components } from "@/lib/components-data";
import { CardPreview } from "@/components/preview/card-preview";

export function ComponentSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"all" | "free">("all");

    const totalComponents = components.length;

    // Filter logic
    const filteredComponents = components.filter((component) => {
        // 1. Text Search (Name or Description)
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            component.name.toLowerCase().includes(query) ||
            component.description.toLowerCase().includes(query);

        // 2. Type Filter (All vs Free)
        const matchesFilter = filterType === "all" || (filterType === "free" && !component.isPro);

        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
                    <input
                        type="text"
                        placeholder="Search components..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-[#262626] rounded-lg text-white placeholder-[#6b6b6b] text-sm focus:outline-none focus:border-[#333333] transition-colors"
                    />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterType("all")}
                        className={`px-4 py-2 font-medium rounded-lg text-sm transition-colors ${filterType === "all"
                                ? "bg-white text-black"
                                : "bg-[#111111] border border-[#262626] text-[#a1a1a1] hover:bg-[#1a1a1a] hover:text-white"
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilterType("free")}
                        className={`px-4 py-2 font-medium rounded-lg text-sm transition-colors ${filterType === "free"
                                ? "bg-white text-black"
                                : "bg-[#111111] border border-[#262626] text-[#a1a1a1] hover:bg-[#1a1a1a] hover:text-white"
                            }`}
                    >
                        Free Only
                    </button>
                </div>
            </div>

            {/* Results Count (if filtering) */}
            {(searchQuery || filterType !== "all") && (
                <div className="mb-4 text-sm text-[#6b6b6b]">
                    Found {filteredComponents.length} result{filteredComponents.length !== 1 ? "s" : ""}
                </div>
            )}

            {/* Component Grid */}
            {filteredComponents.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredComponents.map((component) => (
                        <Link
                            key={component.id}
                            href={`/library/${component.category}/${component.slug}`}
                            className="card overflow-hidden group border border-[#1a1a1a] hover:border-[#333333] transition-colors"
                        >
                            {/* Preview */}
                            <div className="h-32 bg-[#0a0a0a] flex items-center justify-center border-b border-[#1a1a1a] overflow-hidden relative">
                                <CardPreview componentSlug={component.slug} category={component.category} />

                                {/* Hover overlay hint */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-medium px-3 py-1 bg-black/50 backdrop-blur rounded-full border border-white/10">
                                        View Details
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-sm">
                                        {component.name}
                                    </h3>
                                    <div className="flex gap-1">
                                        {component.isNew && (
                                            <span className="badge-new text-xs font-medium px-2 py-0.5 rounded">
                                                New
                                            </span>
                                        )}
                                        {component.isPro ? (
                                            <span className="badge-pro text-xs font-medium px-2 py-0.5 rounded">
                                                PRO
                                            </span>
                                        ) : (
                                            <span className="badge-free text-xs font-medium px-2 py-0.5 rounded">
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
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="py-20 text-center border border-dashed border-[#262626] rounded-xl bg-[#0a0a0a]">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] mb-4">
                        <Search className="w-6 h-6 text-[#6b6b6b]" />
                    </div>
                    <h3 className="text-white font-medium mb-1">No components found</h3>
                    <p className="text-[#6b6b6b] text-sm max-w-xs mx-auto">
                        Try adjusting your search terms or filters to find what you're looking for.
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
                </div>
            )}

            {/* Footer Info */}
            <div className="mt-8 text-center">
                <p className="text-[#6b6b6b] text-sm">
                    Showing {filteredComponents.length} of {totalComponents} components
                </p>
            </div>
        </div>
    );
}
