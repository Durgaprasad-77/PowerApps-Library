// Schema registry - maps component IDs to their settings schemas
import { ComponentSettingsSchema } from '@/lib/settings-types';

// Import all schema files
import { tabBarSettingsSchema, animatedUnderlineTabsSchema } from './tabs-settings';
import {
    classicButtonSettingsSchema,
    outlineButtonSettingsSchema,
    loadingButtonSettingsSchema,
} from './buttons-settings';
import {
    toastNotificationSettingsSchema,
    loadingSpinnerSettingsSchema,
} from './feedback-settings';
import {
    sidebarNavSettingsSchema,
    bottomNavSettingsSchema,
} from './navigation-settings';
import {
    textInputSettingsSchema,
    searchInputSettingsSchema,
    dropdownSettingsSchema,
} from './forms-settings';
import {
    appShellSettingsSchema,
    dashboardLayoutSettingsSchema,
} from './shells-settings';
import {
    modalDialogSettingsSchema,
    bottomSheetSettingsSchema,
} from './modals-settings';
import {
    contentCardSettingsSchema,
    statsCardSettingsSchema,
    imageCardSettingsSchema,
} from './cards-settings';

// Registry of all component settings schemas
const schemaRegistry: Record<string, ComponentSettingsSchema> = {
    // Tabs
    'tab-bar': tabBarSettingsSchema,
    'animated-underline-tabs': animatedUnderlineTabsSchema,

    // Buttons
    'classic-button': classicButtonSettingsSchema,
    'outline-button': outlineButtonSettingsSchema,
    'loading-button': loadingButtonSettingsSchema,

    // Feedback
    'toast-notification': toastNotificationSettingsSchema,
    'loading-spinner': loadingSpinnerSettingsSchema,

    // Navigation
    'sidebar-nav': sidebarNavSettingsSchema,
    'bottom-nav': bottomNavSettingsSchema,

    // Forms
    'text-input': textInputSettingsSchema,
    'search-input': searchInputSettingsSchema,
    'dropdown': dropdownSettingsSchema,

    // App Shells
    'app-shell': appShellSettingsSchema,
    'dashboard-layout': dashboardLayoutSettingsSchema,

    // Modals
    'modal-dialog': modalDialogSettingsSchema,
    'bottom-sheet': bottomSheetSettingsSchema,

    // Cards
    'content-card': contentCardSettingsSchema,
    'stats-card': statsCardSettingsSchema,
    'image-card': imageCardSettingsSchema,
};

/**
 * Get the settings schema for a component by its slug/ID
 * Returns undefined if no schema exists for this component
 */
export function getComponentSettingsSchema(componentSlug: string): ComponentSettingsSchema | undefined {
    return schemaRegistry[componentSlug];
}

/**
 * Check if a component has settings available
 */
export function hasComponentSettings(componentSlug: string): boolean {
    return componentSlug in schemaRegistry;
}

/**
 * Get count of components with settings
 */
export function getSettingsCount(): number {
    return Object.keys(schemaRegistry).length;
}

// Re-export all schemas for direct access
export {
    // Tabs
    tabBarSettingsSchema,
    animatedUnderlineTabsSchema,
    // Buttons
    classicButtonSettingsSchema,
    outlineButtonSettingsSchema,
    loadingButtonSettingsSchema,
    // Feedback
    toastNotificationSettingsSchema,
    loadingSpinnerSettingsSchema,
    // Navigation
    sidebarNavSettingsSchema,
    bottomNavSettingsSchema,
    // Forms
    textInputSettingsSchema,
    searchInputSettingsSchema,
    dropdownSettingsSchema,
    // Shells
    appShellSettingsSchema,
    dashboardLayoutSettingsSchema,
    // Modals
    modalDialogSettingsSchema,
    bottomSheetSettingsSchema,
    // Cards
    contentCardSettingsSchema,
    statsCardSettingsSchema,
    imageCardSettingsSchema,
};
