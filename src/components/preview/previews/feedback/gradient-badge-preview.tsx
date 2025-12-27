'use client';

import { SettingsValues } from '@/lib/settings-types';

interface GradientBadgePreviewProps {
    settings?: SettingsValues;
}

export function GradientBadgePreview({ settings }: GradientBadgePreviewProps) {
    const text = (settings?.text as string) || 'PRO';
    const gradientPreset = (settings?.gradientPreset as string) || 'custom';
    const customStartColor = (settings?.gradientStartColor as string) || '#667eea';
    const customEndColor = (settings?.gradientEndColor as string) || '#764ba2';
    const gradientDirection = (settings?.gradientDirection as string) || 'horizontal';

    const gradients: Record<string, { from: string; to: string }> = {
        custom: { from: customStartColor, to: customEndColor },
        purple: { from: '#667eea', to: '#764ba2' },
        blue: { from: '#00c6fb', to: '#005bea' },
        green: { from: '#11998e', to: '#38ef7d' },
        orange: { from: '#f12711', to: '#f5af19' },
        pink: { from: '#ec008c', to: '#fc6767' },
        sunset: { from: '#ff512f', to: '#f09819' },
        ocean: { from: '#2193b0', to: '#6dd5ed' },
        midnight: { from: '#232526', to: '#414345' },
        fire: { from: '#f5af19', to: '#f12711' },
        aurora: { from: '#00c9ff', to: '#92fe9d' },
    };

    const directionMap: Record<string, string> = {
        horizontal: '90deg',
        vertical: '180deg',
        diagonal: '135deg',
        'diagonal-reverse': '45deg',
    };

    const currentGradient = gradients[gradientPreset] || gradients.custom;
    const angle = directionMap[gradientDirection] || '90deg';

    return (
        <div className="gradient-badge-preview">
            <style jsx>{`
                .gradient-badge-preview {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    padding: 40px;
                    gap: 24px;
                }
                .main-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px 32px;
                    border-radius: 18px;
                    font-family: 'Segoe UI', sans-serif;
                    font-weight: 600;
                    font-size: 16px;
                    color: white;
                    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }
                .presets-row {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .preset-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px 16px;
                    border-radius: 12px;
                    font-family: 'Segoe UI', sans-serif;
                    font-weight: 600;
                    font-size: 11px;
                    color: white;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .preset-badge:hover {
                    transform: scale(1.05);
                }
            `}</style>

            {/* Main large badge preview */}
            <span
                className="main-badge"
                style={{
                    background: `linear-gradient(${angle}, ${currentGradient.from} 0%, ${currentGradient.to} 100%)`,
                }}
            >
                {text}
            </span>

            {/* Show other presets as smaller samples */}
            <div className="presets-row">
                {Object.entries(gradients).filter(([key]) => key !== 'custom').slice(0, 6).map(([key, grad]) => (
                    <span
                        key={key}
                        className="preset-badge"
                        style={{
                            background: `linear-gradient(${angle}, ${grad.from} 0%, ${grad.to} 100%)`,
                            opacity: gradientPreset === key ? 1 : 0.7,
                            transform: gradientPreset === key ? 'scale(1.1)' : 'scale(1)',
                        }}
                    >
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
}
