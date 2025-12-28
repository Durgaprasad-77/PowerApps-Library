// SVG to Power Apps YAML Converter
// Converts SVG templates to copy-paste ready YAML code

export interface BackgroundConfig {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    opacity: number;
    scale: number;
}

export const defaultConfig: BackgroundConfig = {
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    backgroundColor: "#0A0A0A",
    opacity: 0.15,
    scale: 1,
};

/**
 * Converts hex color to rgba with opacity
 */
export function hexToRgba(hex: string, opacity: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(59, 130, 246, ${opacity})`;

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Replaces placeholders in SVG template with actual values
 */
export function processSvgTemplate(
    template: string,
    config: BackgroundConfig
): string {
    return template
        .replace(/{{primaryColor}}/g, config.primaryColor)
        .replace(/{{secondaryColor}}/g, config.secondaryColor)
        .replace(/{{backgroundColor}}/g, config.backgroundColor)
        .replace(/{{primaryRgba}}/g, hexToRgba(config.primaryColor, config.opacity))
        .replace(/{{secondaryRgba}}/g, hexToRgba(config.secondaryColor, config.opacity))
        .replace(/{{opacity}}/g, config.opacity.toString())
        .replace(/{{scale}}/g, config.scale.toString());
}

/**
 * Generates Power Apps YAML code for a background
 */
export function generateYamlCode(
    controlName: string,
    svgContent: string,
    imagePosition: "Fill" | "Tile" = "Tile"
): string {
    // Clean SVG for Power Apps:
    // 1. Replace double quotes with single quotes
    // 2. Remove newlines and extra spaces
    // 3. Trim the result
    const cleanedSvg = svgContent
        .replace(/"/g, "'")
        .replace(/\n/g, "")
        .replace(/\s+/g, " ")
        .trim();

    return `- ${controlName}:
    Control: Image@2.2.3
    Properties:
      Image: ="data:image/svg+xml;utf8," & EncodeUrl("${cleanedSvg}")
      ImagePosition: =ImagePosition.${imagePosition}
      Width: =Parent.Width
      Height: =Parent.Height
      X: =0
      Y: =0`;
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}

