// Component Setup Instructions
// Each component can have its own setup instructions including:
// - Required variables
// - Screen.OnVisible code
// - Usage tips

export interface ComponentInstructions {
    variables: { name: string; defaultValue: string; description: string }[];
    screenOnVisible?: string;
    tips?: string[];
}

const instructionsRegistry: Record<string, ComponentInstructions> = {
    // Tabs
    'tab-bar': {
        variables: [
            { name: 'locSelectedTab', defaultValue: '1', description: 'Current selected tab index (1-based)' }
        ],
        screenOnVisible: 'Set(locSelectedTab, 1)',
        tips: [
            'Use If statements with locSelectedTab to show/hide content for each tab',
            'Tabs are numbered starting from 1'
        ]
    },
    'animated-underline-tabs': {
        variables: [
            { name: 'locSelectedTab', defaultValue: '1', description: 'Current selected tab index (1-based)' }
        ],
        screenOnVisible: 'Set(locSelectedTab, 1)',
    },
    'animated-pill-tabs': {
        variables: [
            { name: 'locSelectedPill', defaultValue: '1', description: 'Current selected pill index (1-based)' }
        ],
        screenOnVisible: 'Set(locSelectedPill, 1)',
    },
    'segmented-tabs': {
        variables: [
            { name: 'locSelectedSeg', defaultValue: '1', description: 'Current selected segment index (1-based)' }
        ],
        screenOnVisible: 'Set(locSelectedSeg, 1)',
    },

    // Buttons
    'classic-button': {
        variables: [],
        tips: ['Customize the OnSelect property to add your action logic']
    },
    'outline-button': {
        variables: [],
        tips: ['Customize the OnSelect property to add your action logic']
    },
    'loading-button': {
        variables: [
            { name: 'locIsLoading', defaultValue: 'false', description: 'Loading state of the button' }
        ],
        screenOnVisible: 'Set(locIsLoading, false)',
        tips: [
            'Set locIsLoading to true when starting an action',
            'Set locIsLoading to false when the action completes'
        ]
    },
    'icon-button': {
        variables: [],
        tips: ['Replace the icon character with any emoji or icon from Font Awesome']
    },

    // Feedback
    'toast-notification': {
        variables: [
            { name: 'locShowToast', defaultValue: 'false', description: 'Controls toast visibility' },
            { name: 'locToastMessage', defaultValue: '"Operation successful!"', description: 'Message to display' }
        ],
        screenOnVisible: 'Set(locShowToast, false)',
        tips: [
            'The toast auto-hides after 3 seconds',
            'Call Set(locShowToast, true) to show the toast'
        ]
    },
    'loading-spinner': {
        variables: [],
        tips: ['Wrap in a container with Visible property to show/hide']
    },
    'simple-badge': {
        variables: [],
        tips: [
            'Use ColorFade(color, 80%) for auto-light background',
            'Change the RGBA color to match your status meaning',
            'Common colors: Blue (info), Green (success), Red (error), Yellow (warning)'
        ]
    },
    'outline-badge': {
        variables: [],
        tips: [
            'Perfect for subtle, secondary status indicators',
            'Border-only design works well on both light and dark backgrounds'
        ]
    },
    'icon-badge': {
        variables: [],
        tips: [
            'Icons provide instant visual meaning (✓ = success, ✕ = error)',
            'Choose status type based on the message meaning'
        ]
    },
    'counter-badge': {
        variables: [],
        tips: [
            'Position as overlay on icons using ManualLayout parent',
            'Use X and Y properties to position in top-right corner',
            'Values above max display as "99+" to save space'
        ]
    },
    'status-dot': {
        variables: [],
        tips: [
            'Use with avatars or user lists for presence indication',
            'Combine with Label for additional context'
        ]
    },
    'pulsing-badge': {
        variables: [],
        tips: [
            'Perfect for "New" or "Sale" attention indicators',
            'Uses SVG animation for smooth pulsing glow',
            'Customize the pulse color to match your brand'
        ]
    },
    'dismissible-chip': {
        variables: [
            { name: 'locChipVisible', defaultValue: 'true', description: 'Controls chip visibility' }
        ],
        screenOnVisible: 'Set(locChipVisible, true)',
        tips: [
            'Set locChipVisible to false in OnSelect to dismiss',
            'Great for filter tags and removable selections',
            'Use ClearCollect to manage multiple chips dynamically'
        ]
    },
    'avatar-status': {
        variables: [],
        tips: [
            'Perfect for user cards and chat applications',
            'Use ManualLayout to position the status dot over the avatar',
            'Combine with data binding for dynamic user presence'
        ]
    },
    'gradient-badge': {
        variables: [],
        tips: [
            'Uses SVG linearGradient for smooth color transitions',
            'Perfect for highlighting premium or PRO features',
            'Customize text and gradient preset to match your brand'
        ]
    },

    // Navigation
    'sidebar-nav': {
        variables: [
            { name: 'locSelectedNav', defaultValue: '1', description: 'Current selected nav item index' }
        ],
        screenOnVisible: 'Set(locSelectedNav, 1)',
        tips: [
            'Use Navigate() in OnSelect to switch screens',
            'Customize nav items by editing the button labels'
        ]
    },
    'bottom-nav': {
        variables: [
            { name: 'locSelectedTab', defaultValue: '1', description: 'Current selected tab index' }
        ],
        screenOnVisible: 'Set(locSelectedTab, 1)',
        tips: ['Place at the bottom of the screen for mobile-style navigation']
    },
    'breadcrumb': {
        variables: [],
        tips: ['Wrap each label in a button for clickable navigation']
    },
    'top-navbar': {
        variables: [],
        tips: [
            'Add a search input control if showSearch is enabled',
            'Use Navigate() in each nav button'
        ]
    },

    // Forms
    'text-input': {
        variables: [],
        tips: [
            'Access entered value with txtInput.Text',
            'Use IsBlank() for validation'
        ]
    },
    'search-input': {
        variables: [
            { name: 'locSearchText', defaultValue: '""', description: 'Current search query' }
        ],
        screenOnVisible: 'Set(locSearchText, "")',
        tips: [
            'Use Filter() with locSearchText to filter collections',
            'Add OnChange handler to update results in real-time'
        ]
    },
    'dropdown': {
        variables: [],
        tips: ['Access selected value with drpDropdown.Selected.Value']
    },
    'form-group': {
        variables: [],
        tips: [
            'Access field values with txtField1.Text, txtField2.Text, etc.',
            'Add validation logic in the submit button OnSelect'
        ]
    },
    'toggle-switch': {
        variables: [
            { name: 'locToggleOn', defaultValue: 'false', description: 'Toggle state (on/off)' }
        ],
        screenOnVisible: 'Set(locToggleOn, false)',
        tips: ['Use If(locToggleOn, ..., ...) for conditional logic']
    },

    // Modals
    'modal-dialog': {
        variables: [
            { name: 'locShowModal', defaultValue: 'false', description: 'Controls modal visibility' }
        ],
        screenOnVisible: 'Set(locShowModal, false)',
        tips: [
            'Call Set(locShowModal, true) to open the modal',
            'The modal closes when clicking Cancel or the overlay'
        ]
    },
    'simple-modal': {
        variables: [
            { name: 'locShowModal', defaultValue: 'false', description: 'Controls modal visibility' }
        ],
        screenOnVisible: 'Set(locShowModal, false)',
    },
    'bottom-sheet': {
        variables: [
            { name: 'locShowSheet', defaultValue: 'false', description: 'Controls sheet visibility' }
        ],
        screenOnVisible: 'Set(locShowSheet, false)',
        tips: ['Perfect for mobile action menus']
    },
    'confirm-dialog': {
        variables: [
            { name: 'locShowConfirm', defaultValue: 'false', description: 'Controls dialog visibility' }
        ],
        screenOnVisible: 'Set(locShowConfirm, false)',
        tips: ['Add your destructive action in the confirm button OnSelect']
    },
    'alert-dialog': {
        variables: [
            { name: 'locShowAlert', defaultValue: 'false', description: 'Controls alert visibility' }
        ],
        screenOnVisible: 'Set(locShowAlert, false)',
        tips: ['Use for success, error, warning, or info messages']
    },

    // Cards
    'content-card': {
        variables: [],
        tips: ['Customize content by editing labels and adding images']
    },
    'stats-card': {
        variables: [],
        tips: [
            'Bind value to a data source for live stats',
            'Use CountRows() or Sum() for aggregations'
        ]
    },
    'image-card': {
        variables: [],
        tips: ['Set Image property to a URL or uploaded image']
    },

    // App Shells
    'app-shell': {
        variables: [
            { name: 'locSelectedNav', defaultValue: '1', description: 'Current selected nav item' }
        ],
        screenOnVisible: 'Set(locSelectedNav, 1)',
        tips: [
            'Use containers with Visible property for page content',
            'Show content based on If(locSelectedNav = 1, true, false)'
        ]
    },
    'dashboard-layout': {
        variables: [
            { name: 'locSelectedTab', defaultValue: '1', description: 'Current selected tab' },
            { name: 'locSelectedSidebar', defaultValue: '1', description: 'Current sidebar selection' }
        ],
        screenOnVisible: 'Set(locSelectedTab, 1); Set(locSelectedSidebar, 1)',
        tips: [
            'Combine tab and sidebar selections for complex navigation',
            'Each stat card can be bound to real data'
        ]
    },
};

/**
 * Get setup instructions for a component
 */
export function getComponentInstructions(componentSlug: string): ComponentInstructions | undefined {
    return instructionsRegistry[componentSlug];
}

/**
 * Check if a component has setup instructions
 */
export function hasInstructions(componentSlug: string): boolean {
    return componentSlug in instructionsRegistry;
}

/**
 * Generate the Screen.OnVisible code for display
 */
export function getScreenOnVisibleCode(componentSlug: string): string | undefined {
    const instructions = instructionsRegistry[componentSlug];
    return instructions?.screenOnVisible;
}
