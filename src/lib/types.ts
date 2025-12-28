import { ComponentSettingsSchema } from './settings-types';

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
    settingsSchema?: ComponentSettingsSchema;
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
