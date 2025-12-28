"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Eye, Edit, Trash2, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "../components/confirm-modal";
import { deleteCategory } from "../actions";

interface Category {
    id: string;
    name: string;
    slug: string;
    orderIndex: number;
    componentsCount: number;
    freeCount: number;
}

interface CategoriesTableProps {
    categories: Category[];
}

type SortKey = "name" | "order" | "components";
type SortDirection = "asc" | "desc" | null;

export function CategoriesTable({ categories }: CategoriesTableProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    // Sort handler
    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            if (sortDirection === "asc") {
                setSortDirection("desc");
            } else if (sortDirection === "desc") {
                setSortKey(null);
                setSortDirection(null);
            } else {
                setSortDirection("asc");
            }
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
    };

    // Sorted categories
    const sortedCategories = useMemo(() => {
        if (!sortKey || !sortDirection) return categories;

        return [...categories].sort((a, b) => {
            let valA: string | number;
            let valB: string | number;

            switch (sortKey) {
                case "name":
                    valA = a.name.toLowerCase();
                    valB = b.name.toLowerCase();
                    break;
                case "order":
                    valA = a.orderIndex;
                    valB = b.orderIndex;
                    break;
                case "components":
                    valA = a.componentsCount;
                    valB = b.componentsCount;
                    break;
                default:
                    return 0;
            }

            if (valA < valB) return sortDirection === "asc" ? -1 : 1;
            if (valA > valB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [categories, sortKey, sortDirection]);

    const handleDeleteClick = (category: Category) => {
        setSelectedCategory(category);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedCategory) return;

        setDeleting(true);
        try {
            await deleteCategory(selectedCategory.id);
            toast.success(`"${selectedCategory.name}" deleted successfully`);
            setDeleteModalOpen(false);
            setSelectedCategory(null);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete category";
            toast.error(message);
        } finally {
            setDeleting(false);
        }
    };

    // Sort icon component
    const SortIcon = ({ column }: { column: SortKey }) => {
        if (sortKey !== column) {
            return <ChevronsUpDown className="w-3 h-3 text-[#6b6b6b]" />;
        }
        return sortDirection === "asc"
            ? <ChevronUp className="w-3 h-3 text-blue-400" />
            : <ChevronDown className="w-3 h-3 text-blue-400" />;
    };

    return (
        <>
            <div className="w-full overflow-hidden bg-[#0a0a0a] border border-[#262626] rounded-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-[#a1a1a1] uppercase bg-[#111111] border-b border-[#262626]">
                            <tr>
                                <th
                                    className="px-6 py-3 font-medium cursor-pointer hover:text-white transition-colors"
                                    onClick={() => handleSort("name")}
                                >
                                    <div className="flex items-center gap-1">
                                        Name
                                        <SortIcon column="name" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 font-medium text-[#6b6b6b]">Slug</th>
                                <th
                                    className="px-6 py-3 font-medium cursor-pointer hover:text-white transition-colors"
                                    onClick={() => handleSort("order")}
                                >
                                    <div className="flex items-center gap-1">
                                        Order
                                        <SortIcon column="order" />
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-3 font-medium cursor-pointer hover:text-white transition-colors"
                                    onClick={() => handleSort("components")}
                                >
                                    <div className="flex items-center gap-1">
                                        Components
                                        <SortIcon column="components" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#262626]">
                            {sortedCategories.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-[#6b6b6b]">
                                        No categories found.
                                    </td>
                                </tr>
                            ) : (
                                sortedCategories.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#111111]/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-white">{item.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-[#6b6b6b]">{item.slug}</td>
                                        <td className="px-6 py-4 text-[#a1a1a1]">{item.orderIndex}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-[#a1a1a1]">{item.componentsCount} components</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/library/${item.slug}`}
                                                    className="p-1.5 rounded-md text-[#a1a1a1] hover:text-white hover:bg-white/10 transition-colors"
                                                    title="View Client"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/categories/${item.id}`}
                                                    className="p-1.5 rounded-md text-[#a1a1a1] hover:text-white hover:bg-white/10 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(item)}
                                                    className="p-1.5 rounded-md text-[#a1a1a1] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                open={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setSelectedCategory(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Delete Category"
                description={
                    selectedCategory?.componentsCount && selectedCategory.componentsCount > 0
                        ? `Cannot delete "${selectedCategory?.name}" because it has ${selectedCategory?.componentsCount} components. Move or delete components first.`
                        : `Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`
                }
                confirmText="Delete"
                variant="danger"
                loading={deleting}
            />
        </>
    );
}
