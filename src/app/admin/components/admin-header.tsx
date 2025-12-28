"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Search, LogOut, Sun, Moon, Box, Layers, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { globalSearch, SearchResult } from "../search-action";
import { NotificationsDropdown } from "./notifications-dropdown";

// Map of paths to display names
const pathLabels: Record<string, string> = {
    admin: "Admin",
    components: "Components",
    categories: "Categories",
    users: "Users",
    security: "Security",
    settings: "Settings",
    analytics: "Analytics",
    new: "New",
};

export function AdminHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [searching, setSearching] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { theme, setTheme } = useTheme();
    const searchRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Generate breadcrumbs from pathname
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const isId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment);
        const label = isId ? "Edit" : pathLabels[segment] || segment;
        return { href, label, isLast };
    });

    // Debounced search
    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query);
        setSelectedIndex(-1);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setSearching(true);
            try {
                const results = await globalSearch(query);
                setSearchResults(results);
            } catch {
                setSearchResults([]);
            } finally {
                setSearching(false);
            }
        }, 300);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            e.preventDefault();
            const result = searchResults[selectedIndex];
            router.push(result.href);
            setSearchOpen(false);
            setSearchQuery("");
            setSearchResults([]);
        } else if (e.key === "Escape") {
            setSearchOpen(false);
            setSearchQuery("");
            setSearchResults([]);
        }
    };

    // Keyboard shortcut (Cmd+K)
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen(true);
                setTimeout(() => searchRef.current?.focus(), 0);
            }
        };
        document.addEventListener("keydown", handleGlobalKeyDown);
        return () => document.removeEventListener("keydown", handleGlobalKeyDown);
    }, []);

    // Close on click outside
    useEffect(() => {
        if (searchOpen) {
            searchRef.current?.focus();
        }
    }, [searchOpen]);

    const getIcon = (type: string) => {
        if (type === "component") return <Box className="w-4 h-4 text-blue-400" />;
        if (type === "category") return <Layers className="w-4 h-4 text-purple-400" />;
        return null;
    };

    return (
        <header className="h-16 border-b border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-40">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-1 text-sm">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.href} className="flex items-center gap-1">
                            {index > 0 && (
                                <ChevronRight className="w-4 h-4 text-[#4a4a4a]" />
                            )}
                            {crumb.isLast ? (
                                <span className="text-white font-medium">{crumb.label}</span>
                            ) : (
                                <Link
                                    href={crumb.href}
                                    className="text-[#6b6b6b] hover:text-white transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    {/* Search button */}
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#6b6b6b] hover:text-white bg-[#111] border border-[#262626] hover:border-[#333] transition-colors"
                    >
                        <Search className="w-4 h-4" />
                        <span className="text-sm hidden sm:inline">Search</span>
                        <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 bg-[#262626] rounded text-[#6b6b6b]">⌘K</kbd>
                    </button>

                    {/* Theme toggle */}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-lg text-[#6b6b6b] hover:text-white hover:bg-white/5 transition-colors"
                        title="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                    {/* Notifications */}
                    <NotificationsDropdown />

                    {/* Divider */}
                    <div className="w-px h-6 bg-[#262626] mx-2" />

                    {/* User menu */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                            A
                        </div>
                        <Link
                            href="/"
                            className="p-2 rounded-lg text-[#6b6b6b] hover:text-white hover:bg-white/5 transition-colors"
                            title="Back to site"
                        >
                            <LogOut className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Search overlay */}
            {searchOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                            setSearchResults([]);
                        }}
                    />

                    {/* Search modal */}
                    <div className="fixed left-1/2 top-20 -translate-x-1/2 w-full max-w-lg z-50">
                        <div className="bg-[#111] border border-[#262626] rounded-xl shadow-2xl overflow-hidden">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b]" />
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search components, categories..."
                                    className="w-full bg-transparent pl-12 pr-10 py-4 text-white placeholder-[#6b6b6b] focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSearchResults([]);
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-white"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Results */}
                            {(searchResults.length > 0 || searching) && (
                                <div className="border-t border-[#262626] py-2 max-h-80 overflow-y-auto">
                                    {searching ? (
                                        <div className="px-4 py-3 text-sm text-[#6b6b6b]">Searching...</div>
                                    ) : (
                                        searchResults.map((result, index) => (
                                            <Link
                                                key={`${result.type}-${result.id}`}
                                                href={result.href}
                                                onClick={() => {
                                                    setSearchOpen(false);
                                                    setSearchQuery("");
                                                    setSearchResults([]);
                                                }}
                                                className={`flex items-center gap-3 px-4 py-3 transition-colors ${selectedIndex === index
                                                    ? "bg-blue-600/20"
                                                    : "hover:bg-white/5"
                                                    }`}
                                            >
                                                {getIcon(result.type)}
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm text-white truncate">{result.title}</div>
                                                    <div className="text-xs text-[#6b6b6b] truncate">{result.subtitle}</div>
                                                </div>
                                                <span className="text-xs text-[#6b6b6b] uppercase">{result.type}</span>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            )}

                            {searchQuery.length >= 2 && !searching && searchResults.length === 0 && (
                                <div className="border-t border-[#262626] px-4 py-4 text-sm text-[#6b6b6b] text-center">
                                    No results found for &quot;{searchQuery}&quot;
                                </div>
                            )}

                            {/* Footer hint */}
                            <div className="border-t border-[#262626] px-4 py-2 flex items-center justify-between text-xs text-[#6b6b6b]">
                                <span>Type at least 2 characters</span>
                                <div className="flex items-center gap-2">
                                    <kbd className="px-1.5 py-0.5 bg-[#262626] rounded">↑↓</kbd>
                                    <span>Navigate</span>
                                    <kbd className="px-1.5 py-0.5 bg-[#262626] rounded">↵</kbd>
                                    <span>Select</span>
                                    <kbd className="px-1.5 py-0.5 bg-[#262626] rounded">Esc</kbd>
                                    <span>Close</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
