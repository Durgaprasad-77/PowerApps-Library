// Texture SVG Templates
// Subtle texture backgrounds for Power Apps

import { BackgroundPattern } from "./patterns";

export const textures: BackgroundPattern[] = [
    {
        id: "noise-grain-light",
        name: "Noise Grain Light",
        category: "textures",
        subcategory: "noise",
        description: "Light noise grain texture",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
  <filter id='noise'>
    <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='100' height='100' filter='url(#noise)' opacity='0.15'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["noise", "grain", "light", "subtle"],
    },
    {
        id: "noise-grain-dark",
        name: "Noise Grain Dark",
        category: "textures",
        subcategory: "noise",
        description: "Dark noise grain texture",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
  <filter id='noise'>
    <feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='100' height='100' filter='url(#noise)' opacity='0.25'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["noise", "grain", "dark", "texture"],
    },
    {
        id: "paper-texture",
        name: "Paper Texture",
        category: "textures",
        subcategory: "organic",
        description: "Subtle paper-like surface",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
  <filter id='paper'>
    <feTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/>
    <feDiffuseLighting lighting-color='#fff' surfaceScale='2'>
      <feDistantLight azimuth='45' elevation='60'/>
    </feDiffuseLighting>
  </filter>
  <rect width='80' height='80' filter='url(#paper)' opacity='0.1'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["paper", "subtle", "organic", "light"],
    },
    {
        id: "fabric-weave",
        name: "Fabric Weave",
        category: "textures",
        subcategory: "pattern",
        description: "Woven fabric pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
  <rect width='8' height='8' fill='{{primaryRgba}}'/>
  <rect x='8' y='8' width='8' height='8' fill='{{primaryRgba}}'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["fabric", "weave", "checkered", "pattern"],
    },
    {
        id: "concrete",
        name: "Concrete",
        category: "textures",
        subcategory: "industrial",
        description: "Industrial concrete texture",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
  <filter id='concrete'>
    <feTurbulence type='fractalNoise' baseFrequency='0.1' numOctaves='3'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='60' height='60' filter='url(#concrete)' opacity='0.08'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["concrete", "industrial", "rough", "gray"],
    },
    {
        id: "metal-brush",
        name: "Metal Brush",
        category: "textures",
        subcategory: "industrial",
        description: "Brushed metal effect",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='4' viewBox='0 0 40 4'>
  <line x1='0' y1='2' x2='40' y2='2' stroke='{{primaryRgba}}' stroke-width='0.5'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["metal", "brushed", "lines", "industrial"],
    },
    {
        id: "wood-grain",
        name: "Wood Grain",
        category: "textures",
        subcategory: "organic",
        description: "Natural wood grain lines",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='20' viewBox='0 0 100 20'>
  <path d='M0,10 Q25,5 50,10 T100,10' stroke='{{primaryRgba}}' stroke-width='0.3' fill='none'/>
  <path d='M0,15 Q25,12 50,15 T100,15' stroke='{{primaryRgba}}' stroke-width='0.2' fill='none'/>
  <path d='M0,5 Q25,2 50,5 T100,5' stroke='{{primaryRgba}}' stroke-width='0.25' fill='none'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["wood", "grain", "natural", "organic"],
    },
    {
        id: "leather",
        name: "Leather",
        category: "textures",
        subcategory: "organic",
        description: "Leather-like surface",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'>
  <filter id='leather'>
    <feTurbulence type='turbulence' baseFrequency='0.3' numOctaves='2'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='30' height='30' filter='url(#leather)' opacity='0.06'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["leather", "luxury", "organic", "subtle"],
    },
    {
        id: "carbon-fiber",
        name: "Carbon Fiber",
        category: "textures",
        subcategory: "tech",
        description: "Tech carbon fiber pattern",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'>
  <rect width='6' height='6' fill='{{primaryRgba}}'/>
  <rect x='6' y='6' width='6' height='6' fill='{{primaryRgba}}'/>
  <rect x='3' y='0' width='6' height='6' fill='transparent'/>
  <rect x='3' y='6' width='6' height='6' fill='transparent'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["carbon", "fiber", "tech", "modern"],
    },
    {
        id: "frosted-glass",
        name: "Frosted Glass",
        category: "textures",
        subcategory: "glass",
        description: "Frosted glass blur effect",
        svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'>
  <filter id='frost'>
    <feTurbulence type='fractalNoise' baseFrequency='0.15' numOctaves='2'/>
    <feGaussianBlur stdDeviation='0.5'/>
  </filter>
  <rect width='50' height='50' fill='{{primaryColor}}' fill-opacity='0.1' filter='url(#frost)'/>
</svg>`,
        imagePosition: "Tile",
        tags: ["frosted", "glass", "blur", "modern"],
    },
];
