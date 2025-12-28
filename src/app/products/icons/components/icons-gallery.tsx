"use client";

import { useState, useCallback, useTransition } from "react";
import { IconCard } from "./icon-card";
import { IconCustomizer } from "./icon-customizer";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// Type definition for icons (matches what the API returns)
interface FluentIcon {
    id: string;
    name: string;
    style: 'regular' | 'filled';
    size: number;
    svg: string;
}

interface IconsGalleryProps {
    initialIcons: FluentIcon[];
    initialTotal: number;
    initialTotalPages: number;
}

type StyleFilter = 'all' | 'regular' | 'filled';

export function IconsGallery({ initialIcons, initialTotal, initialTotalPages }: IconsGalleryProps) {
    const [icons, setIcons] = useState<FluentIcon[]>(initialIcons);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [totalIcons, setTotalIcons] = useState(initialTotal);
    const [styleFilter, setStyleFilter] = useState<StyleFilter>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIcon, setSelectedIcon] = useState<FluentIcon | null>(null);
    const [isPending, startTransition] = useTransition();

    // Fetch icons via internal API route
    const fetchPage = useCallback(async (page: number, style: StyleFilter) => {
        startTransition(async () => {
            try {
                const params = new URLSearchParams({ page: page.toString() });
                if (style !== 'all') params.append('style', style);

                const response = await fetch(`/api/icons?${params}`);
                if (!response.ok) throw new Error('Failed to fetch');

                const result = await response.json();
                setIcons(result.icons);
                setCurrentPage(result.page);
                setTotalPages(result.totalPages);
                setTotalIcons(result.total);
            } catch (error) {
                console.error('Failed to fetch icons:', error);
            }
        });
    }, []);

    // Handle search via internal API route
    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            fetchPage(1, styleFilter);
            return;
        }

        startTransition(async () => {
            try {
                const params = new URLSearchParams({ search: query });
                if (styleFilter !== 'all') params.append('style', styleFilter);

                const response = await fetch(`/api/icons?${params}`);
                if (!response.ok) throw new Error('Search failed');

                const result = await response.json();
                setIcons(result.icons);
                setCurrentPage(1);
                setTotalPages(1);
                setTotalIcons(result.total);
            } catch (error) {
                console.error('Search failed:', error);
            }
        });
    }, [styleFilter, fetchPage]);

    // Handle style filter change
    const handleStyleChange = useCallback((style: StyleFilter) => {
        setStyleFilter(style);
        setSearchQuery("");
        fetchPage(1, style);
    }, [fetchPage]);

    // Handle pagination
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            fetchPage(page, styleFilter);
            // Scroll to top of gallery
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    };

    return (
        <div>
            {/* Controls Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search icons by name..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {isPending && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500 animate-spin" />
                    )}
                </div>

                {/* Style Toggle */}
                <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                    {(['all', 'regular', 'filled'] as StyleFilter[]).map((style) => (
                        <button
                            key={style}
                            onClick={() => handleStyleChange(style)}
                            className={`px-4 py-3 text-sm font-medium transition-colors ${styleFilter === style
                                ? 'bg-purple-500 text-white'
                                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {searchQuery
                        ? `Found ${totalIcons} icon${totalIcons !== 1 ? 's' : ''} for "${searchQuery}"`
                        : `Showing page ${currentPage} of ${totalPages} (${totalIcons.toLocaleString()} icons)`
                    }
                </p>
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 gap-2 mb-8">
                {icons.map((icon) => (
                    <IconCard
                        key={icon.id}
                        icon={icon}
                        onClick={() => setSelectedIcon(icon)}
                    />
                ))}
            </div>

            {/* Empty State */}
            {icons.length === 0 && !isPending && (
                <div className="text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400">
                        {searchQuery
                            ? `No icons found for "${searchQuery}"`
                            : 'No icons available'
                        }
                    </p>
                </div>
            )}

            {/* Loading State */}
            {isPending && icons.length === 0 && (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                </div>
            )}

            {/* Pagination */}
            {!searchQuery && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1 || isPending}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <div className="flex items-center gap-1 px-4">
                        {/* Page numbers */}
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            let pageNum: number;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => goToPage(pageNum)}
                                    disabled={isPending}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === pageNum
                                        ? 'bg-purple-500 text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages || isPending}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Customizer Modal */}
            {selectedIcon && (
                <IconCustomizer
                    icon={selectedIcon}
                    isOpen={!!selectedIcon}
                    onClose={() => setSelectedIcon(null)}
                />
            )}
        </div>
    );
}
