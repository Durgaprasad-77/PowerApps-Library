// UI Components Barrel Export
// Re-exports all UI components for easy importing

// Motion / Animation components
export {
    FadeInUp,
    FadeInOnScroll,
    StaggerContainer,
    StaggerItem,
    HoverScale,
    HoverLift,
    FloatingElement,
    GradientOrb,
    TextReveal,
    fadeInUp,
    fadeIn,
    scaleIn,
    slideInLeft,
    slideInRight,
    staggerContainer,
    defaultTransition,
    springTransition,
} from "./motion";

// Toast notifications
export { Toaster, toast } from "./toaster";

// Command palette
export {
    CommandPalette,
    CommandGroup,
    CommandItem,
    useCommandPalette,
} from "./command-palette";

// Code syntax highlighting
export { CodeHighlighter, InlineCode } from "./code-highlighter";

// Page transitions
export {
    PageTransition,
    SlideTransition,
    ScaleTransition
} from "./page-transition";

// Loading states
export {
    Skeleton,
    Spinner,
    LoadingDots,
    CardSkeleton,
    LibraryGridSkeleton,
    PageLoading,
    ButtonLoader,
} from "./loading";

