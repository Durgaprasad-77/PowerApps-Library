import { ComponentSettingsSchema } from '@/lib/settings-types';

export const dataTableSettingsSchema: ComponentSettingsSchema = {
    componentId: 'data-table',
    fields: [
        {
            id: 'headerBackground',
            type: 'color',
            label: 'Header Background',
            group: 'style',
            default: '#252525',
        },
        {
            id: 'rowBackground',
            type: 'color',
            label: 'Row Background',
            group: 'style',
            default: '#1a1a1a',
        },
        {
            id: 'borderColor',
            type: 'color',
            label: 'Border Color',
            group: 'style',
            default: '#2a2a2a',
        },
        {
            id: 'showRowHover',
            type: 'toggle',
            label: 'Show Hover Effect',
            group: 'advanced',
            default: true,
        },
    ],
};

export const modernIconSettingsSchema: ComponentSettingsSchema = {
    componentId: 'modern-icon',
    fields: [
        {
            id: 'iconName',
            type: 'select',
            label: 'Icon Name',
            group: 'content',
            default: 'Home',
            options: [
                { value: 'Home', label: 'Home' },
                { value: 'Settings', label: 'Settings' },
                { value: 'User', label: 'User' },
                { value: 'Bell', label: 'Bell' },
                { value: 'Search', label: 'Search' },
                { value: 'Star', label: 'Star' },
                { value: 'Heart', label: 'Heart' },
                { value: 'Mail', label: 'Mail' },
                { value: 'Calendar', label: 'Calendar' },
            ],
        },
        {
            id: 'size',
            type: 'number',
            label: 'Size (px)',
            group: 'style',
            default: 24,
            min: 12,
            max: 64,
        },
        {
            id: 'color',
            type: 'color',
            label: 'Icon Color',
            group: 'style',
            default: '#6366f1',
        },
    ],
};

export const appHeaderSettingsSchema: ComponentSettingsSchema = {
    componentId: 'app-header',
    fields: [
        {
            id: 'title',
            type: 'text',
            label: 'App Title',
            group: 'content',
            default: 'My Application',
            maxLength: 50,
        },
        {
            id: 'backgroundColor',
            type: 'color',
            label: 'Background Color',
            group: 'style',
            default: '#1a1a1a',
        },
        {
            id: 'showLogo',
            type: 'toggle',
            label: 'Show Logo',
            group: 'advanced',
            default: true,
        },
        {
            id: 'showNotifications',
            type: 'toggle',
            label: 'Show Notifications',
            group: 'advanced',
            default: true,
        },
        {
            id: 'showProfile',
            type: 'toggle',
            label: 'Show Profile',
            group: 'advanced',
            default: true,
        },
    ],
};
