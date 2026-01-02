"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryIcon } from "@/components/category-icons";

interface Category {
    id: string;
    name: string;
    slug: string;
    componentsCount: number;
    freeCount: number;
}

interface CategoryGridProps {
    categories: Category[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut" as const,
        },
    },
};

export function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <section className="py-24 border-t border-gray-200 dark:border-[#1a1a1a]">
            <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-end justify-between mb-10"
                >
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Browse by Category
                        </h2>
                        <p className="text-gray-500 dark:text-[#6b6b6b]">
                            {categories.reduce((sum, c) => sum + c.componentsCount, 0)}+ components across {categories.length} categories
                        </p>
                    </div>
                    <Link
                        href="/library"
                        className="hidden sm:inline-flex items-center gap-2 text-gray-900 dark:text-white text-sm font-medium hover:text-gray-600 dark:hover:text-[#a1a1a1] transition-colors"
                    >
                        View All
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Category Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {categories.map((category) => {
                        const IconComponent = getCategoryIcon(category.slug);
                        return (
                            <motion.div key={category.id} variants={itemVariants}>
                                <Link
                                    href={`/library/${category.slug}`}
                                    className="block group relative overflow-hidden"
                                >
                                    <div className="p-5 h-full rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-[#262626] hover:border-gray-300 dark:hover:border-[#333] transition-all duration-300">
                                        {/* Icon with gradient background on hover */}
                                        <div className="relative mb-4">
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                            <IconComponent className="relative w-8 h-8 text-gray-400 dark:text-[#6b6b6b] group-hover:text-blue-600 dark:group-hover:text-white transition-colors duration-300" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-[#6b6b6b] mt-1">
                                            {category.componentsCount} components
                                        </p>

                                        {/* Free badge */}
                                        {category.freeCount > 0 && (
                                            <span className="inline-block mt-3 badge badge-free">
                                                {category.freeCount} Free
                                            </span>
                                        )}

                                        {/* Arrow indicator on hover */}
                                        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                            <ArrowRight className="w-4 h-4 text-gray-900 dark:text-white" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
