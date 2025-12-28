"use server";

import { createClient } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { logLogin } from "@/lib/auth/audit";
import { enforceRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";

export async function signIn(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Rate limit login attempts by email
    try {
        await enforceRateLimit('login', RATE_LIMIT_CONFIGS.auth, email);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Too many login attempts';
        return redirect(`/login?message=${encodeURIComponent(message)}`);
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        // Log failed login attempt
        console.error('Login failed:', error.message);
        return redirect(`/login?message=${encodeURIComponent(error.message)}`);
    }

    // Log successful login
    if (data.user) {
        await logLogin(data.user.id, true);
    }

    return redirect("/admin");
}

export async function signInWithGoogle() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });

    if (error) {
        return redirect(`/login?message=${encodeURIComponent(error.message)}`);
    }

    if (data.url) {
        return redirect(data.url);
    }

    return redirect('/login?message=Failed to initiate Google sign in');
}

export async function signInWithGitHub() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        },
    });

    if (error) {
        return redirect(`/login?message=${encodeURIComponent(error.message)}`);
    }

    if (data.url) {
        return redirect(data.url);
    }

    return redirect('/login?message=Failed to initiate GitHub sign in');
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect('/login');
}
