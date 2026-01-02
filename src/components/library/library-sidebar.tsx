"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category, Component } from "@/lib/types";

interface LibrarySidebarProps {
    categories: Category[];
    components: Component[];
}

export function LibrarySidebar({
    categories,
    components,
}: LibrarySidebarProps) {
    const pathname = usePathname();

    const getComponentsInCategory = (categorySlug: string) => {
        return components.filter((c) => c.category === categorySlug);
    };

    // Check if a component is currently active
    const isComponentActive = (component: Component) => {
        return pathname === `/library/${component.category}/${component.slug}`;
    };

    return (
        <aside className="w-full lg:w-52 flex-shrink-0">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8 pr-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                {/* Categories with components always expanded */}
                {categories.map((category) => {
                    const categoryComponents = getComponentsInCategory(category.slug);
                    if (categoryComponents.length === 0) return null;

                    return (
                        <div key={category.id} className="space-y-1">
                            {/* Category Header */}
                            <h3 className="text-sm font-semibold text-white px-1 mb-2">
                                {category.name}
                            </h3>

                            {/* Component Links */}
                            <nav className="space-y-0.5">
                                {categoryComponents.map((comp) => {
                                    const isActive = isComponentActive(comp);
                                    return (
                                        <Link
                                            key={comp.id}
                                            href={`/library/${comp.category}/${comp.slug}`}
                                            className={cn(
                                                "flex items-center justify-between px-2 py-1.5 text-[13px] rounded-md transition-all",
                                                isActive
                                                    ? "text-white bg-neutral-800/50 border-l-2 border-emerald-500 -ml-0.5 pl-2.5"
                                                    : "text-neutral-400 hover:text-white hover:bg-neutral-900/50"
                                            )}
                                        >
                                            <span className="truncate">{comp.name}</span>
                                            <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                                {comp.isNew && (
                                                    <span className="text-[9px] px-1 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-medium">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
