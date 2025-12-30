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
        <section className="relative">
            {products.map((product, index) => {
                const Icon = product.icon;
                const isEven = index % 2 === 0;

                return (
                    <div
                        key={product.id}
                        className="py-24 lg:py-32 border-t border-border"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}>
                                {/* Text content */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                    className={isEven ? "" : "lg:col-start-2"}
                                >
                                    {/* Icon badge */}
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 ring-1 ring-border">
                                        <Icon className="w-7 h-7 text-primary" />
                                    </div>

                                    {/* Tagline */}
                                    <div className="text-sm font-medium text-primary mb-2">
                                        {product.tagline}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                                        {product.name}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-lg text-muted-foreground mb-8 max-w-md">
                                        {product.description}
                                    </p>

                                    {/* CTA */}
                                    <Link
                                        href={product.href}
                                        className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
                                    >
                                        Explore {product.name}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>

                                {/* Visual */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                                    className={isEven ? "" : "lg:col-start-1 lg:row-start-1"}
                                >
                                    {product.visual}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
