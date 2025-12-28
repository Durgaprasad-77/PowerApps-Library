
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

const newBackgrounds = [
    // --- Artistic & Texture ---
    {
        id: "terrazzo",
        name: "Terrazzo",
        category: "textures",
        subcategory: "stone",
        description: "Classic Italian terrazzo stone chip pattern.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
             <path d='M10 10l5 10l10 -5z' fill='{{primaryRgba}}' opacity='0.3'/>
             <path d='M40 40l10 -5l5 15z' fill='{{primaryRgba}}' opacity='0.4'/>
             <path d='M70 10l10 10l-10 10l-10 -5z' fill='{{primaryRgba}}' opacity='0.2'/>
             <circle cx='80' cy='80' r='5' fill='{{primaryRgba}}' opacity='0.3'/>
             <path d='M10 80l15 -5l5 15l-10 5z' fill='{{primaryRgba}}' opacity='0.5'/>
             <path d='M50 80l10 -10l10 5z' fill='{{primaryRgba}}' opacity='0.25'/>
        </svg>`,
        image_position: "Tile",
        tags: ["terrazzo", "stone", "chips", "artistic", "premium"],
    },
    {
        id: "carbon-fiber",
        name: "Carbon Fiber",
        category: "textures",
        subcategory: "material",
        description: "Interwoven carbon fiber technical texture.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
             <rect width='16' height='16' fill='#111'/>
             <path d='M0 0h8v8H0z' fill='{{primaryRgba}}' opacity='0.2'/>
             <path d='M8 8h8v8H8z' fill='{{primaryRgba}}' opacity='0.2'/>
             <path d='M0 0l8 8' stroke='{{primaryRgba}}' stroke-width='1' opacity='0.5'/>
             <path d='M8 8l8 8' stroke='{{primaryRgba}}' stroke-width='1' opacity='0.5'/>
             <path d='M8 0l8 8' stroke='{{primaryRgba}}' stroke-width='1' opacity='0.5'/>
             <path d='M0 8l8 16' stroke='{{primaryRgba}}' stroke-width='1' opacity='0.5'/>
        </svg>`,
        image_position: "Tile",
        tags: ["carbon", "fiber", "tech", "automotive", "dark"],
    },
    {
        id: "halftone-gradient",
        name: "Halftone Gradient",
        category: "gradients",
        subcategory: "pop-art",
        description: "Retro halftone dot gradient effect.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
             <defs>
                 <pattern id='dots' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'>
                     <circle cx='10' cy='10' r='2' fill='{{primaryRgba}}'/>
                 </pattern>
                 <mask id='fade-mask'>
                     <linearGradient id='grad' x1='0' y1='0' x2='1' y2='1'>
                         <stop offset='0' stop-color='white' stop-opacity='1'/>
                         <stop offset='1' stop-color='gray' stop-opacity='0'/>
                     </linearGradient>
                     <rect width='100%' height='100%' fill='url(#grad)'/>
                 </mask>
             </defs>
             <rect width='100%' height='100%' fill='{{primaryRgba}}' opacity='0.05'/>
             <rect width='100%' height='100%' fill='url(#dots)' mask='url(#fade-mask)'/>
        </svg>`,
        image_position: "Fill",
        tags: ["halftone", "dots", "retro", "pop-art", "gradient"],
    },

    // --- Geometric & Classic ---
    {
        id: "bauhaus-geometric",
        name: "Bauhaus Abstract",
        category: "patterns",
        subcategory: "artistic",
        description: "Modernist geometric shapes in Bauhaus style.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
             <rect x='10' y='10' width='40' height='40' fill='none' stroke='{{primaryRgba}}' stroke-width='2'/>
             <circle cx='70' cy='30' r='15' fill='{{primaryRgba}}' opacity='0.6'/>
             <path d='M60 60h30v30h-30z' fill='{{primaryRgba}}' opacity='0.4'/>
             <path d='M10 60q20 0 20 20t-20 20' fill='none' stroke='{{primaryRgba}}' stroke-width='2'/>
        </svg>`,
        image_position: "Tile",
        tags: ["bauhaus", "modernist", "art", "geometric", "clean"],
    },
    {
        id: "sunburst",
        name: "Sunburst",
        category: "patterns",
        subcategory: "radial",
        description: "Radial beams radiating from the center.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='none'>
             <g fill='{{primaryRgba}}' opacity='0.2'>
                 <path d='M100 100L200 0H200L100 100z'/>
                 <path d='M100 100L200 40H200L100 100z'/>
                 <path d='M100 100L200 80H200L100 100z'/>
                 <path d='M100 100L200 120H200L100 100z'/>
                 <path d='M100 100L200 160H200L100 100z'/>
                 <path d='M100 100L200 200H160L100 100z'/>
                 <path d='M100 100L120 200H80L100 100z'/>
                 <path d='M100 100L40 200H0L100 100z'/>
                 <path d='M100 100L0 160V200L100 100z'/>
                 <path d='M100 100L0 120V0L100 100z'/>
                 <path d='M100 100L0 80V40L100 100z'/>
                 <path d='M100 100L0 0H40L100 100z'/>
                 <path d='M100 100L40 0H80L100 100z'/>
                 <path d='M100 100L120 0H160L100 100z'/>
             </g>
        </svg>`,
        image_position: "Fill",
        tags: ["sunburst", "rays", "energy", "focus", "radial"],
    },
    {
        id: "houndstooth",
        name: "Houndstooth",
        category: "patterns",
        subcategory: "textile",
        description: "Classic textile houndstooth pattern.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
             <path d='M0 0h8v8h8v8h8v8h8v8h-8v-8h-8v-8h-8v-8h-8z' fill='{{primaryRgba}}' opacity='0.8'/>
             <path d='M8 0h8l8 8v8l-8 8v8l-8-8v-8l-8-8z' fill='{{primaryRgba}}'/>
        </svg>`,
        image_position: "Tile",
        tags: ["houndstooth", "textile", "fashion", "classic", "fabric"],
    },
    {
        id: "blueprint-grid",
        name: "Blueprint Grid",
        category: "patterns",
        subcategory: "technical",
        description: "Technical drawing grid with measurements.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
             <rect width='100' height='100' fill='#0055aa' opacity='0.1'/>
             <path d='M0 0h100v100h-100z' fill='none' stroke='{{primaryRgba}}' stroke-width='1'/>
             <path d='M10 0v100 M20 0v100 M30 0v100 M40 0v100 M50 0v100 M60 0v100 M70 0v100 M80 0v100 M90 0v100' stroke='{{primaryRgba}}' stroke-width='0.2'/>
             <path d='M0 10h100 M0 20h100 M0 30h100 M0 40h100 M0 50h100 M0 60h100 M0 70h100 M0 80h100 M0 90h100' stroke='{{primaryRgba}}' stroke-width='0.2'/>
             <path d='M50 0v100 M0 50h100' stroke='{{primaryRgba}}' stroke-width='0.5'/>
        </svg>`,
        image_position: "Tile",
        tags: ["blueprint", "grid", "technical", "architectural", "lines"],
    },

    // --- Modern Variants ---
    {
        id: "cyber-circuit",
        name: "Cyber Circuit",
        category: "patterns",
        subcategory: "tech",
        description: "Complex integrated circuit connections.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
             <path d='M10 10h10v10h-10z' fill='none' stroke='{{primaryRgba}}' stroke-width='1'/>
             <path d='M20 15h20' stroke='{{primaryRgba}}' stroke-width='1'/>
             <circle cx='42' cy='15' r='2' fill='{{primaryRgba}}'/>
             <path d='M42 17v10h10' stroke='{{primaryRgba}}' stroke-width='1'/>
             <rect x='52' y='25' width='5' height='5' fill='{{primaryRgba}}'/>
        </svg>`,
        image_position: "Tile",
        tags: ["cyber", "circuit", "tech", "electronics", "complex"],
    },
    {
        id: "memphis-scatter",
        name: "Memphis Scatter",
        category: "patterns",
        subcategory: "retro",
        description: "80s style scattered confetti and squiggles.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
             <path d='M10 10l10 5' stroke='{{primaryRgba}}' stroke-width='2'/>
             <circle cx='40' cy='20' r='3' fill='{{primaryRgba}}'/>
             <path d='M60 10q5 5 10 0' stroke='{{primaryRgba}}' stroke-width='2' fill='none'/>
             <rect x='20' y='50' width='5' height='5' transform='rotate(20)' fill='{{primaryRgba}}'/>
             <path d='M60 60l-10 10' stroke='{{primaryRgba}}' stroke-width='2'/>
        </svg>`,
        image_position: "Tile",
        tags: ["memphis", "80s", "retro", "playful", "scatter"],
    },
    {
        id: "speed-lines",
        name: "Speed Lines",
        category: "patterns",
        subcategory: "manga",
        description: "Anime-style converging motion lines.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
             <g stroke='{{primaryRgba}}' stroke-width='1' opacity='0.5'>
                 <line x1='10%' y1='0' x2='50%' y2='50%'/>
                 <line x1='90%' y1='0' x2='50%' y2='50%'/>
                 <line x1='0' y1='10%' x2='50%' y2='50%'/>
                 <line x1='100%' y1='90%' x2='50%' y2='50%'/>
                 <line x1='20%' y1='100%' x2='50%' y2='50%'/>
                 <line x1='0' y1='80%' x2='50%' y2='50%'/>
             </g>
        </svg>`,
        image_position: "Fill",
        tags: ["speed", "lines", "anime", "action", "dynamic"],
    },
    {
        id: "rain-streaks",
        name: "Digital Rain",
        category: "animated",
        subcategory: "weather",
        description: "Falling vertical digital streaks.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='80' viewBox='0 0 40 80'>
             <line x1='10' y1='0' x2='10' y2='15' stroke='{{primaryRgba}}' stroke-width='1.5' stroke-opacity='0.6'>
                <animate attributeName='y1' from='-15' to='80' dur='1.5s' repeatCount='indefinite'/>
                <animate attributeName='y2' from='0' to='95' dur='1.5s' repeatCount='indefinite'/>
             </line>
             <line x1='30' y1='-20' x2='30' y2='-5' stroke='{{primaryRgba}}' stroke-width='1' stroke-opacity='0.4'>
                <animate attributeName='y1' from='-20' to='80' dur='2s' repeatCount='indefinite'/>
                <animate attributeName='y2' from='-5' to='95' dur='2s' repeatCount='indefinite'/>
             </line>
        </svg>`,
        image_position: "Tile",
        tags: ["rain", "digital", "matrix", "falling", "weather", "animated"],
    },
    {
        id: "pulse-rings",
        name: "Pulse Rings",
        category: "animated",
        subcategory: "abstract",
        description: "Concentric rings expanding outward.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
             <circle cx='30' cy='30' r='1' stroke='{{primaryRgba}}' fill='none'>
                <animate attributeName='r' from='1' to='28' dur='3s' repeatCount='indefinite'/>
                <animate attributeName='opacity' from='1' to='0' dur='3s' repeatCount='indefinite'/>
             </circle>
             <circle cx='30' cy='30' r='1' stroke='{{primaryRgba}}' fill='none'>
                <animate attributeName='r' from='1' to='28' dur='3s' begin='1.5s' repeatCount='indefinite'/>
                <animate attributeName='opacity' from='1' to='0' dur='3s' begin='1.5s' repeatCount='indefinite'/>
             </circle>
        </svg>`,
        image_position: "Tile",
        tags: ["pulse", "rings", "sonar", "ripple", "animated"],
    },
    {
        id: "checker-perspective",
        name: "Checker Perspective",
        category: "patterns",
        subcategory: "illusion",
        description: "Checkerboard floor receding into distance.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
             <defs>
                 <pattern id='check' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'>
                     <rect width='10' height='10' fill='{{primaryRgba}}'/>
                     <rect x='10' y='10' width='10' height='10' fill='{{primaryRgba}}'/>
                 </pattern>
             </defs>
             <rect width='100%' height='100%' fill='url(#check)' transform='perspective(500px) rotateX(45deg)'/>
        </svg>`,
        image_position: "Fill",
        tags: ["checker", "floor", "perspective", "3d", "illusion"],
    },
    {
        id: "stripe-weave",
        name: "Stripe Weave",
        category: "patterns",
        subcategory: "textile",
        description: "Woven fabric stripe pattern.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
             <path d='M0 0h10v20H0z' fill='{{primaryRgba}}' opacity='0.3'/>
             <path d='M0 0v10h20v-10z' fill='{{primaryRgba}}' opacity='0.3'/>
             <rect x='5' y='5' width='10' height='10' fill='{{primaryRgba}}'/>
        </svg>`,
        image_position: "Tile",
        tags: ["weave", "fabric", "textile", "stripes", "interlaced"],
    },
    {
        id: "splatter-paint",
        name: "Splatter Paint",
        category: "shapes",
        subcategory: "artistic",
        description: "Random artistic paint splatters.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
             <path d='M20 20q-5 10 0 15t15-5q10 5 5 15t-15 0' fill='{{primaryRgba}}'/>
             <circle cx='50' cy='50' r='2' fill='{{primaryRgba}}'/>
             <circle cx='80' cy='30' r='5' fill='{{primaryRgba}}'/>
             <path d='M70 70q5 5 10-5t-5-10q-10-5-5-10' fill='{{primaryRgba}}' opacity='0.7'/>
        </svg>`,
        image_position: "Tile",
        tags: ["splatter", "paint", "art", "messy", "creative"],
    },
];

async function addMoreBackgrounds() {
    console.log(`Adding ${newBackgrounds.length} more backgrounds...`);

    const { error } = await supabase.from('backgrounds').upsert(newBackgrounds, { onConflict: 'id' });

    if (error) {
        console.error('Failed to add more backgrounds:', error);
    } else {
        console.log('More backgrounds added successfully!');
    }
}

addMoreBackgrounds();
