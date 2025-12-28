// MFA (Multi-Factor Authentication) utilities
// Handles TOTP enrollment, verification, and factor management

import { createClient } from './server';
import { logMfaSetup, logMfaVerify } from './audit';

export interface MfaEnrollmentResult {
    success: boolean;
    qrCode?: string;
    secret?: string;
    factorId?: string;
    error?: string;
}

export interface MfaVerifyResult {
    success: boolean;
    error?: string;
}

export interface MfaFactor {
    id: string;
    type: 'totp';
    friendlyName?: string;
    createdAt: string;
}

/**
 * Enrolls a new TOTP factor for the current user
 * Returns QR code and secret for authenticator app setup
 */
export async function enrollMfa(friendlyName: string = 'Authenticator App'): Promise<MfaEnrollmentResult> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, error: 'Not authenticated' };
    }

    const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName,
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return {
        success: true,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
        factorId: data.id,
    };
}

/**
 * Verifies the TOTP setup by checking a code from the authenticator app
 * This must be called after enrollment to confirm the factor
 */
export async function verifyMfaEnrollment(factorId: string, code: string): Promise<MfaVerifyResult> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, error: 'Not authenticated' };
    }

    // Challenge the factor
    const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId,
    });

    if (challengeError) {
        return { success: false, error: challengeError.message };
    }

    // Verify the challenge with user's code
    const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code,
    });

    if (verifyError) {
        return { success: false, error: verifyError.message };
    }

    // Log the MFA setup event
    await logMfaSetup(user.id);

    return { success: true };
}

/**
 * Verifies MFA during login (step 2 of 2FA login)
 * User has already provided password, now verifying TOTP code
 */
export async function verifyMfaLogin(factorId: string, code: string): Promise<MfaVerifyResult> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, error: 'Not authenticated' };
    }

    // Challenge the factor
    const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId,
    });

    if (challengeError) {
        await logMfaVerify(user.id, false);
        return { success: false, error: challengeError.message };
    }

    // Verify the challenge
    const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code,
    });

    if (verifyError) {
        await logMfaVerify(user.id, false);
        return { success: false, error: verifyError.message };
    }

    await logMfaVerify(user.id, true);
    return { success: true };
}

/**
 * Lists all MFA factors for the current user
 */
export async function listMfaFactors(): Promise<MfaFactor[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.mfa.listFactors();

    if (error || !data) {
        return [];
    }

    return (data.totp || []).map(factor => ({
        id: factor.id,
        type: 'totp' as const,
        friendlyName: factor.friendly_name,
        createdAt: factor.created_at,
    }));
}

/**
 * Unenrolls (removes) an MFA factor
 */
export async function unenrollMfa(factorId: string): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();

    const { error } = await supabase.auth.mfa.unenroll({
        factorId,
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

/**
 * Gets the user's first TOTP factor ID (for verification flow)
 * Returns null if no TOTP factors are enrolled
 */
export async function getFirstTotpFactorId(): Promise<string | null> {
    const factors = await listMfaFactors();
    return factors.length > 0 ? factors[0].id : null;
}

/**
 * Checks if the user has any MFA factors enrolled
 */
export async function hasMfaEnrolled(): Promise<boolean> {
    const factors = await listMfaFactors();
    return factors.length > 0;
}
