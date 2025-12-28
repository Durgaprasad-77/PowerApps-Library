"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface ComponentsChartProps {
    data: {
        name: string;
        components: number;
    }[];
}

export function ComponentsChart({ data }: ComponentsChartProps) {
    return (
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorComponents" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="name"
                        stroke="#6b6b6b"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#6b6b6b"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#111",
                            border: "1px solid #262626",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                        labelStyle={{ color: "#a1a1a1" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="components"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#colorComponents)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

interface CategoryChartProps {
    data: {
        name: string;
        count: number;
        color: string;
    }[];
}

export function CategoryChart({ data }: CategoryChartProps) {
    return (
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 5, left: 60, bottom: 0 }}>
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
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#111",
                            border: "1px solid #262626",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                        labelStyle={{ color: "#a1a1a1" }}
                        formatter={(value) => [`${value ?? 0} components`, "Count"]}
                    />
                    <Bar
                        dataKey="count"
                        radius={[0, 4, 4, 0]}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

interface ProFreeChartProps {
    pro: number;
    free: number;
}

export function ProFreeChart({ pro, free }: ProFreeChartProps) {
    const data = [
        { name: "Pro", value: pro, color: "#3b82f6" },
        { name: "Free", value: free, color: "#22c55e" },
    ];

    const total = pro + free;

    return (
        <div className="relative h-[180px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                        strokeWidth={0}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#111",
                            border: "1px solid #262626",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                        formatter={(value, name) => [
                            `${value ?? 0} (${Math.round(((value ?? 0) as number / total) * 100)}%)`,
                            name,
                        ]}
                    />
                </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-2xl font-bold text-white">{total}</p>
                <p className="text-xs text-[#6b6b6b]">Total</p>
            </div>
        </div>
    );
}
