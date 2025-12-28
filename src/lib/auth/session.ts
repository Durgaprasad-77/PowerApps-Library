// Session utilities for extracting user info and claims from JWT
// Provides typed access to session data including custom claims

import { createClient } from './server';
import type { User, Session } from '@supabase/supabase-js';

/**
 * User session with extracted claims
 */
export interface UserSession {
    user: User;
    session: Session;
    role: 'admin' | 'user';
    aal: 'aal1' | 'aal2';
    mfaEnabled: boolean;
}

/**
 * Extracts claims from JWT access token
 */
function extractClaims(accessToken: string): Record<string, unknown> {
    try {
        const parts = accessToken.split('.');
        if (parts.length !== 3) return {};

        const payload = JSON.parse(atob(parts[1]));
        return payload;
    } catch {
        return {};
    }
}

/**
 * Gets the current user session with role and MFA status
 * Returns null if not authenticated
 */
export async function getUserSession(): Promise<UserSession | null> {
    const supabase = await createClient();

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
        return null;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return null;
    }

    // Extract claims from JWT
    const claims = extractClaims(session.access_token);

    // Get role from custom claim (injected by our hook)
    const role = (claims.user_role as string) || 'user';

    // Get AAL (Authenticator Assurance Level)
    const aal = (claims.aal as 'aal1' | 'aal2') || 'aal1';

    // Check if user has MFA factors enrolled
    const { data: factors } = await supabase.auth.mfa.listFactors();
    const mfaEnabled = (factors?.totp?.length ?? 0) > 0;

    return {
        user,
        session,
        role: role === 'admin' ? 'admin' : 'user',
        aal,
        mfaEnabled,
    };
}

/**
 * Checks if current user has admin role
 * Returns false if not authenticated or not admin
 */
export async function isAdmin(): Promise<boolean> {
    const session = await getUserSession();
    return session?.role === 'admin';
}

/**
 * Checks if current user has completed MFA verification
 * Returns false if not authenticated or MFA not verified
 */
export async function hasMfaVerified(): Promise<boolean> {
    const session = await getUserSession();
    return session?.aal === 'aal2';
}

/**
 * Gets the current user's role
 * Returns 'user' as default if not authenticated
 */
export async function getUserRole(): Promise<'admin' | 'user'> {
    const session = await getUserSession();
    return session?.role || 'user';
}

/**
 * Checks if user has admin access, redirects if not
 * Use in server components/actions to protect admin routes
 */
export async function checkAdminAccess(): Promise<void> {
    const { redirect } = await import('next/navigation');

    const session = await getUserSession();

    if (!session) {
        return redirect('/login');
    }

    if (session.role !== 'admin') {
        return redirect('/');
    }
}
