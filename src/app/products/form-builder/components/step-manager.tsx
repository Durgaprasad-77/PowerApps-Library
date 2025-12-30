"use client";

import { FormStep } from "../lib/form-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, GripVertical } from "lucide-react";

interface StepManagerProps {
    steps?: FormStep[];
    onUpdate: (steps: FormStep[]) => void;
}

export function StepManager({ steps = [], onUpdate }: StepManagerProps) {
    const handleAddStep = () => {
        const newStep: FormStep = {
            id: `step_${Date.now()}`,
            title: `Step ${steps.length + 1}`,
            description: "",
        };
        onUpdate([...steps, newStep]);
    };

    const handleUpdateStep = (id: string, updates: Partial<FormStep>) => {
        onUpdate(steps.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const handleRemoveStep = (id: string) => {
        onUpdate(steps.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-neutral-400">Form Steps</Label>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleAddStep}
                    className="h-7 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Step
                </Button>
            </div>

            {steps.length === 0 ? (
                <p className="text-xs text-neutral-500 py-2">
                    No steps added. Single-page form mode.
                </p>
            ) : (
                <div className="space-y-2">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex items-center gap-2 p-2 bg-neutral-900 border border-neutral-800 rounded-lg group"
                        >
                            <GripVertical className="w-4 h-4 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                            <span className="text-xs text-neutral-500 w-6">{index + 1}.</span>
                            <Input
                                value={step.title}
                                onChange={(e) => handleUpdateStep(step.id, { title: e.target.value })}
                                className="flex-1 h-7 bg-transparent border-none text-white text-sm px-0 focus:ring-0"
                                placeholder="Step title"
                            />
                            <button
                                onClick={() => handleRemoveStep(step.id)}
                                className="p-1 text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
