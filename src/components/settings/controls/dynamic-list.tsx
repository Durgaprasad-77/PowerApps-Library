"use client";

import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useState } from 'react';

interface DynamicListProps {
    id: string;
    label: string;
    description?: string;
    value: string[];
    itemLabel?: string;
    minItems?: number;
    maxItems?: number;
    onChange: (value: string[]) => void;
}

export function DynamicList({
    id,
    label,
    description,
    value,
    itemLabel = 'Item',
    minItems = 0,
    maxItems = 10,
    onChange,
}: DynamicListProps) {
    const [dragIndex, setDragIndex] = useState<number | null>(null);

    const addItem = () => {
        if (value.length < maxItems) {
            onChange([...value, `${itemLabel} ${value.length + 1}`]);
        }
    };

    const removeItem = (index: number) => {
        if (value.length > minItems) {
            const newValue = value.filter((_, i) => i !== index);
            onChange(newValue);
        }
    };

    const updateItem = (index: number, newVal: string) => {
        const newValue = [...value];
        newValue[index] = newVal;
        onChange(newValue);
    };

    const handleDragStart = (index: number) => {
        setDragIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (dragIndex === null || dragIndex === index) return;

        const newValue = [...value];
        const [removed] = newValue.splice(dragIndex, 1);
        newValue.splice(index, 0, removed);
        onChange(newValue);
        setDragIndex(index);
    };

    const handleDragEnd = () => {
        setDragIndex(null);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="block text-sm font-medium text-white">
                    {label}
                </label>
                <span className="text-xs text-[#6b6b6b]">
                    {value.length}/{maxItems}
                </span>
            </div>
            {description && (
                <p className="text-xs text-[#6b6b6b]">{description}</p>
            )}

            <div className="space-y-2">
                {value.map((item, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`
              flex items-center gap-2 p-2 rounded-lg border transition-all
              ${dragIndex === index
                                ? 'border-white/30 bg-white/5'
                                : 'border-[#262626] bg-[#0a0a0a]'
                            }
            `}
                    >
                        <GripVertical className="w-4 h-4 text-[#6b6b6b] cursor-grab flex-shrink-0" />
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => updateItem(index, e.target.value)}
                            className="flex-1 px-2 py-1 bg-transparent text-white text-sm focus:outline-none"
                            placeholder={`${itemLabel} ${index + 1}`}
                        />
                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            disabled={value.length <= minItems}
                            className={`
                p-1 rounded transition-colors
                ${value.length <= minItems
                                    ? 'text-[#404040] cursor-not-allowed'
                                    : 'text-[#6b6b6b] hover:text-red-400 hover:bg-red-400/10'
                                }
              `}
                            aria-label={`Remove ${item}`}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            {value.length < maxItems && (
                <button
                    type="button"
                    onClick={addItem}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-[#333333] rounded-lg text-[#6b6b6b] text-sm hover:border-[#404040] hover:text-white hover:bg-white/5 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add {itemLabel}
                </button>
            )}
        </div>
    );
}
