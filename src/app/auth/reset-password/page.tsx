"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Lock, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password,
            });

            if (updateError) {
                setError(updateError.message);
                setIsLoading(false);
                return;
            }

            setIsSuccess(true);

            // Redirect after 2 seconds
            setTimeout(() => {
                router.push('/admin');
            }, 2000);
        } catch {
            setError('Failed to reset password');
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#000000] selection:bg-blue-500/30">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl" />

                <div className="relative z-20 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20 mb-4">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            {isSuccess ? 'Password Updated!' : 'Create New Password'}
                        </h1>
                        <p className="text-sm text-neutral-400">
                            {isSuccess
                                ? 'Your password has been successfully changed'
                                : 'Enter your new password below'
                            }
                        </p>
                    </div>

                    {isSuccess ? (
                        /* Success State */
                        <div className="space-y-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <p className="text-neutral-400 text-sm">
                                Redirecting you to the dashboard...
                            </p>
                            <Loader2 className="w-5 h-5 animate-spin mx-auto text-neutral-400" />
                        </div>
                    ) : (
                        /* Form */
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider ml-1">
                                    New Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-purple-500 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all hover:bg-black/30 backdrop-blur-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider ml-1">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-purple-500 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all hover:bg-black/30 backdrop-blur-sm"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center flex items-center justify-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-purple-500/25 transition-all"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Reset Password
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-neutral-500 text-center">
                                Password must be at least 8 characters
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
