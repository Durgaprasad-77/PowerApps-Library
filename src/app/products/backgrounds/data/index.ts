// Backgrounds Index
// Combines all background categories into a single export

import { patterns, BackgroundPattern } from "./patterns";
import { gradients } from "./gradients";
import { shapes } from "./shapes";
import { textures } from "./textures";
import { animated } from "./animated";

// Export the interface
export type { BackgroundPattern };

// Combine all backgrounds
export const allBackgrounds: BackgroundPattern[] = [
    ...patterns,
    ...gradients,
    ...shapes,
    ...textures,
    ...animated,
];

// Export individual categories
export { patterns, gradients, shapes, textures, animated };

// Utility functions
export function getBackgroundById(id: string): BackgroundPattern | undefined {
    return allBackgrounds.find(b => b.id === id);
}

export function getBackgroundsByCategory(category: string): BackgroundPattern[] {
    if (category === "all") return allBackgrounds;
    return allBackgrounds.filter(b => b.category === category);
}

export function getBackgroundsByTag(tag: string): BackgroundPattern[] {
    return allBackgrounds.filter(b => b.tags.includes(tag.toLowerCase()));
}

export function searchBackgrounds(query: string): BackgroundPattern[] {
    const q = query.toLowerCase();
    return allBackgrounds.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some(tag => tag.includes(q))
    );
}

// Category counts for filters
export function getCategoryCounts(): Record<string, number> {
    const counts: Record<string, number> = { all: allBackgrounds.length };
    allBackgrounds.forEach(b => {
        counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
}
