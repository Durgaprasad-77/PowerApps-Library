"use client";

import { useState, useEffect } from 'react';
import { SettingsValues } from '@/lib/settings-types';

interface ProgressBarPreviewProps {
    settings: SettingsValues;
}

export function ProgressBarPreview({ settings }: ProgressBarPreviewProps) {
    const value = (settings.value as number) || 75;
    const maxValue = (settings.maxValue as number) || 100;
    const progressColor = (settings.progressColor as string) || 'brand';
    const thickness = (settings.thickness as string) || 'medium';
    const shape = (settings.shape as string) || 'rounded';
    const indeterminate = (settings.indeterminate as boolean) || false;

    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        if (!indeterminate) {
            const timer = setTimeout(() => setAnimatedValue(value), 100);
            return () => clearTimeout(timer);
        }
    }, [value, indeterminate]);

    const colors: Record<string, string> = {
        brand: '#6366f1',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
    };

    const heightValue = thickness === 'large' ? 8 : 4;
    const radiusValue = shape === 'rounded' ? 4 : 0;
    const barColor = colors[progressColor] || colors.brand;
    const percentage = (animatedValue / maxValue) * 100;

    return (
        <div className="progress-preview">
            <style jsx>{`
                .progress-preview {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    padding: 24px;
                    width: 100%;
                }
                .progress-container {
                    width: 100%;
                    max-width: 300px;
                }
                .progress-track {
                    background: #333;
                    overflow: hidden;
                    position: relative;
                }
                .progress-fill {
                    height: 100%;
                    transition: width 0.8s ease-out;
                }
                .progress-fill.indeterminate {
                    animation: indeterminate 1.5s infinite ease-in-out;
                    width: 40% !important;
                }
                @keyframes indeterminate {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
                .progress-label {
                    font-size: 14px;
                    color: white;
                    font-weight: 600;
                }
                .progress-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                    max-width: 300px;
                }
            `}</style>

            <div className="progress-row">
                <div className="progress-container">
                    <div
                        className="progress-track"
                        style={{
                            height: heightValue,
                            borderRadius: radiusValue,
                        }}
                    >
                        <div
                            className={`progress-fill ${indeterminate ? 'indeterminate' : ''}`}
                            style={{
                                width: indeterminate ? '40%' : `${percentage}%`,
                                backgroundColor: barColor,
                                borderRadius: radiusValue,
                            }}
                        />
                    </div>
                </div>
                {!indeterminate && <span className="progress-label">{Math.round(percentage)}%</span>}
            </div>

            {indeterminate && (
                <span className="text-sm text-gray-400">Loading...</span>
            )}
        </div>
    );
}
