"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Search backgrounds..." }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const debounce = setTimeout(() => {
            onSearch(query);
        }, 200);

        return () => clearTimeout(debounce);
    }, [query, onSearch]);

    const handleClear = () => {
        setQuery("");
        inputRef.current?.focus();
    };

    return (
        <div
            className={`relative flex items-center transition-all duration-200 ${isFocused
                ? "ring-2 ring-blue-500/50"
                : ""
                }`}
        >
            <div className="absolute left-4 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
            </div>

            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className="w-full pl-12 pr-10 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none transition-colors"
            />

            {query && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>
            )}
        </div>
    );
}
