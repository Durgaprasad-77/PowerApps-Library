"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

// Default animation variants
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

export const slideInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
};

// Stagger container for children animations
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Default transition
export const defaultTransition = {
    duration: 0.4,
    ease: "easeOut" as const,
};

export const springTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
};

// ========================================
// ANIMATION WRAPPER COMPONENTS
// ========================================

interface AnimateProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
}

// Fade In Up (most common)
export function FadeInUp({
    children,
    delay = 0,
    className = "",
    ...props
}: AnimateProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ ...defaultTransition, delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Fade In on Scroll (viewport trigger)
export function FadeInOnScroll({
    children,
    delay = 0,
    className = "",
    ...props
}: AnimateProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            transition={{ ...defaultTransition, delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Stagger Children Container
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function StaggerContainer({
    children,
    className = "",
    delay = 0,
}: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger Item (use inside StaggerContainer)
export function StaggerItem({
    children,
    className = "",
    ...props
}: AnimateProps) {
    return (
        <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Scale on Hover
interface HoverScaleProps {
    children: ReactNode;
    className?: string;
    scale?: number;
}

export function HoverScale({
    children,
    className = "",
    scale = 1.02,
}: HoverScaleProps) {
    return (
        <motion.div
            whileHover={{ scale }}
            transition={springTransition}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Hover Lift (translateY)
export function HoverLift({
    children,
    className = "",
}: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={springTransition}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ========================================
// SPECIAL EFFECTS
// ========================================

// Floating animation (for decorative elements)
export function FloatingElement({
    children,
    className = "",
    duration = 6,
}: { children: ReactNode; className?: string; duration?: number }) {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Gradient Orb (background decoration)
interface GradientOrbProps {
    className?: string;
    color?: "blue" | "purple" | "pink";
    size?: "sm" | "md" | "lg";
}

export function GradientOrb({
    className = "",
    color = "purple",
    size = "md",
}: GradientOrbProps) {
    const colors = {
        blue: "from-blue-500/20 to-cyan-500/20",
        purple: "from-purple-500/20 to-pink-500/20",
        pink: "from-pink-500/20 to-orange-500/20",
    };

    const sizes = {
        sm: "w-48 h-48",
        md: "w-96 h-96",
        lg: "w-[600px] h-[600px]",
    };

    return (
        <motion.div
            animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className={`
        absolute rounded-full blur-3xl opacity-50
        bg-gradient-to-br ${colors[color]} ${sizes[size]}
        ${className}
      `}
        />
    );
}

// Text reveal animation
export function TextReveal({
    children,
    className = "",
    delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.span>
    );
}
