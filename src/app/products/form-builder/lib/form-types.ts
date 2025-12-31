// Form Builder Types

export type FieldType = "text" | "number" | "dropdown" | "date" | "toggle" | "checkbox";

export interface DropdownOption {
    id: string;
    label: string;
    value: string;
}

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    controlName: string;
    required: boolean;
    placeholder?: string;
    hintText?: string;
    defaultValue?: string | number | boolean;
    options?: DropdownOption[]; // For dropdown
    stepId?: string; // For multi-step forms
}

export interface FormStep {
    id: string;
    title: string;
    description?: string;
}

export interface FormConfig {
    title: string;
    subtitle?: string;
    submitButtonText: string;
    cancelButtonText: string;
    width: number;
    columns?: 1 | 2 | 3;
    steps?: FormStep[];
    background?: string;
    blurBackground?: boolean;
}

export interface FormTemplate {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    defaultConfig: FormConfig;
    defaultFields: FormField[];
}

export type FormBuilderStep = "welcome" | "templates" | "builder";
