"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Category, Component } from "@/lib/types";
import { getCategoryIcon } from "@/components/category-icons";
import { Twitter } from "lucide-react";

interface LibrarySidebarProps {
    categories: Category[];
    components: Component[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export function LibrarySidebar({
    categories,
    components,
    selectedCategory,
    onSelectCategory,
}: LibrarySidebarProps) {
    const getComponentsInCategory = (categorySlug: string) => {
        return components.filter((c) => c.category === categorySlug);
    };

    return (
        <aside className="w-full lg:w-52 flex-shrink-0">
            <div className="sticky top-20 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 pr-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                {/* Follow for updates */}
                <div className="space-y-1">
                    <h3 className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider px-2">
                        Follow for updates
                    </h3>
                    <nav className="space-y-0">
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] text-neutral-400 hover:text-white hover:translate-x-0.5 transition-all"
                        >
                            <Twitter className="w-3.5 h-3.5" />
                            Twitter @powerui
                        </Link>
                    </nav>
                </div>

                {/* Installation */}
                <div className="space-y-1">
                    <h3 className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider px-2">
                        Installation
                    </h3>
                    <nav className="space-y-0">
                        <Link
                            href="/docs/installation"
                            className="flex items-center justify-between px-2 py-1.5 text-[13px] text-neutral-400 hover:text-white hover:translate-x-0.5 transition-all"
                        >
                            <span>Getting Started</span>
                        </Link>
                        <Link
                            href="/docs/cli"
                            className="flex items-center justify-between px-2 py-1.5 text-[13px] text-neutral-400 hover:text-white hover:translate-x-0.5 transition-all"
                        >
                            <span>CLI</span>
                            <span className="text-[9px] px-1 py-0.5 bg-blue-500/20 text-blue-400 rounded">3.0</span>
                        </Link>
                    </nav>
                </div>

                {/* All Components */}
                <div className="space-y-1">
                    <h3 className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider px-2">
                        Components
                    </h3>
                    <nav className="space-y-0">
                        <button
                            onClick={() => onSelectCategory(null)}
                            className={cn(
                                "w-full flex items-center justify-between px-2 py-1.5 text-[13px] transition-all",
                                selectedCategory === null
                                    ? "text-white font-medium"
                                    : "text-neutral-400 hover:text-white hover:translate-x-0.5"
                            )}
                        >
                            <span>All Components</span>
                            <span className="text-neutral-600 text-[12px]">{components.length}</span>
                        </button>
                    </nav>
                </div>

                {/* Categories */}
                {categories.map((category) => {
                    const IconComponent = getCategoryIcon(category.slug);
                    const categoryComponents = getComponentsInCategory(category.slug);
                    const hasNewItems = categoryComponents.some((c) => c.isNew);
                    const hasProItems = categoryComponents.some((c) => c.isPro);

                    return (
                        <div key={category.id} className="space-y-0">
                            <button
                                onClick={() => onSelectCategory(category.slug)}
                                className={cn(
                                    "w-full flex items-center justify-between px-2 py-1.5 text-[13px] transition-all group",
                                    selectedCategory === category.slug
                                        ? "text-white font-medium"
                                        : "text-neutral-400 hover:text-white hover:translate-x-0.5"
                                )}
                            >
                                <span className="flex items-center gap-1.5">
                                    <IconComponent className="w-3.5 h-3.5" />
                                    <span>{category.name}</span>
                                </span>
                                <div className="flex items-center gap-1">
                                    {hasNewItems && (
                                        <span className="text-[8px] px-1 py-0.5 bg-green-500/20 text-green-400 rounded font-medium">
                                            New
                                        </span>
                                    )}
                                    {hasProItems && (
                                        <span className="text-[8px] px-1 py-0.5 bg-neutral-700 text-neutral-400 rounded font-medium">
                                            Pro
                                        </span>
                                    )}
                                </div>
                            </button>

                            {/* Show components when category is selected */}
                            {selectedCategory === category.slug && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="ml-3 pl-2 border-l border-neutral-800 space-y-0"
                                >
                                    {categoryComponents.map((comp) => (
                                        <Link
                                            key={comp.id}
                                            href={`/library/${comp.category}/${comp.slug}`}
                                            className="flex items-center justify-between px-2 py-1 text-[12px] text-neutral-500 hover:text-white transition-colors"
                                        >
                                            <span>{comp.name}</span>
                                            <div className="flex items-center gap-0.5">
                                                {comp.isNew && (
                                                    <span className="text-[8px] px-1 py-0.5 bg-green-500/20 text-green-400 rounded">
                                                        New
                                                    </span>
                                                )}
                                                {comp.isPro && (
                                                    <span className="text-[8px] px-1 py-0.5 bg-neutral-700 text-neutral-400 rounded">
                                                        Pro
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
