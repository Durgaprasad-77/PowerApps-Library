// OAuth utilities for social login
// Handles Google, GitHub, and other OAuth providers

import { createClient } from './server';
import { redirect } from 'next/navigation';

export type OAuthProvider = 'google' | 'github';

interface OAuthSignInOptions {
    provider: OAuthProvider;
    redirectTo?: string;
    scopes?: string;
}

/**
 * Initiates OAuth sign-in flow
 * Redirects user to the OAuth provider's consent screen
 */
export async function signInWithOAuth(options: OAuthSignInOptions) {
    const supabase = await createClient();

    const { provider, redirectTo = '/auth/callback', scopes } = options;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${redirectTo}`,
            scopes,
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    if (data.url) {
        redirect(data.url);
    }
}

/**
 * Handles the OAuth callback after user returns from provider
 * Exchanges the code for a session
 */
export async function handleOAuthCallback(code: string): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

/**
 * Gets the URL for signing in with Google
 */
export async function getGoogleSignInUrl(redirectTo: string = '/auth/callback'): Promise<string> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${redirectTo}`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data.url;
}

/**
 * Gets the URL for signing in with GitHub
 */
export async function getGitHubSignInUrl(redirectTo: string = '/auth/callback'): Promise<string> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${redirectTo}`,
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data.url;
}
