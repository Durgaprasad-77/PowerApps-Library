"use client";

import { Edit, Trash2, Eye, Plus, Download, Upload, MoreHorizontal, LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Icon registry - map string names to actual components
const iconRegistry: Record<string, LucideIcon> = {
    Edit,
    Trash2,
    Eye,
    Plus,
    Download,
    Upload,
    MoreHorizontal,
};

interface Column<T> {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
    className?: string;
}

interface Action<T> {
    icon: string; // Icon name as string (e.g., "Edit", "Eye", "Trash2")
    label: string;
    onClick?: (item: T) => void;
    href?: (item: T) => string;
    variant?: "default" | "destructive" | "ghost";
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: Action<T>[];
    keyField: keyof T;
}

export function DataTable<T>({ data, columns, actions, keyField }: DataTableProps<T>) {
    return (
        <div className="w-full overflow-hidden bg-[#0a0a0a] border border-[#262626] rounded-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-[#a1a1a1] uppercase bg-[#111111] border-b border-[#262626]">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className={cn("px-6 py-3 font-medium", col.className)}>
                                    {col.header}
                                </th>
                            ))}
                            {actions && <th className="px-6 py-3 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262626]">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className="px-6 py-8 text-center text-[#6b6b6b]"
                                >
                                    No data found.
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={String(item[keyField])} className="hover:bg-[#111111]/50 transition-colors">
                                    {columns.map((col, i) => (
                                        <td key={i} className={cn("px-6 py-4 text-[#e5e5e5]", col.className)}>
                                            {col.cell ? col.cell(item) : String(item[col.accessorKey])}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {actions.map((action, j) => {
                                                    // Get icon component from registry
                                                    const Icon = iconRegistry[action.icon] || Edit;
                                                    const variantClass = action.variant === "destructive"
                                                        ? "text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                                        : "text-[#a1a1a1] hover:text-white hover:bg-white/10";

                                                    if (action.href) {
                                                        return (
                                                            <Link
                                                                key={j}
                                                                href={action.href(item)}
                                                                className={cn("p-1.5 rounded-md transition-colors", variantClass)}
                                                                title={action.label}
                                                            >
                                                                <Icon className="w-4 h-4" />
                                                            </Link>
                                                        );
                                                    }

                                                    return (
                                                        <button
                                                            key={j}
                                                            onClick={() => action.onClick?.(item)}
                                                            className={cn("p-1.5 rounded-md transition-colors", variantClass)}
                                                            title={action.label}
                                                        >
                                                            <Icon className="w-4 h-4" />
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
