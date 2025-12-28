import { notFound } from "next/navigation";
import { getCategories, getComponent } from "@/lib/data";
import { ComponentDetailClient } from "./client";

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

    const [categories, component] = await Promise.all([
        getCategories(),
        getComponent(componentSlug, categorySlug)
    ]);

    const category = categories.find(c => c.slug === categorySlug);

    if (!category || !component) {
        notFound();
    }

    return <ComponentDetailClient component={component} category={category} />;
}
