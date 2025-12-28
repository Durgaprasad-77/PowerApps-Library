"use client";

import { useState } from "react";

import { MoreVertical } from "lucide-react";
import { UserDetailsModal } from "./user-details-modal";

interface UserData {
    id: string;
    email: string;
    created_at: string;
    roles: string[];
    last_sign_in: string;
}

interface UsersTableProps {
    users: UserData[];
    currentUserId?: string;
}

export function UsersTable({ users, currentUserId }: UsersTableProps) {
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleUserClick = (user: UserData) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    return (
        <>
            <div className="w-full overflow-hidden bg-[#0a0a0a] border border-[#262626] rounded-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-[#a1a1a1] uppercase bg-[#111111] border-b border-[#262626]">
                            <tr>
                                <th className="px-6 py-3 font-medium">Email</th>
                                <th className="px-6 py-3 font-medium">Roles</th>
                                <th className="px-6 py-3 font-medium">Joined</th>
                                <th className="px-6 py-3 font-medium">Last Login</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#262626]">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-[#6b6b6b]">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => {
                                    const isSelf = user.id === currentUserId;

                                    return (
                                        <tr key={user.id} className="hover:bg-[#111111]/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                                                        {user.email.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <span className="text-white font-medium">{user.email}</span>
                                                        {isSelf && (
                                                            <span className="ml-2 text-xs text-blue-400">(You)</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-1">
                                                    {user.roles.map((role) => (
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
                                            </td>
                                            <td className="px-6 py-4 text-[#a1a1a1]">{user.created_at}</td>
                                            <td className="px-6 py-4 text-[#a1a1a1]">{user.last_sign_in}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleUserClick(user)}
                                                    className="p-1.5 rounded-md text-[#a1a1a1] hover:text-white hover:bg-white/10 transition-colors"
                                                    title="View Details"
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Details Modal */}
            <UserDetailsModal
                user={selectedUser}
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedUser(null);
                }}
                currentUserId={currentUserId}
            />
        </>
    );
}
