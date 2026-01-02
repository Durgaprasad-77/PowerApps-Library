"use client";

import { motion } from "framer-motion";
import { Layers, FileCode, PaintBucket, Sparkles, Palette, Wand2, LayoutTemplate, Home, Settings, Bell, User, Heart, Zap, Search, Calendar, Cloud, Copy } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

// ===== ANIMATED BACKGROUND VISUALS =====

// Components Card Background - Marquee of component previews
function ComponentsBackground() {
    const components = [
        { name: "Button", color: "from-violet-500 to-fuchsia-500" },
        { name: "Toggle", color: "from-emerald-500 to-teal-500" },
        { name: "Input", color: "from-blue-500 to-cyan-500" },
        { name: "Card", color: "from-orange-500 to-amber-500" },
        { name: "Badge", color: "from-pink-500 to-rose-500" },
    ];

    return (
        <div className="absolute inset-0 flex flex-col gap-3 pt-20 px-4 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_20%,#000_60%,transparent_100%)]">
            {/* Row 1 */}
            <motion.div
                className="flex gap-3"
                animate={{ x: [0, -200] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {[...components, ...components, ...components].map((comp, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-32 h-20 rounded-xl bg-neutral-900/80 border border-neutral-800 p-3 backdrop-blur-sm"
                    >
                        <div className={`w-16 h-6 rounded-md bg-gradient-to-r ${comp.color} mb-2`} />
                        <div className="text-[10px] text-neutral-500">{comp.name}</div>
                    </div>
                ))}
            </motion.div>
            {/* Row 2 */}
            <motion.div
                className="flex gap-3"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                {[...components.reverse(), ...components, ...components].map((comp, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-28 h-16 rounded-xl bg-neutral-900/60 border border-neutral-800/50 p-2 backdrop-blur-sm"
                    >
                        <div className={`w-12 h-4 rounded bg-gradient-to-r ${comp.color} mb-1.5`} />
                        <div className="text-[9px] text-neutral-600">{comp.name}</div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// Icons Card Background - Scrolling icon grid
function IconsBackground() {
    const icons = [Home, Settings, Bell, User, Heart, Zap, Search, Calendar, Cloud, Copy];

    return (
        <div className="absolute inset-0 flex items-center justify-center pt-10 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_30%,#000_70%,transparent_100%)]">
            <motion.div
                className="grid grid-cols-5 gap-4 opacity-40 group-hover:opacity-60 transition-opacity"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                {[...icons, ...icons].map((Icon, i) => (
                    <div
                        key={i}
                        className="w-10 h-10 rounded-lg bg-neutral-800/50 border border-neutral-700/30 flex items-center justify-center"
                    >
                        <Icon className="w-5 h-5 text-neutral-400" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// Backgrounds Card Background - Aurora animation
function BackgroundsBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,#000_40%,#000_80%,transparent_100%)]">
            {/* Floating orbs */}
            <motion.div
                className="absolute w-32 h-32 rounded-full bg-violet-500/30 blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ top: "20%", left: "10%" }}
            />
            <motion.div
                className="absolute w-40 h-40 rounded-full bg-fuchsia-500/20 blur-3xl"
                animate={{
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ top: "30%", right: "10%" }}
            />
            <motion.div
                className="absolute w-24 h-24 rounded-full bg-cyan-500/25 blur-2xl"
                animate={{
                    x: [0, 30, 0],
                    y: [0, 20, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ bottom: "30%", left: "30%" }}
            />
        </div>
    );
}

// Theme Builder Card Background - Color palette cycling
function ThemeBuilderBackground() {
    const palettes = [
        ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef"],
        ["#f43f5e", "#fb7185", "#fda4af", "#fecdd3"],
        ["#22c55e", "#4ade80", "#86efac", "#bbf7d0"],
        ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"],
    ];

    return (
        <div className="absolute inset-0 flex items-center justify-center pt-16 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_40%,#000_80%,transparent_100%)]">
            <div className="flex gap-3">
                {palettes[0].map((color, i) => (
                    <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full shadow-lg"
                        style={{ backgroundColor: color }}
                        animate={{
                            scale: [1, 1.1, 1],
                            y: [0, -5, 0],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

// Templates Card Background - Stacked floating cards
function TemplatesBackground() {
    const templates = ["Dashboard", "Settings", "Profile"];

    return (
        <div className="absolute inset-0 flex items-center justify-center pt-8 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_30%,#000_70%,transparent_100%)]">
            <div className="relative w-40 h-48">
                {templates.map((name, i) => (
                    <motion.div
                        key={name}
                        className="absolute inset-0 rounded-xl bg-neutral-900 border border-neutral-800 p-3 shadow-xl"
                        style={{
                            zIndex: templates.length - i,
                            transformOrigin: "center bottom",
                        }}
                        animate={{
                            y: i * 8,
                            scale: 1 - i * 0.05,
                            rotate: i * 2,
                        }}
                        whileHover={{
                            y: i * 8 - 5,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                    >
                        <div className="w-full h-16 rounded-lg bg-neutral-800/50 mb-2" />
                        <div className="h-2 w-16 bg-neutral-700 rounded-full mb-1.5" />
                        <div className="h-2 w-10 bg-neutral-800 rounded-full" />
                        <div className="absolute bottom-2 left-3 text-[9px] text-neutral-500">{name}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// YAML Studio Background (Upcoming) - Code editor mockup
function YAMLStudioBackground() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pt-16 opacity-30 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_40%,#000_80%,transparent_100%)]">
            <div className="w-48 h-32 rounded-lg bg-neutral-900 border border-neutral-800 p-3 font-mono text-[8px] text-neutral-600">
                <div className="mb-1"><span className="text-purple-400/50">Button:</span></div>
                <div className="ml-2 mb-1"><span className="text-blue-400/50">Control:</span> Button</div>
                <div className="ml-2"><span className="text-blue-400/50">Properties:</span></div>
                <div className="ml-4"><span className="text-yellow-400/50">Text:</span> "Submit"</div>
            </div>
        </div>
    );
}

// AI Generator Background (Upcoming) - Chat bubbles
function AIGeneratorBackground() {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 gap-2 opacity-30 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_40%,#000_80%,transparent_100%)]">
            <div className="w-36 px-3 py-2 rounded-xl rounded-br-sm bg-neutral-800 text-[9px] text-neutral-500 self-end mr-8">
                Create a gradient button...
            </div>
            <div className="w-40 px-3 py-2 rounded-xl rounded-bl-sm bg-neutral-900 border border-neutral-800 text-[9px] text-neutral-600 self-start ml-8">
                <span className="text-violet-400/50">✨</span> Generating YAML...
            </div>
        </div>
    );
}

// ===== FEATURE DEFINITIONS =====

const features = [
    {
        Icon: Layers,
        name: "Components",
        description: "The largest library of copy-paste ready YAML components for Power Apps. Buttons, inputs, cards, and more.",
        href: "/library",
        cta: "Browse Library",
        className: "md:col-span-2",
        background: <ComponentsBackground />,
    },
    {
        Icon: Sparkles,
        name: "Icons",
        description: "1,200+ Fluent 2 icons with customizable colors and animations.",
        href: "/products/icons",
        cta: "Explore Icons",
        className: "md:col-span-1",
        background: <IconsBackground />,
    },
    {
        Icon: PaintBucket,
        name: "Backgrounds",
        description: "Dynamic animated backgrounds including aurora, gradients, and particles.",
        href: "/products/backgrounds",
        cta: "View Backgrounds",
        className: "md:col-span-1",
        background: <BackgroundsBackground />,
    },
    {
        Icon: Palette,
        name: "Theme Builder",
        description: "Create custom color palettes and export them as Power Apps-ready variables.",
        href: "/products/theme-builder",
        cta: "Build Theme",
        className: "md:col-span-1",
        background: <ThemeBuilderBackground />,
    },
    {
        Icon: LayoutTemplate,
        name: "Templates",
        description: "Ready-to-use app templates with multiple screens. Login flows, dashboards, and more.",
        href: "/products/templates",
        cta: "Get Templates",
        className: "md:col-span-1",
        background: <TemplatesBackground />,
    },
    {
        Icon: FileCode,
        name: "YAML Studio",
        description: "Build and preview components with live editing and instant feedback.",
        href: "/products/yaml-studio",
        cta: "Open Studio",
        className: "md:col-span-1",
        background: <YAMLStudioBackground />,
        isUpcoming: true,
    },
    {
        Icon: Wand2,
        name: "AI Generator",
        description: "Describe what you need in plain English. Let AI create the YAML code for you.",
        href: "/products/ai-generator",
        cta: "Try AI",
        className: "md:col-span-2",
        background: <AIGeneratorBackground />,
        isUpcoming: true,
    },
];

// ===== MAIN COMPONENT =====

export function ProductsShowcase() {
    return (
        <section className="relative py-24 bg-black">
            <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
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
                <BentoGrid className="max-w-5xl mx-auto">
                    {features.map((feature) => (
                        <BentoCard key={feature.name} {...feature} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
