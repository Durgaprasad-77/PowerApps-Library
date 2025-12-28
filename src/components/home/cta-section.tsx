"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { GradientOrb } from "@/components/ui/motion";

export function CTASection() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <GradientOrb
                    color="purple"
                    size="lg"
                    className="-bottom-48 left-1/2 -translate-x-1/2 opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent to-white dark:to-[#0a0a0a]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-8">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Ready to Build{" "}
                        <span className="text-gradient-blue">Beautiful Apps</span>?
                    </h2>

                    {/* Subheadline */}
                    <p className="text-gray-500 dark:text-[#6b6b6b] text-lg mb-10 max-w-xl mx-auto">
                        Start with our free components and experience the difference.
                        No signup required.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/library"
                            className="btn-gradient text-lg px-8 py-4 inline-flex items-center justify-center gap-2 group"
                        >
                            Browse Free Components
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="px-8 py-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-[#262626] transition-colors text-lg"
                        >
                            View Pricing
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
