"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    placeholder?: string;
}

export function CommandPalette({
    isOpen,
    onClose,
    children,
    placeholder = "Search components...",
}: CommandPaletteProps) {
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
                    >
                        <CommandPrimitive
                            className="overflow-hidden rounded-xl border border-[#333] bg-[#111] shadow-2xl"
                            loop
                        >
                            {/* Search Input */}
                            <div className="flex items-center border-b border-[#262626] px-4">
                                <Search className="mr-3 h-4 w-4 shrink-0 text-[#6b6b6b]" />
                                <CommandPrimitive.Input
                                    placeholder={placeholder}
                                    className="flex h-14 w-full bg-transparent text-base text-white placeholder:text-[#6b6b6b] focus:outline-none"
                                />
                                <button
                                    onClick={onClose}
                                    className="ml-2 rounded-md p-1.5 text-[#6b6b6b] hover:bg-[#262626] hover:text-white transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Results */}
                            <CommandPrimitive.List className="max-h-[400px] overflow-y-auto p-2">
                                <CommandPrimitive.Empty className="py-12 text-center text-sm text-[#6b6b6b]">
                                    No results found.
                                </CommandPrimitive.Empty>
                                {children}
                            </CommandPrimitive.List>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t border-[#262626] px-4 py-2 text-xs text-[#6b6b6b]">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="rounded border border-[#333] bg-[#1a1a1a] px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd>
                                        Navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="rounded border border-[#333] bg-[#1a1a1a] px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
                                        Select
                                    </span>
                                </div>
                                <span className="flex items-center gap-1">
                                    <kbd className="rounded border border-[#333] bg-[#1a1a1a] px-1.5 py-0.5 font-mono text-[10px]">esc</kbd>
                                    Close
                                </span>
                            </div>
                        </CommandPrimitive>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Command Group
export function CommandGroup({
    heading,
    children,
}: {
    heading: string;
    children: React.ReactNode;
}) {
    return (
        <CommandPrimitive.Group
            heading={heading}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[#6b6b6b]"
        >
            {children}
        </CommandPrimitive.Group>
    );
}

// Command Item
export function CommandItem({
    children,
    onSelect,
    className = "",
}: {
    children: React.ReactNode;
    onSelect?: () => void;
    className?: string;
}) {
    return (
        <CommandPrimitive.Item
            onSelect={onSelect}
            className={`
        relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5
        text-sm text-[#a1a1a1] outline-none
        data-[selected=true]:bg-[#1a1a1a] data-[selected=true]:text-white
        ${className}
      `}
        >
            {children}
        </CommandPrimitive.Item>
    );
}

// Keyboard shortcut listener hook
export function useCommandPalette() {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((open) => !open),
    };
}
