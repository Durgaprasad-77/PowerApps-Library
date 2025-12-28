"use client";

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface StatsCardPreviewProps {
    settings: SettingsValues;
}

export function StatsCardPreview({ settings }: StatsCardPreviewProps) {
    const { theme } = usePreviewTheme();
    const [animatedValue, setAnimatedValue] = useState(0);

    const title = (settings.title as string) || 'Total Revenue';
    const value = (settings.value as number) || 12485;
    const change = (settings.change as number) || 12.5;
    const prefix = (settings.prefix as string) || '$';
    const backgroundColor = (settings.backgroundColor as string) || (theme === 'dark' ? '#111111' : '#ffffff');
    const borderColor = theme === 'dark' ? '#1a1a1a' : '#e5e7eb';
    const textColor = theme === 'dark' ? '#ffffff' : '#111827';
    const mutedColor = theme === 'dark' ? '#6b6b6b' : '#6b7280';
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
                border: `1px solid ${borderColor}`,
            }}
        >
            <p className="text-sm mb-1" style={{ color: mutedColor }}>{title}</p>
            <p className="text-2xl font-bold mb-2" style={{ color: textColor }}>
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
                <span className="ml-1" style={{ color: mutedColor }}>vs last month</span>
            </div>
        </div>
    );
}
