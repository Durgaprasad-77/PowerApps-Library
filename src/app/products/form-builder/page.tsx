import { FormBuilderClient } from "./components/form-builder-client";

export const metadata = {
    title: "Form Builder | PowerUI",
    description: "Visually build professional Power Apps forms in minutes.",
};

export default function FormBuilderPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-16">
            <FormBuilderClient />
        </div>
    );
}
