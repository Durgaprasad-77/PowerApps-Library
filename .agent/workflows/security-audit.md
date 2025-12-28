---
description: Comprehensive security, bugs, and code quality audit for the PowerApps component library
---

# PowerApp Components Security & Bug Review Workflow

This workflow provides a bulletproof, world-class security audit process aligned with OWASP 2024, Next.js, and Supabase best practices.

---

## Phase 1: Pre-Audit Setup

### 1.1 Environment Verification
```bash
# Verify environment variables are set (do not print values)
// turbo
echo "Checking required env vars..." && \
  [ -n "$NEXT_PUBLIC_SUPABASE_URL" ] && echo "✅ SUPABASE_URL set" || echo "❌ SUPABASE_URL missing" && \
  [ -n "$SUPABASE_SERVICE_ROLE_KEY" ] && echo "✅ SERVICE_ROLE set" || echo "❌ SERVICE_ROLE missing"
```

### 1.2 Install Security Scanning Tools (if not present)
```bash
npm install --save-dev eslint-plugin-security @typescript-eslint/eslint-plugin
```

---

## Phase 2: Authentication & Authorization Audit

### 2.1 Server Actions Protection Checklist
Verify ALL server actions have `checkAdminAccess()` as their first line:

**Files to audit:**
- `src/app/admin/actions.ts`
- `src/app/admin/notification-actions.ts`
- `src/app/admin/version-actions.ts`
- `src/app/admin/search-action.ts`
- `src/app/login/actions.ts`
- `src/app/auth/forgot-password/actions.ts`

**For each action, verify:**
- [ ] Action has `"use server"` directive at top of file
- [ ] Action calls `await checkAdminAccess()` before any data operations (for admin actions)
- [ ] Action validates all input parameters
- [ ] Action doesn't expose sensitive data in error messages

### 2.2 Protected Routes Audit
Verify these admin routes have proper protection:

```
src/app/admin/layout.tsx       → Should check session/admin role
src/app/admin/*/page.tsx       → Server components should verify access
```

### 2.3 Service Role Key Exposure Check
```bash
# Search for accidental exposure of service role key
grep -r "SUPABASE_SERVICE_ROLE_KEY" --include="*.tsx" --include="*.ts" src/
# Should ONLY appear in server-side files (lib/auth/admin.ts, lib/supabase/admin.ts)
# Should NEVER appear in components or client files
```

```bash
# Check for NEXT_PUBLIC_ prefix on sensitive vars (DANGEROUS)
grep -r "NEXT_PUBLIC_.*SERVICE_ROLE\|NEXT_PUBLIC_.*SECRET\|NEXT_PUBLIC_.*KEY" .env*
# Result should be EMPTY
```

---

## Phase 3: Database & RLS Security Audit

### 3.1 Supabase RLS Policies Verification
Run this SQL in Supabase SQL Editor to find tables WITHOUT RLS:

```sql
SELECT schemaname, tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename NOT IN (
    SELECT tablename 
    FROM pg_policies 
    WHERE schemaname = 'public'
  );
```

**Expected result:** All user-facing tables should have RLS policies.

### 3.2 Check for Overly Permissive Policies
```sql
SELECT schemaname, tablename, policyname, qual, with_check
FROM pg_policies
WHERE qual::text LIKE '%true%' OR with_check::text LIKE '%true%';
```

**Review each policy** - `USING (true)` is only acceptable for public read-only data.

### 3.3 Verify Critical Tables Have RLS
These tables MUST have proper RLS:
- [ ] `components` - Public read, admin write
- [ ] `categories` - Public read, admin write
- [ ] `user_roles` - Admin only
- [ ] `component_versions` (if exists) - Admin only
- [ ] `admin_notifications` (if exists) - User-specific read

---

## Phase 4: Input Validation & Injection Prevention

### 4.1 Form Validation Audit
For each form/action, verify:

**Server Actions (FormData):**
- [ ] All required fields are validated before use
- [ ] Type coercion is explicit (not implicit)
- [ ] JSON parsing is wrapped in try/catch
- [ ] File uploads (if any) validate size and type

### 4.2 SQL Injection Prevention
```bash
# Search for raw SQL queries (should use parameterized queries)
grep -rn "\.rpc\|\.sql\|supabase\.from.*raw\|execute\s*(" --include="*.ts" --include="*.tsx" src/
```

Supabase client methods are safe. Verify any `.rpc()` calls use parameters, not string concatenation.

### 4.3 XSS Prevention
```bash
# Search for dangerouslySetInnerHTML usage
grep -rn "dangerouslySetInnerHTML" --include="*.tsx" src/
```

**For each occurrence:**
- [ ] Input is sanitized (use DOMPurify if needed)
- [ ] Content source is trusted

---

## Phase 5: Environment & Configuration Security

### 5.1 Environment Variables Audit
```bash
# List all env vars used in the codebase
grep -roh "process\.env\.[A-Z_]*" src/ | sort -u
```

**Categorize each:**
- `NEXT_PUBLIC_*` → Safe for client
- Non-prefixed → Must only be used server-side

### 5.2 Next.js Security Headers
Verify `next.config.ts` or middleware sets these headers:

- [ ] `X-Frame-Options: DENY` or `SAMEORIGIN`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Content-Security-Policy` (configured appropriately)
- [ ] `Strict-Transport-Security` (for production)

### 5.3 Sensitive File Exposure
```bash
# Check .gitignore includes sensitive files
cat .gitignore | grep -E "\.env|secret|private|key"
```

Verify these are ignored:
- `.env.local`
- `.env.production`
- Any `*.pem` or `*.key` files

---

## Phase 6: Dependency Security Audit

### 6.1 Audit npm Dependencies
```bash
# Run npm audit
cd src/path/to/powerapp-components && npm audit

# For detailed report
npm audit --json > npm-audit-report.json
```

### 6.2 Check for Known Vulnerabilities
```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

### 6.3 Lock File Integrity
- [ ] `package-lock.json` is committed
- [ ] No manual edits to lock file
- [ ] Versions are pinned in `package.json` where critical

---

## Phase 7: API & Server Security

### 7.1 Rate Limiting Check
Verify these endpoints have rate limiting (or document if not needed):

- [ ] `/api/auth/*` - Critical
- [ ] `/login/actions` - Critical  
- [ ] `/auth/forgot-password/actions` - Critical
- [ ] All admin actions - Recommended

### 7.2 CORS Configuration
```bash
# Check for CORS headers in next.config or API routes
grep -rn "Access-Control-Allow-Origin\|cors" --include="*.ts" --include="*.tsx" src/
```

### 7.3 Error Handling Audit
```bash
# Find console.error statements that might leak info
grep -rn "console\.error.*error" --include="*.ts" --include="*.tsx" src/
```

**For each occurrence:**
- [ ] Error details are logged but NOT returned to client
- [ ] Client receives generic error message

---

## Phase 8: Frontend Security

### 8.1 Client-Side Data Exposure
```bash
# Search for sensitive data patterns in client components
grep -rn "password\|secret\|token\|apiKey\|private" --include="*.tsx" src/components/
```

### 8.2 localStorage/sessionStorage Usage
```bash
grep -rn "localStorage\|sessionStorage" --include="*.tsx" --include="*.ts" src/
```

**For each occurrence:**
- [ ] Sensitive data is NOT stored in localStorage
- [ ] Session tokens use httpOnly cookies (Supabase default)

### 8.3 HTTPS Enforcement
- [ ] All external URLs use `https://`
- [ ] Production deployment forces HTTPS redirect

---

## Phase 9: Code Quality & Bug Prevention

### 9.1 TypeScript Strict Mode
```bash
# Check tsconfig for strictness
cat tsconfig.json | grep -E "strict|noImplicit"
```

Recommended settings:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 9.2 ESLint Security Rules
```bash
# Run ESLint
npm run lint

# Run with security plugin if configured
npx eslint --ext .ts,.tsx src/ --rule '@typescript-eslint/no-explicit-any: error'
```

### 9.3 Unused Code Detection
```bash
# Find unused exports
npx ts-prune src/

# Find unused dependencies  
npx depcheck
```

---

## Phase 10: Supabase-Specific Security

### 10.1 Auth Configuration
Via Supabase Dashboard, verify:

- [ ] Email confirmation is enabled
- [ ] Password minimum length ≥ 8 characters
- [ ] Rate limiting on auth endpoints enabled
- [ ] Signup restrictions match business needs

### 10.2 Realtime Security
If using Supabase Realtime:

- [ ] Channels require authentication
- [ ] RLS policies apply to realtime subscriptions

### 10.3 Storage Security
If using Supabase Storage:

- [ ] Buckets have appropriate RLS policies
- [ ] File types are restricted
- [ ] File sizes have limits
- [ ] URLs use signed tokens with expiration

---

## Phase 11: Testing & Verification

### 11.1 Authentication Flow Tests
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials fails gracefully
- [ ] Logout clears session properly
- [ ] Protected routes redirect unauthenticated users
- [ ] Admin routes reject non-admin users

### 11.2 Authorization Tests
- [ ] Regular user cannot access `/admin/*`
- [ ] Regular user cannot call admin server actions
- [ ] Admin cannot delete own account (self-protection)

### 11.3 Input Validation Tests
- [ ] Forms reject invalid/missing required fields
- [ ] JSON parsing handles malformed data
- [ ] Large file uploads are rejected

---

## Phase 12: Reporting & Remediation

### 12.1 Create Security Report
Document all findings with:
1. **Severity**: Critical / High / Medium / Low
2. **Description**: What the issue is
3. **Location**: File and line number
4. **Remediation**: How to fix it
5. **Status**: Open / In Progress / Resolved

### 12.2 Priority Matrix

| Severity | Response Time |
|----------|---------------|
| Critical | Fix immediately |
| High | Fix within 24 hours |
| Medium | Fix within 1 week |
| Low | Fix in next sprint |

### 12.3 Post-Fix Verification
After remediation:
- [ ] Re-run affected audit step
- [ ] Test functionality still works
- [ ] Document resolution

---

## Quick Reference Commands

```bash
# Full security scan
npm audit && npm run lint

# Check for exposed secrets
grep -r "SUPABASE_SERVICE_ROLE_KEY" src/

# Find unprotected server actions
grep -L "checkAdminAccess" src/app/admin/*.ts

# Check for dangerous patterns
grep -rn "dangerouslySetInnerHTML\|eval\|innerHTML" src/
```

---

## Automation (Optional)

Add to CI/CD pipeline (`.github/workflows/security.yml`):

```yaml
name: Security Audit
on: [push, pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm audit --audit-level=high
      - run: npm run lint
```
