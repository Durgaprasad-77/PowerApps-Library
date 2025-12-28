// Shape SVG Templates
// Dynamic shape backgrounds for Power Apps

import { BackgroundPattern } from "./patterns";

export const shapes: BackgroundPattern[] = [
    {
        id: "layered-waves",
        name: "Layered Waves",
        category: "shapes",
        subcategory: "waves",
        description: "Smooth layered wave design",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
  <path fill='{{primaryColor}}' fill-opacity='0.3' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'/>
  <path fill='{{primaryColor}}' fill-opacity='0.5' d='M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,208C672,213,768,267,864,282.7C960,299,1056,277,1152,250.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'/>
  <path fill='{{primaryColor}}' d='M0,288L48,293.3C96,299,192,309,288,298.7C384,288,480,256,576,250.7C672,245,768,267,864,277.3C960,288,1056,288,1152,272C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'/>
</svg>`,
        imagePosition: "Fill",
        tags: ["waves", "layered", "smooth", "bottom"],
    },
    {
        id: "stacked-peaks",
        name: "Stacked Peaks",
        category: "shapes",
        subcategory: "mountains",
        description: "Mountain peak silhouettes",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
  <path fill='{{primaryColor}}' fill-opacity='0.4' d='M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,224C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'/>
  <path fill='{{primaryColor}}' fill-opacity='0.7' d='M0,288L80,272C160,256,320,224,480,224C640,224,800,256,960,261.3C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'/>
  <path fill='{{primaryColor}}' d='M0,320L80,304C160,288,320,256,480,261.3C640,267,800,309,960,309.3C1120,309,1280,267,1360,245.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'/>
</svg>`,
        imagePosition: "Fill",
        tags: ["peaks", "mountains", "layered", "bottom"],
    },
    {
        id: "blob-cluster",
        name: "Blob Cluster",
        category: "shapes",
        subcategory: "organic",
        description: "Organic blob shapes",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
  <circle cx='100' cy='100' r='80' fill='{{primaryColor}}' fill-opacity='0.3'/>
  <circle cx='300' cy='150' r='60' fill='{{secondaryColor}}' fill-opacity='0.3'/>
  <circle cx='200' cy='300' r='90' fill='{{primaryColor}}' fill-opacity='0.2'/>
  <circle cx='350' cy='350' r='50' fill='{{secondaryColor}}' fill-opacity='0.4'/>
</svg>`,
        imagePosition: "Fill",
        tags: ["blob", "organic", "circles", "soft"],
    },
    {
        id: "abstract-circles",
        name: "Abstract Circles",
        category: "shapes",
        subcategory: "geometric",
        description: "Overlapping abstract circles",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
  <circle cx='200' cy='200' r='150' fill='none' stroke='{{primaryColor}}' stroke-width='2' stroke-opacity='0.3'/>
  <circle cx='200' cy='200' r='120' fill='none' stroke='{{primaryColor}}' stroke-width='2' stroke-opacity='0.4'/>
  <circle cx='200' cy='200' r='90' fill='none' stroke='{{primaryColor}}' stroke-width='2' stroke-opacity='0.5'/>
  <circle cx='200' cy='200' r='60' fill='none' stroke='{{primaryColor}}' stroke-width='2' stroke-opacity='0.6'/>
  <circle cx='200' cy='200' r='30' fill='{{primaryColor}}' fill-opacity='0.3'/>
</svg>`,
        imagePosition: "Fill",
        tags: ["circles", "concentric", "abstract", "modern"],
    },
    {
        id: "floating-bubbles",
        name: "Floating Bubbles",
        category: "shapes",
        subcategory: "organic",
        description: "Scattered bubble effect",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
  <circle cx='40' cy='40' r='15' fill='{{primaryColor}}' fill-opacity='0.2'/>
  <circle cx='150' cy='60' r='25' fill='{{primaryColor}}' fill-opacity='0.15'/>
  <circle cx='80' cy='120' r='20' fill='{{primaryColor}}' fill-opacity='0.25'/>
  <circle cx='170' cy='150' r='12' fill='{{primaryColor}}' fill-opacity='0.3'/>
  <circle cx='30' cy='170' r='18' fill='{{primaryColor}}' fill-opacity='0.18'/>
  <circle cx='120' cy='180' r='10' fill='{{primaryColor}}' fill-opacity='0.22'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["bubbles", "floating", "scatter", "soft"],
    },
    {
        id: "mountain-range",
        name: "Mountain Range",
        category: "shapes",
        subcategory: "mountains",
        description: "Simple mountain silhouette",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
  <polygon fill='{{primaryColor}}' fill-opacity='0.5' points='0,320 200,150 400,250 600,100 800,200 1000,80 1200,180 1440,50 1440,320'/>
  <polygon fill='{{primaryColor}}' points='0,320 150,220 350,280 550,180 750,260 950,140 1150,220 1350,160 1440,200 1440,320'/>
</svg>`,
        imagePosition: "Fill",
        tags: ["mountain", "silhouette", "landscape", "bottom"],
    },
    {
        id: "step-gradient",
        name: "Step Gradient",
        category: "shapes",
        subcategory: "geometric",
        description: "Stepped color blocks",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
  <rect x='0' y='0' width='400' height='80' fill='{{primaryColor}}' fill-opacity='0.1'/>
  <rect x='0' y='80' width='400' height='80' fill='{{primaryColor}}' fill-opacity='0.2'/>
  <rect x='0' y='160' width='400' height='80' fill='{{primaryColor}}' fill-opacity='0.3'/>
  <rect x='0' y='240' width='400' height='80' fill='{{primaryColor}}' fill-opacity='0.4'/>
  <rect x='0' y='320' width='400' height='80' fill='{{primaryColor}}' fill-opacity='0.5'/>
</svg>`,
        imagePosition: "Fill",
        tags: ["steps", "blocks", "gradient", "geometric"],
    },
    {
        id: "curved-layers",
        name: "Curved Layers",
        category: "shapes",
        subcategory: "waves",
        description: "Gentle curved layer sections",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
  <path fill='{{primaryColor}}' fill-opacity='0.2' d='M0,96L60,106.7C120,117,240,139,360,138.7C480,139,600,117,720,128C840,139,960,181,1080,181.3C1200,181,1320,139,1380,117.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'/>
</svg>`,
        imagePosition: "Fill",
        tags: ["curves", "layers", "top", "gentle"],
    },
    {
        id: "asymmetric-blobs",
        name: "Asymmetric Blobs",
        category: "shapes",
        subcategory: "organic",
        description: "Random organic shapes",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
  <ellipse cx='80' cy='100' rx='60' ry='40' fill='{{primaryColor}}' fill-opacity='0.25' transform='rotate(-15 80 100)'/>
  <ellipse cx='320' cy='80' rx='50' ry='70' fill='{{secondaryColor}}' fill-opacity='0.2' transform='rotate(20 320 80)'/>
  <ellipse cx='150' cy='300' rx='80' ry='50' fill='{{primaryColor}}' fill-opacity='0.3' transform='rotate(10 150 300)'/>
  <ellipse cx='340' cy='280' rx='45' ry='65' fill='{{secondaryColor}}' fill-opacity='0.25' transform='rotate(-25 340 280)'/>
</svg>`,
        imagePosition: "Fill",
        tags: ["asymmetric", "blobs", "organic", "random"],
    },
    {
        id: "corner-splash",
        name: "Corner Splash",
        category: "shapes",
        subcategory: "accent",
        description: "Corner accent decoration",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
  <path fill='{{primaryColor}}' fill-opacity='0.3' d='M0,0 Q150,50 100,150 Q50,250 0,400 L0,0 Z'/>
  <path fill='{{primaryColor}}' fill-opacity='0.5' d='M0,0 Q100,30 70,100 Q30,170 0,250 L0,0 Z'/>
</svg>`,
        imagePosition: "Fill",
        tags: ["corner", "splash", "accent", "decoration"],
    },
];
