"use client";


import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning";
    loading?: boolean;
}

export function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Delete",
    cancelText = "Cancel",
    variant = "danger",
    loading = false,
}: ConfirmModalProps) {
    const variantStyles = {
        danger: {
            icon: "bg-red-500/10 text-red-500",
            button: "bg-red-600 hover:bg-red-700",
        },
        warning: {
            icon: "bg-yellow-500/10 text-yellow-500",
            button: "bg-yellow-600 hover:bg-yellow-700",
        },
    };

    const styles = variantStyles[variant];

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                    >
                        <div className="bg-[#111] border border-[#262626] rounded-xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-start justify-between p-6 pb-0">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${styles.icon}`}>
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                                        <p className="text-[#6b6b6b] text-sm mt-1">{description}</p>
                                    </div>
                                </div>
                                <button
                                    aria-label="Close modal"
                                    onClick={onClose}
                                    className="p-1 rounded-md text-[#6b6b6b] hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 p-6 pt-8">
                                <button
                                    onClick={onClose}
                                    disabled={loading}
                                    className="px-4 py-2 text-sm font-medium text-[#a1a1a1] hover:text-white hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={loading}
                                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 ${styles.button}`}
                                >
                                    {loading ? "Deleting..." : confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
