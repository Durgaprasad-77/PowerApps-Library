import { Shield, Key, Activity, Clock, AlertTriangle, CheckCircle, XCircle, Smartphone } from "lucide-react";
import { createClient } from "@/lib/auth/server";
import { createAdminClientSafe } from "@/lib/auth/admin";
import { MfaManagement } from "./mfa-management";
import { AuditLogViewer } from "./audit-log-viewer";

export default async function SecurityPage() {
    const supabase = await createClient();
    const adminClient = createAdminClientSafe();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    // Get MFA factors
    const { data: factors } = await supabase.auth.mfa.listFactors();
    const hasMfa = (factors?.totp?.length ?? 0) > 0;

    // Get recent audit logs (if admin client available)
    let recentLogs: Array<{
        id: string;
        event: string;
        created_at: string;
        ip_address: string | null;
        metadata: Record<string, unknown>;
    }> = [];

    if (adminClient && user) {
        const { data: logs } = await adminClient
            .from('audit_logs')
            .select('id, event, created_at, ip_address, metadata')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10);

        recentLogs = logs || [];
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Shield className="w-7 h-7 text-blue-500" />
                    Security Settings
                </h1>
                <p className="text-neutral-400 mt-1">
                    Manage your account security, MFA, and view activity logs
                </p>
            </div>

            {/* Security Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* MFA Status */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${hasMfa ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                            <Smartphone className={`w-5 h-5 ${hasMfa ? 'text-green-500' : 'text-yellow-500'}`} />
                        </div>
                        <div>
                            <p className="text-sm text-neutral-400">Two-Factor Auth</p>
                            <p className={`font-semibold ${hasMfa ? 'text-green-500' : 'text-yellow-500'}`}>
                                {hasMfa ? 'Enabled' : 'Not Enabled'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Last Login */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                            <Clock className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-neutral-400">Last Login</p>
                            <p className="font-semibold text-white">
                                {user?.last_sign_in_at
                                    ? new Date(user.last_sign_in_at).toLocaleDateString()
                                    : 'Unknown'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Account Created */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                            <Key className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-sm text-neutral-400">Account Created</p>
                            <p className="font-semibold text-white">
                                {user?.created_at
                                    ? new Date(user.created_at).toLocaleDateString()
                                    : 'Unknown'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* MFA Management Section */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                    <Smartphone className="w-5 h-5 text-green-500" />
                    Two-Factor Authentication
                </h2>
                <MfaManagement
                    hasMfa={hasMfa}
                    factors={factors?.totp || []}
                />
            </div>

            {/* Audit Log Section */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-blue-500" />
                    Recent Activity
                </h2>
                <AuditLogViewer logs={recentLogs} />
            </div>
        </div>
    );
}
