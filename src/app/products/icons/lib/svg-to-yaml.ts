/**
 * SVG to YAML Generator for Power Apps Icons
 * Generates Image control YAML with inline SVG
 */

export interface IconYamlConfig {
    controlName?: string;
    width?: number;
    height?: number;
    color?: string;
}

const DEFAULT_CONFIG: IconYamlConfig = {
    controlName: 'imgIcon',
    width: 24,
    height: 24,
    color: '#000000'
};

/**
 * Apply color to SVG by replacing fill/stroke attributes
 */
function applySvgColor(svg: string, color: string): string {
    // Replace currentColor with the specified color
    let coloredSvg = svg.replace(/currentColor/gi, color);

    // If svg has fill='none' on paths, we need to set stroke instead
    // For Fluent icons, typically the SVG uses fill
    if (!coloredSvg.includes('fill=') || coloredSvg.includes('fill=\'none\'')) {
        // Add fill to the SVG root if not present
        coloredSvg = coloredSvg.replace('<svg', `<svg fill='${color}'`);
    } else {
        // Replace existing fill color (but not fill='none')
        // Match both single and double quoted attributes
        coloredSvg = coloredSvg.replace(/fill=(["'])(?!none)[^"']*\1/gi, `fill='${color}'`);
    }

    return coloredSvg;
}

/**
 * Escape SVG for use in Power Apps EncodeUrl
 */
function escapeSvgForPowerApps(svg: string): string {
    // Remove newlines and extra spaces
    let cleanSvg = svg.replace(/\n/g, '').replace(/\s+/g, ' ').trim();

    // Convert all double quotes to single quotes in SVG attributes
    cleanSvg = cleanSvg.replace(/="/g, "='").replace(/"/g, "'");

    // Escape single quotes for Power Apps string
    cleanSvg = cleanSvg.replace(/'/g, "''");

    return cleanSvg;
}

/**
 * Generate Power Apps YAML code for an icon
 */
export function generateIconYaml(
    svg: string,
    config: IconYamlConfig = {}
): string {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    const { controlName, width, height, color } = mergedConfig;

    // Apply color to SVG
    const coloredSvg = applySvgColor(svg, color!);

    // Escape for Power Apps
    const escapedSvg = escapeSvgForPowerApps(coloredSvg);

    return `- ${controlName}:
    Control: Image@2.2.3
    Properties:
      Image: |-
        ="data:image/svg+xml;utf8," & EncodeUrl("${escapedSvg}")
      Width: =${width}
      Height: =${height}
      ImagePosition: =ImagePosition.Fit
`;
}

/**
 * Generate just the Image property formula (for quick copy)
 */
export function generateImageFormula(svg: string, color: string = '#000000'): string {
    const coloredSvg = applySvgColor(svg, color);
    const escapedSvg = escapeSvgForPowerApps(coloredSvg);

    return `="data:image/svg+xml;utf8," & EncodeUrl("${escapedSvg}")`;
}
