
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

const skeletonBackgrounds = [
    // --- UI Skeleton Loaders ---
    {
        id: "skeleton-shimmer",
        name: "Skeleton Shimmer",
        category: "animated",
        subcategory: "loading",
        description: "Classic diagonal simmer effect for loading states.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
            <defs>
                <linearGradient id='shimmer' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stop-color='{{primaryRgba}}' stop-opacity='0.1'/>
                    <stop offset='50%' stop-color='{{primaryRgba}}' stop-opacity='0.3'/>
                    <stop offset='100%' stop-color='{{primaryRgba}}' stop-opacity='0.1'/>
                    <animate attributeName='x1' from='-100%' to='100%' dur='1.5s' repeatCount='indefinite'/>
                    <animate attributeName='x2' from='0%' to='200%' dur='1.5s' repeatCount='indefinite'/>
                </linearGradient>
            </defs>
            <rect width='100%' height='100%' fill='url(#shimmer)'/>
        </svg>`,
        image_position: "Fill",
        tags: ["skeleton", "shimmer", "loading", "animated", "ui"],
    },
    {
        id: "skeleton-pulse-bg",
        name: "Skeleton Pulse",
        category: "animated",
        subcategory: "loading",
        description: "Gentle full-background opacity pulse.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
            <rect width='100%' height='100%' fill='{{primaryRgba}}' opacity='0.2'>
                <animate attributeName='opacity' values='0.1;0.3;0.1' dur='2s' repeatCount='indefinite'/>
            </rect>
        </svg>`,
        image_position: "Fill",
        tags: ["skeleton", "pulse", "loading", "animated", "ui"],
    },
    {
        id: "skeleton-list-view",
        name: "Skeleton List",
        category: "animated",
        subcategory: "loading",
        description: "Animated placeholder rows for list views.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100'>
            <defs>
                <linearGradient id='listGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stop-color='{{primaryRgba}}' stop-opacity='0.1'/>
                    <stop offset='50%' stop-color='{{primaryRgba}}' stop-opacity='0.2'/>
                    <stop offset='100%' stop-color='{{primaryRgba}}' stop-opacity='0.1'/>
                    <animate attributeName='x1' from='-100%' to='100%' dur='1.5s' repeatCount='indefinite'/>
                    <animate attributeName='x2' from='0%' to='200%' dur='1.5s' repeatCount='indefinite'/>
                </linearGradient>
            </defs>
            <rect x='10' y='10' width='60' height='10' rx='4' fill='url(#listGrad)'/>
            <rect x='10' y='30' width='90%' height='8' rx='4' fill='url(#listGrad)'/>
            <rect x='10' y='50' width='80%' height='8' rx='4' fill='url(#listGrad)'/>
            <rect x='10' y='70' width='85%' height='8' rx='4' fill='url(#listGrad)'/>
        </svg>`,
        image_position: "Tile", // Intentionally tile to create long lists
        tags: ["skeleton", "list", "loading", "rows", "ui"],
    },
    {
        id: "skeleton-grid-cards",
        name: "Skeleton Grid",
        category: "animated",
        subcategory: "loading",
        description: "Animated placeholder grid for card views.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
            <defs>
                <linearGradient id='cardGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
                     <stop offset='0%' stop-color='{{primaryRgba}}' stop-opacity='0.05'/>
                     <stop offset='50%' stop-color='{{primaryRgba}}' stop-opacity='0.15'/>
                     <stop offset='100%' stop-color='{{primaryRgba}}' stop-opacity='0.05'/>
                     <animate attributeName='x1' from='-100%' to='100%' dur='2s' repeatCount='indefinite'/>
                     <animate attributeName='y1' from='-100%' to='100%' dur='2s' repeatCount='indefinite'/>
                </linearGradient>
            </defs>
            <rect x='10' y='10' width='180' height='100' rx='8' fill='{{primaryRgba}}' opacity='0.05'/>
            <rect x='20' y='125' width='100' height='15' rx='4' fill='url(#cardGrad)'/>
            <rect x='20' y='150' width='140' height='10' rx='4' fill='url(#cardGrad)'/>
            <rect x='20' y='170' width='80' height='10' rx='4' fill='url(#cardGrad)'/>
        </svg>`,
        image_position: "Tile",
        tags: ["skeleton", "grid", "card", "loading", "ui"],
    },

    // --- Structural/Wireframe ---
    {
        id: "wireframe-network",
        name: "Wireframe Network",
        category: "textures",
        subcategory: "technical",
        description: "Connected nodes and lines representing a network.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
            <circle cx='20' cy='20' r='3' fill='{{primaryRgba}}' opacity='0.5'/>
            <circle cx='80' cy='80' r='3' fill='{{primaryRgba}}' opacity='0.5'/>
            <circle cx='80' cy='20' r='3' fill='{{primaryRgba}}' opacity='0.5'/>
            <circle cx='20' cy='80' r='3' fill='{{primaryRgba}}' opacity='0.5'/>
            <circle cx='50' cy='50' r='5' fill='{{primaryRgba}}' opacity='0.7'/>
            
            <line x1='20' y1='20' x2='50' y2='50' stroke='{{primaryRgba}}' stroke-width='1' opacity='0.2'/>
            <line x1='80' y1='20' x2='50' y2='50' stroke='{{primaryRgba}}' stroke-width='1' opacity='0.2'/>
            <line x1='20' y1='80' x2='50' y2='50' stroke='{{primaryRgba}}' stroke-width='1' opacity='0.2'/>
            <line x1='80' y1='80' x2='50' y2='50' stroke='{{primaryRgba}}' stroke-width='1' opacity='0.2'/>
        </svg>`,
        image_position: "Tile",
        tags: ["wireframe", "network", "nodes", "tech", "structure"],
    },
    {
        id: "blue-print-lines",
        name: "Drafting Lines",
        category: "patterns",
        subcategory: "technical",
        description: "Angled drafting lines and construction marks.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
            <path d='M0 100 L100 0' stroke='{{primaryRgba}}' stroke-dasharray='5,5' stroke-width='1' opacity='0.3'/>
            <path d='M0 0 L100 100' stroke='{{primaryRgba}}' stroke-width='0.5' opacity='0.3'/>
            <circle cx='50' cy='50' r='30' fill='none' stroke='{{primaryRgba}}' stroke-width='0.5' opacity='0.2'/>
            <rect x='45' y='45' width='10' height='10' fill='none' stroke='{{primaryRgba}}' stroke-width='1' opacity='0.4'/>
        </svg>`,
        image_position: "Tile",
        tags: ["blueprint", "drafting", "lines", "architectural", "plan"],
    },

    // --- Literal Skeleton (Just in case) ---
    {
        id: "spooky-skulls",
        name: "Skulls Pattern",
        category: "patterns",
        subcategory: "artistic",
        description: "Minimalist skull pattern.",
        svg_template: `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
            <g transform='translate(15, 15) scale(0.6)' fill='{{primaryRgba}}' opacity='0.5'>
                <path d='M25 5 C 10 5, 5 20, 5 25 C 5 35, 10 40, 15 42 L 15 48 L 35 48 L 35 42 C 40 40, 45 35, 45 25 C 45 20, 40 5, 25 5 Z M 15 25 C 15 22, 18 22, 18 25 C 18 28, 15 28, 15 25 Z M 35 25 C 35 22, 32 22, 32 25 C 32 28, 35 28, 35 25 Z M 25 35 L 20 40 L 30 40 L 25 35 Z'/>
            </g>
        </svg>`,
        image_position: "Tile",
        tags: ["skull", "spooky", "fun", "halloween", "skeleton"],
    }
];

async function addSkeletonBackgrounds() {
    console.log(`Adding ${skeletonBackgrounds.length} skeleton backgrounds...`);

    const { error } = await supabase.from('backgrounds').upsert(skeletonBackgrounds, { onConflict: 'id' });

    if (error) {
        console.error('Failed to add skeleton backgrounds:', error);
    } else {
        console.log('Skeleton backgrounds added successfully!');
    }
}

addSkeletonBackgrounds();
