"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Eye, Edit, Trash2, Download, Check, X, Copy, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "./confirm-modal";
import { SearchFilterBar, FilterState } from "./search-filter-bar";
import { deleteComponent } from "../actions";

interface ComponentData {
    id: string;
    name: string;
    slug: string;
    category: string;
    isPro: boolean;
    isNew: boolean;
    hasSettingsSchema: boolean;
}

interface Category {
    slug: string;
    name: string;
}

interface ComponentsTableProps {
    components: ComponentData[];
    categories: Category[];
}

type SortKey = "name" | "category" | "status";
type SortDirection = "asc" | "desc" | null;

export function ComponentsTable({ components, categories }: ComponentsTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<FilterState>({ category: null, status: "all" });
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
    const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    // Sort handler
    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            // Cycle: asc -> desc -> null
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

    // Filter, Search & Sort
    const filteredComponents = useMemo(() => {
        let result = components.filter((comp) => {
            // Search filter
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                !query ||
                comp.name.toLowerCase().includes(query) ||
                comp.slug.toLowerCase().includes(query) ||
                comp.category.toLowerCase().includes(query);

            // Category filter
            const matchesCategory = !filters.category || comp.category === filters.category;

            // Status filter
            const matchesStatus =
                filters.status === "all" ||
                (filters.status === "pro" && comp.isPro) ||
                (filters.status === "free" && !comp.isPro) ||
                (filters.status === "new" && comp.isNew);

            return matchesSearch && matchesCategory && matchesStatus;
        });

        // Sort
        if (sortKey && sortDirection) {
            result = [...result].sort((a, b) => {
                let valA: string | number;
                let valB: string | number;

                switch (sortKey) {
                    case "name":
                        valA = a.name.toLowerCase();
                        valB = b.name.toLowerCase();
                        break;
                    case "category":
                        valA = a.category.toLowerCase();
                        valB = b.category.toLowerCase();
                        break;
                    case "status":
                        // Pro > New > Free
                        valA = a.isPro ? 2 : (a.isNew ? 1 : 0);
                        valB = b.isPro ? 2 : (b.isNew ? 1 : 0);
                        break;
                    default:
                        return 0;
                }

                if (valA < valB) return sortDirection === "asc" ? -1 : 1;
                if (valA > valB) return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [components, searchQuery, filters, sortKey, sortDirection]);

    // Selection handlers
    const toggleSelectAll = () => {
        if (selectedIds.size === filteredComponents.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredComponents.map((c) => c.id)));
        }
    };

    const toggleSelect = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    // Delete handlers
    const handleDeleteClick = (component: ComponentData) => {
        setSelectedComponent(component);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedComponent) return;
        setDeleting(true);
        try {
            await deleteComponent(selectedComponent.id);
            toast.success(`"${selectedComponent.name}" deleted successfully`);
            setDeleteModalOpen(false);
            setSelectedComponent(null);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete component";
            toast.error(message);
        } finally {
            setDeleting(false);
        }
    };

    const handleBulkDelete = async () => {
        setDeleting(true);
        try {
            const ids = Array.from(selectedIds);
            for (const id of ids) {
                await deleteComponent(id);
            }
            toast.success(`${ids.length} components deleted successfully`);
            setSelectedIds(new Set());
            setBulkDeleteModal(false);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete components";
            toast.error(message);
        } finally {
            setDeleting(false);
        }
    };

    // Duplicate handler
    const handleDuplicate = (component: ComponentData) => {
        // Redirect to new component form with query params to prefill
        const params = new URLSearchParams({
            duplicate: component.id,
            name: `${component.name} (Copy)`,
            slug: `${component.slug}-copy`,
            category: component.category,
        });
        window.location.href = `/admin/components/new?${params.toString()}`;
    };

    // Export handler
    const handleExport = (format: "json" | "csv") => {
        const dataToExport = selectedIds.size > 0
            ? components.filter((c) => selectedIds.has(c.id))
            : filteredComponents;

        if (format === "json") {
            const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
            downloadBlob(blob, "components.json");
        } else {
            const headers = ["id", "name", "slug", "category", "isPro", "isNew"];
            const rows = dataToExport.map((c) => [c.id, c.name, c.slug, c.category, c.isPro, c.isNew]);
            const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            downloadBlob(blob, "components.csv");
        }
        toast.success(`Exported ${dataToExport.length} components as ${format.toUpperCase()}`);
    };

    const downloadBlob = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleSearch = useCallback((query: string) => setSearchQuery(query), []);
    const handleFilterChange = useCallback((f: FilterState) => setFilters(f), []);

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
        <div className="space-y-4">
            {/* Search & Filters */}
            <SearchFilterBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                categories={categories}
                placeholder="Search components by name, slug, or category..."
            />

            {/* Bulk Actions Bar */}
            {selectedIds.size > 0 && (
                <div className="flex items-center justify-between p-3 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                    <span className="text-sm text-blue-400">
                        {selectedIds.size} component{selectedIds.size > 1 ? "s" : ""} selected
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleExport("json")}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-[#262626] hover:bg-[#333] rounded-md transition-colors"
                        >
                            <Download className="w-3 h-3" />
                            Export JSON
                        </button>
                        <button
                            onClick={() => handleExport("csv")}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-[#262626] hover:bg-[#333] rounded-md transition-colors"
                        >
                            <Download className="w-3 h-3" />
                            Export CSV
                        </button>
                        <button
                            onClick={() => setBulkDeleteModal(true)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                        >
                            <Trash2 className="w-3 h-3" />
                            Delete Selected
                        </button>
                        <button
                            aria-label="Clear selection"
                            onClick={() => setSelectedIds(new Set())}
                            className="p-1.5 text-[#6b6b6b] hover:text-white rounded-md transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Results count */}
            <div className="flex items-center justify-between text-sm text-[#6b6b6b]">
                <span>
                    Showing {filteredComponents.length} of {components.length} components
                    {sortKey && sortDirection && (
                        <span className="ml-2 text-blue-400">
                            (sorted by {sortKey} {sortDirection})
                        </span>
                    )}
                </span>
                {selectedIds.size === 0 && filteredComponents.length > 0 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleExport("json")}
                            className="flex items-center gap-1 px-2 py-1 hover:text-white transition-colors"
                        >
                            <Download className="w-3 h-3" />
                            Export All
                        </button>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="w-full overflow-hidden bg-[#0a0a0a] border border-[#262626] rounded-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-[#a1a1a1] uppercase bg-[#111111] border-b border-[#262626]">
                            <tr>
                                <th className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        aria-label="Select all components"
                                        checked={selectedIds.size === filteredComponents.length && filteredComponents.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-[#404040] bg-[#111] text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                    />
                                </th>
                                <th
                                    className="px-4 py-3 font-medium cursor-pointer hover:text-white transition-colors group"
                                    onClick={() => handleSort("name")}
                                >
                                    <div className="flex items-center gap-1">
                                        Name
                                        <SortIcon column="name" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 font-medium cursor-pointer hover:text-white transition-colors"
                                    onClick={() => handleSort("category")}
                                >
                                    <div className="flex items-center gap-1">
                                        Category
                                        <SortIcon column="category" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 font-medium cursor-pointer hover:text-white transition-colors"
                                    onClick={() => handleSort("status")}
                                >
                                    <div className="flex items-center gap-1">
                                        Status
                                        <SortIcon column="status" />
                                    </div>
                                </th>
                                <th className="px-4 py-3 font-medium">Schema</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#262626]">
                            {filteredComponents.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-[#6b6b6b]">
                                        No components found.
                                    </td>
                                </tr>
                            ) : (
                                filteredComponents.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={`hover:bg-[#111111]/50 transition-colors ${selectedIds.has(item.id) ? "bg-blue-600/5" : ""
                                            }`}
                                    >
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                aria-label={`Select ${item.name}`}
                                                checked={selectedIds.has(item.id)}
                                                onChange={() => toggleSelect(item.id)}
                                                className="w-4 h-4 rounded border-[#404040] bg-[#111] text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                            />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div>
                                                <div className="font-medium text-white">{item.name}</div>
                                                <div className="text-xs text-[#6b6b6b]">{item.slug}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-[#a1a1a1]">{item.category}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex gap-2">
                                                {item.isPro && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                                                        PRO
                                                    </span>
                                                )}
                                                {item.isNew && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 rounded">
                                                        NEW
                                                    </span>
                                                )}
                                                {!item.isPro && !item.isNew && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-[#262626] text-[#a1a1a1] border border-[#404040] rounded">
                                                        Free
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={item.hasSettingsSchema ? "text-green-500" : "text-[#6b6b6b]"}>
                                                {item.hasSettingsSchema ? "✓ Custom" : "—"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/library/${item.category}/${item.slug}`}
                                                    className="p-1.5 rounded-md text-[#a1a1a1] hover:text-white hover:bg-white/10 transition-colors"
                                                    title="View Live"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDuplicate(item)}
                                                    className="p-1.5 rounded-md text-[#a1a1a1] hover:text-green-400 hover:bg-green-400/10 transition-colors"
                                                    title="Duplicate"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                                <Link
                                                    href={`/admin/components/${item.id}`}
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

            {/* Single Delete Modal */}
            <ConfirmModal
                open={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setSelectedComponent(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Delete Component"
                description={`Are you sure you want to delete "${selectedComponent?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                variant="danger"
                loading={deleting}
            />

            {/* Bulk Delete Modal */}
            <ConfirmModal
                open={bulkDeleteModal}
                onClose={() => setBulkDeleteModal(false)}
                onConfirm={handleBulkDelete}
                title="Delete Selected Components"
                description={`Are you sure you want to delete ${selectedIds.size} components? This action cannot be undone.`}
                confirmText={`Delete ${selectedIds.size} Components`}
                variant="danger"
                loading={deleting}
            />
        </div>
    );
}
