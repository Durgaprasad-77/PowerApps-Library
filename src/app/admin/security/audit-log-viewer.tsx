import {
    LogIn,
    LogOut,
    Key,
    Shield,
    AlertTriangle,
    CheckCircle,
    Clock,
    MapPin
} from "lucide-react";

interface AuditLog {
    id: string;
    event: string;
    created_at: string;
    ip_address: string | null;
    metadata: Record<string, unknown>;
}

interface AuditLogViewerProps {
    logs: AuditLog[];
}

const eventConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
    login: { icon: LogIn, color: 'text-green-500', label: 'Login' },
    logout: { icon: LogOut, color: 'text-neutral-400', label: 'Logout' },
    login_failed: { icon: AlertTriangle, color: 'text-red-500', label: 'Failed Login' },
    mfa_setup: { icon: Shield, color: 'text-blue-500', label: 'MFA Setup' },
    mfa_verify: { icon: Key, color: 'text-purple-500', label: 'MFA Verified' },
    password_change: { icon: Key, color: 'text-orange-500', label: 'Password Changed' },
    password_reset_request: { icon: Key, color: 'text-yellow-500', label: 'Password Reset Request' },
    role_change: { icon: Shield, color: 'text-indigo-500', label: 'Role Changed' },
    session_refresh: { icon: Clock, color: 'text-neutral-500', label: 'Session Refreshed' },
};

export function AuditLogViewer({ logs }: AuditLogViewerProps) {
    if (logs.length === 0) {
        return (
            <div className="text-center py-8">
                <Clock className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <p className="text-neutral-400">No recent activity</p>
                <p className="text-sm text-neutral-500">Your security events will appear here</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {logs.map((log) => {
                const config = eventConfig[log.event] || {
                    icon: Clock,
                    color: 'text-neutral-400',
                    label: log.event
                };
                const Icon = config.icon;

                return (
                    <div
                        key={log.id}
                        className="flex items-center gap-4 p-3 bg-black/20 border border-white/5 rounded-lg hover:border-white/10 transition-colors"
                    >
                        <div className={`p-2 rounded-lg bg-white/5 ${config.color}`}>
                            <Icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium">{config.label}</p>
                            <div className="flex items-center gap-3 text-xs text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(log.created_at).toLocaleString()}
                                </span>
                                {log.ip_address && (
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {log.ip_address}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Status indicator */}
                        {log.metadata?.success === false ? (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                        ) : log.metadata?.success === true ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}
