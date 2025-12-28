"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight, TrendingUp, TrendingDown, Box, Layers, Users, Star, Activity, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { MiniChart } from "./mini-chart";

// Icon registry for server-to-client component communication
const iconRegistry: Record<string, LucideIcon> = {
    Box,
    Layers,
    Users,
    Star,
    Activity,
    BarChart3,
    TrendingUp,
};

const colorHexMap = {
    blue: "#3b82f6",
    purple: "#8b5cf6",
    green: "#22c55e",
    orange: "#f97316",
};

interface StatCardProps {
    title: string;
    value: number;
    iconName: string;
    color: "blue" | "purple" | "green" | "orange";
    href?: string;
    change?: number;
    trend?: "up" | "down" | "neutral";
    delay?: number;
    sparklineData?: number[];
}

const colorMap = {
    blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-500",
        border: "border-blue-500/20",
        glow: "shadow-blue-500/10",
    },
    purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-500",
        border: "border-purple-500/20",
        glow: "shadow-purple-500/10",
    },
    green: {
        bg: "bg-green-500/10",
        text: "text-green-500",
        border: "border-green-500/20",
        glow: "shadow-green-500/10",
    },
    orange: {
        bg: "bg-orange-500/10",
        text: "text-orange-500",
        border: "border-orange-500/20",
        glow: "shadow-orange-500/10",
    },
};

function useCountUp(end: number, duration: number = 1000, delay: number = 0) {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const animate = (timestamp: number) => {
                if (!startTimeRef.current) startTimeRef.current = timestamp;
                const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                countRef.current = Math.floor(easeOut * end);
                setCount(countRef.current);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }, delay);

        return () => clearTimeout(timeout);
    }, [end, duration, delay]);

    return count;
}

export function StatCard({
    title,
    value,
    iconName,
    color,
    href,
    change,
    trend = "neutral",
    delay = 0,
    sparklineData,
}: StatCardProps) {
    const colors = colorMap[color];
    const colorHex = colorHexMap[color];
    const animatedValue = useCountUp(value, 1200, delay);
    const Icon = iconRegistry[iconName] || Box;

    const content = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay / 1000 }}
            className={`group relative p-6 rounded-xl bg-[#0a0a0a] border border-[#262626] hover:border-[#333] transition-all duration-300 overflow-hidden ${href ? 'cursor-pointer' : ''}`}
        >
            {/* Subtle gradient overlay on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colors.bg}`} />

            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-[#6b6b6b] text-sm font-medium">{title}</p>
                        <p className="text-4xl font-bold text-white mt-2 tabular-nums">
                            {animatedValue.toLocaleString()}
                        </p>

                        {/* Change indicator */}
                        {change !== undefined && (
                            <div className="flex items-center gap-1 mt-2">
                                {trend === "up" && (
                                    <TrendingUp className="w-3 h-3 text-green-500" />
                                )}
                                {trend === "down" && (
                                    <TrendingDown className="w-3 h-3 text-red-500" />
                                )}
                                <span className={`text-xs font-medium ${trend === "up" ? "text-green-500" :
                                        trend === "down" ? "text-red-500" :
                                            "text-[#6b6b6b]"
                                    }`}>
                                    {change > 0 ? "+" : ""}{change}%
                                </span>
                                <span className="text-xs text-[#6b6b6b]">vs last month</span>
                            </div>
                        )}
                    </div>
                    <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border shadow-lg ${colors.glow}`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                </div>

                {/* Sparkline Chart */}
                {sparklineData && sparklineData.length > 0 && (
                    <div className="mt-4 -mx-2">
                        <MiniChart data={sparklineData} color={colorHex} height={32} />
                    </div>
                )}

                {href && (
                    <div className="flex items-center gap-1 mt-4 text-sm text-[#6b6b6b] group-hover:text-white transition-colors">
                        View all
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                )}
            </div>
        </motion.div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
}
