"use client";

import { SettingsValues } from '@/lib/settings-types';

// Import all preview components from index files
import {
    TabBarPreview,
    AnimatedUnderlineTabsPreview,
    AnimatedPillTabsPreview,
    SegmentedTabsPreview
} from './previews/tabs';
import {
    ClassicButtonPreview,
    OutlineButtonPreview,
    LoadingButtonPreview,
    IconButtonPreview
} from './previews/buttons';
import { ToastPreview, SpinnerPreview, SimpleBadgePreview, OutlineBadgePreview, IconBadgePreview, CounterBadgePreview, StatusDotPreview, PulsingBadgePreview, DismissibleChipPreview, AvatarStatusPreview, GradientBadgePreview, ProgressBarPreview } from './previews/feedback';
import {
    SidebarNavPreview,
    BottomNavPreview,
    BreadcrumbPreview,
    TopNavbarPreview
} from './previews/navigation';
import {
    TextInputPreview,
    SearchInputPreview,
    DropdownPreview,
    FormGroupPreview,
    ToggleSwitchPreview,
    SliderPreview,
    DatePickerPreview
} from './previews/forms';
import {
    ModalDialogPreview,
    BottomSheetPreview,
    ConfirmDialogPreview,
    AlertDialogPreview,
    SimpleModalCardPreview,
    ConfirmDialogCardPreview,
    BottomSheetCardPreview,
    AlertDialogCardPreview
} from './previews/modals';
import {
    ContentCardPreview,
    StatsCardPreview,
    ImageCardPreview,
    ProfileCardPreview,
    InfoCardPreview,
    ProductCardPreview
} from './previews/cards';
import {
    AppShellPreview,
    DashboardLayoutPreview
} from './previews/shells';
import { DataTablePreview } from './previews/data';
import { ModernIconPreview } from './previews/display';
import { AppHeaderPreview } from './previews/layout';

// Preview component type
type PreviewComponent = React.ComponentType<{ settings: SettingsValues }>;

// Full-size preview registry (for detail pages)
const fullPreviewRegistry: Record<string, PreviewComponent> = {
    // Tabs
    'tab-bar': TabBarPreview,
    'animated-underline-tabs': AnimatedUnderlineTabsPreview,
    'animated-pill-tabs': AnimatedPillTabsPreview,
    'segmented-tabs': SegmentedTabsPreview,

    // Buttons
    'classic-button': ClassicButtonPreview,
    'outline-button': OutlineButtonPreview,
    'loading-button': LoadingButtonPreview,
    'icon-button': IconButtonPreview,

    // Feedback
    'toast-notification': ToastPreview,
    'loading-spinner': SpinnerPreview,
    'simple-badge': SimpleBadgePreview,
    'outline-badge': OutlineBadgePreview,
    'icon-badge': IconBadgePreview,
    'counter-badge': CounterBadgePreview,
    'status-dot': StatusDotPreview,
    'pulsing-badge': PulsingBadgePreview,
    'dismissible-chip': DismissibleChipPreview,
    'avatar-status': AvatarStatusPreview,
    'gradient-badge': GradientBadgePreview,

    // Navigation
    'sidebar-nav': SidebarNavPreview,
    'bottom-nav': BottomNavPreview,
    'breadcrumb': BreadcrumbPreview,
    'top-navbar': TopNavbarPreview,

    // Forms
    'text-input': TextInputPreview,
    'search-input': SearchInputPreview,
    'dropdown': DropdownPreview,
    'form-group': FormGroupPreview,
    'toggle-switch': ToggleSwitchPreview,
    'slider': SliderPreview,
    'date-picker': DatePickerPreview,
    'progress-bar': ProgressBarPreview,

    // Modals (full-size interactive previews)
    'modal-dialog': ModalDialogPreview,
    'simple-modal': ModalDialogPreview,
    'bottom-sheet': BottomSheetPreview,
    'confirm-dialog': ConfirmDialogPreview,
    'alert-dialog': AlertDialogPreview,

    // Cards
    'content-card': ContentCardPreview,
    'stats-card': StatsCardPreview,
    'image-card': ImageCardPreview,
    'profile-card': ProfileCardPreview,
    'info-card': InfoCardPreview,
    'product-card': ProductCardPreview,

    // App Shells
    'app-shell': AppShellPreview,
    'dashboard-layout': DashboardLayoutPreview,

    // Data
    'data-table': DataTablePreview,

    // Display
    'modern-icon': ModernIconPreview,

    // Layout
    'app-header': AppHeaderPreview,
};

// Compact card preview registry (for library grid cards)
const cardPreviewRegistry: Record<string, PreviewComponent> = {
    ...fullPreviewRegistry,
    // Override modals with compact card versions
    'modal-dialog': SimpleModalCardPreview,
    'simple-modal': SimpleModalCardPreview,
    'bottom-sheet': BottomSheetCardPreview,
    'confirm-dialog': ConfirmDialogCardPreview,
    'alert-dialog': AlertDialogCardPreview,
};

interface ComponentPreviewProps {
    componentSlug: string;
    settings: SettingsValues;
    variant?: 'full' | 'card';
}

export function ComponentPreview({ componentSlug, settings, variant = 'full' }: ComponentPreviewProps) {
    const registry = variant === 'card' ? cardPreviewRegistry : fullPreviewRegistry;
    const PreviewComponent = registry[componentSlug];

    if (!PreviewComponent) {
        return (
            <div className="text-center py-8">
                <div className="text-[#404040] text-sm">
                    Preview coming soon
                </div>
            </div>
        );
    }

    return <PreviewComponent settings={settings} />;
}

/**
 * Check if a component has a live preview available
 */
export function hasPreview(componentSlug: string): boolean {
    return componentSlug in fullPreviewRegistry;
}
