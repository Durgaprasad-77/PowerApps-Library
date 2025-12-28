"use client";

import { useState } from "react";

interface CategoryFilterProps {
    categories: { id: string; label: string; count: number }[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
    categories,
    activeCategory,
    onCategoryChange
}: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${activeCategory === category.id
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-gray-100"
                        }`}
                >
                    {category.label}
                    <span className="ml-2 opacity-60">({category.count})</span>
                </button>
            ))}
        </div>
    );
}
