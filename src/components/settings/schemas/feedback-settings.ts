import { ComponentSettingsSchema } from '@/lib/settings-types';

export const toastNotificationSettingsSchema: ComponentSettingsSchema = {
    componentId: 'toast-notification',
    fields: [
        // Content
        {
            id: 'message',
            type: 'text',
            label: 'Message',
            group: 'content',
            default: 'Operation completed successfully!',
            placeholder: 'Enter toast message...',
            maxLength: 100,
        },
        {
            id: 'type',
            type: 'select',
            label: 'Toast Type',
            description: 'Determines the icon and default color',
            group: 'content',
            default: 'success',
            options: [
                { value: 'success', label: '✓ Success' },
                { value: 'error', label: '✕ Error' },
                { value: 'warning', label: '⚠ Warning' },
                { value: 'info', label: 'ℹ Info' },
            ],
        },

        // Style
        {
            id: 'backgroundColor',
            type: 'color',
            label: 'Background Color',
            group: 'style',
            default: '#111111',
        },
        {
            id: 'textColor',
            type: 'color',
            label: 'Text Color',
            group: 'style',
            default: '#ffffff',
        },
        {
            id: 'borderRadius',
            type: 'slider',
            label: 'Border Radius',
            group: 'style',
            default: 12,
            min: 0,
            max: 24,
            step: 2,
            unit: 'px',
        },

        // Advanced
        {
            id: 'duration',
            type: 'slider',
            label: 'Duration',
            description: 'How long the toast stays visible',
            group: 'advanced',
            default: 3000,
            min: 1000,
            max: 10000,
            step: 500,
            unit: 'ms',
        },
        {
            id: 'position',
            type: 'select',
            label: 'Position',
            group: 'advanced',
            default: 'top-right',
            options: [
                { value: 'top-right', label: 'Top Right' },
                { value: 'top-left', label: 'Top Left' },
                { value: 'bottom-right', label: 'Bottom Right' },
                { value: 'bottom-left', label: 'Bottom Left' },
                { value: 'top-center', label: 'Top Center' },
                { value: 'bottom-center', label: 'Bottom Center' },
            ],
        },
        {
            id: 'showIcon',
            type: 'toggle',
            label: 'Show Icon',
            group: 'advanced',
            default: true,
        },
        {
            id: 'dismissible',
            type: 'toggle',
            label: 'Dismissible',
            description: 'Allow users to close the toast',
            group: 'advanced',
            default: true,
        },
    ],
};

export const loadingSpinnerSettingsSchema: ComponentSettingsSchema = {
    componentId: 'loading-spinner',
    fields: [
        {
            id: 'size',
            type: 'slider',
            label: 'Size',
            group: 'style',
            default: 40,
            min: 16,
            max: 80,
            step: 4,
            unit: 'px',
        },
        {
            id: 'color',
            type: 'color',
            label: 'Spinner Color',
            group: 'style',
            default: '#ffffff',
        },
        {
            id: 'trackColor',
            type: 'color',
            label: 'Track Color',
            group: 'style',
            default: '#262626',
        },
        {
            id: 'strokeWidth',
            type: 'slider',
            label: 'Stroke Width',
            group: 'style',
            default: 4,
            min: 2,
            max: 8,
            step: 1,
            unit: 'px',
        },
        {
            id: 'speed',
            type: 'slider',
            label: 'Animation Speed',
            group: 'advanced',
            default: 1000,
            min: 500,
            max: 2000,
            step: 100,
            unit: 'ms',
            isPro: true,
        },
    ],
};

export const simpleBadgeSettingsSchema: ComponentSettingsSchema = {
    componentId: 'simple-badge',
    fields: [
        // Content
        {
            id: 'text',
            type: 'text',
            label: 'Badge Text',
            group: 'content',
            default: 'Default',
            placeholder: 'Enter badge text...',
            maxLength: 20,
        },
        // Style
        {
            id: 'textColor',
            type: 'color',
            label: 'Text Color',
            description: 'Background automatically adjusts to 80% lighter',
            group: 'style',
            default: '#245096',
            presets: [
                '#245096', // Blue
                '#b91c1c', // Red
                '#16a34a', // Green
                '#ca8a04', // Yellow
                '#4338ca', // Indigo
                '#7e22ce', // Purple
                '#be185d', // Pink
            ],
        },
        {
            id: 'borderRadius',
            type: 'slider',
            label: 'Border Radius',
            group: 'style',
            default: 6,
            min: 0,
            max: 20,
            step: 2,
            unit: 'px',
        },
    ],
};

export const outlineBadgeSettingsSchema: ComponentSettingsSchema = {
    componentId: 'outline-badge',
    fields: [
        {
            id: 'text',
            type: 'text',
            label: 'Badge Text',
            group: 'content',
            default: 'Pending',
            placeholder: 'Enter badge text...',
            maxLength: 20,
        },
        {
            id: 'borderColor',
            type: 'color',
            label: 'Border Color',
            group: 'style',
            default: '#6b7280',
            presets: [
                '#6b7280', // Gray
                '#3b82f6', // Blue
                '#22c55e', // Green
                '#f59e0b', // Yellow
                '#ef4444', // Red
                '#8b5cf6', // Purple
            ],
        },
    ],
};

export const iconBadgeSettingsSchema: ComponentSettingsSchema = {
    componentId: 'icon-badge',
    fields: [
        {
            id: 'text',
            type: 'text',
            label: 'Badge Text',
            group: 'content',
            default: 'Success',
            placeholder: 'Enter badge text...',
            maxLength: 20,
        },
        {
            id: 'type',
            type: 'select',
            label: 'Status Type',
            group: 'content',
            default: 'success',
            options: [
                { value: 'success', label: '✓ Success' },
                { value: 'error', label: '✕ Error' },
                { value: 'warning', label: '⚠ Warning' },
                { value: 'info', label: 'ℹ Info' },
            ],
        },
    ],
};

export const counterBadgeSettingsSchema: ComponentSettingsSchema = {
    componentId: 'counter-badge',
    fields: [
        {
            id: 'count',
            type: 'slider',
            label: 'Count',
            group: 'content',
            default: 5,
            min: 0,
            max: 999,
            step: 1,
        },
        {
            id: 'maxValue',
            type: 'slider',
            label: 'Max Display Value',
            description: 'Shows + after this value (e.g., 99+)',
            group: 'content',
            default: 99,
            min: 9,
            max: 999,
            step: 10,
        },
        {
            id: 'backgroundColor',
            type: 'color',
            label: 'Background Color',
            group: 'style',
            default: '#ef4444',
            presets: [
                '#ef4444', // Red
                '#3b82f6', // Blue
                '#22c55e', // Green
                '#f59e0b', // Yellow
            ],
        },
    ],
};

export const statusDotSettingsSchema: ComponentSettingsSchema = {
    componentId: 'status-dot',
    fields: [
        {
            id: 'status',
            type: 'select',
            label: 'Status',
            group: 'content',
            default: 'online',
            options: [
                { value: 'online', label: '🟢 Online' },
                { value: 'away', label: '🟡 Away' },
                { value: 'busy', label: '🔴 Busy' },
                { value: 'offline', label: '⚫ Offline' },
            ],
        },
        {
            id: 'showLabel',
            type: 'toggle',
            label: 'Show Label',
            group: 'content',
            default: true,
        },
    ],
};

export const pulsingBadgeSettingsSchema: ComponentSettingsSchema = {
    componentId: 'pulsing-badge',
    fields: [
        {
            id: 'text',
            type: 'text',
            label: 'Badge Text',
            group: 'content',
            default: 'New',
            placeholder: 'Enter badge text...',
            maxLength: 15,
        },
        {
            id: 'badgeColor',
            type: 'color',
            label: 'Badge Color',
            group: 'style',
            default: '#ef4444',
            presets: [
                '#ef4444', // Red
                '#f59e0b', // Orange
                '#22c55e', // Green
                '#3b82f6', // Blue
                '#8b5cf6', // Purple
            ],
        },
    ],
};

export const dismissibleChipSettingsSchema: ComponentSettingsSchema = {
    componentId: 'dismissible-chip',
    fields: [
        {
            id: 'backgroundColor',
            type: 'color',
            label: 'Background Color',
            group: 'style',
            default: '#e5e7eb',
            presets: [
                '#e5e7eb', // Gray
                '#dbeafe', // Light Blue
                '#dcfce7', // Light Green
                '#fef3c7', // Light Yellow
                '#fce7f3', // Light Pink
            ],
        },
        {
            id: 'textColor',
            type: 'color',
            label: 'Text Color',
            group: 'style',
            default: '#374151',
            presets: [
                '#374151', // Dark Gray
                '#1e40af', // Blue
                '#166534', // Green
                '#92400e', // Yellow
                '#9d174d', // Pink
            ],
        },
    ],
};

export const avatarStatusSettingsSchema: ComponentSettingsSchema = {
    componentId: 'avatar-status',
    fields: [
        {
            id: 'status',
            type: 'select',
            label: 'Status',
            group: 'content',
            default: 'online',
            options: [
                { value: 'online', label: 'Online' },
                { value: 'away', label: 'Away' },
                { value: 'busy', label: 'Busy' },
                { value: 'offline', label: 'Offline' },
            ],
        },
        {
            id: 'size',
            type: 'select',
            label: 'Size',
            group: 'style',
            default: 'medium',
            options: [
                { value: 'small', label: 'Small (32px)' },
                { value: 'medium', label: 'Medium (48px)' },
                { value: 'large', label: 'Large (64px)' },
            ],
        },
    ],
};

export const gradientBadgeSettingsSchema: ComponentSettingsSchema = {
    componentId: 'gradient-badge',
    fields: [
        {
            id: 'text',
            type: 'text',
            label: 'Badge Text',
            group: 'content',
            default: 'PRO',
        },
        {
            id: 'gradientPreset',
            type: 'select',
            label: 'Gradient Preset',
            group: 'style',
            default: 'custom',
            options: [
                { value: 'custom', label: '🎨 Custom Colors' },
                { value: 'purple', label: 'Purple → Violet' },
                { value: 'blue', label: 'Cyan → Blue' },
                { value: 'green', label: 'Teal → Green' },
                { value: 'orange', label: 'Red → Orange' },
                { value: 'pink', label: 'Pink → Coral' },
                { value: 'sunset', label: 'Sunset' },
                { value: 'ocean', label: 'Ocean Breeze' },
                { value: 'midnight', label: 'Midnight' },
                { value: 'fire', label: 'Fire' },
                { value: 'aurora', label: 'Aurora' },
            ],
        },
        {
            id: 'gradientStartColor',
            type: 'color',
            label: 'Start Color',
            group: 'style',
            default: '#667eea',
            presets: ['#667eea', '#00c6fb', '#11998e', '#f12711', '#ec008c', '#6366f1', '#f43f5e', '#10b981'],
        },
        {
            id: 'gradientEndColor',
            type: 'color',
            label: 'End Color',
            group: 'style',
            default: '#764ba2',
            presets: ['#764ba2', '#005bea', '#38ef7d', '#f5af19', '#fc6767', '#8b5cf6', '#fb7185', '#34d399'],
        },
        {
            id: 'gradientDirection',
            type: 'select',
            label: 'Gradient Direction',
            group: 'style',
            default: 'horizontal',
            options: [
                { value: 'horizontal', label: '→ Horizontal' },
                { value: 'vertical', label: '↓ Vertical' },
                { value: 'diagonal', label: '↘ Diagonal' },
                { value: 'diagonal-reverse', label: '↗ Diagonal Reverse' },
            ],
        },
    ],
};

export const progressBarSettingsSchema: ComponentSettingsSchema = {
    componentId: 'progress-bar',
    fields: [
        {
            id: 'value',
            type: 'number',
            label: 'Progress Value',
            group: 'content',
            default: 75,
            min: 0,
            max: 100,
        },
        {
            id: 'maxValue',
            type: 'number',
            label: 'Maximum Value',
            group: 'content',
            default: 100,
        },
        {
            id: 'progressColor',
            type: 'select',
            label: 'Progress Color',
            group: 'style',
            default: 'brand',
            options: [
                { value: 'brand', label: 'Brand (Blue)' },
                { value: 'success', label: 'Success (Green)' },
                { value: 'warning', label: 'Warning (Orange)' },
                { value: 'error', label: 'Error (Red)' },
            ],
        },
        {
            id: 'thickness',
            type: 'select',
            label: 'Thickness',
            group: 'style',
            default: 'medium',
            options: [
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' },
            ],
        },
        {
            id: 'shape',
            type: 'select',
            label: 'Shape',
            group: 'style',
            default: 'rounded',
            options: [
                { value: 'rounded', label: 'Rounded' },
                { value: 'square', label: 'Square' },
            ],
        },
        {
            id: 'indeterminate',
            type: 'toggle',
            label: 'Loading Animation',
            group: 'advanced',
            default: false,
        },
    ],
};
