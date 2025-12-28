"use client";

import { SettingsValues } from '@/lib/settings-types';

interface DataTablePreviewProps {
    settings: SettingsValues;
}

export function DataTablePreview({ }: DataTablePreviewProps) {
    const mockData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User' },
    ];

    return (
        <div className="data-table-preview">
            <style jsx>{`
                .data-table-preview {
                    padding: 16px;
                    width: 100%;
                }
                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                    background: #1a1a1a;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .data-table th {
                    background: #252525;
                    color: #9ca3af;
                    font-size: 12px;
                    font-weight: 600;
                    text-align: left;
                    padding: 12px 16px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .data-table td {
                    color: #e5e7eb;
                    font-size: 14px;
                    padding: 12px 16px;
                    border-top: 1px solid #2a2a2a;
                }
                .data-table tr:hover td {
                    background: #222;
                }
                .role-badge {
                    display: inline-block;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                }
                .role-admin {
                    background: rgba(99, 102, 241, 0.2);
                    color: #818cf8;
                }
                .role-user {
                    background: rgba(34, 197, 94, 0.2);
                    color: #4ade80;
                }
            `}</style>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.map((row) => (
                        <tr key={row.id}>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>
                                <span className={`role-badge role-${row.role.toLowerCase()}`}>
                                    {row.role}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
