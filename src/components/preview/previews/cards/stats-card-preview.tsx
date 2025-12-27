"use client";

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';

interface StatsCardPreviewProps {
    settings: SettingsValues;
}

export function StatsCardPreview({ settings }: StatsCardPreviewProps) {
    const [animatedValue, setAnimatedValue] = useState(0);

    const title = (settings.title as string) || 'Total Revenue';
    const value = (settings.value as number) || 12485;
    const change = (settings.change as number) || 12.5;
    const prefix = (settings.prefix as string) || '$';
    const backgroundColor = (settings.backgroundColor as string) || '#111111';
    const borderRadius = (settings.borderRadius as number) || 12;

    const isPositive = change >= 0;

    // Animate value on mount
    useEffect(() => {
        const duration = 1000;
        const steps = 30;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setAnimatedValue(value);
                clearInterval(timer);
            } else {
                setAnimatedValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div
            className="w-full max-w-[200px] p-5"
            style={{
                backgroundColor,
                borderRadius: `${borderRadius}px`,
                border: '1px solid #1a1a1a',
            }}
        >
            <p className="text-[#6b6b6b] text-sm mb-1">{title}</p>
            <p className="text-white text-2xl font-bold mb-2">
                {prefix}{animatedValue.toLocaleString()}
            </p>
            <div
                className="flex items-center gap-1 text-sm"
                style={{ color: isPositive ? '#22c55e' : '#ef4444' }}
            >
                {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                ) : (
                    <TrendingDown className="w-4 h-4" />
                )}
                <span>{isPositive ? '+' : ''}{change}%</span>
                <span className="text-[#6b6b6b] ml-1">vs last month</span>
            </div>
        </div>
    );
}
