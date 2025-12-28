import { ComponentSettingsSchema } from '@/lib/settings-types';

export const modalDialogSettingsSchema: ComponentSettingsSchema = {
    componentId: 'modal-dialog',
    fields: [
        // Content
        {
            id: 'title',
            type: 'text',
            label: 'Modal Title',
            group: 'content',
            default: 'Confirm Action',
            maxLength: 50,
        },
        {
            id: 'message',
            type: 'textarea',
            label: 'Message',
            group: 'content',
            default: 'Are you sure you want to proceed with this action?',
            maxLength: 200,
        },
        {
            id: 'confirmText',
            type: 'text',
            label: 'Confirm Button Text',
            group: 'content',
            default: 'Confirm',
            maxLength: 20,
        },
        {
            id: 'cancelText',
            type: 'text',
            label: 'Cancel Button Text',
            group: 'content',
            default: 'Cancel',
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
            id: 'overlayColor',
            type: 'color',
            label: 'Overlay Color',
            description: 'Background overlay behind modal',
            group: 'style',
            default: '#000000',
        },
        {
            id: 'textColor',
            type: 'color',
            label: 'Text Color',
            group: 'style',
            default: '#ffffff',
        },
        {
            id: 'confirmButtonColor',
            type: 'color',
            label: 'Confirm Button Color',
            group: 'style',
            default: '#ffffff',
        },
        {
            id: 'borderRadius',
            type: 'slider',
            label: 'Border Radius',
            group: 'style',
            default: 16,
            min: 0,
            max: 32,
            step: 4,
            unit: 'px',
        },
        {
            id: 'size',
            type: 'select',
            label: 'Modal Size',
            group: 'style',
            default: 'md',
            options: [
                { value: 'sm', label: 'Small (320px)' },
                { value: 'md', label: 'Medium (480px)' },
                { value: 'lg', label: 'Large (640px)' },
                { value: 'xl', label: 'Extra Large (800px)' },
            ],
        },

        // Advanced
        {
            id: 'showCloseButton',
            type: 'toggle',
            label: 'Show Close Button',
            group: 'advanced',
            default: true,
        },
        {
            id: 'closeOnOverlayClick',
            type: 'toggle',
            label: 'Close on Overlay Click',
            group: 'advanced',
            default: true,
        },
        {
            id: 'showCancelButton',
            type: 'toggle',
            label: 'Show Cancel Button',
            group: 'advanced',
            default: true,
        },
    ],
};

export const bottomSheetSettingsSchema: ComponentSettingsSchema = {
    componentId: 'bottom-sheet',
    fields: [
        {
            id: 'title',
            type: 'text',
            label: 'Title',
            group: 'content',
            default: 'Select Option',
            maxLength: 50,
        },
        {
            id: 'items',
            type: 'list',
            label: 'Options',
            group: 'content',
            default: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            itemLabel: 'Option',
            minItems: 2,
            maxItems: 10,
        },
        {
            id: 'backgroundColor',
            type: 'color',
            label: 'Background Color',
            group: 'style',
            default: '#111111',
        },
        {
            id: 'handleColor',
            type: 'color',
            label: 'Handle Color',
            group: 'style',
            default: '#404040',
        },
        {
            id: 'borderRadius',
            type: 'slider',
            label: 'Border Radius',
            group: 'style',
            default: 20,
            min: 0,
            max: 32,
            step: 4,
            unit: 'px',
        },
        {
            id: 'showHandle',
            type: 'toggle',
            label: 'Show Drag Handle',
            group: 'advanced',
            default: true,
        },
    ],
};
