"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Copy, Shield, Check, Zap, ChevronRight } from "lucide-react";
import { GradientOrb } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
    totalCount: number;
    freeCount: number;
}

export function HeroSection({ totalCount, freeCount }: HeroSectionProps) {
    return (
        <section className="relative min-h-[110vh] flex flex-col items-center justify-start overflow-hidden pt-32 sm:pt-40 lg:pt-48">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Main Gradient Mesh */}
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full opacity-50 mix-blend-screen" />
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full opacity-30 mix-blend-screen" />

                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
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
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group cursor-pointer"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            v2.0 is now live
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-8 text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 max-w-5xl mx-auto leading-[1.1] sm:leading-[1.15]"
                >
                    Build Power Apps <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-indigo-400 to-indigo-500">
                        at warp speed.
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                >
                    The largest library of copy-paste ready YAML components.
                    Stop rebuilding buttons. Start shipping apps.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
                >
                    <Button
                        asChild
                        size="lg"
                        className="h-12 px-8 text-base bg-[#5E6AD2] hover:bg-[#4e5ac0] text-white shadow-[0_0_20px_rgba(94,106,210,0.3)] hover:shadow-[0_0_30px_rgba(94,106,210,0.5)] transition-all rounded-full"
                    >
                        <Link href="/library" className="group">
                            Explore Components
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="ghost"
                        size="lg"
                        className="h-12 px-8 text-base text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full"
                    >
                        <Link href="/docs">
                            Read Documentation
                        </Link>
                    </Button>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="relative w-full max-w-[1200px] mt-20 perspective-[2000px]"
                >
                    {/* Visual Container */}
                    <div className="relative rounded-xl bg-[#0B0C0E]/50 border border-white/10 backdrop-blur-sm p-2 shadow-2xl transform rotateX-[5deg]">
                        {/* Glow behind visual */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-2xl -z-10 rounded-[2rem]" />

                        <div className="relative rounded-lg overflow-hidden bg-[#0F1115] aspect-[16/10] border border-white/5">
                            <img
                                src="/powerapps-studio-hero.png"
                                alt="Power Apps Studio UI"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay Gradient at Bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent opacity-80" />
                        </div>
                    </div>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/5 pt-12 max-w-4xl w-full"
                >
                    {[
                        { label: "Components", value: `${totalCount}+` },
                        { label: "Free Items", value: `${freeCount}` },
                        { label: "Copy-Paste", value: "100%" },
                        { label: "Updates", value: "Weekly" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="text-2xl sm:text-3xl font-bold text-foreground">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
