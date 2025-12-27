---
description: Comprehensive audit of the PowerApps component library for bugs, missing features, and code quality issues
---

# PowerApps Component Library Audit Workflow

Run this workflow to perform a comprehensive audit of the component library. The audit checks for completeness, consistency, bugs, and code quality issues.

## Pre-Audit Setup

1. Ensure the development server is running:
```bash
cd powerapp-components && npm run dev
```

2. Open the browser to http://localhost:3000 to verify the app loads correctly.

---

## Phase 1: Component Registry Audit

### 1.1 Check Category Counts
Verify that the `componentsCount` and `freeCount` in `src/lib/components-data.ts` match actual component counts:

```bash
# Count components per category
grep -o "category: '[^']*'" src/lib/components-data.ts | sort | uniq -c
```

Compare output against the category definitions at the top of the file.

### 1.2 Verify All Components Have Required Fields
Check that every component has all required fields:
- `id`, `name`, `slug`, `category`, `description`, `yamlCode`
- `isPro` (boolean)
- `createdAt`, `updatedAt` (date strings)

```bash
# Find components missing yamlCode
grep -B5 "yamlCode:" src/lib/components-data.ts | grep -E "id:|name:" | head -20
```

---

## Phase 2: Preview Component Audit

### 2.1 List All Preview Components
```bash
find src/components/preview/previews -name "*.tsx" -type f | sort
```

### 2.2 Check Preview Registry
Verify all previews are registered in `component-mapper.tsx`:

```bash
# List registered previews
grep -E "^\s+'[a-z-]+': " src/components/preview/component-mapper.tsx
```

### 2.3 Identify Missing Previews
Cross-reference component slugs against registered previews to find gaps.

---

## Phase 3: Settings Schema Audit

### 3.1 List All Schema Files
```bash
find src/components/settings/schemas -name "*.ts" -type f | sort
```

### 3.2 Check Schema Registry
Verify schemas are registered in `schemas/index.ts`:

```bash
# List registered schemas
grep -E "^\s+'[a-z-]+': " src/components/settings/schemas/index.ts
```

### 3.3 Identify Components Without Schemas
Components without schemas won't have customization options in the UI.

---

## Phase 4: YAML Generator Audit

### 4.1 Check Generator Functions
```bash
# List all YAML generator functions
grep -E "^export function generate.*YAML" src/lib/yaml-generator.ts
```

### 4.2 Check Switch Cases
```bash
# List all switch cases in generateComponentYAML
grep -E "case '[a-z-]+':" src/lib/yaml-generator.ts
```

### 4.3 Identify Components Using Base YAML Only
Components returning `baseYAML` don't have customization support.

---

## Phase 5: Code Quality Audit

### 5.1 Run TypeScript Type Check
```bash
cd powerapp-components && npx tsc --noEmit
```

### 5.2 Run ESLint
```bash
cd powerapp-components && npm run lint
```

### 5.3 Check for Console Logs
```bash
grep -rn "console.log\|console.error\|console.warn" src --include="*.tsx" --include="*.ts" | grep -v "node_modules"
```

### 5.4 Check for TODO Comments
```bash
grep -rn "TODO\|FIXME\|HACK\|XXX" src --include="*.tsx" --include="*.ts"
```

---

## Phase 6: YAML Code Quality Audit

### 6.1 Verify Control Versions
Check that all YAML uses correct control versions per `gemini.md`:

| Control | Required Version |
|---------|------------------|
| GroupContainer | @1.3.0 |
| Gallery | @2.15.0 |
| Button | @0.0.45 |
| Text | @0.0.51 |
| TextInput | @0.0.54 |
| Image | @2.2.3 |
| Classic/Button | @2.2.0 |
| Label | @2.5.1 |
| Classic/Icon | @2.5.0 |
| Timer | @2.1.0 |
| HtmlText | @1.3.0 |
| Toggle | @1.1.5 |
| Slider | @1.0.32 |
| Progress | @1.1.34 |
| DatePicker | @0.0.46 |

```bash
# Check for incorrect Timer version
grep -n "Timer@2.4.0" src/lib/components-data.ts src/lib/yaml-generator.ts
```

### 6.2 Check for Rectangle with Radius
Rectangle does NOT support radius properties:

```bash
grep -n "Rectangle.*Radius" src/lib/components-data.ts src/lib/yaml-generator.ts
```

### 6.3 Verify YAML Syntax
Check for common YAML issues:

```bash
# Properties without = prefix
grep -n "^\s*[A-Z][a-zA-Z]*: [^=]" src/lib/components-data.ts | head -10
```

---

## Phase 7: UI/UX Audit (Manual)

Open http://localhost:3000 and manually verify:

### 7.1 Library Page
- [ ] All categories show correct component counts
- [ ] All component cards display previews (no "Coming soon" placeholders)
- [ ] Clicking a component opens the detail page

### 7.2 Component Detail Pages
For each component, verify:
- [ ] Preview displays correctly
- [ ] Settings panel shows customization options
- [ ] Changing settings updates the preview in real-time
- [ ] "Copy YAML" button works and copies valid YAML
- [ ] YAML code reflects setting changes

### 7.3 Responsive Design
- [ ] Test at mobile width (375px)
- [ ] Test at tablet width (768px)
- [ ] Test at desktop width (1280px+)

---

## Phase 8: Generate Audit Report

After completing all phases, create an audit report with:

### Summary Table
| Category | Components | With Preview | With Schema | With Generator |
|----------|------------|--------------|-------------|----------------|
| Tabs | X | X | X | X |
| Buttons | X | X | X | X |
| ... | ... | ... | ... | ... |

### Issues Found
Categorize issues by priority:

#### 🔴 Critical (Blocking)
- Build failures
- Runtime errors
- Broken core functionality

#### 🟡 High Priority
- Missing previews
- Missing schemas
- Incorrect YAML output

#### 🟢 Medium Priority
- Missing YAML generators (using base YAML)
- UI polish issues
- Performance issues

#### ⚪ Low Priority
- Code style issues
- Documentation gaps
- Nice-to-have features

---

## Quick Audit Commands

Run these commands for a quick health check:

```bash
# Full lint check
npm run lint

# Type check
npx tsc --noEmit

# Count components by category
grep -o "category: '[^']*'" src/lib/components-data.ts | sort | uniq -c

# Find components without preview registration
# Compare output of these two commands:
grep "id: '" src/lib/components-data.ts | wc -l
grep "': " src/components/preview/component-mapper.tsx | wc -l

# Check for common YAML issues
grep -c "Timer@2.4.0" src/lib/*.ts  # Should be 0
grep -c "Rectangle.*Radius" src/lib/*.ts  # Should be 0
```

---

## Post-Audit Actions

After the audit, prioritize fixes in this order:

1. **Critical**: Fix immediately, blocks users
2. **High**: Fix in current sprint
3. **Medium**: Schedule for next sprint
4. **Low**: Add to backlog

Update the `task.md` file with prioritized action items.
