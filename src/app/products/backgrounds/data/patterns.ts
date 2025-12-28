// Pattern SVG Templates
// Each pattern has a template with placeholders for colors

export interface BackgroundPattern {
    id: string;
    name: string;
    category: "patterns" | "gradients" | "shapes" | "textures" | "animated";
    subcategory?: string;
    description: string;
    svgTemplate: string;
    imagePosition: "Fill" | "Tile";
    tags: string[];
}

export const patterns: BackgroundPattern[] = [
    {
        id: "dots-grid",
        name: "Dots Grid",
        category: "patterns",
        subcategory: "geometric",
        description: "Simple repeating dot pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
  <circle cx='10' cy='10' r='1.5' fill='{{primaryRgba}}'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["dots", "minimal", "subtle", "grid"],
    },
    {
        id: "diagonal-lines",
        name: "Diagonal Lines",
        category: "patterns",
        subcategory: "geometric",
        description: "Clean diagonal stripe pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'>
  <path d='M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2' stroke='{{primaryRgba}}' stroke-width='1'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["lines", "diagonal", "stripes", "minimal"],
    },
    {
        id: "cross-hatch",
        name: "Cross Hatch",
        category: "patterns",
        subcategory: "geometric",
        description: "Crossed diagonal lines pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
  <path d='M0,0 L16,16 M16,0 L0,16' stroke='{{primaryRgba}}' stroke-width='0.5'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["crosshatch", "lines", "texture", "sketch"],
    },
    {
        id: "chevron",
        name: "Chevron",
        category: "patterns",
        subcategory: "geometric",
        description: "Repeating chevron/arrow pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='16' viewBox='0 0 28 16'>
  <path d='M0,8 L14,0 L28,8 M0,16 L14,8 L28,16' stroke='{{primaryRgba}}' stroke-width='1' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["chevron", "arrows", "geometric", "direction"],
    },
    {
        id: "hexagons",
        name: "Hexagons",
        category: "patterns",
        subcategory: "geometric",
        description: "Honeycomb hexagonal pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'>
  <path d='M14,0 L28,8 L28,24 L14,32 L0,24 L0,8 Z M14,16 L28,24 L28,40 L14,48 L0,40 L0,24 Z' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["hexagon", "honeycomb", "geometric", "tech"],
    },
    {
        id: "circuit-board",
        name: "Circuit Board",
        category: "patterns",
        subcategory: "tech",
        description: "Tech-inspired circuit pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
  <path d='M0,20 L20,20 M20,0 L20,40' stroke='{{primaryRgba}}' stroke-width='0.5'/>
  <circle cx='20' cy='20' r='2' fill='{{primaryRgba}}'/>
  <circle cx='0' cy='20' r='1.5' fill='{{primaryRgba}}'/>
  <circle cx='20' cy='0' r='1.5' fill='{{primaryRgba}}'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["circuit", "tech", "digital", "electronics"],
    },
    {
        id: "topography",
        name: "Topography Lines",
        category: "patterns",
        subcategory: "organic",
        description: "Map-inspired contour lines",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
  <ellipse cx='40' cy='40' rx='35' ry='20' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <ellipse cx='40' cy='40' rx='25' ry='12' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <ellipse cx='40' cy='40' rx='15' ry='6' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["topography", "map", "contour", "organic"],
    },
    {
        id: "plus-signs",
        name: "Plus Signs",
        category: "patterns",
        subcategory: "geometric",
        description: "Simple plus/cross pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
  <path d='M12,6 L12,18 M6,12 L18,12' stroke='{{primaryRgba}}' stroke-width='1.5' stroke-linecap='round'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["plus", "cross", "medical", "minimal"],
    },
    {
        id: "triangles",
        name: "Triangles",
        category: "patterns",
        subcategory: "geometric",
        description: "Tessellating triangle pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='21' viewBox='0 0 24 21'>
  <path d='M0,21 L12,0 L24,21 Z' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["triangles", "geometric", "angular", "modern"],
    },
    {
        id: "waves",
        name: "Wave Lines",
        category: "patterns",
        subcategory: "organic",
        description: "Smooth wavy line pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='12' viewBox='0 0 40 12'>
  <path d='M0,6 Q10,0 20,6 T40,6' stroke='{{primaryRgba}}' stroke-width='1' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["waves", "water", "smooth", "organic"],
    },
    {
        id: "diamonds",
        name: "Diamonds",
        category: "patterns",
        subcategory: "geometric",
        description: "Classic diamond grid pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
  <path d='M12,0 L24,12 L12,24 L0,12 Z' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["diamonds", "geometric", "elegant", "grid"],
    },
    {
        id: "zigzag",
        name: "Zigzag",
        category: "patterns",
        subcategory: "geometric",
        description: "Sharp zigzag line pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='12' viewBox='0 0 40 12'>
  <path d='M0,0 L10,12 L20,0 L30,12 L40,0' stroke='{{primaryRgba}}' stroke-width='1' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["zigzag", "sharp", "dynamic", "geometric"],
    },
    {
        id: "concentric-circles",
        name: "Concentric Circles",
        category: "patterns",
        subcategory: "geometric",
        description: "Layered circular ripples",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
  <circle cx='30' cy='30' r='8' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <circle cx='30' cy='30' r='16' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <circle cx='30' cy='30' r='24' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["circles", "concentric", "ripples", "zen"],
    },
    {
        id: "squares-grid",
        name: "Squares Grid",
        category: "patterns",
        subcategory: "geometric",
        description: "Clean square grid pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
  <rect x='4' y='4' width='24' height='24' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["squares", "grid", "clean", "minimal"],
    },
    {
        id: "stars",
        name: "Stars",
        category: "patterns",
        subcategory: "decorative",
        description: "Scattered star shapes",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
  <path d='M20,2 L23,15 L36,15 L25,23 L29,36 L20,28 L11,36 L15,23 L4,15 L17,15 Z' fill='{{primaryRgba}}'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["stars", "decorative", "sparkle", "night"],
    },
    {
        id: "brick",
        name: "Brick Wall",
        category: "patterns",
        subcategory: "texture",
        description: "Classic brick layout pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='42' height='24' viewBox='0 0 42 24'>
  <rect x='1' y='1' width='18' height='10' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <rect x='21' y='1' width='18' height='10' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <rect x='-9' y='13' width='18' height='10' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <rect x='11' y='13' width='18' height='10' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <rect x='31' y='13' width='18' height='10' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["brick", "wall", "construction", "texture"],
    },
    {
        id: "polka-dots",
        name: "Polka Dots",
        category: "patterns",
        subcategory: "decorative",
        description: "Large playful polka dots",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
  <circle cx='20' cy='20' r='6' fill='{{primaryRgba}}'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["polka", "dots", "playful", "retro"],
    },
    {
        id: "arrows",
        name: "Arrows",
        category: "patterns",
        subcategory: "geometric",
        description: "Directional arrow pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
  <path d='M16,4 L26,16 L20,16 L20,28 L12,28 L12,16 L6,16 Z' fill='{{primaryRgba}}'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["arrows", "direction", "up", "navigation"],
    },
    {
        id: "fish-scale",
        name: "Fish Scale",
        category: "patterns",
        subcategory: "organic",
        description: "Overlapping scale pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='20' viewBox='0 0 24 20'>
  <path d='M0,20 A12,12 0 0,1 12,8 A12,12 0 0,1 24,20' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <path d='M12,20 A12,12 0 0,1 24,8' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <path d='M0,8 A12,12 0 0,0 12,20' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["fish", "scale", "organic", "japanese"],
    },
    {
        id: "moroccan",
        name: "Moroccan",
        category: "patterns",
        subcategory: "decorative",
        description: "Four-pointed star arabesque",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
  <path d='M16,0 C16,8 8,16 0,16 C8,16 16,24 16,32 C16,24 24,16 32,16 C24,16 16,8 16,0 Z' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["moroccan", "arabesque", "decorative", "ornate"],
    },
    {
        id: "maze",
        name: "Maze",
        category: "patterns",
        subcategory: "geometric",
        description: "Right-angle maze pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
  <path d='M0,0 L20,0 L20,10 L10,10 L10,30 L30,30 L30,20 L40,20' stroke='{{primaryRgba}}' stroke-width='1' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["maze", "labyrinth", "puzzle", "geometric"],
    },
    {
        id: "confetti",
        name: "Confetti",
        category: "patterns",
        subcategory: "decorative",
        description: "Scattered confetti pieces",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
  <rect x='10' y='8' width='6' height='3' fill='{{primaryRgba}}' transform='rotate(25 13 9.5)'/>
  <rect x='35' y='20' width='6' height='3' fill='{{primaryRgba}}' transform='rotate(-15 38 21.5)'/>
  <rect x='20' y='40' width='6' height='3' fill='{{primaryRgba}}' transform='rotate(40 23 41.5)'/>
  <rect x='45' y='45' width='6' height='3' fill='{{primaryRgba}}' transform='rotate(-30 48 46.5)'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["confetti", "party", "celebration", "fun"],
    },
    {
        id: "leaves",
        name: "Leaves",
        category: "patterns",
        subcategory: "organic",
        description: "Simple leaf shapes",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
  <path d='M24,4 Q32,12 32,24 Q32,36 24,44 Q16,36 16,24 Q16,12 24,4 Z' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <path d='M24,4 L24,44' stroke='{{primaryRgba}}' stroke-width='0.5'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["leaves", "nature", "organic", "botanical"],
    },
    {
        id: "cubes",
        name: "Isometric Cubes",
        category: "patterns",
        subcategory: "geometric",
        description: "3D isometric cube illusion",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'>
  <path d='M30,0 L60,15 L60,39 L30,52 L0,39 L0,15 Z' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <path d='M0,15 L30,28 L60,15' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
  <path d='M30,28 L30,52' stroke='{{primaryRgba}}' stroke-width='0.5' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["cubes", "3d", "isometric", "illusion"],
    },
];

export function getPatternById(id: string): BackgroundPattern | undefined {
    return patterns.find(p => p.id === id);
}

export function getPatternsByCategory(category: string): BackgroundPattern[] {
    return patterns.filter(p => p.category === category);
}

