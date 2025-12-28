"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

// Fade transition for general pages
export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                    duration: 0.25,
                    ease: "easeOut" as const
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

// Slide transition for navigating between detail pages
export function SlideTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut" as const
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

// Scale transition for modals and overlays
export function ScaleTransition({
    children,
    isVisible
}: {
    children: ReactNode;
    isVisible: boolean;
}) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut" as const
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
