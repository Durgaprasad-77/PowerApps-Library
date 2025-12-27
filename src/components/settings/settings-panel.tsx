"use client";

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
    SettingField,
    ComponentSettingsSchema,
    SettingsValues
} from '@/lib/settings-types';
import {
    TextInput,
    ColorPicker,
    SliderInput,
    ToggleSwitch,
    SelectInput,
    DynamicList,
} from './controls';

interface SettingsPanelProps {
    schema: ComponentSettingsSchema;
    settings: SettingsValues;
    onSettingChange: (id: string, value: string | number | boolean | string[]) => void;
    onReset: () => void;
    hasChanges: boolean;
    isPro?: boolean;
}

type SettingsGroup = 'content' | 'style' | 'advanced';

const GROUP_LABELS: Record<SettingsGroup, string> = {
    content: 'Content',
    style: 'Style',
    advanced: 'Advanced',
};

export function SettingsPanel({
    schema,
    settings,
    onSettingChange,
    onReset,
    hasChanges,
    isPro = false,
}: SettingsPanelProps) {
    const [activeTab, setActiveTab] = useState<SettingsGroup>('content');

    // Group fields by category
    const groupedFields = schema.fields.reduce((acc, field) => {
        const group = field.group || 'content';
        if (!acc[group]) acc[group] = [];
        acc[group].push(field);
        return acc;
    }, {} as Record<SettingsGroup, SettingField[]>);

    // Get available tabs (only show tabs that have fields)
    const availableTabs = (['content', 'style', 'advanced'] as SettingsGroup[])
        .filter(tab => groupedFields[tab]?.length > 0);

    // Ensure active tab is valid
    if (!availableTabs.includes(activeTab) && availableTabs.length > 0) {
        setActiveTab(availableTabs[0]);
    }

    const renderField = (field: SettingField) => {
        // Check if field is locked for free users
        const isLocked = field.isPro && !isPro;

        if (isLocked) {
            return (
                <div key={field.id} className="opacity-50 pointer-events-none">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{field.label}</span>
                        <span className="text-xs px-1.5 py-0.5 bg-white/10 text-[#a1a1a1] rounded">PRO</span>
                    </div>
                    {field.description && (
                        <p className="text-xs text-[#6b6b6b]">{field.description}</p>
                    )}
                </div>
            );
        }

        const value = settings[field.id];

        switch (field.type) {
            case 'text':
            case 'textarea':
                return (
                    <TextInput
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        description={field.description}
                        value={value as string}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        multiline={field.type === 'textarea'}
                        onChange={(v) => onSettingChange(field.id, v)}
                    />
                );

            case 'color':
                return (
                    <ColorPicker
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        description={field.description}
                        value={value as string}
                        presets={field.presets}
                        onChange={(v) => onSettingChange(field.id, v)}
                    />
                );

            case 'slider':
                return (
                    <SliderInput
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        description={field.description}
                        value={value as number}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        unit={field.unit}
                        onChange={(v) => onSettingChange(field.id, v)}
                    />
                );

            case 'toggle':
                return (
                    <ToggleSwitch
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        description={field.description}
                        value={value as boolean}
                        onChange={(v) => onSettingChange(field.id, v)}
                    />
                );

            case 'select':
                return (
                    <SelectInput
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        description={field.description}
                        value={value as string}
                        options={field.options}
                        onChange={(v) => onSettingChange(field.id, v)}
                    />
                );

            case 'list':
                return (
                    <DynamicList
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        description={field.description}
                        value={value as string[]}
                        itemLabel={field.itemLabel}
                        minItems={field.minItems}
                        maxItems={field.maxItems}
                        onChange={(v) => onSettingChange(field.id, v)}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#0a0a0a] rounded-lg mb-4">
                {availableTabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`
              flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors
              ${activeTab === tab
                                ? 'bg-white text-black'
                                : 'text-[#a1a1a1] hover:text-white'
                            }
            `}
                    >
                        {GROUP_LABELS[tab]}
                    </button>
                ))}
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-5 overflow-y-auto pr-1">
                {groupedFields[activeTab]?.map(renderField)}
            </div>

            {/* Reset button */}
            {hasChanges && (
                <div className="pt-4 mt-4 border-t border-[#262626]">
                    <button
                        type="button"
                        onClick={onReset}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-[#a1a1a1] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset to Defaults
                    </button>
                </div>
            )}
        </div>
    );
}
