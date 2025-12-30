import { signIn, signInWithGoogle, signInWithGitHub } from "./actions";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message?: string; redirect?: string }>;
}) {
    const params = await searchParams;

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black selection:bg-white/20">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4">
                <div className="absolute inset-0 bg-neutral-950 backdrop-blur-xl rounded-2xl border border-neutral-800" />

                <div className="relative z-20 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-4">
                            <ShieldCheck className="w-6 h-6 text-black" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-neutral-400">
                            Enter your credentials to access the admin portal
                        </p>
                    </div>

                    {/* Error Message */}
                    {params?.message && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center animate-in fade-in slide-in-from-top-2">
                            {params.message}
                        </div>
                    )}

                    {/* Email/Password Form */}
                    <form action={signIn} className="space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider ml-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="admin@example.com"
                                        required
                                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-700 transition-all hover:bg-neutral-900/80"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-700 transition-all hover:bg-neutral-900/80"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <Link
                                href="/auth/forgot-password"
                                className="text-xs text-neutral-400 hover:text-white transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="group w-full flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold py-3 px-4 rounded-lg transition-all"
                        >
                            Sign In
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-neutral-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-neutral-950 px-2 text-neutral-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <form action={signInWithGoogle}>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium py-3 px-4 rounded-lg transition-all"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#fff"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#fff"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#fff"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                    />
                                    <path
                                        fill="#fff"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </button>
                        </form>

                        <form action={signInWithGitHub}>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium py-3 px-4 rounded-lg transition-all"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </button>
                        </form>
                    </div>

                    {/* Back to home */}
                    <div className="text-center">
                        <Link
                            href="/"
                            className="text-xs text-neutral-500 hover:text-white transition-colors"
                        >
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
