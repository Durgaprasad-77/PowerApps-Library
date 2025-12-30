"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers, FileCode, PaintBucket, Sparkles, Palette, Wand2, LayoutTemplate, Copy, Check, Home, Activity, Settings, Bell, Mail, Star, User, Heart, Shield, Zap, Search, Menu, Calendar, Camera, Cloud, Music, Video, Wifi } from "lucide-react";
import { useState } from "react";

interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    visual: React.ReactNode;
}

// Component preview for Components section
function ComponentsVisual() {
    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, hsl(var(--primary)/0.05) 0%, transparent 70%)"
                }}
            />

            <div className="relative z-10 p-6 w-full max-w-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative group cursor-default"
                >
                    {/* Abstract Code Block Background */}
                    <div className="absolute -inset-4 bg-muted/30 rounded-3xl blur-md group-hover:bg-muted/50 transition-colors duration-500" />

                    <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl">
                        {/* Typing Animation Sequence */}
                        <div className="space-y-3 font-mono text-sm leading-relaxed text-muted-foreground overflow-hidden h-[120px]">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <span className="text-purple-400">Button:</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.0, duration: 0.5 }}
                                className="pl-4"
                            >
                                <span className="text-blue-400">Control:</span> <span className="text-green-400">Button@0.0.45</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                                className="pl-4"
                            >
                                <span className="text-blue-400">Properties:</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2.0, duration: 0.5 }}
                                className="pl-8"
                            >
                                <span className="text-yellow-400">Text:</span> <span className="text-green-400">"Submit"</span>
                            </motion.div>
                        </div>

                        {/* Transformed Component */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5, type: "spring" }}
                            className="mt-6 flex justify-center"
                        >
                            <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg hover:translate-y-[-1px] hover:shadow-xl transition-all active:translate-y-[1px]">
                                Submit
                            </button>
                        </motion.div>

                        {/* Copy Code Action - Appearing */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3 }}
                            className="absolute top-4 right-4"
                        >
                            <div className="p-2 rounded-lg bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                <Copy className="w-3.5 h-3.5" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// YAML Studio visual
function YAMLStudioVisual() {
    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, hsl(var(--primary)/0.05) 0%, transparent 60%)"
                }}
            />

            <div className="relative w-full max-w-sm flex gap-4 items-center justify-center p-4">
                {/* Editor Side - Animated Scrolling */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-1/2 bg-card/50 backdrop-blur-md border border-border/50 rounded-xl p-3 shadow-xl h-[160px] overflow-hidden relative"
                >
                    <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-card/50 to-transparent z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-card/50 to-transparent z-10" />

                    <motion.div
                        animate={{ y: [0, -100] }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                        className="space-y-2 font-mono text-[10px] text-muted-foreground"
                    >
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="flex gap-2">
                                <span className="text-border">{i + 1}</span>
                                <span className={i % 3 === 0 ? "text-purple-400" : i % 2 === 0 ? "text-blue-400" : "text-foreground"}>
                                    {i % 3 === 0 ? "Control: Button" : "Property: =Value"}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Arrow Connector */}
                <div className="text-muted-foreground/50">
                    <ArrowRight className="w-5 h-5" />
                </div>

                {/* Preview Side - Morphing Component */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-1/2 h-[160px] flex items-center justify-center"
                >
                    <div className="relative w-full h-full bg-card/50 backdrop-blur-md border border-border/50 rounded-xl shadow-xl flex items-center justify-center p-4">
                        <motion.div
                            animate={{
                                borderRadius: ["12px", "50%", "12px"],
                                rotate: [0, 90, 180, 0],
                                scale: [1, 0.8, 1],
                                background: ["#8b5cf6", "#ec4899", "#3b82f6", "#8b5cf6"],
                            }}
                            transition={{
                                duration: 8,
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                            className="w-16 h-16 shadow-lg"
                        />
                        <div className="absolute bottom-3 text-[10px] uppercase tracking-widest text-muted-foreground">Live</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Backgrounds visual
function BackgroundsVisual() {
    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center group">
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            {/* Floating Orbs */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-32 h-32 rounded-full blur-3xl opacity-50"
                    style={{
                        background: i === 0 ? "#8b5cf6" : i === 1 ? "#3b82f6" : "#ec4899",
                        left: `${30 + i * 20}%`,
                        top: `${20 + i * 25}%`,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 2,
                    }}
                />
            ))}

            <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative z-10 text-center p-8 rounded-2xl bg-card/10 backdrop-blur-md border border-white/10 shadow-2xl"
            >
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-2">
                    Aurora
                </div>
                <div className="text-sm text-foreground/80">
                    Animated Gradients
                </div>
            </motion.div>
        </div>
    );
}

// Icons visual
function IconsVisual() {
    const rows = [
        // Row 1
        [Home, Activity, Settings, Bell, Mail, Star],
        // Row 2
        [User, Heart, Shield, Zap, Search, Menu],
        // Row 3
        [Calendar, Camera, Cloud, Music, Video, Wifi],
    ];

    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex flex-col justify-center gap-8">
            {/* Radial fade mask */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, transparent 30%, hsl(var(--background)) 100%)"
                }}
            />

            {rows.map((row, i) => (
                <div key={i} className="relative flex overflow-hidden opacity-50 grayscale transition-opacity duration-300">
                    <motion.div
                        className="flex gap-6 flex-nowrap"
                        animate={{
                            x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                        }}
                        transition={{
                            duration: 25 + i * 2,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {[...row, ...row, ...row, ...row].map((Icon, j) => (
                            <div
                                key={j}
                                className="w-16 h-16 flex-shrink-0 flex items-center justify-center"
                            >
                                <Icon className="w-8 h-8 text-foreground" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            ))}

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                <span className="text-sm font-medium text-foreground bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                    1,200+ Fluent 2 Icons
                </span>
                <span className="text-sm text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
                    Animated
                </span>
            </div>
        </div>
    );
}

// Theme Builder visual
function ThemeBuilderVisual() {
    const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#22c55e"];
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-cycle colors
    useState(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % colors.length);
        }, 2000);
        return () => clearInterval(interval);
    });

    const activeColor = colors[activeIndex];

    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">

            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, hsl(var(--primary)/0.05) 0%, transparent 70%)"
                }}
            />

            <div className="relative w-full max-w-sm bg-card/50 backdrop-blur-md border border-border/50 rounded-xl p-5 shadow-xl transition-all duration-500">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-xs font-medium text-muted-foreground">Theme Builder</div>
                    <div className="flex gap-1.5">
                        {colors.map((color, i) => (
                            <motion.div
                                key={i}
                                className={`w-3 h-3 rounded-full cursor-pointer`}
                                style={{ backgroundColor: color, opacity: i === activeIndex ? 1 : 0.3 }}
                                animate={{ scale: i === activeIndex ? 1.2 : 1 }}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Mock Header */}
                    <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white transition-colors duration-500"
                            style={{ backgroundColor: activeColor }}
                        >
                            <Palette className="w-4 h-4" />
                        </div>
                        <div className="h-2 w-24 bg-muted rounded-full" />
                    </div>

                    {/* Mock Content */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="h-2 w-16 bg-muted rounded-full" />
                            <div
                                className="h-4 w-8 rounded-full opacity-20 transition-colors duration-500"
                                style={{ backgroundColor: activeColor }}
                            />
                        </div>
                        <div className="h-20 w-full rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center relative overflow-hidden group">
                            <motion.div
                                className="absolute inset-0 opacity-10 transition-colors duration-500"
                                style={{ backgroundColor: activeColor }}
                            />
                            <button
                                className="px-4 py-1.5 rounded text-xs font-medium text-white transition-colors duration-500 shadow-md transform group-hover:scale-105"
                                style={{ backgroundColor: activeColor }}
                            >
                                Primary Action
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// AI Generator visual
function AIGeneratorVisual() {
    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, hsl(var(--primary)/0.05) 0%, transparent 70%)"
                }}
            />

            <div className="relative w-full max-w-sm p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-card/50 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-xl"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Wand2 className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-foreground font-medium">AI Agent</span>
                    </div>

                    {/* Chat Bubbles */}
                    <div className="space-y-4">
                        {/* User Message - Animated Typing */}
                        <div className="flex justify-end">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[80%]"
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                >
                                    Create a modern card with avatar...
                                </motion.span>
                            </motion.div>
                        </div>

                        {/* AI Generating State */}
                        <div className="flex justify-start">
                            <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm text-sm max-w-[80%] flex items-center gap-2">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                </motion.div>
                                <span className="text-muted-foreground">Generating component...</span>
                            </div>
                        </div>

                        {/* Generated Result Preview */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            whileInView={{ opacity: 1, height: "auto" }}
                            transition={{ delay: 2.5, duration: 0.5 }}
                            className="bg-background border border-border rounded-lg p-3 mt-2 overflow-hidden"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                                <div className="space-y-1.5 flex-1">
                                    <div className="h-2 w-20 bg-muted rounded-full" />
                                    <div className="h-2 w-16 bg-muted/50 rounded-full" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Templates visual
function TemplatesVisual() {
    const templates = ["Dashboard", "Settings", "Profile"];

    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, hsl(var(--primary)/0.05) 0%, transparent 70%)"
                }}
            />

            <div className="relative h-64 w-full flex items-center justify-center perspective-1000">
                <div className="relative w-48 h-64">
                    {templates.map((name, i) => (
                        <motion.div
                            key={name}
                            className="absolute inset-0 rounded-xl bg-card border border-border/50 shadow-2xl p-4 flex flex-col"
                            style={{
                                zIndex: templates.length - i,
                            }}
                            animate={{
                                y: [i * 10, i * 10 - 10, i * 10],
                                scale: [1 - i * 0.05, 1 - i * 0.05 + 0.02, 1 - i * 0.05],
                                rotate: [i * 2, i * 2 - 1, i * 2],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5,
                            }}
                        >
                            <div className="w-full h-32 rounded-lg bg-gradient-to-br from-muted to-muted/50 mb-3 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10" />
                                {/* Abstract UI lines */}
                                <div className="absolute top-3 left-3 right-3 space-y-2">
                                    <div className="h-2 w-1/3 bg-foreground/10 rounded-full" />
                                    <div className="h-2 w-1/2 bg-foreground/5 rounded-full" />
                                </div>
                            </div>
                            <div className="text-sm font-medium text-foreground">{name}</div>
                            <div className="text-xs text-muted-foreground mt-1">Ready to use</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const products: Product[] = [
    {
        id: "components",
        name: "Components",
        tagline: "Copy-Paste Ready",
        description: "The largest library of tested Power Apps YAML components. Simply copy the code and paste it directly into Power Apps Studio.",
        href: "/library",
        icon: Layers,
        gradient: "from-blue-500 to-cyan-500",
        visual: <ComponentsVisual />,
    },
    {
        id: "yaml-studio",
        name: "YAML Studio",
        tagline: "Build & Preview Live",
        description: "A real-time YAML editor with instant preview. See your components come to life as you type.",
        href: "/products/yaml-studio",
        icon: FileCode,
        gradient: "from-indigo-500 to-purple-500",
        visual: <YAMLStudioVisual />,
    },
    {
        id: "backgrounds",
        name: "Backgrounds",
        tagline: "Dynamic & Animated",
        description: "Beautiful animated backgrounds that bring your apps to life. Aurora, mesh gradients, particles, and more.",
        href: "/products/backgrounds",
        icon: PaintBucket,
        gradient: "from-purple-500 to-pink-500",
        visual: <BackgroundsVisual />,
    },
    {
        id: "icons",
        name: "Icons",
        tagline: "Fluent 2 Library",
        description: "Over 1,200 Fluent 2 icons with customizable colors. Includes animated icons for enhanced interactivity.",
        href: "/products/icons",
        icon: Sparkles,
        gradient: "from-pink-500 to-rose-500",
        visual: <IconsVisual />,
    },
    {
        id: "theme-builder",
        name: "Theme Builder",
        tagline: "Custom Themes",
        description: "Create beautiful color palettes and export them as Power Apps-ready theme variables.",
        href: "/products/theme-builder",
        icon: Palette,
        gradient: "from-orange-500 to-yellow-500",
        visual: <ThemeBuilderVisual />,
    },
    {
        id: "ai-generator",
        name: "AI Generator",
        tagline: "AI-Powered",
        description: "Describe what you need in plain English and let AI generate the Power Apps YAML code for you.",
        href: "/products/ai-generator",
        icon: Wand2,
        gradient: "from-green-500 to-emerald-500",
        visual: <AIGeneratorVisual />,
    },
    {
        id: "templates",
        name: "Templates",
        tagline: "Ready-to-Use",
        description: "Complete app templates with multiple screens. Login flows, dashboards, settings, and more.",
        href: "/products/templates",
        icon: LayoutTemplate,
        gradient: "from-cyan-500 to-blue-500",
        visual: <TemplatesVisual />,
    },
];

export function ProductsShowcase() {
    return (
        <section className="relative py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Everything you need to build
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        From components to AI-powered generation, we've got your Power Apps covered.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Components - Large Card */}
                    <Link href="/library" className="lg:col-span-2 group">
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="h-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                                    <Layers className="w-6 h-6 text-white" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Components</h3>
                            <p className="text-neutral-400 text-sm mb-4">Copy-paste ready YAML for Power Apps. The largest library of tested components.</p>
                            <div className="h-32 bg-neutral-900/50 rounded-lg border border-neutral-800 overflow-hidden">
                                <ComponentsVisual />
                            </div>
                        </motion.div>
                    </Link>

                    {/* YAML Studio - Upcoming */}
                    <div className="group cursor-not-allowed">
                        <div
                            className="h-full bg-neutral-950/50 border border-neutral-800 rounded-xl p-6 opacity-60"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                                    <FileCode className="w-6 h-6 text-neutral-500" />
                                </div>
                                <span className="text-[10px] font-medium px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    Upcoming
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-400 mb-2">YAML Studio</h3>
                            <p className="text-neutral-500 text-sm">Build and preview components with live editing.</p>
                        </div>
                    </div>

                    {/* Backgrounds */}
                    <Link href="/products/backgrounds" className="group">
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="h-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                                    <PaintBucket className="w-6 h-6 text-white" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Backgrounds</h3>
                            <p className="text-neutral-400 text-sm">Dynamic animated backgrounds for your apps.</p>
                        </motion.div>
                    </Link>

                    {/* Icons */}
                    <Link href="/products/icons" className="group">
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="h-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Icons</h3>
                            <p className="text-neutral-400 text-sm">1,200+ Fluent 2 icons with animations.</p>
                        </motion.div>
                    </Link>

                    {/* Theme Builder */}
                    <Link href="/products/theme-builder" className="group">
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="h-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                                    <Palette className="w-6 h-6 text-white" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Theme Builder</h3>
                            <p className="text-neutral-400 text-sm">Create custom color palettes for your apps.</p>
                        </motion.div>
                    </Link>

                    {/* AI Generator - Wide - Upcoming */}
                    <div className="lg:col-span-2 cursor-not-allowed">
                        <div
                            className="h-full bg-neutral-950/50 border border-neutral-800 rounded-xl p-6 opacity-60"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                                    <Wand2 className="w-6 h-6 text-neutral-500" />
                                </div>
                                <span className="text-[10px] font-medium px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    Upcoming
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-400 mb-2">AI Generator</h3>
                            <p className="text-neutral-500 text-sm mb-4">Describe what you need in plain English. Let AI create the YAML.</p>
                        </div>
                    </div>

                    {/* Templates */}
                    <Link href="/products/templates" className="group">
                        <motion.div
                            whileHover={{ y: -2 }}
                            className="h-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                                    <LayoutTemplate className="w-6 h-6 text-white" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Templates</h3>
                            <p className="text-neutral-400 text-sm">Ready-to-use app templates and screens.</p>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
