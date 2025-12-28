"use client";

import { motion } from "framer-motion";
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, RadialBarChart, RadialBar
} from "recharts";
import { Box, Layers, Users, Star, TrendingUp, Sparkles } from "lucide-react";

interface AnalyticsDashboardProps {
    stats: {
        totalComponents: number;
        totalCategories: number;
        totalUsers: number;
        proComponents: number;
        freeComponents: number;
        newComponents: number;
    };
    categoryDistribution: { name: string; components: number; slug: string }[];
    proFreeDistribution: { name: string; value: number; color: string }[];
    newVsExisting: { name: string; value: number; color: string }[];
    componentsByCategory: { name: string; count: number }[];
    proRatioByCategory: { name: string; pro: number; free: number }[];
}

const COLORS = ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b", "#06b6d4", "#ec4899", "#f97316", "#14b8a6"];

const tooltipStyle = {
    contentStyle: {
        backgroundColor: "#111",
        border: "1px solid #262626",
        borderRadius: "8px",
        color: "#fff",
    },
    labelStyle: { color: "#a1a1a1" },
};

export function AnalyticsDashboard({
    stats,
    categoryDistribution,
    proFreeDistribution,
    newVsExisting,
    componentsByCategory,
    proRatioByCategory,
}: AnalyticsDashboardProps) {
    const proRatio = stats.totalComponents > 0
        ? Math.round((stats.proComponents / stats.totalComponents) * 100)
        : 0;

    return (
        <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: "Total", value: stats.totalComponents, icon: Box, color: "blue" },
                    { label: "Categories", value: stats.totalCategories, icon: Layers, color: "purple" },
                    { label: "Users", value: stats.totalUsers, icon: Users, color: "green" },
                    { label: "Pro", value: stats.proComponents, icon: Star, color: "orange" },
                    { label: "Free", value: stats.freeComponents, icon: TrendingUp, color: "cyan" },
                    { label: "New", value: stats.newComponents, icon: Sparkles, color: "pink" },
                ].map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-4 rounded-xl bg-[#0a0a0a] border border-[#262626]"
                    >
                        <div className="flex items-center gap-2 text-[#6b6b6b] text-xs mb-1">
                            <metric.icon className="w-3 h-3" />
                            {metric.label}
                        </div>
                        <p className="text-2xl font-bold text-white">{metric.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pro Ratio Gauge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Pro Ratio</h3>
                    <div className="h-[200px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="90%"
                                barSize={20}
                                data={[{ value: proRatio, fill: "#3b82f6" }]}
                                startAngle={180}
                                endAngle={0}
                            >
                                <RadialBar
                                    background={{ fill: "#262626" }}
                                    dataKey="value"
                                    cornerRadius={10}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-white">{proRatio}%</span>
                            <span className="text-sm text-[#6b6b6b]">Pro Components</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-[#a1a1a1]">Pro ({stats.proComponents})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#262626]" />
                            <span className="text-[#a1a1a1]">Free ({stats.freeComponents})</span>
                        </div>
                    </div>
                </motion.div>

                {/* Distribution Charts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Distribution</h3>
                    <div className="grid grid-cols-2 gap-4 h-[200px]">
                        {/* Pro/Free Pie */}
                        <div>
                            <p className="text-xs text-[#6b6b6b] text-center mb-2">Pro vs Free</p>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={proFreeDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={50}
                                        paddingAngle={2}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {proFreeDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip {...tooltipStyle} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* New/Existing Pie */}
                        <div>
                            <p className="text-xs text-[#6b6b6b] text-center mb-2">New vs Existing</p>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={newVsExisting}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={50}
                                        paddingAngle={2}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {newVsExisting.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip {...tooltipStyle} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Components by Category */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Components by Category</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={componentsByCategory} layout="vertical" margin={{ left: 60, right: 20 }}>
                                <XAxis type="number" stroke="#6b6b6b" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    stroke="#6b6b6b"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                    width={55}
                                />
                                <Tooltip {...tooltipStyle} />
                                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                    {componentsByCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Pro vs Free by Category */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Pro vs Free by Category</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={proRatioByCategory} margin={{ left: 60, right: 20 }}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#6b6b6b"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                />
                                <YAxis stroke="#6b6b6b" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip {...tooltipStyle} />
                                <Legend wrapperStyle={{ fontSize: 12, color: "#a1a1a1" }} />
                                <Bar dataKey="pro" stackId="a" fill="#3b82f6" name="Pro" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="free" stackId="a" fill="#22c55e" name="Free" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Category Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]"
            >
                <h3 className="text-lg font-semibold text-white mb-4">Category Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categoryDistribution
                        .sort((a, b) => b.components - a.components)
                        .map((cat, i) => (
                            <div key={cat.slug} className="p-3 rounded-lg bg-[#111] border border-[#262626]">
                                <p className="text-xs text-[#6b6b6b] truncate">{cat.name}</p>
                                <p className="text-xl font-bold text-white mt-1">{cat.components}</p>
                                <div
                                    className="h-1 mt-2 rounded-full"
                                    style={{
                                        backgroundColor: COLORS[i % COLORS.length],
                                        width: `${Math.min(100, (cat.components / Math.max(...categoryDistribution.map(c => c.components))) * 100)}%`
                                    }}
                                />
                            </div>
                        ))}
                </div>
            </motion.div>
        </div>
    );
}
