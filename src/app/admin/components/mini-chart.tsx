"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface MiniChartProps {
    data: number[];
    color?: string;
    height?: number;
}

export function MiniChart({ data, color = "#3b82f6", height = 40 }: MiniChartProps) {
    // Transform data array to chart format
    const chartData = data.map((value, index) => ({ value }));

    return (
        <div className="w-full" style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={1.5}
                        fill={`url(#gradient-${color.replace('#', '')})`}
                        isAnimationActive={true}
                        animationDuration={1000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
