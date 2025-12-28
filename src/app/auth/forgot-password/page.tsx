import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { forgotPassword } from "./actions";

export default async function ForgotPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ message?: string; success?: string }>;
}) {
    const params = await searchParams;
    const isSuccess = params?.success === 'true';

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#000000] selection:bg-blue-500/30">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full hidden dark:block">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4">
                <div className="absolute inset-0 bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl" />

                <div className="relative z-20 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/20 mb-4">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {isSuccess ? 'Check Your Email' : 'Reset Password'}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-neutral-400">
                            {isSuccess
                                ? 'We sent you a password reset link'
                                : 'Enter your email to receive a reset link'
                            }
                        </p>
                    </div>

                    {isSuccess ? (
                        /* Success State */
                        <div className="space-y-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <p className="text-gray-500 dark:text-neutral-400 text-sm">
                                If an account exists for that email, you&apos;ll receive a password reset link shortly.
                            </p>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to login
                            </Link>
                        </div>
                    ) : (
                        /* Form */
                        <>
                            {params?.message && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                    {params.message}
                                </div>
                            )}

                            <form action={forgotPassword} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-700 dark:text-neutral-300 uppercase tracking-wider ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-orange-500 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            required
                                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all hover:bg-gray-50 dark:hover:bg-black/30 backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-500 hover:to-red-400 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-orange-500/25 transition-all"
                                >
                                    Send Reset Link
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>

                            <div className="text-center">
                                <Link
                                    href="/login"
                                    className="text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
