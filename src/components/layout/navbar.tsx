"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthButtons } from "./auth-buttons";
import { ThemeToggle } from "@/components/theme";

const products = [
    { name: "Components", href: "/library" },
    { name: "Backgrounds", href: "/products/backgrounds" },
    { name: "Icons", href: "/products/icons" },
    { name: "YAML Studio", href: "/products/yaml-studio" },
    { name: "Theme Builder", href: "/products/theme-builder" },
    { name: "AI Component Generator", href: "/products/ai-generator" },
    { name: "Template Gallery", href: "/products/templates" },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);

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
                        <div className="relative">
                            <button
                                onClick={() => setIsProductsOpen(!isProductsOpen)}
                                onBlur={() => setTimeout(() => setIsProductsOpen(false), 150)}
                                className="flex items-center gap-1 text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium transition-colors"
                            >
                                Products
                                <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProductsOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl overflow-hidden animate-fade-in">
                                    <div className="py-1">
                                        {products.map((product) => (
                                            <Link
                                                key={product.name}
                                                href={product.href}
                                                className="block px-4 py-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
                                                onClick={() => setIsProductsOpen(false)}
                                            >
                                                {product.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                                    Products
                                </div>
                                {products.map((product) => (
                                    <Link
                                        key={product.name}
                                        href={product.href}
                                        className="block p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium text-sm"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
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

