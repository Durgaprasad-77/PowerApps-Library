"use client";

import { FormField, DropdownOption } from "../lib/form-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldConfiguratorProps {
    field: FormField | null;
    onChange: (id: string, updates: Partial<FormField>) => void;
    onDelete: (id: string) => void;
}

export function FieldConfigurator({ field, onChange, onDelete }: FieldConfiguratorProps) {
    if (!field) {
        return (
            <div className="w-72 border-l border-neutral-800 bg-neutral-950 p-6 shrink-0">
                <div className="h-full flex items-center justify-center">
                    <p className="text-neutral-500 text-sm text-center">
                        Select a field to configure its properties
                    </p>
                </div>
            </div>
        );
    }

    const handleOptionChange = (index: number, key: keyof DropdownOption, value: string) => {
        const newOptions = [...(field.options || [])];
        newOptions[index] = { ...newOptions[index], [key]: value };
        onChange(field.id, { options: newOptions });
    };

    const handleAddOption = () => {
        const newOptions = [...(field.options || [])];
        const newId = `opt_${Date.now()}`;
        newOptions.push({ id: newId, label: `Option ${newOptions.length + 1}`, value: `value_${newOptions.length + 1}` });
        onChange(field.id, { options: newOptions });
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = [...(field.options || [])];
        newOptions.splice(index, 1);
        onChange(field.id, { options: newOptions });
    };

    return (
        <div className="w-72 border-l border-neutral-800 bg-neutral-950 p-4 overflow-y-auto shrink-0">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-medium text-white">Field Settings</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(field.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-8 w-8 p-0"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <div className="space-y-5">
                {/* Label */}
                <div className="space-y-2">
                    <Label className="text-neutral-400 text-xs">Label</Label>
                    <Input
                        value={field.label}
                        onChange={(e) => onChange(field.id, { label: e.target.value })}
                        className="bg-neutral-900 border-neutral-800 text-white focus:border-blue-500 h-9"
                    />
                </div>

                {/* Control Name */}
                <div className="space-y-2">
                    <Label className="text-neutral-400 text-xs">Control Name</Label>
                    <Input
                        value={field.controlName}
                        onChange={(e) => onChange(field.id, { controlName: e.target.value })}
                        className="bg-neutral-900 border-neutral-800 text-white font-mono text-sm focus:border-blue-500 h-9"
                    />
                </div>

                {/* Placeholder (for text/number) */}
                {(field.type === "text" || field.type === "number") && (
                    <div className="space-y-2">
                        <Label className="text-neutral-400 text-xs">Placeholder</Label>
                        <Input
                            value={field.placeholder || ""}
                            onChange={(e) => onChange(field.id, { placeholder: e.target.value })}
                            className="bg-neutral-900 border-neutral-800 text-white focus:border-blue-500 h-9"
                        />
                    </div>
                )}

                {/* Hint Text */}
                <div className="space-y-2">
                    <Label className="text-neutral-400 text-xs">Hint Text</Label>
                    <Input
                        value={field.hintText || ""}
                        onChange={(e) => onChange(field.id, { hintText: e.target.value })}
                        placeholder="Optional helper text"
                        className="bg-neutral-900 border-neutral-800 text-white focus:border-blue-500 h-9"
                    />
                </div>

                {/* Required Toggle */}
                <div className="flex items-center justify-between py-2">
                    <Label className="text-neutral-400 text-xs">Required</Label>
                    <button
                        onClick={() => onChange(field.id, { required: !field.required })}
                        className={cn(
                            "w-10 h-5 rounded-full p-0.5 transition-colors",
                            field.required ? "bg-blue-500" : "bg-neutral-700"
                        )}
                    >
                        <div className={cn(
                            "w-4 h-4 bg-white rounded-full shadow transition-transform",
                            field.required ? "translate-x-5" : "translate-x-0"
                        )} />
                    </button>
                </div>

                {/* Default Value (for toggle/checkbox) */}
                {(field.type === "toggle" || field.type === "checkbox") && (
                    <div className="flex items-center justify-between py-2">
                        <Label className="text-neutral-400 text-xs">Default Value</Label>
                        <button
                            onClick={() => onChange(field.id, { defaultValue: !field.defaultValue })}
                            className={cn(
                                "w-10 h-5 rounded-full p-0.5 transition-colors",
                                field.defaultValue ? "bg-blue-500" : "bg-neutral-700"
                            )}
                        >
                            <div className={cn(
                                "w-4 h-4 bg-white rounded-full shadow transition-transform",
                                field.defaultValue ? "translate-x-5" : "translate-x-0"
                            )} />
                        </button>
                    </div>
                )}

                {/* Dropdown Options */}
                {field.type === "dropdown" && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-neutral-400 text-xs">Options</Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleAddOption}
                                className="h-6 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                            >
                                <Plus className="w-3 h-3 mr-1" />
                                Add
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {(field.options || []).map((option, index) => (
                                <div key={option.id} className="flex items-center gap-2">
                                    <Input
                                        value={option.label}
                                        onChange={(e) => handleOptionChange(index, "label", e.target.value)}
                                        placeholder="Label"
                                        className="flex-1 bg-neutral-900 border-neutral-800 text-white h-8 text-sm"
                                    />
                                    <button
                                        onClick={() => handleRemoveOption(index)}
                                        className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Field Type Badge */}
            <div className="mt-8 pt-4 border-t border-neutral-800">
                <div className="text-xs text-neutral-500">
                    Field Type: <span className="text-neutral-400 capitalize">{field.type}</span>
                </div>
            </div>
        </div>
    );
}
