"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';

interface SliderPreviewProps {
    settings: SettingsValues;
}

export function SliderPreview({ settings }: SliderPreviewProps) {
    const value = (settings.value as number) || 50;
    const minValue = (settings.minValue as number) || 0;
    const maxValue = (settings.maxValue as number) || 100;
    const layout = (settings.layout as string) || 'horizontal';
    const [currentValue, setCurrentValue] = useState(value);

    const percentage = ((currentValue - minValue) / (maxValue - minValue)) * 100;
    const isVertical = layout === 'vertical';

    return (
        <div className="slider-preview">
            <style jsx>{`
                .slider-preview {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    padding: 20px;
                }
                .slider-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .slider-track {
                    position: relative;
                    background: #333;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .slider-track.horizontal {
                    width: 200px;
                    height: 8px;
                }
                .slider-track.vertical {
                    width: 8px;
                    height: 120px;
                }
                .slider-fill {
                    position: absolute;
                    background: linear-gradient(90deg, #6366f1, #8b5cf6);
                    border-radius: 4px;
                }
                .slider-fill.horizontal {
                    height: 100%;
                    left: 0;
                    top: 0;
                }
                .slider-fill.vertical {
                    width: 100%;
                    bottom: 0;
                    left: 0;
                }
                .slider-thumb {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    transform: translate(-50%, -50%);
                    cursor: grab;
                }
                .slider-thumb.horizontal {
                    top: 50%;
                }
                .slider-thumb.vertical {
                    left: 50%;
                }
                .slider-value {
                    font-size: 14px;
                    font-weight: 600;
                    color: white;
                    min-width: 40px;
                    text-align: center;
                }
                .slider-labels {
                    display: flex;
                    justify-content: space-between;
                    width: 200px;
                    font-size: 12px;
                    color: #6b7280;
                }
            `}</style>

            <div className="slider-value">{currentValue}</div>

            <div className={`slider-container ${isVertical ? 'flex-col' : ''}`}>
                <div
                    className={`slider-track ${isVertical ? 'vertical' : 'horizontal'}`}
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        let newPercentage;
                        if (isVertical) {
                            newPercentage = 1 - (e.clientY - rect.top) / rect.height;
                        } else {
                            newPercentage = (e.clientX - rect.left) / rect.width;
                        }
                        const newValue = Math.round(minValue + newPercentage * (maxValue - minValue));
                        setCurrentValue(Math.max(minValue, Math.min(maxValue, newValue)));
                    }}
                >
                    <div
                        className={`slider-fill ${isVertical ? 'vertical' : 'horizontal'}`}
                        style={isVertical ? { height: `${percentage}%` } : { width: `${percentage}%` }}
                    />
                    <div
                        className={`slider-thumb ${isVertical ? 'vertical' : 'horizontal'}`}
                        style={isVertical ? { bottom: `${percentage}%` } : { left: `${percentage}%` }}
                    />
                </div>
            </div>

            {!isVertical && (
                <div className="slider-labels">
                    <span>{minValue}</span>
                    <span>{maxValue}</span>
                </div>
            )}
        </div>
    );
}
