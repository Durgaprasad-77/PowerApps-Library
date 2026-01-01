"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

interface LayoutTextFlipProps {
    text: string;
    words: string[];
    className?: string;
    textClassName?: string;
    wordClassName?: string;
    duration?: number;
}

export function LayoutTextFlip({
    text,
    words,
    className,
    textClassName,
    wordClassName,
    duration = 3000,
}: LayoutTextFlipProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, duration);

        return () => clearInterval(interval);
    }, [words.length, duration]);

    return (
        <LayoutGroup>
            <motion.div
                layout
                className={cn(
                    "inline-flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2",
                    className
                )}
            >
                <motion.span
                    layout
                    className={cn("text-white", textClassName)}
                >
                    {text}
                </motion.span>
                <AnimatePresence mode="wait">
                    <motion.span
                        layout
                        key={words[currentIndex]}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}
                        className={cn(
                            "inline-block px-6 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-white",
                            wordClassName
                        )}
                    >
                        {words[currentIndex]}
                    </motion.span>
                </AnimatePresence>
            </motion.div>
        </LayoutGroup>
    );
}
