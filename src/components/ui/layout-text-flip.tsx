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
                    "inline-flex items-center gap-2 text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight",
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
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                        }}
                        className={cn(
                            "inline-block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent",
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
