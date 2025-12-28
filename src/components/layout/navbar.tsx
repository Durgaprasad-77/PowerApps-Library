"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { AuthButtons } from "./auth-buttons";
import { ThemeToggle } from "@/components/theme";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-lg text-[var(--foreground)] tracking-tight">
                            PowerUI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/library"
                            className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium transition-colors"
                        >
                            Components
                        </Link>
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
                            <Link
                                href="/library"
                                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Components
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/docs"
                                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Docs
                            </Link>
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
