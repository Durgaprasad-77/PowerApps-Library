"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatItemProps {
    value: number;
    label: string;
    suffix?: string;
    prefix?: string;
}

function AnimatedNumber({
    value,
    suffix = "",
    prefix = ""
}: {
    value: number;
    suffix?: string;
    prefix?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            const duration = 1500;
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplayValue(Math.floor(value * eased));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {prefix}{displayValue}{suffix}
        </span>
    );
}

function StatItem({ value, label, suffix = "", prefix = "" }: StatItemProps) {
    return (
        <div className="text-center p-6">
            <div className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                <AnimatedNumber value={value} suffix={suffix} prefix={prefix} />
            </div>
            <div className="text-gray-500 dark:text-[#6b6b6b] text-sm">{label}</div>
        </div>
    );
}

const stats = [
    { value: 50, suffix: "+", label: "Components" },
    { value: 8, label: "Categories" },
    { value: 100, suffix: "%", label: "Tested" },
    { value: 5, suffix: "k+", label: "Lines of YAML" },
];

export function StatsSection() {
    return (
        <section className="py-16 border-t border-gray-200 dark:border-[#1a1a1a]">
            <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group"
                        >
                            {/* Gradient border on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative bg-white dark:bg-[#111] border border-gray-200 dark:border-[#262626] rounded-xl group-hover:border-gray-300 dark:group-hover:border-[#333] transition-colors">
                                <StatItem {...stat} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
