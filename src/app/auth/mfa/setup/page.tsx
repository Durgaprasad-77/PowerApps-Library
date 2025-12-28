"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Smartphone, CheckCircle, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MfaSetupPage() {
    const [step, setStep] = useState<'loading' | 'enroll' | 'verify' | 'success' | 'error'>('loading');
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [secret, setSecret] = useState<string | null>(null);
    const [factorId, setFactorId] = useState<string | null>(null);
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        checkAndEnroll();
    }, []);

    async function checkAndEnroll() {
        try {
            // Check if user is authenticated
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setError('Not authenticated');
                setStep('error');
                return;
            }

            // Check existing factors
            const { data: factors } = await supabase.auth.mfa.listFactors();
            if (factors?.totp && factors.totp.length > 0) {
                // Already has MFA set up
                window.location.href = '/admin';
                return;
            }

            // Enroll new TOTP factor
            const { data, error: enrollError } = await supabase.auth.mfa.enroll({
                factorType: 'totp',
                friendlyName: 'Authenticator App',
            });

            if (enrollError) {
                setError(enrollError.message);
                setStep('error');
                return;
            }

            setQrCode(data.totp.qr_code);
            setSecret(data.totp.secret);
            setFactorId(data.id);
            setStep('enroll');
        } catch (err) {
            setError('Failed to initialize MFA setup');
            setStep('error');
        }
    }

    async function verifyCode() {
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
                setError(verifyError.message);
                setIsLoading(false);
                return;
            }

            setStep('success');
        } catch (err) {
            setError('Verification failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#000000] selection:bg-blue-500/30">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full hidden dark:block">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4">
                <div className="absolute inset-0 bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl" />

                <div className="relative z-20 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20 mb-4">
                            <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Set Up Two-Factor Authentication
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-neutral-400">
                            Secure your account with an authenticator app
                        </p>
                    </div>

                    {/* Loading State */}
                    {step === 'loading' && (
                        <div className="flex flex-col items-center py-8 space-y-4">
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                            <p className="text-gray-500 dark:text-neutral-400">Setting up MFA...</p>
                        </div>
                    )}

                    {/* Enroll State - Show QR Code */}
                    {step === 'enroll' && qrCode && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-4 mx-auto w-fit">
                                <Image
                                    src={qrCode}
                                    alt="QR Code"
                                    width={192}
                                    height={192}
                                    className="w-48 h-48"
                                    unoptimized // For data URLs
                                />
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-sm text-gray-500 dark:text-neutral-400">
                                    Scan this QR code with your authenticator app
                                </p>
                                <p className="text-xs text-neutral-500">
                                    Or enter manually: <code className="bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-xs font-mono text-gray-900 dark:text-white">{secret}</code>
                                </p>
                            </div>

                            <button
                                onClick={() => setStep('verify')}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-semibold py-3 px-4 rounded-lg transition-all"
                            >
                                I&apos;ve scanned the code
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Verify State - Enter Code */}
                    {step === 'verify' && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-700 dark:text-neutral-300 uppercase tracking-wider ml-1">
                                    Enter Verification Code
                                </label>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="000000"
                                    className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white text-center text-2xl tracking-[0.5em] font-mono placeholder-gray-300 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                    maxLength={6}
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={verifyCode}
                                disabled={code.length !== 6 || isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Verify & Enable MFA
                                        <CheckCircle className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setStep('enroll')}
                                className="w-full text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                            >
                                ← Back to QR code
                            </button>
                        </div>
                    )}

                    {/* Success State */}
                    {step === 'success' && (
                        <div className="space-y-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-white">MFA Enabled!</h2>
                                <p className="text-gray-500 dark:text-neutral-400 text-sm">
                                    Your account is now protected with two-factor authentication.
                                </p>
                            </div>
                            <Link
                                href="/admin"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                            >
                                Continue to Admin
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}

                    {/* Error State */}
                    {step === 'error' && (
                        <div className="space-y-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mx-auto">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-white">Setup Failed</h2>
                                <p className="text-gray-500 dark:text-neutral-400 text-sm">{error}</p>
                            </div>
                            <Link
                                href="/login"
                                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
                            >
                                ← Back to login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
