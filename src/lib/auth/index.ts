// Auth module barrel export
// Provides a clean API for importing auth utilities

// Server-side client
export { createClient, getUser, getSession } from './server';

// Session utilities
export {
    getUserSession,
    isAdmin,
    hasMfaVerified,
    getUserRole,
    checkAdminAccess,
    type UserSession
} from './session';

// Admin client (privileged operations)
export { createAdminClient, createAdminClientSafe } from './admin';

// Audit logging
export {
    logAuditEvent,
    logLogin,
    logLogout,
    logMfaSetup,
    logMfaVerify,
    type AuditEvent
} from './audit';

// MFA utilities
export {
    enrollMfa,
    verifyMfaEnrollment,
    verifyMfaLogin,
    listMfaFactors,
    unenrollMfa,
    getFirstTotpFactorId,
    hasMfaEnrolled,
    type MfaEnrollmentResult,
    type MfaVerifyResult,
    type MfaFactor,
} from './mfa';

// OAuth utilities
export {
    signInWithOAuth,
    handleOAuthCallback,
    getGoogleSignInUrl,
    getGitHubSignInUrl,
    type OAuthProvider,
} from './oauth';
