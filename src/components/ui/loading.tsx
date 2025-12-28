"use client";

import { motion } from "framer-motion";

// Skeleton loader for content
interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
    animate?: boolean;
}

export function Skeleton({
    className = "",
    variant = "rectangular",
    width,
    height,
    animate = true,
}: SkeletonProps) {
    const baseClass = "bg-[#1a1a1a]";
    const variantClass = {
        text: "rounded",
        circular: "rounded-full",
        rectangular: "rounded-lg",
    };

    return (
        <motion.div
            className={`${baseClass} ${variantClass[variant]} ${className}`}
            style={{ width, height }}
            animate={animate ? {
                opacity: [0.5, 0.8, 0.5],
            } : undefined}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

// Loading spinner
interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-10 h-10",
    };

    return (
        <motion.div
            className={`${sizes[size]} ${className}`}
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <svg
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </motion.div>
    );
}

// Loading dots animation
export function LoadingDots({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                    }}
                />
            ))}
        </div>
    );
}

// Card skeleton for library grid
export function CardSkeleton() {
    return (
        <div className="rounded-xl bg-[#111] border border-[#262626] overflow-hidden">
            <Skeleton className="h-36 w-full rounded-none" />
            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
            </div>
        </div>
    );
}

// Grid skeleton for library page
export function LibraryGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}

// Full page loading state
export function PageLoading({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <Spinner size="lg" className="text-white mx-auto mb-4" />
                <p className="text-[#6b6b6b] text-sm">{message}</p>
            </motion.div>
        </div>
    );
}

// Button loading state
export function ButtonLoader({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Spinner size="sm" />
            <span>Loading...</span>
        </div>
    );
}
