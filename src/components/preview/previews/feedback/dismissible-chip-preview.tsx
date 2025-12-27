'use client';

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';

interface DismissibleChipPreviewProps {
    settings?: SettingsValues;
}

export function DismissibleChipPreview({ settings }: DismissibleChipPreviewProps) {
    const [chips, setChips] = useState(['Marketing', 'Design', 'Development']);
    const bgColor = (settings?.backgroundColor as string) || '#e5e7eb';
    const textColor = (settings?.textColor as string) || '#374151';

    const removeChip = (index: number) => {
        setChips(chips.filter((_, i) => i !== index));
    };

    const resetChips = () => {
        setChips(['Marketing', 'Design', 'Development']);
    };

    return (
        <div className="dismissible-chip-preview">
            <style jsx>{`
                .dismissible-chip-preview {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    padding: 40px;
                    gap: 16px;
                }
                .chips-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    justify-content: center;
                }
                .chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 8px 6px 12px;
                    border-radius: 16px;
                    font-family: 'Segoe UI', sans-serif;
                    font-weight: 600;
                    font-size: 12px;
                    transition: all 0.2s;
                }
                .chip:hover {
                    transform: scale(1.02);
                }
                .close-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #9ca3af;
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-size: 10px;
                    transition: background 0.2s;
                }
                .close-btn:hover {
                    background: #6b7280;
                }
                .reset-btn {
                    padding: 6px 12px;
                    border-radius: 6px;
                    background: transparent;
                    border: 1px solid #d1d5db;
                    color: #6b7280;
                    font-size: 11px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .reset-btn:hover {
                    background: #f3f4f6;
                }
            `}</style>
            <div className="chips-container">
                {chips.map((chip, index) => (
                    <span
                        key={index}
                        className="chip"
                        style={{
                            backgroundColor: bgColor,
                            color: textColor
                        }}
                    >
                        {chip}
                        <button
                            className="close-btn"
                            onClick={() => removeChip(index)}
                            title={`Remove ${chip}`}
                        >
                            ✕
                        </button>
                    </span>
                ))}
                {chips.length === 0 && (
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>All chips removed!</span>
                )}
            </div>
            {chips.length < 3 && (
                <button className="reset-btn" onClick={resetChips}>
                    Reset Chips
                </button>
            )}
        </div>
    );
}
