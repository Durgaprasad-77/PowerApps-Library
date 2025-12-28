"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Eye, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ComponentPreview {
    id: string;
    name: string;
    category: string;
    description: string;
    preview: React.ReactNode;
}

// Sample component previews for the carousel
const componentPreviews: ComponentPreview[] = [
    {
        id: "gradient-button",
        name: "Gradient Button",
        category: "Buttons",
        description: "Beautiful gradient button with hover effects",
        preview: (
            <div className="flex items-center justify-center h-full">
                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25">
                    Click Me
                </button>
            </div>
        ),
    },
    {
        id: "card-hover",
        name: "Hover Card",
        category: "Cards",
        description: "Card with lift effect on hover",
        preview: (
            <div className="flex items-center justify-center h-full p-4">
                <div className="w-48 p-4 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-[#444] hover:-translate-y-1 transition-all">
                    <div className="w-full h-20 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3" />
                    <div className="h-3 w-3/4 rounded bg-gray-300 dark:bg-[#333] mb-2" />
                    <div className="h-2 w-1/2 rounded bg-gray-200 dark:bg-[#262626]" />
                </div>
            </div>
        ),
    },
    {
        id: "toggle-switch",
        name: "Toggle Switch",
        category: "Forms",
        description: "Animated toggle switch component",
        preview: (
            <div className="flex items-center justify-center h-full gap-4">
                <div className="w-12 h-6 rounded-full bg-gray-300 dark:bg-[#333] relative cursor-pointer">
                    <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
                </div>
                <div className="w-12 h-6 rounded-full bg-blue-500 relative cursor-pointer">
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white" />
                </div>
            </div>
        ),
    },
    {
        id: "nav-pills",
        name: "Navigation Pills",
        category: "Navigation",
        description: "Pill-style navigation tabs",
        preview: (
            <div className="flex items-center justify-center h-full">
                <div className="flex gap-1 p-1 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626]">
                    <button className="px-4 py-2 rounded-md bg-blue-600 dark:bg-white text-white dark:text-black text-sm font-medium">
                        Tab 1
                    </button>
                    <button className="px-4 py-2 rounded-md text-gray-500 dark:text-[#a1a1a1] text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                        Tab 2
                    </button>
                    <button className="px-4 py-2 rounded-md text-gray-500 dark:text-[#a1a1a1] text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                        Tab 3
                    </button>
                </div>
            </div>
        ),
    },
];

export function ComponentShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [copied, setCopied] = useState(false);

    // Auto-rotate every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % componentPreviews.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const activeComponent = componentPreviews[activeIndex];

    const handleCopy = () => {
        setCopied(true);
        toast.success("Component code copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-24 border-t border-gray-200 dark:border-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                >
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Beautiful Components
                        </h2>
                        <p className="text-gray-500 dark:text-[#6b6b6b] max-w-lg">
                            Preview our components and copy the code with one click.
                        </p>
                    </div>
                    <Link
                        href="/library"
                        className="hidden md:inline-flex items-center gap-2 text-gray-900 dark:text-white text-sm font-medium hover:text-gray-600 dark:hover:text-[#a1a1a1] transition-colors mt-4 md:mt-0"
                    >
                        View All Components
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Showcase Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid lg:grid-cols-2 gap-8"
                >
                    {/* Preview Panel */}
                    <div className="relative rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-[#262626] overflow-hidden">
                        {/* Header Bar */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-[#262626]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-gray-400 dark:text-[#6b6b6b]" />
                                <span className="text-xs text-gray-400 dark:text-[#6b6b6b]">Preview</span>
                            </div>
                        </div>

                        {/* Preview Content */}
                        <div className="h-64 relative bg-gray-50 dark:bg-[#0a0a0a]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0"
                                >
                                    {activeComponent.preview}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-3 border-t border-gray-200 dark:border-[#262626] flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 dark:text-[#6b6b6b]">{activeComponent.category}</span>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{activeComponent.name}</h3>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-blue-700 dark:hover:bg-white/90 transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Component List */}
                    <div className="space-y-3">
                        {componentPreviews.map((component, index) => (
                            <motion.button
                                key={component.id}
                                onClick={() => setActiveIndex(index)}
                                className={`
                                    w-full text-left p-4 rounded-xl border transition-all duration-300
                                    ${activeIndex === index
                                        ? "bg-gray-100 dark:bg-[#1a1a1a] border-gray-300 dark:border-[#333]"
                                        : "bg-transparent border-gray-200 dark:border-[#1a1a1a] hover:border-gray-300 dark:hover:border-[#262626]"
                                    }
                                `}
                                whileHover={{ x: 4 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xs text-gray-400 dark:text-[#6b6b6b]">{component.category}</span>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{component.name}</h3>
                                        <p className="text-xs text-gray-400 dark:text-[#6b6b6b] mt-1">{component.description}</p>
                                    </div>
                                    <div className={`
                                        w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                                        ${activeIndex === index ? "bg-blue-600 dark:bg-white" : "bg-gray-200 dark:bg-[#262626]"}
                                    `}>
                                        <ArrowRight className={`w-4 h-4 ${activeIndex === index ? "text-white dark:text-black" : "text-gray-400 dark:text-[#6b6b6b]"}`} />
                                    </div>
                                </div>

                                {/* Progress bar for active item */}
                                {activeIndex === index && (
                                    <motion.div
                                        className="mt-3 h-1 rounded-full bg-gray-200 dark:bg-[#262626] overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 4, ease: "linear" }}
                                            key={`progress-${activeIndex}`}
                                        />
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
