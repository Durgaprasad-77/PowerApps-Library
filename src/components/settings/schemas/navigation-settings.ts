import { ComponentSettingsSchema } from '@/lib/settings-types';

export const sidebarNavSettingsSchema: ComponentSettingsSchema = {
    componentId: 'sidebar-nav',
    fields: [
        // Content
        {
            id: 'navItems',
            type: 'list',
            label: 'Navigation Items',
            description: 'Add, remove, or reorder menu items',
            group: 'content',
            default: ['Home', 'Dashboard', 'Settings', 'Profile'],
            itemLabel: 'Nav Item',
            minItems: 2,
            maxItems: 10,
        },
        {
            id: 'logoText',
            type: 'text',
            label: 'Logo Text',
            group: 'content',
            default: 'MyApp',
            placeholder: 'Enter logo text...',
            maxLength: 20,
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
            default: '#a1a1a1',
        },
        {
            id: 'activeColor',
            type: 'color',
            label: 'Active Item Color',
            group: 'style',
            default: '#ffffff',
        },
        {
            id: 'activeBackgroundColor',
            type: 'color',
            label: 'Active Background',
            group: 'style',
            default: '#1a1a1a',
        },
        {
            id: 'width',
            type: 'slider',
            label: 'Sidebar Width',
            group: 'style',
            default: 240,
            min: 180,
            max: 320,
            step: 20,
            unit: 'px',
        },

        // Advanced
        {
            id: 'collapsed',
            type: 'toggle',
            label: 'Start Collapsed',
            description: 'Sidebar starts in collapsed state',
            group: 'advanced',
            default: false,
        },
        {
            id: 'showDividers',
            type: 'toggle',
            label: 'Show Dividers',
            group: 'advanced',
            default: true,
        },
    ],
};

export const bottomNavSettingsSchema: ComponentSettingsSchema = {
    componentId: 'bottom-nav',
    fields: [
        {
            id: 'items',
            type: 'list',
            label: 'Navigation Items',
            group: 'content',
            default: ['Home', 'Search', 'Notifications', 'Profile'],
            itemLabel: 'Item',
            minItems: 3,
            maxItems: 5,
        },
        {
            id: 'backgroundColor',
            type: 'color',
            label: 'Background Color',
            group: 'style',
            default: '#0a0a0a',
        },
        {
            id: 'activeColor',
            type: 'color',
            label: 'Active Color',
            group: 'style',
            default: '#ffffff',
        },
        {
            id: 'inactiveColor',
            type: 'color',
            label: 'Inactive Color',
            group: 'style',
            default: '#6b6b6b',
        },
        {
            id: 'height',
            type: 'slider',
            label: 'Height',
            group: 'style',
            default: 64,
            min: 48,
            max: 80,
            step: 4,
            unit: 'px',
        },
        {
            id: 'showLabels',
            type: 'toggle',
            label: 'Show Labels',
            group: 'advanced',
            default: true,
        },
    ],
};
