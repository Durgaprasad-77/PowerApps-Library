"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers, Wand2, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formTemplates } from "../lib/form-templates";
import { FormTemplate } from "../lib/form-types";

interface WelcomeScreenProps {
    onSelectTemplate: (template: FormTemplate) => void;
}

export function WelcomeScreen({ onSelectTemplate }: WelcomeScreenProps) {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-black">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 mb-8"
                        >
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-sm font-medium text-neutral-400">Form Builder</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                        >
                            Build Beautiful Forms{" "}
                            <span className="text-neutral-500">Visually</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-neutral-400 mb-8"
                        >
                            Drag and drop fields, customize properties, and export production-ready
                            Power Apps YAML code in seconds.
                        </motion.p>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-6 text-sm text-neutral-400 mb-12"
                        >
                            <div className="flex items-center gap-2">
                                <Layers className="w-4 h-4 text-blue-400" />
                                Drag & Drop
                            </div>
                            <div className="flex items-center gap-2">
                                <Wand2 className="w-4 h-4 text-purple-400" />
                                Live Preview
                            </div>
                            <div className="flex items-center gap-2">
                                <FileCode className="w-4 h-4 text-emerald-400" />
                                YAML Export
                            </div>
                        </motion.div>
                    </div>

                    {/* Template Selection */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h2 className="text-center text-xl font-semibold text-white mb-8">
                            Choose a Template to Get Started
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {formTemplates.map((template, index) => (
                                <motion.button
                                    key={template.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                    onClick={() => onSelectTemplate(template)}
                                    className="group relative bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-left hover:border-neutral-700 hover:bg-neutral-900 transition-all"
                                >
                                    {/* Template Preview */}
                                    <div className="w-full h-32 rounded-lg bg-neutral-800/50 border border-neutral-700/50 mb-4 flex items-center justify-center overflow-hidden">
                                        <TemplatePreview type={template.thumbnail} />
                                    </div>

                                    <h3 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                                        {template.name}
                                    </h3>
                                    <p className="text-sm text-neutral-500">
                                        {template.description}
                                    </p>

                                    {/* Hover arrow */}
                                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-5 h-5 text-blue-400" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Blank template option */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="text-center mt-8"
                        >
                            <Button
                                variant="outline"
                                onClick={() => onSelectTemplate({
                                    id: "blank",
                                    name: "Blank Form",
                                    description: "Start from scratch",
                                    thumbnail: "blank",
                                    defaultConfig: {
                                        title: "New Form",
                                        subtitle: "",
                                        submitButtonText: "Submit",
                                        cancelButtonText: "Cancel",
                                        width: 400,
                                    },
                                    defaultFields: [],
                                })}
                                className="border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-600"
                            >
                                or start with a blank form
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

// Mini template preview components
function TemplatePreview({ type }: { type: string }) {
    switch (type) {
        case "card":
            return (
                <div className="w-20 scale-75">
                    <div className="bg-white rounded-lg p-2 shadow-lg">
                        <div className="h-2 w-12 bg-neutral-300 rounded mb-2" />
                        <div className="h-1.5 w-16 bg-neutral-200 rounded mb-3" />
                        <div className="space-y-2">
                            <div className="h-4 bg-neutral-100 rounded" />
                            <div className="h-4 bg-neutral-100 rounded" />
                        </div>
                        <div className="mt-3 flex gap-1 justify-end">
                            <div className="h-3 w-8 bg-neutral-200 rounded" />
                            <div className="h-3 w-8 bg-blue-500 rounded" />
                        </div>
                    </div>
                </div>
            );
        case "minimal":
            return (
                <div className="w-16 scale-75">
                    <div className="space-y-2">
                        <div className="h-1.5 w-10 bg-neutral-500 rounded" />
                        <div className="h-6 bg-neutral-700 rounded border border-neutral-600" />
                        <div className="h-1.5 w-8 bg-neutral-500 rounded" />
                        <div className="h-6 bg-neutral-700 rounded border border-neutral-600" />
                        <div className="h-5 w-12 bg-white rounded mx-auto mt-2" />
                    </div>
                </div>
            );
        case "dark":
            return (
                <div className="w-16 scale-75">
                    <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-2">
                        <div className="h-1.5 w-10 bg-neutral-600 rounded mb-2" />
                        <div className="h-5 bg-neutral-800 rounded mb-2 border border-neutral-700" />
                        <div className="h-5 bg-neutral-800 rounded mb-2 border border-neutral-700" />
                        <div className="h-4 w-full bg-blue-600 rounded" />
                    </div>
                </div>
            );
        default:
            return (
                <div className="text-neutral-600 text-xs">
                    + Blank
                </div>
            );
    }
}
