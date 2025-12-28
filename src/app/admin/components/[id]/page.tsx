import { ComponentForm } from "../component-form";
import { getCategories, getComponentById } from "@/lib/data";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ComponentEditPage({ params }: PageProps) {
    const { id } = await params;

    const categories = await getCategories();

    let component = null;

    if (id !== "new") {
        component = await getComponentById(id);
        if (!component) {
            notFound();
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            <ComponentForm initialData={component} categories={categories} />
        </div>
    );
}
