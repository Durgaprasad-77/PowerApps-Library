
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const premiumBackgrounds = [
    // --- Mesh Gradients ---
    {
        id: "mesh-aurora",
        name: "Aurora Mesh",
        category: "gradients",
        subcategory: "mesh",
        description: "Soft, flowing aurora borealis inspired mesh gradient.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>
            <path fill='{{primaryRgba}}' d='M0 0h100v100H0z'/>
            <circle cx='0' cy='0' r='60' fill='rgba(255,255,255,0.4)' filter='url(#blur)' opacity='0.7'/>
            <circle cx='100' cy='0' r='50' fill='rgba(255,255,255,0.3)' filter='url(#blur)' opacity='0.6'/>
            <circle cx='100' cy='100' r='60' fill='rgba(0,0,0,0.2)' filter='url(#blur)' opacity='0.5'/>
            <circle cx='0' cy='100' r='50' fill='rgba(0,0,0,0.1)' filter='url(#blur)' opacity='0.4'/>
            <defs>
                <filter id='blur' x='-50%' y='-50%' width='200%' height='200%'>
                    <feGaussianBlur in='SourceGraphic' stdDeviation='20'/>
                </filter>
            </defs>
        </svg>`,
        image_position: "Fill",
        tags: ["mesh", "gradient", "aurora", "premium", "modern", "fluid"],
    },
    {
        id: "mesh-sunset",
        name: "Sunset Mesh",
        category: "gradients",
        subcategory: "mesh",
        description: "Warm sunset hues blended in a mesh gradient.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' preserveAspectRatio='none'>
            <defs>
                <filter id='blur-sunset' x='-50%' y='-50%' width='200%' height='200%'>
                    <feGaussianBlur in='SourceGraphic' stdDeviation='60'/>
                </filter>
            </defs>
            <rect width='100%' height='100%' fill='{{primaryRgba}}'/>
            <circle cx='100' cy='100' r='300' fill='rgba(255, 200, 0, 0.4)' filter='url(#blur-sunset)'/>
            <circle cx='700' cy='500' r='300' fill='rgba(255, 50, 50, 0.3)' filter='url(#blur-sunset)'/>
            <circle cx='400' cy='300' r='200' fill='rgba(255, 255, 255, 0.2)' filter='url(#blur-sunset)'/>
        </svg>`,
        image_position: "Fill",
        tags: ["mesh", "gradient", "sunset", "warm", "premium", "blur"],
    },

    // --- Noise & Texture ---
    {
        id: "noise-grain",
        name: "Subtle Grain",
        category: "textures",
        subcategory: "noise",
        description: "Fine grain noise texture for a tactile feel.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
            <filter id='noiseFilter'>
                <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/>
                <feColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0'/>
            </filter>
            <rect width='100%' height='100%' fill='{{primaryRgba}}'/>
            <rect width='100%' height='100%' filter='url(#noiseFilter)' opacity='0.15'/>
        </svg>`,
        image_position: "Fill",
        tags: ["noise", "grain", "texture", "premium", "retro", "film"],
    },
    {
        id: "paper-texture",
        name: "Paper Texture",
        category: "textures",
        subcategory: "organic",
        description: "Subtle watercolor paper texture.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
            <filter id='paper'>
                <feTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/>
                <feDiffuseLighting in='noise' lighting-color='white' surfaceScale='2'>
                    <feDistantLight azimuth='45' elevation='60'/>
                </feDiffuseLighting>
            </filter>
            <rect width='100%' height='100%' fill='{{primaryRgba}}'/>
            <rect width='100%' height='100%' filter='url(#paper)' opacity='0.4' style='mix-blend-mode: overlay'/>
        </svg>`,
        image_position: "Fill",
        tags: ["paper", "texture", "organic", "watercolor", "premium"],
    },

    // --- Geometric & Abstract ---
    {
        id: "neo-geo-shapes",
        name: "Neo Geometric",
        category: "patterns",
        subcategory: "geometric",
        description: "Bold geometric shapes in a scattered pattern.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
             <circle cx='20' cy='20' r='8' fill='none' stroke='{{primaryRgba}}' stroke-width='2'/>
             <rect x='60' y='10' width='15' height='15' fill='{{primaryRgba}}' opacity='0.5'/>
             <path d='M20 70 L40 70 L30 50 Z' stroke='{{primaryRgba}}' stroke-width='2' fill='none'/>
             <circle cx='80' cy='80' r='5' fill='{{primaryRgba}}'/>
             <rect x='10' y='80' width='10' height='10' stroke='{{primaryRgba}}' stroke-width='2' fill='none' transform='rotate(45 15 85)'/>
        </svg>`,
        image_position: "Tile",
        tags: ["geometric", "shapes", "modern", "bold", "premium", "memphis"],
    },
    {
        id: "hex-pulse",
        name: "Hex Pulse",
        category: "animated",
        subcategory: "geometric",
        description: "Hexagons that gently pulse in opacity.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
            <path d='M30 0l25 15v30l-25 15L5 45V15z' fill='none' stroke='{{primaryRgba}}' stroke-width='1'>
                <animate attributeName='opacity' values='0.3;1;0.3' dur='4s' repeatCount='indefinite'/>
            </path>
             <path d='M30 10l17 10v20l-17 10L13 40V20z' fill='{{primaryRgba}}' opacity='0.1'>
                 <animate attributeName='opacity' values='0.1;0.5;0.1' dur='4s' begin='2s' repeatCount='indefinite'/>
             </path>
        </svg>`,
        image_position: "Tile",
        tags: ["hexagon", "animated", "pulse", "tech", "premium", "cyber"],
    },
    {
        id: "flowing-waves",
        name: "Flowing Waves",
        category: "shapes",
        subcategory: "organic",
        description: "Smooth, overlapping wave layers.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'>
          <path fill='{{primaryRgba}}' fill-opacity='0.2' d='M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,224C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
          <path fill='{{primaryRgba}}' fill-opacity='0.4' d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
        </svg>`,
        image_position: "Fill",
        tags: ["waves", "organic", "flow", "layers", "premium", "smooth"],
    },
    {
        id: "dot-noise",
        name: "Dot Noise",
        category: "textures",
        subcategory: "noise",
        description: "Scattered dot noise resembling static.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
            <filter id='noise'>
                <feTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/>
                <feColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0'/>
            </filter>
            <rect width='100%' height='100%' fill='{{primaryRgba}}'/>
            <rect width='100%' height='100%' filter='url(#noise)' opacity='0.2'/>
        </svg>`,
        image_position: "Tile",
        tags: ["dot", "noise", "static", "texture", "premium", "modern"],
    },
    {
        id: "glass-shards",
        name: "Glass Shards",
        category: "shapes",
        subcategory: "geometric",
        description: "Overlapping sharp polygon shapes.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>
             <polygon points='0,0 40,0 20,40' fill='{{primaryRgba}}' opacity='0.2'/>
             <polygon points='100,0 60,0 80,40' fill='{{primaryRgba}}' opacity='0.15'/>
             <polygon points='0,100 0,60 40,80' fill='{{primaryRgba}}' opacity='0.1'/>
             <polygon points='100,100 60,100 80,60' fill='{{primaryRgba}}' opacity='0.2'/>
             <polygon points='30,30 70,30 50,70' fill='{{primaryRgba}}' opacity='0.05'/>
        </svg>`,
        image_position: "Fill",
        tags: ["glass", "shards", "geometric", "modern", "premium", "abstract"],
    },
    {
        id: "isometric-grid-3d",
        name: "Isometric 3D Grid",
        category: "patterns",
        subcategory: "geometric",
        description: "Detailed 3D isometric grid pattern.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='35' viewBox='0 0 60 35'>
             <path d='M0 17.5 L30 0 L60 17.5 L30 35 Z' fill='none' stroke='{{primaryRgba}}' stroke-width='0.5' opacity='0.5'/>
             <path d='M30 0 v35' stroke='{{primaryRgba}}' stroke-width='0.5' opacity='0.2'/>
             <path d='M0 17.5 h60' stroke='{{primaryRgba}}' stroke-width='0.5' opacity='0.2'/>
        </svg>`,
        image_position: "Tile",
        tags: ["isometric", "3d", "grid", "technical", "premium"],
    }
];

async function addPremiumBackgrounds() {
    console.log(`Adding ${premiumBackgrounds.length} premium backgrounds...`);

    const { error } = await supabase.from('backgrounds').upsert(premiumBackgrounds, { onConflict: 'id' });

    if (error) {
        console.error('Failed to add premium backgrounds:', error);
    } else {
        console.log('Premium backgrounds added successfully!');
    }
}

addPremiumBackgrounds();
