"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { Spotlight } from "@/components/ui/spotlight";

interface HeroSectionProps {
    totalCount: number;
    freeCount: number;
}

// Premium component preview cards with impressive animations
const premiumPreviews = [
    {
        name: "Gradient Shimmer Button",
        preview: (
            <div className="relative px-6 py-2.5 rounded-xl overflow-hidden bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                <span className="text-white font-semibold text-sm relative z-10">Get Started</span>
            </div>
        ),
    },
    {
        name: "Glassmorphism Card",
        preview: (
            <div className="w-32 h-20 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 p-3 shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                    <div className="h-2 w-12 bg-white/40 rounded-full" />
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full" />
                <div className="h-1.5 w-3/4 bg-white/10 rounded-full mt-1" />
            </div>
        ),
    },
    {
        name: "Neon Glow Badge",
        preview: (
            <div className="flex gap-2">
                <span className="px-3 py-1 text-[11px] font-bold rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    PREMIUM
                </span>
                <span className="px-3 py-1 text-[11px] font-bold rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    NEW
                </span>
            </div>
        ),
    },
    {
        name: "Animated Progress",
        preview: (
            <div className="w-28">
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full"
                        animate={{ width: ["0%", "75%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
                <div className="flex justify-between mt-1.5">
                    <span className="text-[9px] text-neutral-500">Loading</span>
                    <span className="text-[9px] text-white/70">75%</span>
                </div>
            </div>
        ),
    },
    {
        name: "Ripple Button",
        preview: (
            <div className="relative px-5 py-2 rounded-lg bg-white text-black font-medium text-sm overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-black/20 rounded-full scale-0"
                    animate={{ scale: [0, 2.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ transformOrigin: "center" }}
                />
                Click Me
            </div>
        ),
    },
    {
        name: "Floating Avatar Stack",
        preview: (
            <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-black"
                        style={{
                            background: `linear-gradient(135deg, ${['#f97316', '#8b5cf6', '#06b6d4', '#22c55e'][i]} 0%, ${['#facc15', '#ec4899', '#3b82f6', '#14b8a6'][i]} 100%)`,
                            zIndex: 4 - i,
                        }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    />
                ))}
                <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-black flex items-center justify-center text-[10px] text-white font-medium">
                    +12
                </div>
            </div>
        ),
    },
    {
        name: "Skeleton Loader",
        preview: (
            <div className="w-28 space-y-2">
                <div className="h-3 w-full bg-neutral-800 rounded animate-pulse" />
                <div className="h-3 w-3/4 bg-neutral-800 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-neutral-800 rounded animate-pulse" />
            </div>
        ),
    },
    {
        name: "Toggle Pro",
        preview: (
            <div className="flex items-center gap-3">
                <motion.div
                    className="w-14 h-7 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full p-1 flex"
                    animate={{ justifyContent: ["flex-start", "flex-end", "flex-start"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div className="w-5 h-5 bg-white rounded-full shadow-lg" />
                </motion.div>
            </div>
        ),
    },
    {
        name: "Notification Bell",
        preview: (
            <div className="relative">
                <motion.div
                    className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </motion.div>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                    3
                </span>
            </div>
        ),
    },
    {
        name: "Chart Mini",
        preview: (
            <div className="flex items-end gap-1 h-12">
                {[40, 65, 30, 80, 50, 95, 60].map((h, i) => (
                    <motion.div
                        key={i}
                        className="w-2 rounded-sm bg-gradient-to-t from-violet-600 to-fuchsia-400"
                        animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.5}%`] }}
                        transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                    />
                ))}
            </div>
        ),
    },
];

function PremiumPreviewCard({ name, preview }: { name: string; preview: React.ReactNode }) {
    return (
        <div className="flex-shrink-0 w-44 h-28 bg-neutral-900/90 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-neutral-700 hover:bg-neutral-900 transition-all group">
            <div className="flex items-center justify-center flex-1">
                {preview}
            </div>
            <span className="text-[10px] text-neutral-500 font-medium group-hover:text-neutral-400 transition-colors">{name}</span>
        </div>
    );
}

export function HeroSection({ totalCount, freeCount }: HeroSectionProps) {
    return (
        <section className="relative min-h-[100vh] flex flex-col items-center justify-start overflow-hidden pt-32 sm:pt-40 lg:pt-48 bg-black">
            {/* Background - Subtle grid pattern */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Spotlight Effect */}
                <Spotlight
                    className="-top-96 -left-40 md:-top-80 md:left-0"
                    fill="white"
                />

                {/* Radial gradient for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)]" />

                {/* Grid pattern - Linear style */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

                {/* Announcement Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/library"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors group cursor-pointer"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                            v2.0 is now live
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
                    </Link>
                </motion.div>

                {/* Headline - Animated Text Flip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-8 flex flex-col items-center"
                >
                    <LayoutTextFlip
                        text="Make your Power Apps look 10x"
                        words={["awesome", "better", "modern", "beautiful"]}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2]"
                        textClassName="text-white"
                        duration={2500}
                    />
                </motion.div>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Copy paste beautiful YAML components into your canvas apps.
                    No more struggling with design — just build and ship.
                </motion.p>

                {/* CTAs - Monochrome */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
                >
                    <Button
                        asChild
                        size="lg"
                        className="h-12 px-8 text-base bg-white text-black hover:bg-neutral-200 font-medium rounded-full transition-colors"
                    >
                        <Link href="/library" className="group">
                            Explore Components
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="h-12 px-8 text-base text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 rounded-full transition-colors"
                    >
                        <Link href="/docs">
                            Read Documentation
                        </Link>
                    </Button>
                </motion.div>

                {/* Scroll Velocity Component Showcase - Constrained Width */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative w-full max-w-5xl mt-16 rounded-2xl overflow-hidden"
                >
                    <ScrollVelocityContainer className="py-6">
                        {/* Row 1 - Left to Right */}
                        <ScrollVelocityRow baseVelocity={2} direction={1} className="mb-3">
                            {premiumPreviews.slice(0, 5).map((component, index) => (
                                <PremiumPreviewCard key={index} {...component} />
                            ))}
                        </ScrollVelocityRow>

                        {/* Row 2 - Right to Left */}
                        <ScrollVelocityRow baseVelocity={2} direction={-1}>
                            {premiumPreviews.slice(5).map((component, index) => (
                                <PremiumPreviewCard key={index} {...component} />
                            ))}
                        </ScrollVelocityRow>
                    </ScrollVelocityContainer>

                    {/* Gradient overlays for smooth edges */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-neutral-800 pt-12 max-w-4xl w-full"
                >
                    {[
                        { label: "Components", value: `${totalCount}+` },
                        { label: "Free Items", value: `${freeCount}` },
                        { label: "Copy-Paste", value: "100%" },
                        { label: "Updates", value: "Weekly" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white">
                                {stat.value}
                            </div>
                            <div className="text-sm text-neutral-500 mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

