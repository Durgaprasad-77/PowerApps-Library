"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-black" />
                        </div>
                        <span className="font-semibold text-lg text-white tracking-tight">
                            PowerAppLibs
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/library"
                            className="text-[#a1a1a1] hover:text-white font-medium transition-colors"
                        >
                            Components
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-[#a1a1a1] hover:text-white font-medium transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/docs"
                            className="text-[#a1a1a1] hover:text-white font-medium transition-colors"
                        >
                            Docs
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/auth/login"
                            className="text-[#a1a1a1] hover:text-white font-medium transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="btn-primary"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[#262626] animate-fade-in">
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/library"
                                className="text-[#a1a1a1] hover:text-white font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Components
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-[#a1a1a1] hover:text-white font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/docs"
                                className="text-[#a1a1a1] hover:text-white font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Docs
                            </Link>
                            <hr className="border-[#262626]" />
                            <Link
                                href="/auth/login"
                                className="text-[#a1a1a1] hover:text-white font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="btn-primary text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
