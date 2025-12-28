"use client";

import { SettingsValues } from '@/lib/settings-types';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface DataTablePreviewProps {
    settings: SettingsValues;
}

export function DataTablePreview({ }: DataTablePreviewProps) {
    const { theme } = usePreviewTheme();
    const mockData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User' },
    ];

    const tableBg = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    const thBg = theme === 'dark' ? '#252525' : '#f9fafb';
    const thText = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const tdText = theme === 'dark' ? '#e5e7eb' : '#111827';
    const rowBorder = theme === 'dark' ? '#2a2a2a' : '#e5e7eb';
    const hoverBg = theme === 'dark' ? '#222' : '#f3f4f6';
    const borderColor = theme === 'dark' ? 'transparent' : '#e5e7eb';

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
                    background: ${tableBg};
                    border-radius: 8px;
                    overflow: hidden;
                    border: ${theme === 'dark' ? 'none' : `1px solid ${borderColor}`};
                }
                .data-table th {
                    background: ${thBg};
                    color: ${thText};
                    font-size: 12px;
                    font-weight: 600;
                    text-align: left;
                    padding: 12px 16px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .data-table td {
                    color: ${tdText};
                    font-size: 14px;
                    padding: 12px 16px;
                    border-top: 1px solid ${rowBorder};
                }
                .data-table tr:hover td {
                    background: ${hoverBg};
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
