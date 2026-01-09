// Animated SVG to Power Apps YAML Generator

import { AnimatedIcon } from "../data/animated-icons";

interface AnimatedIconYamlOptions {
    controlName: string;
    size: number;
    color: string;
    toggleVariable: string;
    timestampVariable: string;
}

/**
 * Process the SVG template with actual values
 */
export function processAnimatedSvg(
    svgTemplate: string,
    options: { size: number; color: string; timestamp: string; isToggled: boolean }
): string {
    const { size, color, timestamp, isToggled } = options;

    // Replace size and color
    let processed = svgTemplate
        .replace(/\{\{size\}\}/g, size.toString())
        .replace(/\{\{color\}\}/g, color)
        .replace(/\{\{timestamp\}\}/g, timestamp);

    // Replace animation states based on toggle
    if (isToggled) {
        processed = processed
            .replace(/\{\{fromState\}\}/g, '100%')
            .replace(/\{\{toState\}\}/g, '0%');
    } else {
        processed = processed
            .replace(/\{\{fromState\}\}/g, '0%')
            .replace(/\{\{toState\}\}/g, '100%');
    }

    return processed;
}

/**
 * Generate Power Apps YAML for an animated icon
 */
export function generateAnimatedIconYaml(
    icon: AnimatedIcon,
    options: AnimatedIconYamlOptions
): string {
    const { controlName, size, color, toggleVariable, timestampVariable } = options;

    // Clean up SVG for Power Apps (escape for YAML)
    const cleanSvg = icon.svgTemplate
        .replace(/\{\{size\}\}/g, size.toString())
        .replace(/\{\{color\}\}/g, color)
        .replace(/\{\{timestamp\}\}/g, `" & ${timestampVariable} & "`)
        .replace(/\{\{fromState\}\}/g, `" & If(${toggleVariable}, "0%", "100%") & "`)
        .replace(/\{\{toState\}\}/g, `" & If(${toggleVariable}, "100%", "0%") & "`)
        .replace(/="/g, "='")  // Convert double quotes to single quotes in attributes
        .replace(/"/g, "'")    // Convert remaining double quotes to single quotes
        .replace(/'/g, "''")   // Escape single quotes for Power Apps
        .replace(/\n/g, '\n        ');  // Indent newlines

    return `- ${controlName}:
    Control: Image@2.2.3
    Properties:
      Image: |
        ="data:image/svg+xml," & EncodeUrl("
        ${cleanSvg.trim()}
        ")
      OnSelect: |-
        =Set(${toggleVariable}, !${toggleVariable});
        Set(${timestampVariable}, Text(Now(), "yyyymmddhhmmss"))
      Width: =${size}
      Height: =${size}
      ImagePosition: =ImagePosition.Fit`;
}

/**
 * Generate just the Image formula for animated icons
 */
export function generateAnimatedImageFormula(
    icon: AnimatedIcon,
    options: { size: number; color: string; toggleVariable: string; timestampVariable: string }
): string {
    const { size, color, toggleVariable, timestampVariable } = options;

    const cleanSvg = icon.svgTemplate
        .replace(/\{\{size\}\}/g, size.toString())
        .replace(/\{\{color\}\}/g, color)
        .replace(/\{\{timestamp\}\}/g, `" & ${timestampVariable} & "`)
        .replace(/\{\{fromState\}\}/g, `" & If(${toggleVariable}, "0%", "100%") & "`)
        .replace(/\{\{toState\}\}/g, `" & If(${toggleVariable}, "100%", "0%") & "`)
        .replace(/="/g, "='")
        .replace(/"/g, "'")
        .replace(/'/g, "''")
        .replace(/\n/g, ' ');

    return `="data:image/svg+xml," & EncodeUrl("${cleanSvg.trim()}")`;
}

/**
 * Generate OnSelect formula for the icon
 */
export function generateOnSelectFormula(
    toggleVariable: string,
    timestampVariable: string
): string {
    return `=Set(${toggleVariable}, !${toggleVariable}); Set(${timestampVariable}, Text(Now(), "yyyymmddhhmmss"))`;
}

/**
 * Generate initialization formula for Screen.OnVisible
 */
export function generateInitFormula(
    toggleVariable: string,
    timestampVariable: string
): string {
    return `Set(${toggleVariable}, false); Set(${timestampVariable}, Text(Now(), "yyyymmddhhmmss"))`;
}
