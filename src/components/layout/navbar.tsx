"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Layers, Palette, Wand2, PaintBucket, Sparkles, LayoutTemplate, FileCode, Zap, ArrowRight } from "lucide-react";
import { AuthButtons } from "./auth-buttons";
import { ThemeToggle } from "@/components/theme";
import { motion, AnimatePresence } from "framer-motion";

// Core Features - Main products
const coreFeatures = [
    {
        name: "Components",
        description: "Copy-paste ready UI components",
        href: "/library",
        icon: Layers,
    },
    {
        name: "YAML Studio",
        description: "Build and preview components live",
        href: "/products/yaml-studio",
        icon: FileCode,
    },
];

// More products
const moreProducts = [
    {
        name: "Backgrounds",
        description: "Dynamic animated backgrounds",
        href: "/products/backgrounds",
        icon: PaintBucket,
    },
    {
        name: "Icons",
        description: "Fluent 2 icon library",
        href: "/products/icons",
        icon: Sparkles,
    },
    {
        name: "Theme Builder",
        description: "Create custom themes",
        href: "/products/theme-builder",
        icon: Palette,
    },
    {
        name: "AI Generator",
        description: "AI-powered components",
        href: "/products/ai-generator",
        icon: Wand2,
    },
    {
        name: "Templates",
        description: "Ready-to-use app templates",
        href: "/products/templates",
        icon: LayoutTemplate,
    },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProductsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="PowerUI Logo"
                            width={32}
                            height={32}
                            className="rounded-lg"
                        />
                        <span className="font-semibold text-lg text-[var(--foreground)] tracking-tight">
                            PowerUI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Products Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProductsOpen(!isProductsOpen)}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-medium transition-all ${isProductsOpen
                                        ? 'bg-[var(--accent)] text-[var(--foreground)]'
                                        : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                                    }`}
                            >
                                Products
                                <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProductsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden"
                                    >
                                        {/* Arrow indicator */}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--background)] border-l border-t border-[var(--border)] rotate-45" />

                                        <div className="relative bg-[var(--background)] p-6">
                                            <div className="flex gap-8">
                                                {/* Core Features Column */}
                                                <div className="flex-1">
                                                    <h3 className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-4">
                                                        Core Features
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {coreFeatures.map((item) => (
                                                            <Link
                                                                key={item.name}
                                                                href={item.href}
                                                                onClick={() => setIsProductsOpen(false)}
                                                                className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--accent)] transition-colors"
                                                            >
                                                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
                                                                    <item.icon className="w-5 h-5 text-purple-400" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-[var(--foreground)] group-hover:text-purple-400 transition-colors">
                                                                        {item.name}
                                                                    </div>
                                                                    <div className="text-sm text-[var(--foreground-muted)]">
                                                                        {item.description}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="w-px bg-[var(--border)]" />

                                                {/* More Column */}
                                                <div className="flex-[1.5]">
                                                    <h3 className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-4">
                                                        More
                                                    </h3>
                                                    <div className="grid grid-cols-2 gap-1">
                                                        {moreProducts.map((item) => (
                                                            <Link
                                                                key={item.name}
                                                                href={item.href}
                                                                onClick={() => setIsProductsOpen(false)}
                                                                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--accent)] transition-colors"
                                                            >
                                                                <item.icon className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors" />
                                                                <div>
                                                                    <div className="font-medium text-[var(--foreground)] text-sm">
                                                                        {item.name}
                                                                    </div>
                                                                    <div className="text-xs text-[var(--foreground-muted)]">
                                                                        {item.description}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between px-6 py-4 bg-[var(--accent)]/50 border-t border-[var(--border)]">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2">
                                                    <Zap className="w-4 h-4 text-purple-400" />
                                                    <span className="text-sm font-medium text-[var(--foreground)]">
                                                        New: Animated Icons
                                                    </span>
                                                </div>
                                                <span className="text-sm text-[var(--foreground-muted)]">
                                                    SVG animations for Power Apps
                                                </span>
                                            </div>
                                            <Link
                                                href="/changelog"
                                                onClick={() => setIsProductsOpen(false)}
                                                className="flex items-center gap-1 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                                            >
                                                Changelog
                                                <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href="/pricing"
                            className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/docs"
                            className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium transition-colors"
                        >
                            Docs
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        <AuthButtons />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-[var(--foreground)]" />
                            ) : (
                                <Menu className="w-6 h-6 text-[var(--foreground)]" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[var(--border)] animate-fade-in">
                        <div className="flex flex-col gap-4">
                            {/* Mobile Products Section */}
                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider px-1">
                                    Core Features
                                </div>
                                {coreFeatures.map((product) => (
                                    <Link
                                        key={product.name}
                                        href={product.href}
                                        className="flex items-center gap-3 p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium text-sm"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <product.icon className="w-4 h-4" />
                                        {product.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider px-1">
                                    More
                                </div>
                                {moreProducts.map((product) => (
                                    <Link
                                        key={product.name}
                                        href={product.href}
                                        className="flex items-center gap-3 p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium text-sm"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <product.icon className="w-4 h-4" />
                                        {product.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="border-t border-[var(--border)] pt-4 space-y-4">
                                <Link
                                    href="/pricing"
                                    className="block text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href="/docs"
                                    className="block text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Docs
                                </Link>
                            </div>

                            <div className="pt-4 border-t border-[var(--border)]">
                                <AuthButtons />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
