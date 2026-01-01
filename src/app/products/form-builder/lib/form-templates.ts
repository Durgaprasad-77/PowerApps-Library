import { FormTemplate } from "./form-types";

export const formTemplates: FormTemplate[] = [
    {
        id: "clean-card",
        name: "Clean Card Form",
        description: "A clean, minimal form with soft shadows and rounded corners",
        thumbnail: "card",
        defaultConfig: {
            title: "Contact Form",
            subtitle: "Fill out the form below to get in touch",
            submitButtonText: "Submit",
            cancelButtonText: "Cancel",
            width: 400,
        },
        defaultFields: [
            {
                id: "field_name",
                type: "text",
                label: "Full Name",
                controlName: "txtFullName",
                required: true,
                placeholder: "Enter your name",
            },
            {
                id: "field_email",
                type: "text",
                label: "Email Address",
                controlName: "txtEmail",
                required: true,
                placeholder: "you@example.com",
            },
            {
                id: "field_message",
                type: "text",
                label: "Message",
                controlName: "txtMessage",
                required: false,
                placeholder: "Your message...",
            },
        ],
    },
    // More templates coming soon!
];
