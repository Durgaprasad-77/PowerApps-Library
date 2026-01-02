import { notFound } from "next/navigation";
import { getCategories, getComponent, getComponents } from "@/lib/data";
import { ComponentDetailClient } from "./client";
import { LibraryLayout } from "@/components/library/library-layout";

interface Props {
    params: Promise<{ category: string; component: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { category: categorySlug, component: componentSlug } = await params;
    const component = await getComponent(componentSlug, categorySlug);

    if (!component) return { title: "Component Not Found" };

    return {
        title: `${component.name} | PowerUI`,
        description: component.description,
    };
}

export default async function ComponentPage({ params }: Props) {
    const { category: categorySlug, component: componentSlug } = await params;

    const [categories, component, allComponents] = await Promise.all([
        getCategories(),
        getComponent(componentSlug, categorySlug),
        getComponents()
    ]);

    const category = categories.find(c => c.slug === categorySlug);

    if (!category || !component) {
        notFound();
    }

    return (
        <LibraryLayout categories={categories} components={allComponents}>
            <ComponentDetailClient
                component={component}
                category={category}
                categories={categories}
                allComponents={allComponents}
            />
        </LibraryLayout>
    );
}
