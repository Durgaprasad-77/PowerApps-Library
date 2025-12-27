// Schema registry - maps component IDs to their settings schemas
import { ComponentSettingsSchema } from '@/lib/settings-types';

// Import all schema files
import {
    tabBarSettingsSchema,
    animatedUnderlineTabsSchema,
    animatedPillTabsSchema,
    segmentedTabsSchema
} from './tabs-settings';
import {
    classicButtonSettingsSchema,
    outlineButtonSettingsSchema,
    loadingButtonSettingsSchema,
    iconButtonSettingsSchema,
} from './buttons-settings';
import {
    toastNotificationSettingsSchema,
    loadingSpinnerSettingsSchema,
    simpleBadgeSettingsSchema,
    outlineBadgeSettingsSchema,
    iconBadgeSettingsSchema,
    counterBadgeSettingsSchema,
    statusDotSettingsSchema,
    pulsingBadgeSettingsSchema,
    dismissibleChipSettingsSchema,
    avatarStatusSettingsSchema,
    gradientBadgeSettingsSchema,
    progressBarSettingsSchema,
} from './feedback-settings';
import {
    sidebarNavSettingsSchema,
    bottomNavSettingsSchema,
    breadcrumbSettingsSchema,
    topNavbarSettingsSchema,
} from './navigation-settings';
import {
    textInputSettingsSchema,
    searchInputSettingsSchema,
    dropdownSettingsSchema,
    formGroupSettingsSchema,
    toggleSwitchSettingsSchema,
    sliderSettingsSchema,
    datePickerSettingsSchema,
} from './forms-settings';
import {
    appShellSettingsSchema,
    dashboardLayoutSettingsSchema,
} from './shells-settings';
import {
    modalDialogSettingsSchema,
    bottomSheetSettingsSchema,
    confirmDialogSettingsSchema,
    alertDialogSettingsSchema,
} from './modals-settings';
import {
    contentCardSettingsSchema,
    statsCardSettingsSchema,
    imageCardSettingsSchema,
    profileCardSettingsSchema,
    productCardSettingsSchema,
    infoCardSettingsSchema,
} from './cards-settings';
import {
    dataTableSettingsSchema,
    modernIconSettingsSchema,
    appHeaderSettingsSchema,
} from './modern-controls-settings';

// Registry of all component settings schemas
const schemaRegistry: Record<string, ComponentSettingsSchema> = {
    // Tabs
    'tab-bar': tabBarSettingsSchema,
    'animated-underline-tabs': animatedUnderlineTabsSchema,
    'animated-pill-tabs': animatedPillTabsSchema,
    'segmented-tabs': segmentedTabsSchema,

    // Buttons
    'classic-button': classicButtonSettingsSchema,
    'outline-button': outlineButtonSettingsSchema,
    'loading-button': loadingButtonSettingsSchema,
    'icon-button': iconButtonSettingsSchema,

    // Feedback
    'toast-notification': toastNotificationSettingsSchema,
    'loading-spinner': loadingSpinnerSettingsSchema,
    'simple-badge': simpleBadgeSettingsSchema,
    'outline-badge': outlineBadgeSettingsSchema,
    'icon-badge': iconBadgeSettingsSchema,
    'counter-badge': counterBadgeSettingsSchema,
    'status-dot': statusDotSettingsSchema,
    'pulsing-badge': pulsingBadgeSettingsSchema,
    'dismissible-chip': dismissibleChipSettingsSchema,
    'avatar-status': avatarStatusSettingsSchema,
    'gradient-badge': gradientBadgeSettingsSchema,

    // Navigation
    'sidebar-nav': sidebarNavSettingsSchema,
    'bottom-nav': bottomNavSettingsSchema,
    'breadcrumb': breadcrumbSettingsSchema,
    'top-navbar': topNavbarSettingsSchema,

    // Forms
    'text-input': textInputSettingsSchema,
    'search-input': searchInputSettingsSchema,
    'dropdown': dropdownSettingsSchema,
    'form-group': formGroupSettingsSchema,
    'toggle-switch': toggleSwitchSettingsSchema,
    'slider': sliderSettingsSchema,
    'date-picker': datePickerSettingsSchema,
    'progress-bar': progressBarSettingsSchema,

    // App Shells
    'app-shell': appShellSettingsSchema,
    'dashboard-layout': dashboardLayoutSettingsSchema,

    // Modals
    'modal-dialog': modalDialogSettingsSchema,
    'simple-modal': modalDialogSettingsSchema,
    'bottom-sheet': bottomSheetSettingsSchema,
    'confirm-dialog': confirmDialogSettingsSchema,
    'alert-dialog': alertDialogSettingsSchema,

    // Cards
    'content-card': contentCardSettingsSchema,
    'stats-card': statsCardSettingsSchema,
    'image-card': imageCardSettingsSchema,
    'profile-card': profileCardSettingsSchema,
    'product-card': productCardSettingsSchema,
    'info-card': infoCardSettingsSchema,

    // Modern Controls
    'data-table': dataTableSettingsSchema,
    'modern-icon': modernIconSettingsSchema,
    'app-header': appHeaderSettingsSchema,
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
    animatedPillTabsSchema,
    segmentedTabsSchema,
    // Buttons
    classicButtonSettingsSchema,
    outlineButtonSettingsSchema,
    loadingButtonSettingsSchema,
    iconButtonSettingsSchema,
    // Feedback
    toastNotificationSettingsSchema,
    loadingSpinnerSettingsSchema,
    // Navigation
    sidebarNavSettingsSchema,
    bottomNavSettingsSchema,
    breadcrumbSettingsSchema,
    topNavbarSettingsSchema,
    // Forms
    textInputSettingsSchema,
    searchInputSettingsSchema,
    dropdownSettingsSchema,
    formGroupSettingsSchema,
    toggleSwitchSettingsSchema,
    // Shells
    appShellSettingsSchema,
    dashboardLayoutSettingsSchema,
    // Modals
    modalDialogSettingsSchema,
    bottomSheetSettingsSchema,
    confirmDialogSettingsSchema,
    alertDialogSettingsSchema,
    // Cards
    contentCardSettingsSchema,
    statsCardSettingsSchema,
    imageCardSettingsSchema,
};
