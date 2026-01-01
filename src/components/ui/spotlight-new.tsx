"use client";

import React from "react";
import { motion } from "framer-motion";

export function Spotlight() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
            {/* Main spotlight beam */}
            <div
                className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[200%] aspect-[1/0.7] opacity-50"
                style={{
                    background:
                        "conic-gradient(from 90deg at 50% 0%, transparent 50deg, rgba(255,255,255,0.05) 80deg, rgba(255,255,255,0.1) 90deg, rgba(255,255,255,0.05) 100deg, transparent 130deg)",
                }}
            />

            {/* Secondary subtle glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] opacity-30"
                style={{
                    background:
                        "radial-gradient(ellipse at center top, rgba(255,255,255,0.15), transparent 70%)",
                }}
            />

            {/* Accent highlight */}
            <div
                className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[40%] h-[30%] opacity-20"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(255,255,255,0.2), transparent 60%)",
                }}
            />
        </motion.div>
    );
}
