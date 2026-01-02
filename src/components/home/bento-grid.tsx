"use client";

import { motion } from "framer-motion";
import { Copy, Sparkles, Zap, Smartphone, Code2, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: Copy,
        title: "Copy-Paste Ready",
        description: "Every component is tested YAML code. Just copy and paste directly into Power Apps Studio.",
        className: "lg:col-span-2",
    },
    {
        icon: Sparkles,
        title: "Modern Design",
        description: "Beautiful gradients, smooth animations, and hover effects.",
        className: "",
    },
    {
        icon: Zap,
        title: "Production Ready",
        description: "Built with Power Apps best practices.",
        className: "",
    },
    {
        icon: Smartphone,
        title: "Responsive",
        description: "Works perfectly on any screen size.",
        className: "",
    },
    {
        icon: MousePointerClick,
        title: "Interactive",
        description: "Hover states, press effects, and animations included.",
        className: "",
    },
    {
        icon: Code2,
        title: "Clean Code",
        description: "Well-organized, documented YAML that's easy to customize and extend for your needs.",
        className: "lg:col-span-2",
    },
];

export function BentoGrid() {
    return (
        <section className="py-32 bg-[#0B0C0E]">
            <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-4 tracking-tight">
                        Quality you can build on.
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Every component is crafted with attention to detail, ensuring reliable performance and easy customization.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className={cn(
                                "group relative p-8 rounded-2xl bg-[#15171B] border border-white/5 hover:border-white/10 transition-colors overflow-hidden",
                                feature.className
                            )}
                        >
                            {/* Hover Inner Glow */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ pointerEvents: 'none' }}
                            />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-white/10 group-hover:bg-white/10">
                                    <feature.icon className="w-6 h-6 text-indigo-400" />
                                </div>

                                <h3 className="text-lg font-medium text-foreground mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
