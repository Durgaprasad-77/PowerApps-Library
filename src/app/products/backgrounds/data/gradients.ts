// Gradient SVG Templates
// Beautiful gradient backgrounds for Power Apps

import { BackgroundPattern } from "./patterns";

export const gradients: BackgroundPattern[] = [
  {
    id: "aurora-borealis",
    name: "Aurora Borealis",
    category: "gradients",
    subcategory: "animated",
    description: "Northern lights inspired gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='aurora' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='{{primaryColor}}'/>
      <stop offset='50%' stop-color='{{secondaryColor}}'/>
      <stop offset='100%' stop-color='#06B6D4'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#aurora)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["aurora", "gradient", "colorful", "modern"],
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    category: "gradients",
    subcategory: "warm",
    description: "Warm sunset gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='sunset' x1='0%' y1='0%' x2='0%' y2='100%'>
      <stop offset='0%' stop-color='#F97316'/>
      <stop offset='50%' stop-color='#EC4899'/>
      <stop offset='100%' stop-color='#8B5CF6'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#sunset)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["sunset", "warm", "orange", "gradient"],
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    category: "gradients",
    subcategory: "cool",
    description: "Deep ocean blue gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='ocean' x1='0%' y1='0%' x2='0%' y2='100%'>
      <stop offset='0%' stop-color='#0EA5E9'/>
      <stop offset='100%' stop-color='#1E3A8A'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#ocean)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["ocean", "blue", "cool", "gradient"],
  },
  {
    id: "purple-haze",
    name: "Purple Haze",
    category: "gradients",
    subcategory: "cool",
    description: "Dreamy purple gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='purple' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#7C3AED'/>
      <stop offset='100%' stop-color='#DB2777'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#purple)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["purple", "haze", "dreamy", "gradient"],
  },
  {
    id: "mint-fresh",
    name: "Mint Fresh",
    category: "gradients",
    subcategory: "cool",
    description: "Fresh mint green gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='mint' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#10B981'/>
      <stop offset='100%' stop-color='#06B6D4'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#mint)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["mint", "fresh", "green", "gradient"],
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    category: "gradients",
    subcategory: "warm",
    description: "Elegant rose gold gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='rose' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#F472B6'/>
      <stop offset='50%' stop-color='#FB923C'/>
      <stop offset='100%' stop-color='#FBBF24'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#rose)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["rose", "gold", "elegant", "gradient"],
  },
  {
    id: "night-sky",
    name: "Night Sky",
    category: "gradients",
    subcategory: "dark",
    description: "Dark night sky gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='night' x1='0%' y1='0%' x2='0%' y2='100%'>
      <stop offset='0%' stop-color='#0F172A'/>
      <stop offset='50%' stop-color='#1E1B4B'/>
      <stop offset='100%' stop-color='#312E81'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#night)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["night", "sky", "dark", "gradient"],
  },
  {
    id: "radial-glow",
    name: "Radial Glow",
    category: "gradients",
    subcategory: "glow",
    description: "Center radial glow effect",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <radialGradient id='glow' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='{{primaryColor}}'/>
      <stop offset='100%' stop-color='{{backgroundColor}}'/>
    </radialGradient>
  </defs>
  <rect width='400' height='400' fill='url(#glow)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["radial", "glow", "center", "gradient"],
  },
  {
    id: "mesh-gradient",
    name: "Mesh Gradient",
    category: "gradients",
    subcategory: "complex",
    description: "Multi-color mesh gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <radialGradient id='mesh1' cx='20%' cy='20%' r='50%'>
      <stop offset='0%' stop-color='{{primaryColor}}' stop-opacity='0.8'/>
      <stop offset='100%' stop-color='transparent'/>
    </radialGradient>
    <radialGradient id='mesh2' cx='80%' cy='80%' r='50%'>
      <stop offset='0%' stop-color='{{secondaryColor}}' stop-opacity='0.8'/>
      <stop offset='100%' stop-color='transparent'/>
    </radialGradient>
  </defs>
  <rect width='400' height='400' fill='{{backgroundColor}}'/>
  <rect width='400' height='400' fill='url(#mesh1)'/>
  <rect width='400' height='400' fill='url(#mesh2)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["mesh", "multi", "colorful", "gradient"],
  },
  {
    id: "neon-pulse",
    name: "Neon Pulse",
    category: "gradients",
    subcategory: "glow",
    description: "Vibrant neon gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='neon' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#F0ABFC'/>
      <stop offset='25%' stop-color='#C084FC'/>
      <stop offset='50%' stop-color='#818CF8'/>
      <stop offset='75%' stop-color='#38BDF8'/>
      <stop offset='100%' stop-color='#34D399'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#neon)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["neon", "vibrant", "colorful", "gradient"],
  },
  {
    id: "fire-ember",
    name: "Fire Ember",
    category: "gradients",
    subcategory: "warm",
    description: "Hot fire and ember gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='fire' x1='0%' y1='100%' x2='0%' y2='0%'>
      <stop offset='0%' stop-color='#7C2D12'/>
      <stop offset='30%' stop-color='#DC2626'/>
      <stop offset='60%' stop-color='#F97316'/>
      <stop offset='100%' stop-color='#FCD34D'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#fire)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["fire", "hot", "ember", "warm"],
  },
  {
    id: "forest-depth",
    name: "Forest Depth",
    category: "gradients",
    subcategory: "cool",
    description: "Deep forest green gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='forest' x1='0%' y1='0%' x2='0%' y2='100%'>
      <stop offset='0%' stop-color='#14532D'/>
      <stop offset='50%' stop-color='#166534'/>
      <stop offset='100%' stop-color='#22C55E'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#forest)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["forest", "green", "nature", "deep"],
  },
  {
    id: "candy-stripe",
    name: "Candy Stripe",
    category: "gradients",
    subcategory: "playful",
    description: "Playful candy-inspired gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='candy' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#F472B6'/>
      <stop offset='33%' stop-color='#A78BFA'/>
      <stop offset='66%' stop-color='#38BDF8'/>
      <stop offset='100%' stop-color='#34D399'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#candy)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["candy", "playful", "colorful", "fun"],
  },
  {
    id: "steel-gray",
    name: "Steel Gray",
    category: "gradients",
    subcategory: "neutral",
    description: "Professional steel gray gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='steel' x1='0%' y1='0%' x2='0%' y2='100%'>
      <stop offset='0%' stop-color='#374151'/>
      <stop offset='50%' stop-color='#6B7280'/>
      <stop offset='100%' stop-color='#9CA3AF'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#steel)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["steel", "gray", "professional", "neutral"],
  },
  {
    id: "peach-cream",
    name: "Peach Cream",
    category: "gradients",
    subcategory: "warm",
    description: "Soft peach and cream gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='peach' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#FDE68A'/>
      <stop offset='50%' stop-color='#FDBA74'/>
      <stop offset='100%' stop-color='#FB7185'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#peach)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["peach", "cream", "soft", "warm"],
  },
  {
    id: "arctic-ice",
    name: "Arctic Ice",
    category: "gradients",
    subcategory: "cool",
    description: "Cool arctic ice gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='arctic' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#E0F2FE'/>
      <stop offset='50%' stop-color='#7DD3FC'/>
      <stop offset='100%' stop-color='#0EA5E9'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#arctic)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["arctic", "ice", "cool", "blue"],
  },
  {
    id: "lavender-dream",
    name: "Lavender Dream",
    category: "gradients",
    subcategory: "cool",
    description: "Soothing lavender gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='lavender' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#E9D5FF'/>
      <stop offset='50%' stop-color='#C4B5FD'/>
      <stop offset='100%' stop-color='#8B5CF6'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#lavender)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["lavender", "purple", "soothing", "dream"],
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    category: "gradients",
    subcategory: "warm",
    description: "Warm golden hour photography gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='golden' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='#FEF3C7'/>
      <stop offset='50%' stop-color='#FBBF24'/>
      <stop offset='100%' stop-color='#D97706'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#golden)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["golden", "hour", "sunny", "warm"],
  },
  {
    id: "midnight-blue",
    name: "Midnight Blue",
    category: "gradients",
    subcategory: "dark",
    description: "Deep midnight blue gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='midnight' x1='0%' y1='0%' x2='0%' y2='100%'>
      <stop offset='0%' stop-color='#020617'/>
      <stop offset='50%' stop-color='#0F172A'/>
      <stop offset='100%' stop-color='#1E3A8A'/>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#midnight)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["midnight", "blue", "dark", "deep"],
  },
];

