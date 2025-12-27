---
description: Audit and validate YAML code generation for Power Apps standards compliance
---

# YAML Code Quality Audit Workflow

This workflow audits all YAML code in the component library to ensure compliance with Power Apps standards defined in `gemini.md`.

---

## Quick Reference: Required Control Versions

| Control | Version | Notes |
|---------|---------|-------|
| GroupContainer | @1.3.0 | Use AutoLayout or ManualLayout variant |
| Gallery | @2.15.0 | |
| Button | @0.0.45 | Modern button |
| Text | @0.0.51 | |
| TextInput | @0.0.54 | |
| Image | @2.2.3 | |
| Classic/Button | @2.2.0 | Legacy button |
| Label | @2.5.1 | |
| Classic/Icon | @2.5.0 | |
| Timer | @2.1.0 | ⚠️ NOT 2.4.0 |
| HtmlText | @1.3.0 | |
| Toggle | @1.1.5 | |
| Slider | @1.0.32 | |
| Progress | @1.1.34 | |
| DatePicker | @0.0.46 | |
| Table | @1.0.278 | |
| Icon | @0.0.7 | |
| Form | @2.4.4 | |
| Header | @0.0.44 | |

---

## Phase 1: Control Version Audit

### 1.1 Check for Incorrect Timer Version
```bash
# Timer@2.4.0 causes version warnings - must use @2.1.0
grep -n "Timer@2.4.0" src/lib/components-data.ts src/lib/yaml-generator.ts
# Expected: 0 matches
```

### 1.2 Verify All Control Versions
```bash
# List all control versions used
grep -oE "[A-Za-z/]+@[0-9.]+" src/lib/components-data.ts | sort | uniq -c | sort -rn
```

### 1.3 Check Classic vs Modern Controls
```bash
# Find Classic controls (should be explicitly versioned)
grep -n "Classic/" src/lib/components-data.ts src/lib/yaml-generator.ts | head -20
```

---

## Phase 2: Syntax Validation

### 2.1 Property Value Prefix Check
All property values must start with `=`:
```bash
# Find properties that might be missing = prefix
grep -n "^\s*[A-Z][a-zA-Z]*: [^=]" src/lib/components-data.ts | head -20
# Note: Some false positives expected for YAML structure
```

### 2.2 String Quote Validation
Text values should use quotes inside `=`:
```bash
# Find Text properties to verify format
grep -n "Text: =" src/lib/yaml-generator.ts | head -10
# Should show: Text: ="${variable}" or Text: ="String"
```

### 2.3 Multi-line Value Format
Multi-line values should use `|-`:
```bash
# Find multi-line Items or OnSelect
grep -n "Items: |-\|OnSelect: |-" src/lib/components-data.ts | head -10
```

---

## Phase 3: Layout Best Practices

### 3.1 Rectangle Radius Check
Rectangle does NOT support radius properties:
```bash
grep -n "Rectangle.*Radius\|Rectangle" src/lib/components-data.ts src/lib/yaml-generator.ts | grep -i radius
# Expected: 0 matches - use GroupContainer for rounded corners
```

### 3.2 AutoLayout vs ManualLayout Usage
```bash
# Count AutoLayout vs ManualLayout usage
grep -c "Variant: AutoLayout" src/lib/components-data.ts
grep -c "Variant: ManualLayout" src/lib/components-data.ts
# AutoLayout should be preferred (99% of cases)
```

### 3.3 Check Z-Index Order in ManualLayout
For ManualLayout, clickable controls must come AFTER backgrounds:
```bash
# Find ManualLayout sections to review manually
grep -B5 -A20 "Variant: ManualLayout" src/lib/components-data.ts | head -50
```

---

## Phase 4: Color Format Validation

### 4.1 Verify RGBA Format
Colors should use RGBA format:
```bash
# Find color usages
grep -oE "RGBA\([^)]+\)" src/lib/yaml-generator.ts | sort | uniq | head -20
```

### 4.2 Check ColorFade Usage
ColorFade should be used for hover/pressed states:
```bash
grep -n "ColorFade" src/lib/yaml-generator.ts | head -10
```

### 4.3 Verify HoverColor on Classic/Button
Classic/Button must have HoverColor set to prevent text disappearing:
```bash
grep -n "Classic/Button" -A 15 src/lib/yaml-generator.ts | grep -E "HoverColor|Classic/Button" | head -20
```

---

## Phase 5: Animation Best Practices

### 5.1 Timer Duration Check
Timer duration should be 50-500ms for smooth animations:
```bash
grep -n "Duration: =" src/lib/components-data.ts src/lib/yaml-generator.ts
```

### 5.2 Animation Formula Patterns
Check for ease-out animations (recommended):
```bash
grep -n "Power\(1 -" src/lib/yaml-generator.ts | head -10
# Ease-out pattern: (1 - Power(1 - timer.Value / timer.Duration, 3))
```

---

## Phase 6: Responsive Design Audit

### 6.1 Parent-relative Sizing
Check for responsive Width/Height:
```bash
grep -n "Parent.Width\|Parent.Height" src/lib/yaml-generator.ts | head -20
# Good: Width: =Parent.Width
# Bad: Width: =400 (hardcoded)
```

### 6.2 FillPortions Usage
Check for flex layout:
```bash
grep -n "FillPortions" src/lib/yaml-generator.ts | head -10
```

---

## Phase 7: Required Initializations

### 7.1 Screen.OnVisible Documentation
Check that animated components document required variables:
```bash
grep -n "Screen.OnVisible\|Set(loc" src/lib/components-data.ts | head -20
```

### 7.2 Variable Naming Convention
Variables should use `loc` prefix for local context:
```bash
grep -oE "loc[A-Z][a-zA-Z]+" src/lib/yaml-generator.ts | sort | uniq
```

---

## Phase 8: Anti-Pattern Detection

### 8.1 Common Issues
```bash
# Check for common anti-patterns
echo "=== Checking for anti-patterns ==="

# Timer@2.4.0 (wrong version)
echo "Timer@2.4.0:"
grep -c "Timer@2.4.0" src/lib/*.ts || echo "0"

# Rectangle with radius (not supported)
echo "Rectangle+Radius:"
grep -c "Rectangle.*Radius" src/lib/*.ts || echo "0"

# Hardcoded dimensions in AutoLayout children
echo "Fixed Width in AutoLayout children (review needed):"
grep -n "Width: =[0-9]" src/lib/yaml-generator.ts | wc -l
```

---

## Phase 9: Generate YAML Validation Report

After running audits, generate summary:

```bash
echo "=== YAML Quality Report ==="
echo ""
echo "Control Versions Used:"
grep -oE "[A-Za-z/]+@[0-9.]+" src/lib/components-data.ts | sort | uniq -c | sort -rn
echo ""
echo "Layout Variants:"
echo "AutoLayout: $(grep -c 'Variant: AutoLayout' src/lib/components-data.ts)"
echo "ManualLayout: $(grep -c 'Variant: ManualLayout' src/lib/components-data.ts)"
echo ""
echo "Anti-pattern Check:"
echo "Timer@2.4.0: $(grep -c 'Timer@2.4.0' src/lib/*.ts 2>/dev/null || echo 0)"
echo "Rectangle+Radius: $(grep -c 'Rectangle.*Radius' src/lib/*.ts 2>/dev/null || echo 0)"
```

---

## Quick Fix Commands

### Fix Timer Version
```bash
# Replace Timer@2.4.0 with Timer@2.1.0
sed -i '' 's/Timer@2.4.0/Timer@2.1.0/g' src/lib/components-data.ts
sed -i '' 's/Timer@2.4.0/Timer@2.1.0/g' src/lib/yaml-generator.ts
```

### Fix Missing = Prefix
```bash
# Manual review required - common patterns:
# BAD:  Text: "Hello"
# GOOD: Text: ="Hello"
```

---

## YAML Template Checklist

When creating new YAML:

- [ ] All Controls have exact version numbers
- [ ] Timer uses @2.1.0 (not @2.4.0)
- [ ] All values start with `=` prefix
- [ ] Text values use quotes inside `=`: `="text"`
- [ ] GroupContainer used for rounded corners (not Rectangle)
- [ ] Clickable controls declared AFTER backgrounds in ManualLayout
- [ ] Colors use RGBA format
- [ ] Classic/Button has HoverColor set
- [ ] Parent-relative sizing used where appropriate
- [ ] Variables use `loc` prefix
- [ ] Screen.OnVisible code documented for animated components

---

## Run Full YAML Audit
// turbo-all
```bash
cd /Users/durgaprasads/Documents/25\ Dec\ Powerapp\ AI/powerapp-components

echo "=== YAML Quality Audit ==="
echo ""

echo "1. Control Versions:"
grep -oE "[A-Za-z/]+@[0-9.]+" src/lib/components-data.ts | sort | uniq -c | sort -rn | head -15

echo ""
echo "2. Layout Distribution:"
echo "   AutoLayout: $(grep -c 'Variant: AutoLayout' src/lib/components-data.ts)"
echo "   ManualLayout: $(grep -c 'Variant: ManualLayout' src/lib/components-data.ts)"

echo ""
echo "3. Anti-Pattern Check:"
echo "   Timer@2.4.0: $(grep -c 'Timer@2.4.0' src/lib/*.ts 2>/dev/null || echo 0)"
echo "   Rectangle+Radius: $(grep -c 'Rectangle.*Radius' src/lib/*.ts 2>/dev/null || echo 0)"

echo ""
echo "4. Color Format:"
echo "   RGBA usage: $(grep -c 'RGBA(' src/lib/yaml-generator.ts)"
echo "   ColorFade usage: $(grep -c 'ColorFade' src/lib/yaml-generator.ts)"

echo ""
echo "=== Audit Complete ==="
```
