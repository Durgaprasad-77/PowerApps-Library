"use client";

import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { WelcomeScreen } from "./welcome-screen";
import { FormCanvas } from "./form-canvas";
import { FieldPalette } from "./field-palette";
import { FieldConfigurator } from "./field-configurator";
import { YamlPreview } from "./yaml-preview";
import { FormTemplate, FormField, FormConfig, FieldType, FormStep as FormStepType } from "../lib/form-types";
import { generateFormYaml } from "../lib/form-yaml-generator";
import { Button } from "@/components/ui/button";
import { StepManager } from "./step-manager";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Settings } from "lucide-react";

type FormStep = "welcome" | "builder";

export function FormBuilderClient() {
    const [step, setStep] = useState<FormStep>("welcome");
    const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
    const [templates, setTemplates] = useState<any[]>([]);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const supabase = createClient();

    // Fetch templates from Supabase
    useEffect(() => {
        const fetchTemplates = async () => {
            const { data, error } = await supabase
                .from("form_templates")
                .select("*")
                .order("slug", { ascending: true });

            if (data) {
                setTemplates(data);
                // Set classic-card as default if available
                const classic = data.find(t => t.slug === "classic-card");
                if (classic) {
                    setSelectedTemplate(classic);
                    setConfig(prev => ({ ...prev, ...classic.default_config }));
                }
            }
        };
        fetchTemplates();
    }, []);

    // Form State
    const [config, setConfig] = useState<FormConfig>({
        title: "",
        subtitle: "",
        submitButtonText: "",
        cancelButtonText: "",
        width: 400,
        steps: []
    });
    const [fields, setFields] = useState<FormField[]>([]);
    const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

    const yamlCode = useMemo(() => {
        return generateFormYaml(config, fields, selectedTemplate?.yaml_structure);
    }, [config, fields, selectedTemplate]);

    // Handlers

    const handleSelectTemplate = (template: any) => {
        setSelectedTemplate(template);
        // Apply default config from template
        if (template.defaultConfig || template.default_config) {
            setConfig({
                ...config,
                ...(template.defaultConfig || template.default_config)
            });
        }
        // Load default fields from the template
        if (template.defaultFields && template.defaultFields.length > 0) {
            setFields(template.defaultFields);
        }
        setStep("builder");
    };

    const [activeStepId, setActiveStepId] = useState<string | null>(null);

    // Effect to set initial step if exists
    useMemo(() => {
        const steps = config.steps || [];
        if (steps.length > 0 && !activeStepId) {
            setActiveStepId(steps[0].id);
        } else if (steps.length === 0 && activeStepId) {
            setActiveStepId(null);
        }
    }, [config.steps, activeStepId]);

    const handleAddField = (type: FieldType) => {
        const newField: FormField = {
            id: `field_${Date.now()}`,
            type,
            label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            controlName: `ctrl_${Date.now()}`,
            required: false,
            placeholder: "Enter value...",
            hintText: "",
            options: type === "dropdown" ? [
                { id: "1", label: "Option 1", value: "Option 1" },
                { id: "2", label: "Option 2", value: "Option 2" }
            ] : undefined,
            stepId: activeStepId || undefined // Assign to current step
        };
        setFields([...fields, newField]);
        setSelectedFieldId(newField.id);
    };

    const handleUpdateField = (id: string, updates: Partial<FormField>) => {
        setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const handleDeleteField = (id: string) => {
        setFields(fields.filter(f => f.id !== id));
        if (selectedFieldId === id) setSelectedFieldId(null);
    };

    const handleSelectField = (id: string | null) => {
        setSelectedFieldId(id);
    };

    const selectedField = useMemo(() =>
        fields.find(f => f.id === selectedFieldId) || null
        , [fields, selectedFieldId]);

    // Render Steps
    if (step === "welcome") {
        return <WelcomeScreen onSelectTemplate={handleSelectTemplate} />;
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
            {/* Toolbar */}
            <div className="h-16 px-6 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => setStep("welcome")}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <div className="h-6 w-px bg-neutral-800" />
                    <h1 className="font-semibold text-white">Form Builder</h1>
                </div>
                <div className="flex items-center gap-3">
                    {/* Step Navigation */}
                    {config.steps && config.steps.length > 0 && (
                        <div className="flex items-center gap-1 bg-neutral-900 rounded-md p-1 mr-4 border border-neutral-800">
                            {config.steps.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveStepId(s.id)}
                                    className={cn(
                                        "px-3 py-1 text-xs rounded-sm transition-colors",
                                        activeStepId === s.id
                                            ? "bg-blue-600 text-white font-medium"
                                            : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                    )}
                                >
                                    {s.title}
                                </button>
                            ))}
                        </div>
                    )}
                    {/* Iteration Selector */}
                    <div className="flex items-center gap-2 mr-4">
                        <Label className="text-xs text-neutral-400">Style:</Label>
                        <select
                            title="Form Style"
                            className="bg-neutral-900 border border-neutral-800 text-xs rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-600 h-8 text-white"
                            value={selectedTemplate?.slug || ""}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const t = templates.find(t => t.slug === e.target.value);
                                if (t) handleSelectTemplate(t);
                            }}
                        >
                            {templates.map(t => (
                                <option key={t.id} value={t.slug}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    <YamlPreview code={yamlCode} />
                    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800">
                                <Settings className="w-4 h-4" />
                                Settings
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-neutral-950 border-neutral-800 text-white">
                            <DialogHeader>
                                <DialogTitle>Form Settings</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Form Title</Label>
                                    <Input
                                        value={config.title}
                                        onChange={(e) => setConfig({ ...config, title: e.target.value })}
                                        className="bg-neutral-900 border-neutral-800 focus:ring-blue-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Subtitle</Label>
                                    <Input
                                        value={config.subtitle}
                                        onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                                        className="bg-neutral-900 border-neutral-800 focus:ring-blue-600"
                                    />
                                </div>

                                {/* Step Manager */}
                                <div className="border-t border-neutral-800 pt-4">
                                    <StepManager
                                        steps={config.steps}
                                        onUpdate={(steps) => setConfig({ ...config, steps })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Submit Button</Label>
                                        <Input
                                            value={config.submitButtonText}
                                            onChange={(e) => setConfig({ ...config, submitButtonText: e.target.value })}
                                            className="bg-neutral-900 border-neutral-800 focus:ring-blue-600"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Cancel Button</Label>
                                        <Input
                                            value={config.cancelButtonText}
                                            onChange={(e) => setConfig({ ...config, cancelButtonText: e.target.value })}
                                            className="bg-neutral-900 border-neutral-800 focus:ring-blue-600"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Form Width (px)</Label>
                                    <Input
                                        type="number"
                                        value={config.width}
                                        onChange={(e) => setConfig({ ...config, width: parseInt(e.target.value) || 400 })}
                                        className="bg-neutral-900 border-neutral-800 focus:ring-blue-600"
                                    />
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        Export to Power Apps
                    </Button>
                </div>
            </div>

            {/* Builder Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Palette */}
                <FieldPalette onAddField={handleAddField} />

                {/* Center Canvas */}
                <FormCanvas
                    config={config}
                    fields={fields}
                    selectedFieldId={selectedFieldId}
                    activeStepId={activeStepId || undefined}
                    onSelectField={handleSelectField}
                    onReorder={setFields}
                />

                {/* Right Configurator */}
                <FieldConfigurator
                    field={selectedField}
                    onChange={handleUpdateField}
                    onDelete={handleDeleteField}
                />
            </div>
        </div>
    );
}
