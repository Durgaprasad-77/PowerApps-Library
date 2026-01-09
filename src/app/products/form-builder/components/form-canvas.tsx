"use client";

import { FormConfig, FormField } from "../lib/form-types";
import { cn } from "@/lib/utils";
import { GripVertical, Type, Hash, ChevronDown, Calendar, ToggleRight, CheckSquare, AlignLeft, SlidersHorizontal, Star, CircleDot, Mail, Phone, Lock } from "lucide-react";
import { motion, Reorder } from "framer-motion";

interface FormCanvasProps {
    config: FormConfig;
    fields: FormField[];
    selectedFieldId: string | null;
    activeStepId?: string;
    onSelectField: (id: string | null) => void;
    onReorder: (fields: FormField[]) => void;
}

const fieldIcons: Record<string, React.ReactNode> = {
    text: <Type className="w-4 h-4" />,
    textarea: <AlignLeft className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
    phone: <Phone className="w-4 h-4" />,
    password: <Lock className="w-4 h-4" />,
    number: <Hash className="w-4 h-4" />,
    slider: <SlidersHorizontal className="w-4 h-4" />,
    rating: <Star className="w-4 h-4" />,
    dropdown: <ChevronDown className="w-4 h-4" />,
    radio: <CircleDot className="w-4 h-4" />,
    date: <Calendar className="w-4 h-4" />,
    toggle: <ToggleRight className="w-4 h-4" />,
    checkbox: <CheckSquare className="w-4 h-4" />,
};

export function FormCanvas({ config, fields, selectedFieldId, activeStepId, onSelectField, onReorder }: FormCanvasProps) {
    // Filter fields by active step if multi-step
    const displayFields = activeStepId
        ? fields.filter(f => f.stepId === activeStepId || !f.stepId)
        : fields;

    return (
        <div className="flex-1 bg-neutral-900/50 overflow-y-auto p-8">
            <div className="flex items-center justify-center min-h-full">
                {/* Form Preview Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl shadow-2xl overflow-hidden"
                    style={{ width: config.width }}
                    onClick={() => onSelectField(null)}
                >
                    {/* Form Header */}
                    <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
                        <h2 className="text-xl font-bold text-neutral-900">
                            {config.title || "Untitled Form"}
                        </h2>
                        {config.subtitle && (
                            <p className="text-sm text-neutral-500 mt-1">
                                {config.subtitle}
                            </p>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="p-6">
                        {displayFields.length === 0 ? (
                            <div className="py-12 text-center border-2 border-dashed border-neutral-200 rounded-lg">
                                <p className="text-neutral-400 text-sm">
                                    Click a field type from the palette to add it here
                                </p>
                            </div>
                        ) : (
                            <div
                                className={cn(
                                    "grid gap-4",
                                    config.columns === 3 ? "grid-cols-3" : config.columns === 2 ? "grid-cols-2" : "grid-cols-1"
                                )}
                            >
                                {displayFields.map((field) => (
                                    <div
                                        key={field.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectField(field.id);
                                        }}
                                        className={cn(
                                            "group relative p-4 rounded-lg border-2 transition-all cursor-pointer",
                                            selectedFieldId === field.id
                                                ? "border-blue-500 bg-blue-50/50"
                                                : "border-transparent hover:border-neutral-200 bg-neutral-50"
                                        )}
                                    >
                                        {/* Field Label */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-neutral-500">
                                                {fieldIcons[field.type]}
                                            </span>
                                            <label className="text-sm font-medium text-neutral-700">
                                                {field.label}
                                                {field.required && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                        </div>

                                        {/* Field Preview */}
                                        <FieldPreview field={field} />

                                        {/* Selection indicator */}
                                        {selectedFieldId === field.id && (
                                            <div className="absolute -right-1 -top-1 w-3 h-3 bg-blue-500 rounded-full" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="px-6 pb-6 pt-2 flex justify-end gap-3">
                        {config.cancelButtonText && (
                            <button className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors">
                                {config.cancelButtonText}
                            </button>
                        )}
                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            {config.submitButtonText || "Submit"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Field preview components
function FieldPreview({ field }: { field: FormField }) {
    switch (field.type) {
        case "text":
        case "number":
            return (
                <div className="h-10 bg-white border border-neutral-300 rounded-lg px-3 flex items-center">
                    <span className="text-neutral-400 text-sm">
                        {field.placeholder || "Enter value..."}
                    </span>
                </div>
            );
        case "textarea":
            return (
                <div className="h-20 bg-white border border-neutral-300 rounded-lg px-3 py-2 flex items-start">
                    <span className="text-neutral-400 text-sm">
                        {field.placeholder || "Enter text..."}
                    </span>
                </div>
            );
        case "email":
            return (
                <div className="h-10 bg-white border border-neutral-300 rounded-lg px-3 flex items-center">
                    <Mail className="w-4 h-4 text-neutral-400 mr-2" />
                    <span className="text-neutral-400 text-sm">
                        {field.placeholder || "you@example.com"}
                    </span>
                </div>
            );
        case "phone":
            return (
                <div className="h-10 bg-white border border-neutral-300 rounded-lg px-3 flex items-center">
                    <Phone className="w-4 h-4 text-neutral-400 mr-2" />
                    <span className="text-neutral-400 text-sm">
                        {field.placeholder || "+1 (555) 000-0000"}
                    </span>
                </div>
            );
        case "password":
            return (
                <div className="h-10 bg-white border border-neutral-300 rounded-lg px-3 flex items-center">
                    <span className="text-neutral-400 text-sm tracking-widest">
                        ••••••••
                    </span>
                </div>
            );
        case "slider":
            return (
                <div className="space-y-2">
                    <div className="h-2 bg-neutral-200 rounded-full relative">
                        <div className="absolute left-0 top-0 h-full w-1/2 bg-blue-500 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow" />
                    </div>
                    <div className="flex justify-between text-xs text-neutral-400">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                    </div>
                </div>
            );
        case "rating":
            return (
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className={cn("w-5 h-5", i <= 3 ? "fill-yellow-400 text-yellow-400" : "text-neutral-300")} />
                    ))}
                </div>
            );
        case "radio":
            return (
                <div className="space-y-2">
                    {(field.options || [{ id: '1', label: 'Option 1', value: '1' }, { id: '2', label: 'Option 2', value: '2' }]).slice(0, 3).map((opt, i) => (
                        <div key={opt.id} className="flex items-center gap-2">
                            <div className={cn(
                                "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                                i === 0 ? "border-blue-500" : "border-neutral-300"
                            )}>
                                {i === 0 && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                            </div>
                            <span className="text-sm text-neutral-600">{opt.label}</span>
                        </div>
                    ))}
                </div>
            );
        case "dropdown":
            return (
                <div className="h-10 bg-white border border-neutral-300 rounded-lg px-3 flex items-center justify-between">
                    <span className="text-neutral-400 text-sm">Select option...</span>
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                </div>
            );
        case "date":
            return (
                <div className="h-10 bg-white border border-neutral-300 rounded-lg px-3 flex items-center justify-between">
                    <span className="text-neutral-400 text-sm">Select date...</span>
                    <Calendar className="w-4 h-4 text-neutral-400" />
                </div>
            );
        case "toggle":
            return (
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "w-10 h-5 rounded-full p-0.5 transition-colors",
                        field.defaultValue ? "bg-blue-500" : "bg-neutral-300"
                    )}>
                        <div className={cn(
                            "w-4 h-4 bg-white rounded-full shadow transition-transform",
                            field.defaultValue ? "translate-x-5" : "translate-x-0"
                        )} />
                    </div>
                </div>
            );
        case "checkbox":
            return (
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                        field.defaultValue
                            ? "bg-blue-500 border-blue-500"
                            : "bg-white border-neutral-300"
                    )}>
                        {field.defaultValue && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </div>
            );
        default:
            return null;
    }
}
