"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

// --- KEYBOARD COMPONENT (Wide, realistic layout) ---

const Key = ({
    children,
    className,
    isPressed = false,
    width = "w-12",
    height = "h-10",
}: {
    children?: React.ReactNode;
    className?: string;
    isPressed?: boolean;
    width?: string;
    height?: string;
}) => {
    return (
        <div
            className={cn(
                "rounded-md border border-neutral-700/80 bg-neutral-800 flex items-center justify-center text-[11px] font-medium text-neutral-400 transition-all duration-100",
                width,
                height,
                isPressed && "bg-blue-500/30 text-blue-300 border-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.4)]",
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
            setTimeout(() => setIsPressed(false), 600);
        }, 3500);

        // Initial trigger
        setTimeout(() => {
            setIsPressed(true);
            setTimeout(() => setIsPressed(false), 600);
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative p-4 rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700/50 shadow-2xl">
            {/* Keyboard frame effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-neutral-700/20 to-transparent pointer-events-none" />

            <div className="flex flex-col gap-1.5 relative">
                {/* Function Row */}
                <div className="flex gap-1.5 mb-1">
                    <Key width="w-10" height="h-7">esc</Key>
                    <div className="flex-1" />
                    {["F1", "F2", "F3", "F4"].map((k) => (
                        <Key key={k} width="w-10" height="h-7">{k}</Key>
                    ))}
                    <div className="w-2" />
                    {["F5", "F6", "F7", "F8"].map((k) => (
                        <Key key={k} width="w-10" height="h-7">{k}</Key>
                    ))}
                    <div className="w-2" />
                    {["F9", "F10", "F11", "F12"].map((k) => (
                        <Key key={k} width="w-10" height="h-7">{k}</Key>
                    ))}
                </div>

                {/* Row 1 - Numbers */}
                <div className="flex gap-1.5">
                    {["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="].map((k) => (
                        <Key key={k}>{k}</Key>
                    ))}
                    <Key width="w-16">⌫</Key>
                </div>

                {/* Row 2 - QWERTY */}
                <div className="flex gap-1.5">
                    <Key width="w-16">Tab</Key>
                    {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"].map((k) => (
                        <Key key={k}>{k}</Key>
                    ))}
                </div>

                {/* Row 3 - ASDF */}
                <div className="flex gap-1.5">
                    <Key width="w-[72px]">Caps</Key>
                    {["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"].map((k) => (
                        <Key key={k}>{k}</Key>
                    ))}
                    <Key width="w-[72px]">Enter</Key>
                </div>

                {/* Row 4 - ZXCV */}
                <div className="flex gap-1.5">
                    <Key width="w-[92px]">Shift</Key>
                    {["Z", "X"].map((k) => (
                        <Key key={k}>{k}</Key>
                    ))}
                    <Key>C</Key>
                    <Key isPressed={isPressed}>V</Key>
                    {["B", "N", "M", ",", ".", "/"].map((k) => (
                        <Key key={k}>{k}</Key>
                    ))}
                    <Key width="w-[92px]">Shift</Key>
                </div>

                {/* Row 5 - Bottom */}
                <div className="flex gap-1.5">
                    <Key isPressed={isPressed} width="w-14">Ctrl</Key>
                    <Key width="w-12">Win</Key>
                    <Key width="w-12">Alt</Key>
                    <Key width="flex-1 min-w-[200px]"></Key>
                    <Key width="w-12">Alt</Key>
                    <Key width="w-12">Fn</Key>
                    <Key width="w-12">☰</Key>
                    <Key width="w-14">Ctrl</Key>
                </div>
            </div>
        </div>
    );
};

// --- CODE WINDOW COMPONENT ---

const CodeWindow = () => {
    const [showCode, setShowCode] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCode(true);
            setTimeout(() => setShowCode(false), 3000);
        }, 3500);

        setTimeout(() => {
            setShowCode(true);
            setTimeout(() => setShowCode(false), 3000);
        }, 800);

        return () => clearInterval(interval);
    }, []);

    const codeLines = [
        { num: 1, text: '"use client";', color: "text-green-400" },
        { num: 2, text: "", color: "" },
        { num: 3, text: "CustomButton:", color: "text-purple-400" },
        { num: 4, text: "  Control: Classic/Button", color: "text-blue-400" },
        { num: 5, text: "  Properties:", color: "text-neutral-300" },
        { num: 6, text: '    Text: ="Click Me"', color: "text-green-400" },
        { num: 7, text: "    Fill: =RGBA(59, 130, 246, 1)", color: "text-yellow-400" },
        { num: 8, text: "    HoverFill: =ColorFade(Self.Fill, -10%)", color: "text-yellow-400" },
    ];

    return (
        <div className="w-[340px] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-700/50 shadow-2xl">
            {/* Title Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800 border-b border-neutral-700/50">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-3 text-[11px] text-neutral-400 font-mono flex items-center gap-2">
                    <Copy className="w-3 h-3" />
                    component.yaml
                </span>
            </div>

            {/* Code */}
            <div className="p-4 font-mono text-xs leading-relaxed min-h-[180px] relative">
                <AnimatePresence>
                    {showCode && codeLines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.12, delay: i * 0.04 }}
                            className="flex"
                        >
                            <span className="w-6 text-neutral-600 select-none text-right mr-4">{line.num}</span>
                            <span className={cn("whitespace-pre", line.color)}>{line.text}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Pasted badge */}
                <AnimatePresence>
                    {showCode && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ delay: 0.4 }}
                            className="absolute bottom-4 right-4 bg-green-500/20 text-green-400 text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-green-500/30"
                        >
                            <Check className="w-3 h-3" />
                            Pasted!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- MAIN SECTION ---

export function CopyPasteSection() {
    return (
        <section className="relative py-24 bg-black overflow-hidden">
            <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Centered Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        As simple as copy and paste
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Copy paste the code into your <code className="px-1.5 py-0.5 bg-neutral-800 rounded text-sm">ui</code> folder
                        and use the components in your projects. It's that simple, really.
                    </p>
                </div>

                {/* Keyboard + Code Window */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="relative flex items-center justify-center"
                >
                    {/* Keyboard */}
                    <div className="transform scale-[0.7] sm:scale-[0.85] lg:scale-100 origin-center">
                        <Keyboard />
                    </div>

                    {/* Floating Code Window */}
                    <motion.div
                        className="absolute right-4 sm:right-12 lg:right-32 -top-8 lg:top-4 z-10"
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <CodeWindow />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

