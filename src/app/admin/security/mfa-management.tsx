"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { CheckCircle, XCircle, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

interface MfaFactor {
    id: string;
    friendly_name?: string;
    created_at: string;
}

interface MfaManagementProps {
    hasMfa: boolean;
    factors: MfaFactor[];
}

export function MfaManagement({ hasMfa, factors }: MfaManagementProps) {
    const [isRemoving, setIsRemoving] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function removeFactor(factorId: string) {
        if (!confirm('Are you sure you want to remove this authenticator? You will need to set up MFA again.')) {
            return;
        }

        setIsRemoving(factorId);
        setError(null);

        try {
            const { error: unenrollError } = await supabase.auth.mfa.unenroll({
                factorId,
            });

            if (unenrollError) {
                setError(unenrollError.message);
                return;
            }

            // Refresh the page to update the UI
            router.refresh();
        } catch (err) {
            setError('Failed to remove authenticator');
        } finally {
            setIsRemoving(null);
        }
    }

    if (!hasMfa) {
        return (
            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                        <p className="text-yellow-500 font-medium">MFA Not Enabled</p>
                        <p className="text-sm text-neutral-400 mt-1">
                            Protect your account by enabling two-factor authentication with an authenticator app.
                        </p>
                    </div>
                </div>
                <a
                    href="/auth/mfa/setup"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                >
                    <CheckCircle className="w-4 h-4" />
                    Enable Two-Factor Authentication
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                    <p className="text-green-500 font-medium">MFA Enabled</p>
                    <p className="text-sm text-neutral-400 mt-1">
                        Your account is protected with two-factor authentication.
                    </p>
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* List of factors */}
            <div className="space-y-2">
                <p className="text-sm text-neutral-400 font-medium">Registered Authenticators</p>
                {factors.map((factor) => (
                    <div
                        key={factor.id}
                        className="flex items-center justify-between p-3 bg-black/20 border border-white/5 rounded-lg"
                    >
                        <div>
                            <p className="text-white font-medium">
                                {factor.friendly_name || 'Authenticator App'}
                            </p>
                            <p className="text-xs text-neutral-500">
                                Added {new Date(factor.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <button
                            onClick={() => removeFactor(factor.id)}
                            disabled={isRemoving === factor.id}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                            title="Remove authenticator"
                        >
                            {isRemoving === factor.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
