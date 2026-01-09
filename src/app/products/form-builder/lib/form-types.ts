// Form Builder Types

export type FieldType = "text" | "textarea" | "number" | "dropdown" | "date" | "toggle" | "checkbox" | "slider" | "rating" | "radio" | "email" | "phone" | "password";

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
