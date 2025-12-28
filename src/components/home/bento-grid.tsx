"use client";

import { motion } from "framer-motion";
import { Copy, Sparkles, Zap, Smartphone, Code2, MousePointerClick } from "lucide-react";

const features = [
    {
        icon: Copy,
        title: "Copy-Paste Ready",
        description: "Every component is tested YAML code. Just copy and paste directly into Power Apps Studio.",
        gradient: "from-blue-500 to-cyan-500",
        size: "large",
    },
    {
        icon: Sparkles,
        title: "Modern Design",
        description: "Beautiful gradients, smooth animations, and hover effects.",
        gradient: "from-purple-500 to-pink-500",
        size: "small",
    },
    {
        icon: Zap,
        title: "Production Ready",
        description: "Built with Power Apps best practices.",
        gradient: "from-orange-500 to-yellow-500",
        size: "small",
    },
    {
        icon: Smartphone,
        title: "Responsive",
        description: "Works perfectly on any screen size.",
        gradient: "from-green-500 to-emerald-500",
        size: "small",
    },
    {
        icon: MousePointerClick,
        title: "Interactive",
        description: "Hover states, press effects, and animations included.",
        gradient: "from-pink-500 to-rose-500",
        size: "small",
    },
    {
        icon: Code2,
        title: "Clean Code",
        description: "Well-organized, documented YAML that's easy to customize and extend for your needs.",
        gradient: "from-indigo-500 to-blue-500",
        size: "large",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const,
        },
    },
};

export function BentoGrid() {
    return (
        <section className="py-24 border-t border-gray-200 dark:border-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Why Choose{" "}
                        <span className="text-gradient-blue">PowerUI</span>?
                    </h2>
                    <p className="text-gray-500 dark:text-[#6b6b6b] max-w-lg mx-auto">
                        Every component is built with best practices and tested in Power Apps Studio.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        const isLarge = feature.size === "large";

                        return (
                            <motion.div
                                key={feature.title}
                                variants={itemVariants}
                                className={`
                                    group relative overflow-hidden rounded-2xl
                                    bg-white dark:bg-[#111] border border-gray-200 dark:border-[#262626]
                                    p-6 hover:border-gray-300 dark:hover:border-[#333] transition-all duration-300
                                    ${isLarge ? "lg:col-span-2" : ""}
                                `}
                            >
                                {/* Gradient hover effect */}
                                <div className={`
                                    absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500
                                    bg-gradient-to-br ${feature.gradient}
                                `} />

                                {/* Icon */}
                                <div className={`
                                    w-12 h-12 rounded-xl mb-4
                                    bg-gradient-to-br ${feature.gradient}
                                    flex items-center justify-center
                                    group-hover:scale-110 transition-transform duration-300
                                `}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 dark:text-[#6b6b6b] text-sm leading-relaxed group-hover:text-gray-600 dark:group-hover:text-[#8b8b8b] transition-colors">
                                    {feature.description}
                                </p>

                                {/* Subtle glow on hover */}
                                <div className={`
                                    absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl
                                    bg-gradient-to-br ${feature.gradient}
                                    opacity-0 group-hover:opacity-20 transition-opacity duration-500
                                `} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
