// Settings Types for Component Customization

export type ControlType =
    | 'text'
    | 'textarea'
    | 'number'
    | 'color'
    | 'slider'
    | 'toggle'
    | 'select'
    | 'list'
    | 'icon';

export interface BaseSettingField {
    id: string;
    label: string;
    description?: string;
    group: 'content' | 'style' | 'advanced';
    isPro?: boolean;
}

export interface TextSettingField extends BaseSettingField {
    type: 'text' | 'textarea';
    default: string;
    placeholder?: string;
    maxLength?: number;
}

export interface NumberSettingField extends BaseSettingField {
    type: 'number';
    default: number;
    min?: number;
    max?: number;
    step?: number;
}

export interface ColorSettingField extends BaseSettingField {
    type: 'color';
    default: string;
    presets?: string[];
}

export interface SliderSettingField extends BaseSettingField {
    type: 'slider';
    default: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
}

export interface ToggleSettingField extends BaseSettingField {
    type: 'toggle';
    default: boolean;
}

export interface SelectSettingField extends BaseSettingField {
    type: 'select';
    default: string;
    options: { value: string; label: string }[];
}

export interface ListSettingField extends BaseSettingField {
    type: 'list';
    default: string[];
    itemLabel?: string;
    minItems?: number;
    maxItems?: number;
}

export type SettingField =
    | TextSettingField
    | NumberSettingField
    | ColorSettingField
    | SliderSettingField
    | ToggleSettingField
    | SelectSettingField
    | ListSettingField;

export interface ComponentSettingsSchema {
    componentId: string;
    fields: SettingField[];
}

export type SettingsValues = Record<string, string | number | boolean | string[]>;

// Preset color palettes for the color picker
export const MONOCHROME_PRESETS = [
    '#ffffff',
    '#f5f5f5',
    '#e5e5e5',
    '#d4d4d4',
    '#a3a3a3',
    '#737373',
    '#525252',
    '#404040',
    '#262626',
    '#171717',
    '#0a0a0a',
    '#000000',
];

export const ACCENT_PRESETS = [
    '#ef4444', // red
    '#f97316', // orange
    '#eab308', // yellow
    '#22c55e', // green
    '#06b6d4', // cyan
    '#3b82f6', // blue
    '#8b5cf6', // violet
    '#ec4899', // pink
];

// Default settings getter
export function getDefaultSettings(schema: ComponentSettingsSchema): SettingsValues {
    const defaults: SettingsValues = {};
    for (const field of schema.fields) {
        defaults[field.id] = field.default;
    }
    return defaults;
}
