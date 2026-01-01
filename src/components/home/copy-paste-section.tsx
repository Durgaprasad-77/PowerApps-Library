"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

// --- KEYBOARD COMPONENT (Simplified, cleaner) ---

const Key = ({
    children,
    className,
    isPressed = false,
    width = "w-9",
}: {
    children: React.ReactNode;
    className?: string;
    isPressed?: boolean;
    width?: string;
}) => {
    return (
        <div
            className={cn(
                "h-9 rounded-md border border-neutral-800 bg-neutral-900/80 flex items-center justify-center text-[10px] font-medium text-neutral-500 transition-all duration-150",
                width,
                isPressed && "bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.3)]",
                className
            )}
        >
            {children}
        </div>
    );
};

const Keyboard = () => {
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsPressed(true);
            setTimeout(() => setIsPressed(false), 500);
        }, 3000);

        // Initial trigger
        setTimeout(() => {
            setIsPressed(true);
            setTimeout(() => setIsPressed(false), 500);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative p-3 rounded-xl bg-neutral-950 border border-neutral-800/50 shadow-xl">
            <div className="flex flex-col gap-1">
                {/* Row 1 - Numbers */}
                <div className="flex gap-1">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((k) => (
                        <Key key={k} width="w-8">{k}</Key>
                    ))}
                </div>

                {/* Row 2 - QWERTY */}
                <div className="flex gap-1">
                    {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((k) => (
                        <Key key={k} width="w-8">{k}</Key>
                    ))}
                </div>

                {/* Row 3 - ASDF */}
                <div className="flex gap-1 pl-2">
                    {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((k) => (
                        <Key key={k} width="w-8">{k}</Key>
                    ))}
                </div>

                {/* Row 4 - ZXCV */}
                <div className="flex gap-1 pl-4">
                    {["Z", "X"].map((k) => (
                        <Key key={k} width="w-8">{k}</Key>
                    ))}
                    <Key width="w-8">C</Key>
                    <Key isPressed={isPressed} width="w-8">V</Key>
                    {["B", "N", "M"].map((k) => (
                        <Key key={k} width="w-8">{k}</Key>
                    ))}
                </div>

                {/* Row 5 - Bottom */}
                <div className="flex gap-1 items-center">
                    <Key isPressed={isPressed} width="w-12">Ctrl</Key>
                    <Key width="w-10">Alt</Key>
                    <Key width="w-36"></Key>
                    <Key width="w-10">Alt</Key>
                    <Key width="w-12">Ctrl</Key>
                </div>
            </div>
        </div>
    );
};

// --- CODE WINDOW COMPONENT (Simplified) ---

const CodeWindow = () => {
    const [showCode, setShowCode] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCode(true);
            setTimeout(() => setShowCode(false), 2500);
        }, 3000);

        setTimeout(() => {
            setShowCode(true);
            setTimeout(() => setShowCode(false), 2500);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const codeLines = [
        { text: "CustomButton:", color: "text-purple-400" },
        { text: "  Control: Classic/Button", color: "text-blue-400" },
        { text: "  Properties:", color: "text-neutral-400" },
        { text: '    Text: ="Click Me"', color: "text-green-400" },
        { text: "    Fill: =RGBA(59, 130, 246, 1)", color: "text-yellow-400" },
        { text: "    Color: =RGBA(255, 255, 255, 1)", color: "text-yellow-400" },
    ];

    return (
        <div className="w-72 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800/50 shadow-xl">
            {/* Title Bar */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-900/80 border-b border-neutral-800/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[9px] text-neutral-600 font-mono">component.yaml</span>
            </div>

            {/* Code */}
            <div className="p-3 font-mono text-[10px] leading-relaxed min-h-[120px]">
                <AnimatePresence>
                    {showCode && codeLines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            transition={{ duration: 0.15, delay: i * 0.05 }}
                            className={cn("whitespace-pre", line.color)}
                        >
                            {line.text}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Pasted indicator */}
                <AnimatePresence>
                    {showCode && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.3 }}
                            className="absolute bottom-3 right-3 bg-green-500/20 text-green-400 text-[9px] px-2 py-0.5 rounded flex items-center gap-1"
                        >
                            <Check className="w-2.5 h-2.5" />
                            Pasted
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- MAIN SECTION (Matching site style) ---

export function CopyPasteSection() {
    return (
        <section className="relative py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header - Matching ProductsShowcase style */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        As simple as copy and paste
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Copy the YAML code into your clipboard and paste directly into Power Apps Studio.
                        No complex imports. No dependencies.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    {/* Left: Features List */}
                    <div className="flex flex-col gap-4">
                        {[
                            { title: "Direct copy-paste", desc: "No npm, no config files. Just copy and paste." },
                            { title: "Works with Git", desc: "YAML-based code works seamlessly with version control." },
                            { title: "Zero dependencies", desc: "No external libraries or packages to install." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50"
                            >
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                    <p className="text-sm text-neutral-500">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Visual Demo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative">
                            <Keyboard />

                            {/* Floating Code Window */}
                            <div className="absolute -right-8 -top-8">
                                <CodeWindow />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
