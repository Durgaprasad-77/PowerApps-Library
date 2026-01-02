"use client";

import React, { useState, useEffect } from "react";
import { SettingsValues } from "@/lib/settings-types";
import { usePreviewTheme } from "@/contexts/preview-theme-context";
import { motion, AnimatePresence } from "framer-motion";

export function LayoutTextFlipPreview({ settings }: { settings: SettingsValues }) {
    const { colors } = usePreviewTheme();
    const [wordIndex, setWordIndex] = useState(0);
    const words = ["PowerUI Pro", "Power Apps", "The Future", "Innovation"];

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Flip animation variants
    const flipVariants = {
        enter: { rotateX: -90, opacity: 0, y: 20 },
        center: { rotateX: 0, opacity: 1, y: 0 },
        exit: { rotateX: 90, opacity: 0, y: -20 },
    };

    return (
        <div className="w-full flex items-center justify-center py-8">
            <div
                className="flex items-center justify-center p-4 rounded-xl"
                style={{
                    backgroundColor: colors.bg.primary,
                    gap: "8px",
                }}
            >
                {/* Static Text */}
                <span
                    className="text-right font-bold text-xl whitespace-nowrap"
                    style={{
                        fontFamily: 'Open Sans, sans-serif',
                        color: colors.text.primary,
                    }}
                >
                    Welcome to
                </span>

                {/* Animated Pill */}
                <div
                    className="relative h-12 w-[180px] rounded-lg overflow-hidden flex items-center justify-center"
                    style={{
                        backgroundColor: "#292828", // Matches the YAML Fill color
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={wordIndex}
                            variants={flipVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute font-bold text-xl text-white text-center w-full"
                            style={{
                                fontFamily: 'Open Sans, sans-serif',
                            }}
                        >
                            {words[wordIndex]}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
