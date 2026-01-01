"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

// --- KEYBOARD COMPONENT ---

const Key = ({
    children,
    className,
    isPressed = false,
    width = "w-10",
}: {
    children: React.ReactNode;
    className?: string;
    isPressed?: boolean;
    width?: string;
}) => {
    return (
        <div
            className={cn(
                "h-10 rounded-md border border-neutral-800 bg-neutral-900 flex items-center justify-center text-xs font-medium text-neutral-400 shadow-[0_2px_0_0_rgba(255,255,255,0.1)] transition-all duration-100",
                width,
                isPressed
                    ? "translate-y-[2px] shadow-none bg-neutral-800 text-white border-neutral-700"
                    : "hover:bg-neutral-800/80",
                className
            )}
        >
            {children}
        </div>
    );
};

const Keyboard = () => {
    const [isCtrlPressed, setIsCtrlPressed] = useState(false);
    const [isVPressed, setIsVPressed] = useState(false);

    useEffect(() => {
        // Simulate Ctrl+V press loop
        const loop = async () => {
            await new Promise((r) => setTimeout(r, 1000));
            setIsCtrlPressed(true);
            await new Promise((r) => setTimeout(r, 400));
            setIsVPressed(true);
            await new Promise((r) => setTimeout(r, 200));
            setIsCtrlPressed(false);
            setIsVPressed(false);
        };

        const interval = setInterval(loop, 4000);
        loop(); // Start immediately

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative p-4 rounded-xl bg-black border border-neutral-800 shadow-2xl">
            {/* Keyboard Grid - Mac/Windows hybrid simplified layout */}
            <div className="flex flex-col gap-1">
                {/* Function Row (simplified) */}
                <div className="flex gap-1 mb-2">
                    <Key width="w-8">esc</Key>
                    <Key width="w-8">F1</Key>
                    <Key width="w-8">F2</Key>
                    <Key width="w-8">F3</Key>
                    <Key width="w-8">F4</Key>
                    <Key width="w-8">F5</Key>
                    <Key width="w-8">F6</Key>
                    <Key width="w-8">F7</Key>
                    <Key width="w-8">F8</Key>
                    <Key width="w-8">F9</Key>
                    <Key width="w-8">F10</Key>
                    <Key width="w-8">F11</Key>
                    <Key width="w-8">F12</Key>
                </div>

                {/* Row 1 */}
                <div className="flex gap-1">
                    <Key width="w-8">`</Key>
                    <Key>1</Key>
                    <Key>2</Key>
                    <Key>3</Key>
                    <Key>4</Key>
                    <Key>5</Key>
                    <Key>6</Key>
                    <Key>7</Key>
                    <Key>8</Key>
                    <Key>9</Key>
                    <Key>0</Key>
                    <Key>-</Key>
                    <Key>=</Key>
                    <Key width="w-12">del</Key>
                </div>

                {/* Row 2 */}
                <div className="flex gap-1">
                    <Key width="w-12">tab</Key>
                    <Key>Q</Key>
                    <Key>W</Key>
                    <Key>E</Key>
                    <Key>R</Key>
                    <Key>T</Key>
                    <Key>Y</Key>
                    <Key>U</Key>
                    <Key>I</Key>
                    <Key>O</Key>
                    <Key>P</Key>
                    <Key>[</Key>
                    <Key>]</Key>
                    <Key width="w-8">\</Key>
                </div>

                {/* Row 3 */}
                <div className="flex gap-1">
                    <Key width="w-14">caps</Key>
                    <Key>A</Key>
                    <Key>S</Key>
                    <Key>D</Key>
                    <Key>F</Key>
                    <Key>G</Key>
                    <Key>H</Key>
                    <Key>J</Key>
                    <Key>K</Key>
                    <Key>L</Key>
                    <Key>;</Key>
                    <Key>'</Key>
                    <Key width="w-12">return</Key>
                </div>

                {/* Row 4 */}
                <div className="flex gap-1">
                    <Key width="w-16">shift</Key>
                    <Key>Z</Key>
                    <Key>X</Key>
                    <Key>C</Key>
                    <Key isPressed={isVPressed} className={isVPressed ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]" : ""}>
                        V
                    </Key>
                    <Key>B</Key>
                    <Key>N</Key>
                    <Key>M</Key>
                    <Key>,</Key>
                    <Key>.</Key>
                    <Key>/</Key>
                    <Key width="w-16">shift</Key>
                </div>

                {/* Row 5 */}
                <div className="flex gap-1">
                    <Key isPressed={isCtrlPressed} width="w-12" className={isCtrlPressed ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]" : ""}>
                        ctrl
                    </Key>
                    <Key width="w-12">opt</Key>
                    <Key width="w-14">cmd</Key>
                    <Key width="w-48" className="flex-1"></Key>
                    <Key width="w-14">cmd</Key>
                    <Key width="w-12">opt</Key>
                    <Key width="w-12">ctrl</Key>
                </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full" />
        </div>
    );
};

// --- CODE WINDOW COMPONENT ---

const CodeWindow = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const codeLines = [
        { line: 1, text: 'CustomButton:', color: 'text-purple-400' },
        { line: 2, text: '  Control: Classic/Button', color: 'text-blue-400' },
        { line: 3, text: '  Properties:', color: 'text-neutral-300' },
        { line: 4, text: '    Text: ="Click Me"', color: 'text-green-400' },
        { line: 5, text: '    Fill: =RGBA(59, 130, 246, 1)', color: 'text-yellow-300' },
        { line: 6, text: '    Color: =RGBA(255, 255, 255, 1)', color: 'text-yellow-300' },
        { line: 7, text: '    RadiusTopLeft: =8', color: 'text-orange-400' },
        { line: 8, text: '    RadiusBottomRight: =8', color: 'text-orange-400' },
    ];

    useEffect(() => {
        // Type out lines
        const interval = setInterval(() => {
            setCurrentLine((prev) => (prev < codeLines.length ? prev + 1 : prev));
        }, 400); // Speed of typing

        // Reset loop
        const resetLoop = setInterval(() => {
            setCurrentLine(0);
        }, 5000); // 4s matches keyboard loop + buffer

        return () => {
            clearInterval(interval);
            clearInterval(resetLoop);
        };
    }, []);

    return (
        <div className="relative w-full max-w-sm rounded-xl overflow-hidden bg-[#1e1e1e] border border-neutral-800 shadow-2xl">
            {/* Title Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-neutral-800">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 text-[10px] text-neutral-400 font-mono">MyPowerApp.yaml</div>
            </div>

            {/* Code Text */}
            <div className="p-4 font-mono text-xs leading-relaxed">
                {codeLines.map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                            opacity: index < currentLine ? 1 : 0,
                            x: index < currentLine ? 0 : -10
                        }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${line.color}`}
                    >
                        <span className="w-6 text-neutral-700 select-none text-right mr-3">{line.line}</span>
                        <span className="whitespace-pre">{line.text}</span>
                    </motion.div>
                ))}
                {/* Blinking Cursor */}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-1.5 h-4 bg-blue-500 ml-9 mt-1 inline-block"
                    style={{ display: currentLine === codeLines.length ? 'none' : 'inline-block' }}
                />
            </div>

            {/* Copied Toat Simulation */}
            <AnimatePresence>
                {currentLine === codeLines.length && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute bottom-4 right-4 bg-green-600/90 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 shadow-lg backdrop-blur-sm"
                    >
                        <Check className="w-3 h-3" />
                        <span>Pasted!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- MAIN SECTION ---

export function CopyPasteSection() {
    return (
        <section className="relative py-24 bg-black overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <div className="flex flex-col gap-6 text-center lg:text-left z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                            As simple as{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                                copy and paste
                            </span>
                        </h2>
                        <p className="text-neutral-400 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Copy the YAML code into your clipboard and paste directly into Power Apps Studio.
                            Run your app instantly. It's that simple, really.
                        </p>

                        <div className="flex flex-col gap-3 mt-4 text-sm text-neutral-500 max-w-md mx-auto lg:mx-0">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span>No complex imports or solution files</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span>Works with Git version control</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span>Zero dependencies to install</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visuals (Keyboard + Code Window) */}
                    <div className="relative flex flex-col items-center justify-center gap-8 perspective-[1000px]">

                        {/* 3D Floating Effect Container */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-20"
                        >
                            {/* Keyboard Base */}
                            <div className="transform rotate-x-12 rotate-y-[-12deg] rotate-z-2 shadow-2xl">
                                <Keyboard />
                            </div>

                            {/* Floating Code Window */}
                            <motion.div
                                className="absolute -right-4 -top-12 w-80 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-30"
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <CodeWindow />
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
