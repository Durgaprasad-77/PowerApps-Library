"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="w-9 h-9 rounded-lg bg-[#1a1a1a] dark:bg-[#1a1a1a] flex items-center justify-center">
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#262626] transition-colors"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {isDark ? (
                        <Sun className="w-4 h-4 text-yellow-500" />
                    ) : (
                        <Moon className="w-4 h-4 text-slate-700" />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    );
}

// Dropdown version with system option
export function ThemeDropdown() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="w-9 h-9 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    const options = [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
        { value: "system", label: "System", icon: Monitor },
    ];



    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#262626] transition-colors"
                aria-label="Toggle theme menu"
            >
                {resolvedTheme === "dark" ? (
                    <Moon className="w-4 h-4 text-slate-300" />
                ) : (
                    <Sun className="w-4 h-4 text-yellow-600" />
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 z-50 w-36 p-1 rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] shadow-lg"
                        >
                            {options.map((option) => {
                                const Icon = option.icon;
                                const isActive = theme === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setTheme(option.value);
                                            setOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${isActive
                                            ? "bg-gray-100 dark:bg-[#262626] text-black dark:text-white"
                                            : "text-gray-600 dark:text-[#a1a1a1] hover:bg-gray-50 dark:hover:bg-[#262626] hover:text-black dark:hover:text-white"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {option.label}
                                    </button>
                                );
                            })}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
