"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Calendar, Clock, Mail, Trash2, Power, PowerOff } from "lucide-react";
import { toast } from "sonner";
import { updateUserRole, deleteUser, toggleUserStatus } from "../actions";

interface UserData {
    id: string;
    email: string;
    created_at: string;
    roles: string[];
    last_sign_in: string;
    banned_until?: string | null;
}

interface UserDetailsModalProps {
    user: UserData | null;
    open: boolean;
    onClose: () => void;
    currentUserId?: string;
}

export function UserDetailsModal({ user, open, onClose, currentUserId }: UserDetailsModalProps) {
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    if (!user) return null;

    const isAdmin = user.roles.includes("admin");
    const isSelf = user.id === currentUserId;
    const isDisabled = !!user.banned_until;

    const handleRoleChange = async (newRole: "admin" | "user") => {
        setLoading(true);
        try {
            await updateUserRole(user.id, newRole);
            toast.success(`${user.email} is now ${newRole === "admin" ? "an admin" : "a user"}`);
            onClose();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update role";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async () => {
        setStatusLoading(true);
        try {
            await toggleUserStatus(user.id, !isDisabled);
            toast.success(`${user.email} has been ${isDisabled ? "enabled" : "disabled"}`);
            onClose();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to toggle status";
            toast.error(message);
        } finally {
            setStatusLoading(false);
        }
    };

    const handleDelete = async () => {
        setDeleteLoading(true);
        try {
            await deleteUser(user.id);
            toast.success(`${user.email} has been deleted`);
            onClose();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete user";
            toast.error(message);
        } finally {
            setDeleteLoading(false);
            setConfirmDelete(false);
        }
    };

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
                            <div className="flex items-start justify-between p-6 border-b border-[#262626]">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${isDisabled
                                        ? "bg-gradient-to-br from-gray-500 to-gray-700"
                                        : "bg-gradient-to-br from-blue-500 to-purple-600"
                                        }`}>
                                        {user.email.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-white">User Details</h3>
                                            {isDisabled && (
                                                <span className="px-2 py-0.5 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 rounded">
                                                    Disabled
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-[#6b6b6b]">{user.email}</p>
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

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                {/* User Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="w-4 h-4 text-[#6b6b6b]" />
                                        <span className="text-[#a1a1a1]">Email:</span>
                                        <span className="text-white">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar className="w-4 h-4 text-[#6b6b6b]" />
                                        <span className="text-[#a1a1a1]">Joined:</span>
                                        <span className="text-white">{user.created_at}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Clock className="w-4 h-4 text-[#6b6b6b]" />
                                        <span className="text-[#a1a1a1]">Last Login:</span>
                                        <span className="text-white">{user.last_sign_in}</span>
                                    </div>
                                </div>

                                {/* Role Management */}
                                <div className="pt-4 border-t border-[#262626]">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-purple-500" />
                                            <span className="text-sm font-medium text-white">Role</span>
                                        </div>
                                        <div className="flex gap-2">
                                            {user.roles.map(role => (
                                                <span
                                                    key={role}
                                                    className={`px-2 py-0.5 text-xs font-medium rounded border ${role === "admin"
                                                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                                        : "bg-[#262626] text-[#a1a1a1] border-[#404040]"
                                                        }`}
                                                >
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {!isSelf && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleRoleChange("admin")}
                                                disabled={loading || isAdmin}
                                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${isAdmin
                                                    ? "bg-purple-600 text-white cursor-not-allowed"
                                                    : "bg-[#262626] text-white hover:bg-purple-600"
                                                    } disabled:opacity-50`}
                                            >
                                                {loading ? "..." : "Make Admin"}
                                            </button>
                                            <button
                                                onClick={() => handleRoleChange("user")}
                                                disabled={loading || !isAdmin}
                                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${!isAdmin
                                                    ? "bg-[#262626] text-white cursor-not-allowed"
                                                    : "bg-[#262626] text-white hover:bg-[#333]"
                                                    } disabled:opacity-50`}
                                            >
                                                {loading ? "..." : "Remove Admin"}
                                            </button>
                                        </div>
                                    )}

                                    {isSelf && (
                                        <p className="text-xs text-[#6b6b6b] italic mt-2">
                                            You cannot change your own role.
                                        </p>
                                    )}
                                </div>

                                {/* Status Toggle (Enable/Disable) */}
                                {!isSelf && (
                                    <div className="pt-4 border-t border-[#262626]">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                {isDisabled ? (
                                                    <PowerOff className="w-4 h-4 text-red-500" />
                                                ) : (
                                                    <Power className="w-4 h-4 text-green-500" />
                                                )}
                                                <span className="text-sm font-medium text-white">Account Status</span>
                                            </div>
                                            <span className={`text-xs font-medium ${isDisabled ? "text-red-400" : "text-green-400"}`}>
                                                {isDisabled ? "Disabled" : "Active"}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleToggleStatus}
                                            disabled={statusLoading}
                                            className={`w-full flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${isDisabled
                                                ? "bg-green-600/10 text-green-400 hover:bg-green-600 hover:text-white border border-green-500/20"
                                                : "bg-orange-600/10 text-orange-400 hover:bg-orange-600 hover:text-white border border-orange-500/20"
                                                }`}
                                        >
                                            {isDisabled ? (
                                                <>
                                                    <Power className="w-4 h-4" />
                                                    {statusLoading ? "Enabling..." : "Enable User"}
                                                </>
                                            ) : (
                                                <>
                                                    <PowerOff className="w-4 h-4" />
                                                    {statusLoading ? "Disabling..." : "Disable User"}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Footer - Delete Action */}
                            {!isSelf && (
                                <div className="px-6 pb-6">
                                    {!confirmDelete ? (
                                        <button
                                            onClick={() => setConfirmDelete(true)}
                                            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-red-400 hover:text-white hover:bg-red-600 border border-red-500/20 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete User
                                        </button>
                                    ) : (
                                        <div className="space-y-2">
                                            <p className="text-sm text-red-400 text-center">
                                                Are you sure? This cannot be undone.
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setConfirmDelete(false)}
                                                    className="flex-1 py-2 text-sm text-[#a1a1a1] hover:text-white transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleDelete}
                                                    disabled={deleteLoading}
                                                    className="flex-1 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    {deleteLoading ? "Deleting..." : "Confirm Delete"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
