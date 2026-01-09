"use client";

import { Type, Hash, ChevronDown, Calendar, ToggleRight, CheckSquare, AlignLeft, SlidersHorizontal, Star, CircleDot, Mail, Phone, Lock } from "lucide-react";
import { FieldType } from "../lib/form-types";
import { cn } from "@/lib/utils";

interface FieldPaletteProps {
    onAddField: (type: FieldType) => void;
}

const fieldTypes: { type: FieldType; label: string; icon: React.ReactNode; description: string }[] = [
    {
        type: "text",
        label: "Text Input",
        icon: <Type className="w-4 h-4" />,
        description: "Single line text",
    },
    {
        type: "textarea",
        label: "Text Area",
        icon: <AlignLeft className="w-4 h-4" />,
        description: "Multi-line text",
    },
    {
        type: "email",
        label: "Email",
        icon: <Mail className="w-4 h-4" />,
        description: "Email address",
    },
    {
        type: "phone",
        label: "Phone",
        icon: <Phone className="w-4 h-4" />,
        description: "Phone number",
    },
    {
        type: "password",
        label: "Password",
        icon: <Lock className="w-4 h-4" />,
        description: "Masked input",
    },
    {
        type: "number",
        label: "Number",
        icon: <Hash className="w-4 h-4" />,
        description: "Numeric input",
    },
    {
        type: "slider",
        label: "Slider",
        icon: <SlidersHorizontal className="w-4 h-4" />,
        description: "Range selection",
    },
    {
        type: "rating",
        label: "Rating",
        icon: <Star className="w-4 h-4" />,
        description: "Star rating",
    },
    {
        type: "dropdown",
        label: "Dropdown",
        icon: <ChevronDown className="w-4 h-4" />,
        description: "Select from options",
    },
    {
        type: "radio",
        label: "Radio Group",
        icon: <CircleDot className="w-4 h-4" />,
        description: "Single choice",
    },
    {
        type: "date",
        label: "Date Picker",
        icon: <Calendar className="w-4 h-4" />,
        description: "Date selection",
    },
    {
        type: "toggle",
        label: "Toggle",
        icon: <ToggleRight className="w-4 h-4" />,
        description: "On/Off switch",
    },
    {
        type: "checkbox",
        label: "Checkbox",
        icon: <CheckSquare className="w-4 h-4" />,
        description: "Boolean option",
    },
];


export function FieldPalette({ onAddField }: FieldPaletteProps) {
    return (
        <div className="w-64 border-r border-neutral-800 bg-neutral-950 p-4 overflow-y-auto shrink-0">
            <h3 className="text-sm font-medium text-neutral-400 mb-4 px-1">Field Types</h3>

            <div className="space-y-2">
                {fieldTypes.map((field) => (
                    <button
                        key={field.type}
                        onClick={() => onAddField(field.type)}
                        className={cn(
                            "w-full flex items-center gap-3 p-3 rounded-lg",
                            "bg-neutral-900/50 border border-neutral-800",
                            "hover:border-neutral-700 hover:bg-neutral-900",
                            "transition-all group text-left"
                        )}
                    >
                        <div className="w-8 h-8 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-neutral-600 transition-colors">
                            {field.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                {field.label}
                            </div>
                            <div className="text-xs text-neutral-500 truncate">
                                {field.description}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
                <p className="text-xs text-neutral-500 px-1">
                    Click a field type to add it to your form. Drag to reorder fields on the canvas.
                </p>
            </div>
        </div>
    );
}
