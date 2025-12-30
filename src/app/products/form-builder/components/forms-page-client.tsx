"use client";

import { motion } from "framer-motion";
import { FileText, Layers, Wand2, Download, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Animated Form Preview - Floating glassmorphism mockup
function FormPreview() {
    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-fuchsia-500/20 blur-3xl rounded-full scale-150" />

            {/* Main Form Card */}
            <motion.div
                className="relative bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 shadow-2xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Form Header */}
                <div className="mb-6">
                    <motion.div
                        className="h-5 w-32 bg-neutral-700 rounded mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    />
                    <motion.div
                        className="h-3 w-48 bg-neutral-800 rounded"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    />
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    {/* Text Input */}
                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="h-2.5 w-16 bg-neutral-600 rounded" />
                        <div className="h-10 w-full bg-neutral-800 border border-neutral-700 rounded-lg flex items-center px-3">
                            <motion.div
                                className="h-1 w-0 bg-white/50 rounded"
                                animate={{ width: ["0%", "60%"] }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                            />
                        </div>
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="h-2.5 w-12 bg-neutral-600 rounded" />
                        <div className="h-10 w-full bg-neutral-800 border border-neutral-700 rounded-lg flex items-center px-3">
                            <motion.div
                                className="h-1 w-0 bg-white/50 rounded"
                                animate={{ width: ["0%", "45%"] }}
                                transition={{ delay: 2, duration: 0.6 }}
                            />
                        </div>
                    </motion.div>

                    {/* Dropdown */}
                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="h-2.5 w-20 bg-neutral-600 rounded" />
                        <div className="h-10 w-full bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-between px-3">
                            <div className="h-2.5 w-24 bg-neutral-600 rounded" />
                            <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Toggle */}
                    <motion.div
                        className="flex items-center justify-between py-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="h-2.5 w-28 bg-neutral-600 rounded" />
                        <motion.div
                            className="w-10 h-5 bg-neutral-700 rounded-full p-0.5 flex"
                            animate={{ backgroundColor: ["#404040", "#8b5cf6"] }}
                            transition={{ delay: 2.5, duration: 0.3 }}
                        >
                            <motion.div
                                className="w-4 h-4 bg-white rounded-full shadow"
                                animate={{ x: [0, 20] }}
                                transition={{ delay: 2.5, duration: 0.3 }}
                            />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Submit Button */}
                <motion.div
                    className="mt-8 flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <div className="flex-1 h-10 bg-white rounded-lg flex items-center justify-center">
                        <div className="h-2.5 w-16 bg-neutral-400 rounded" />
                    </div>
                    <div className="h-10 w-24 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center">
                        <div className="h-2.5 w-12 bg-neutral-500 rounded" />
                    </div>
                </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-neutral-800/80 border border-neutral-700 backdrop-blur-sm p-3 flex flex-col justify-center items-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <FileText className="w-6 h-6 text-violet-400 mb-1" />
                <span className="text-[9px] text-neutral-400">YAML</span>
            </motion.div>

            <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-neutral-800/80 border border-neutral-700 backdrop-blur-sm p-2 flex flex-col justify-center items-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-[8px] text-neutral-400 mt-0.5">Valid</span>
            </motion.div>
        </div>
    );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
    return (
        <motion.div
            className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 hover:bg-neutral-900/80 transition-all group"
            whileHover={{ y: -4 }}
        >
            <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-4 group-hover:border-neutral-600 transition-colors">
                <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-sm text-neutral-500">{description}</p>
        </motion.div>
    );
}

export function FormsPageClient() {
    const features = [
        {
            icon: Layers,
            title: "Template Library",
            description: "Start with pre-built form templates for common scenarios like feedback, registration, and surveys."
        },
        {
            icon: Wand2,
            title: "Visual Builder",
            description: "Drag-and-drop interface to create professional forms without writing a single line of code."
        },
        {
            icon: FileText,
            title: "Field Types",
            description: "Text inputs, dropdowns, date pickers, toggles, and multi-step wizards—all supported."
        },
        {
            icon: Download,
            title: "One-Click Export",
            description: "Generate Power Apps-ready YAML code instantly. Copy, paste, and you're done."
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 mb-8"
                        >
                            <span className="flex h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                            <span className="text-sm font-medium text-neutral-400">Coming Soon</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                        >
                            Beautiful Forms for{" "}
                            <span className="text-neutral-500">Power Apps</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-neutral-400 mb-8"
                        >
                            Design professional multi-step forms with our visual builder.
                            Export directly to Power Apps YAML in one click.
                        </motion.p>

                        {/* Feature Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-4 text-sm text-neutral-400"
                        >
                            {["Visual Builder", "Multi-Step Forms", "One-Click Export"].map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Form Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-lg mx-auto"
                    >
                        <FormPreview />
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 border-t border-neutral-800">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Everything you need to build forms
                        </h2>
                        <p className="text-neutral-400">
                            From templates to export, we've got you covered.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                            >
                                <FeatureCard {...feature} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 border-t border-neutral-800">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to build beautiful forms?
                    </h2>
                    <p className="text-neutral-400 mb-8">
                        Join the waitlist to get early access when Form Builder launches.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="h-12 px-8 bg-white text-black hover:bg-neutral-200 font-medium rounded-full"
                        >
                            Join Waitlist
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="h-12 px-8 text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 rounded-full"
                        >
                            <Link href="/library">
                                Browse Components
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
