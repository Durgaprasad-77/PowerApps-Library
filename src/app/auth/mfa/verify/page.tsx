"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Key, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MfaVerifyPage() {
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [factorId, setFactorId] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const router = useRouter();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const initializeMfa = useCallback(async () => {
        try {
            // Check if user is authenticated
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            // Get MFA factors
            const { data: factors } = await supabase.auth.mfa.listFactors();

            if (!factors?.totp || factors.totp.length === 0) {
                // No MFA set up, redirect to setup
                router.push('/auth/mfa/setup');
                return;
            }

            setFactorId(factors.totp[0].id);
        } catch {
            setError('Failed to initialize MFA verification');
        } finally {
            setIsInitializing(false);
        }
    }, [router, supabase.auth]);

    useEffect(() => {
        initializeMfa();
    }, [initializeMfa]);

    const verifyCode = useCallback(async () => {
        if (!factorId || code.length !== 6) return;

        setIsLoading(true);
        setError(null);

        try {
            // Challenge the factor
            const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
                factorId,
            });

            if (challengeError) {
                setError(challengeError.message);
                setIsLoading(false);
                return;
            }

            // Verify the code
            const { error: verifyError } = await supabase.auth.mfa.verify({
                factorId,
                challengeId: challengeData.id,
                code,
            });

            if (verifyError) {
                setError('Invalid code. Please try again.');
                setCode('');
                setIsLoading(false);
                return;
            }

            // Success - redirect to admin
            router.push('/admin');
        } catch {
            setError('Verification failed');
            setIsLoading(false);
        }
    }, [code, factorId, router, supabase.auth.mfa]);

    // Auto-submit when 6 digits entered
    useEffect(() => {
        if (code.length === 6 && factorId) {
            verifyCode();
        }
    }, [code, factorId, verifyCode]);

    if (isInitializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#000000]">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#000000] selection:bg-blue-500/30">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full hidden dark:block">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4">
                <div className="absolute inset-0 bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl" />

                <div className="relative z-20 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20 mb-4">
                            <Key className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Two-Factor Authentication
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-neutral-400">
                            Enter the code from your authenticator app
                        </p>
                    </div>

                    {/* Code Input */}
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="000000"
                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-4 text-gray-900 dark:text-white text-center text-3xl tracking-[0.5em] font-mono placeholder-gray-300 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            maxLength={6}
                            autoFocus
                            disabled={isLoading}
                        />

                        {/* Progress indicator */}
                        <div className="flex justify-center gap-1">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-colors ${i < code.length ? 'bg-blue-500' : 'bg-gray-200 dark:bg-white/20'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center flex items-center justify-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {/* Loading */}
                    {isLoading && (
                        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-neutral-400">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Verifying...
                        </div>
                    )}

                    {/* Help text */}
                    <div className="text-center space-y-2">
                        <p className="text-xs text-gray-500 dark:text-neutral-500">
                            Open your authenticator app and enter the 6-digit code
                        </p>
                        <Link
                            href="/login"
                            className="text-xs text-gray-400 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            ← Sign in with different account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
