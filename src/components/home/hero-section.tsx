"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Copy, Shield, Check, Zap } from "lucide-react";
import { GradientOrb } from "@/components/ui/motion";

interface HeroSectionProps {
    totalCount: number;
    freeCount: number;
}

export function HeroSection({ totalCount, freeCount }: HeroSectionProps) {
    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Background Hero Image - Overlapping Style */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-x-0 top-[45%] sm:top-[40%] -translate-y-1/4 pointer-events-none z-0"
            >
                {/* Glow effect behind the image */}
                <div className="absolute -inset-20 bg-gradient-to-r from-purple-600/30 via-blue-600/20 to-cyan-600/30 blur-3xl opacity-60" />

                {/* The hero image */}
                <div className="relative max-w-7xl mx-auto px-4">
                    <img
                        src="/powerapps-studio-hero.png"
                        alt="Power Apps Studio UI showing components, data connectors, screen templates, and YAML code"
                        className="w-full h-auto"
                    />
                </div>

                {/* Top fade */}
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/80 to-transparent" />

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/90 to-transparent" />
            </motion.div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient Orbs */}
                <GradientOrb
                    color="purple"
                    size="lg"
                    className="top-0 -left-48 opacity-30"
                />
                <GradientOrb
                    color="blue"
                    size="md"
                    className="bottom-0 right-0 opacity-20"
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

                {/* Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
            </div>

            {/* Content - Above the background image */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 lg:pt-32">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100/90 dark:bg-[#1a1a1a]/90 border border-gray-200 dark:border-[#333] rounded-full text-sm text-gray-600 dark:text-[#a1a1a1] mb-8 backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span>{totalCount}+ Power Apps Components</span>
                        <span className="w-px h-4 bg-gray-300 dark:bg-[#333]" />
                        <span className="text-purple-500 font-medium">{freeCount} Free</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.1] tracking-tight"
                    >
                        Power Apps Components
                        <br />
                        <span className="text-gradient-blue">Copy-Paste Ready</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gray-600 dark:text-[#a1a1a1] mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        The largest library of tested YAML components. Build beautiful
                        canvas apps in minutes, not hours.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/library"
                            className="btn-gradient text-lg px-8 py-4 inline-flex items-center justify-center gap-2 group"
                        >
                            Browse Library
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/docs"
                            className="px-8 py-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100/90 dark:bg-[#1a1a1a]/90 border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-[#262626] transition-colors text-lg backdrop-blur-md"
                        >
                            View Documentation
                        </Link>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-wrap gap-8 justify-center mt-16 text-sm text-gray-500 dark:text-[#6b6b6b]"
                    >
                        <div className="flex items-center gap-2 bg-white/50 dark:bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Check className="w-4 h-4 text-green-500" />
                            </div>
                            <span>Tested & Verified</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/50 dark:bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Copy className="w-4 h-4 text-blue-500" />
                            </div>
                            <span>Copy-Paste YAML</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/50 dark:bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-purple-500" />
                            </div>
                            <span>Instant Use</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/50 dark:bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-orange-500" />
                            </div>
                            <span>Best Practices</span>
                        </div>
                    </motion.div>
                </div>

                {/* Spacer for the background image to show through */}
                <div className="h-[60vh] sm:h-[70vh]" />
            </div>
        </section>
    );
}

