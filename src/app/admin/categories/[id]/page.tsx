import { CategoryForm } from "../../components/category-form";
import { getCategoryById } from "@/lib/data";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CategoryEditPage({ params }: PageProps) {
    const { id } = await params;

    let category = null;

    if (id !== "new") {
        category = await getCategoryById(id);
        if (!category) {
            notFound();
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <CategoryForm initialData={category} />
        </div>
    );
}
