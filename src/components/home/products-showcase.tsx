"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers, FileCode, PaintBucket, Sparkles, Palette, Wand2, LayoutTemplate, Copy, Check } from "lucide-react";
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
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#0a0a0a] border border-[#262626] overflow-hidden">
            {/* Editor header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626] bg-[#111]">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-[#6b6b6b]">GradientButton.yaml</span>
            </div>

            {/* Code preview */}
            <div className="p-4 font-mono text-sm">
                <div className="text-[#6b6b6b]"># Power Apps YAML</div>
                <div><span className="text-purple-400">- Button:</span></div>
                <div className="pl-4"><span className="text-blue-400">Control:</span> <span className="text-green-400">Button@0.0.45</span></div>
                <div className="pl-4"><span className="text-blue-400">Properties:</span></div>
                <div className="pl-8"><span className="text-yellow-400">Text:</span> <span className="text-green-400">=&quot;Click Me&quot;</span></div>
                <div className="pl-8"><span className="text-yellow-400">Fill:</span> <span className="text-green-400">=RGBA(99,102,241,1)</span></div>
            </div>

            {/* Copy button */}
            <button
                onClick={handleCopy}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Code"}
            </button>
        </div>
    );
}

// YAML Studio visual
function YAMLStudioVisual() {
    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#0a0a0a] border border-[#262626] overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2">
                {/* Editor side */}
                <div className="border-r border-[#262626] p-4">
                    <div className="text-xs text-[#6b6b6b] mb-2">YAML Editor</div>
                    <div className="space-y-1 font-mono text-xs">
                        <div className="text-purple-400">- Container:</div>
                        <div className="pl-2 text-blue-400">Control: GroupContainer</div>
                        <div className="pl-2 text-yellow-400">Fill: =RGBA(0,0,0,1)</div>
                    </div>
                </div>
                {/* Preview side */}
                <div className="p-4 flex items-center justify-center">
                    <div className="text-xs text-[#6b6b6b] absolute top-4 right-4">Live Preview</div>
                    <div className="w-24 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                        Preview
                    </div>
                </div>
            </div>
        </div>
    );
}

// Backgrounds visual
function BackgroundsVisual() {
    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 animate-gradient-slow" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_40%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-2">Aurora</div>
                    <div className="text-sm opacity-80">Animated gradient background</div>
                </div>
            </div>
        </div>
    );
}

// Icons visual
function IconsVisual() {
    const icons = [
        "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    ];

    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#0a0a0a] border border-[#262626] overflow-hidden p-6">
            <div className="grid grid-cols-4 gap-4">
                {icons.map((path, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-[#1a1a1a] border border-[#262626] flex items-center justify-center group hover:border-purple-500 transition-colors">
                        <svg className="w-8 h-8 text-[#6b6b6b] group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={path} />
                        </svg>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="text-sm text-[#6b6b6b]">1,200+ Fluent 2 Icons</span>
                <span className="text-sm text-purple-400">Customizable colors</span>
            </div>
        </div>
    );
}

// Theme Builder visual
function ThemeBuilderVisual() {
    const colors = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"];

    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#0a0a0a] border border-[#262626] overflow-hidden p-6">
            <div className="text-xs text-[#6b6b6b] mb-4">Theme Colors</div>
            <div className="flex gap-3 mb-6">
                {colors.map((color, i) => (
                    <div
                        key={i}
                        className="w-12 h-12 rounded-xl cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-20 h-8 rounded bg-[#1a1a1a]" />
                    <div className="flex-1 h-8 rounded bg-gradient-to-r from-indigo-500 to-purple-500" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-20 h-8 rounded bg-[#1a1a1a]" />
                    <div className="flex-1 h-8 rounded bg-[#262626]" />
                </div>
            </div>
        </div>
    );
}

// AI Generator visual
function AIGeneratorVisual() {
    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#0a0a0a] border border-[#262626] overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-4">
                <Wand2 className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-white">AI Component Generator</span>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#262626]">
                <div className="text-sm text-[#6b6b6b] mb-2">Prompt:</div>
                <div className="text-white text-sm">&quot;Create a modern card with avatar, title, and action buttons&quot;</div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-[#262626] overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
                </div>
                <span className="text-xs text-[#6b6b6b]">Generating...</span>
            </div>
        </div>
    );
}

// Templates visual
function TemplatesVisual() {
    return (
        <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#0a0a0a] border border-[#262626] overflow-hidden p-4">
            <div className="grid grid-cols-2 gap-3 h-full">
                {["Dashboard", "Settings", "Profile", "Login"].map((name, i) => (
                    <div key={name} className="rounded-xl bg-[#1a1a1a] border border-[#262626] p-3 hover:border-[#333] transition-colors">
                        <div className="w-full h-16 rounded-lg bg-gradient-to-br from-[#262626] to-[#1a1a1a] mb-2" />
                        <div className="text-xs font-medium text-white">{name}</div>
                        <div className="text-xs text-[#6b6b6b]">Template</div>
                    </div>
                ))}
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
                        className="py-24 lg:py-32 border-t border-gray-200 dark:border-[#1a1a1a]"
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
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} mb-6`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Tagline */}
                                    <div className="text-sm font-medium text-purple-500 dark:text-purple-400 mb-2">
                                        {product.tagline}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                        {product.name}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-lg text-gray-600 dark:text-[#a1a1a1] mb-8 max-w-md">
                                        {product.description}
                                    </p>

                                    {/* CTA */}
                                    <Link
                                        href={product.href}
                                        className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
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
