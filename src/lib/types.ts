// Component and Category types for the component library

export interface Component {
    id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    yamlCode: string;
    previewImage?: string;
    isPro: boolean;
    isNew?: boolean;
    settingsSchema?: SettingsSchema;
    defaultSettings?: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    orderIndex: number;
    componentsCount: number;
    freeCount: number;
}

export interface SettingsSchema {
    type: 'object';
    properties: Record<string, SettingsProperty>;
}

export interface SettingsProperty {
    type: 'string' | 'number' | 'boolean' | 'array' | 'color';
    title: string;
    default?: unknown;
    items?: { type: string };
    enum?: string[];
}

export interface User {
    id: string;
    email: string;
    fullName?: string;
    avatarUrl?: string;
    subscriptionTier: 'free' | 'pro' | 'lifetime';
    stripeCustomerId?: string;
    createdAt: string;
}

export interface SavedComponent {
    id: string;
    userId: string;
    componentId: string;
    component?: Component;
    createdAt: string;
}

// Settings types
export type ComponentSettings = Record<string, unknown>;
