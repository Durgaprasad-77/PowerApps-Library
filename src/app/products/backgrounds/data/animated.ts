// Animated/Premium SVG Templates
// Premium animated backgrounds for Power Apps

import { BackgroundPattern } from "./patterns";

export const animated: BackgroundPattern[] = [
  {
    id: "animated-gradient-flow",
    name: "Gradient Flow",
    category: "animated",
    subcategory: "premium",
    description: "Smoothly animated color gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='animatedGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='{{primaryColor}}'>
        <animate attributeName='stop-color' values='{{primaryColor}};{{secondaryColor}};#06B6D4;{{primaryColor}}' dur='4s' repeatCount='indefinite'/>
      </stop>
      <stop offset='100%' stop-color='{{secondaryColor}}'>
        <animate attributeName='stop-color' values='{{secondaryColor}};#06B6D4;{{primaryColor}};{{secondaryColor}}' dur='4s' repeatCount='indefinite'/>
      </stop>
    </linearGradient>
  </defs>
  <rect width='400' height='400' fill='url(#animatedGrad)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["animated", "gradient", "premium", "colorful"],
  },
  {
    id: "animated-pulse-rings",
    name: "Pulse Rings",
    category: "animated",
    subcategory: "premium",
    description: "Pulsating concentric rings",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>
  <circle cx='200' cy='200' r='50' fill='none' stroke='{{primaryColor}}' stroke-width='2' stroke-opacity='0.3'>
    <animate attributeName='r' values='50;150;50' dur='3s' repeatCount='indefinite'/>
    <animate attributeName='stroke-opacity' values='0.5;0;0.5' dur='3s' repeatCount='indefinite'/>
  </circle>
  <circle cx='200' cy='200' r='80' fill='none' stroke='{{primaryColor}}' stroke-width='2' stroke-opacity='0.3'>
    <animate attributeName='r' values='80;180;80' dur='3s' begin='0.5s' repeatCount='indefinite'/>
    <animate attributeName='stroke-opacity' values='0.5;0;0.5' dur='3s' begin='0.5s' repeatCount='indefinite'/>
  </circle>
  <circle cx='200' cy='200' r='110' fill='none' stroke='{{primaryColor}}' stroke-width='2' stroke-opacity='0.3'>
    <animate attributeName='r' values='110;200;110' dur='3s' begin='1s' repeatCount='indefinite'/>
    <animate attributeName='stroke-opacity' values='0.5;0;0.5' dur='3s' begin='1s' repeatCount='indefinite'/>
  </circle>
</svg>`,
    imagePosition: "Fill",
    tags: ["animated", "pulse", "rings", "premium"],
  },
  {
    id: "animated-floating-particles",
    name: "Floating Particles",
    category: "animated",
    subcategory: "premium",
    description: "Gently floating particle dots",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
  <circle cx='30' cy='30' r='3' fill='{{primaryColor}}' fill-opacity='0.4'>
    <animate attributeName='cy' values='30;170;30' dur='6s' repeatCount='indefinite'/>
    <animate attributeName='cx' values='30;50;30' dur='8s' repeatCount='indefinite'/>
  </circle>
  <circle cx='100' cy='80' r='2' fill='{{primaryColor}}' fill-opacity='0.3'>
    <animate attributeName='cy' values='80;20;80' dur='5s' repeatCount='indefinite'/>
    <animate attributeName='cx' values='100;120;100' dur='7s' repeatCount='indefinite'/>
  </circle>
  <circle cx='170' cy='150' r='4' fill='{{primaryColor}}' fill-opacity='0.5'>
    <animate attributeName='cy' values='150;50;150' dur='7s' repeatCount='indefinite'/>
    <animate attributeName='cx' values='170;140;170' dur='6s' repeatCount='indefinite'/>
  </circle>
  <circle cx='60' cy='120' r='2.5' fill='{{secondaryColor}}' fill-opacity='0.4'>
    <animate attributeName='cy' values='120;30;120' dur='8s' repeatCount='indefinite'/>
  </circle>
  <circle cx='150' cy='60' r='2' fill='{{secondaryColor}}' fill-opacity='0.3'>
    <animate attributeName='cy' values='60;180;60' dur='5.5s' repeatCount='indefinite'/>
  </circle>
</svg>`,
    imagePosition: "Tile",
    tags: ["animated", "particles", "floating", "premium"],
  },
  {
    id: "animated-wave-motion",
    name: "Wave Motion",
    category: "animated",
    subcategory: "premium",
    description: "Continuous flowing wave",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1440 320' preserveAspectRatio='none'>
  <path fill='{{primaryColor}}' fill-opacity='0.3'>
    <animate attributeName='d' dur='5s' repeatCount='indefinite' values='
      M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L0,320Z;
      M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,234.7C960,245,1056,203,1152,181.3C1248,160,1344,160,1392,160L1440,160L1440,320L0,320Z;
      M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L0,320Z
    '/>
  </path>
  <path fill='{{primaryColor}}' fill-opacity='0.5'>
    <animate attributeName='d' dur='4s' repeatCount='indefinite' values='
      M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,208C672,213,768,267,864,282.7C960,299,1056,277,1152,250.7C1248,224,1344,192,1392,176L1440,160L1440,320L0,320Z;
      M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,261.3C672,267,768,245,864,224C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L0,320Z;
      M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,208C672,213,768,267,864,282.7C960,299,1056,277,1152,250.7C1248,224,1344,192,1392,176L1440,160L1440,320L0,320Z
    '/>
  </path>
</svg>`,
    imagePosition: "Fill",
    tags: ["animated", "wave", "ocean", "premium"],
  },
  {
    id: "animated-breathing-glow",
    name: "Breathing Glow",
    category: "animated",
    subcategory: "premium",
    description: "Soft pulsating radial glow",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <radialGradient id='breatheGlow' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='{{primaryColor}}'>
        <animate attributeName='stop-opacity' values='0.3;0.6;0.3' dur='3s' repeatCount='indefinite'/>
      </stop>
      <stop offset='100%' stop-color='{{backgroundColor}}' stop-opacity='0'/>
    </radialGradient>
  </defs>
  <rect width='400' height='400' fill='url(#breatheGlow)'/>
</svg>`,
    imagePosition: "Fill",
    tags: ["animated", "glow", "breathing", "premium"],
  },
  {
    id: "animated-spinner",
    name: "Loading Spinner",
    category: "animated",
    subcategory: "premium",
    description: "Rotating loading spinner",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
  <circle cx='50' cy='50' r='35' stroke='{{primaryColor}}' stroke-width='6' fill='none' stroke-linecap='round' stroke-dasharray='55 165'>
    <animateTransform attributeName='transform' type='rotate' from='0 50 50' to='360 50 50' dur='1s' repeatCount='indefinite'/>
  </circle>
</svg>`,
    imagePosition: "Tile",
    tags: ["animated", "spinner", "loading", "premium"],
  },
  {
    id: "animated-rotating-gradient",
    name: "Rotating Gradient",
    category: "animated",
    subcategory: "premium",
    description: "Continuously rotating color gradient",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <linearGradient id='rotGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='{{primaryColor}}'/>
      <stop offset='50%' stop-color='{{secondaryColor}}'/>
      <stop offset='100%' stop-color='{{primaryColor}}'/>
    </linearGradient>
  </defs>
  <rect x='-50' y='-50' width='500' height='500' fill='url(#rotGrad)'>
    <animateTransform attributeName='transform' type='rotate' from='0 200 200' to='360 200 200' dur='8s' repeatCount='indefinite'/>
  </rect>
</svg>`,
    imagePosition: "Fill",
    tags: ["animated", "rotating", "gradient", "premium"],
  },
  {
    id: "animated-sparkle-dots",
    name: "Sparkle Dots",
    category: "animated",
    subcategory: "premium",
    description: "Twinkling sparkle effect",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
  <circle cx='20' cy='20' r='2' fill='{{primaryColor}}'>
    <animate attributeName='opacity' values='0.2;1;0.2' dur='2s' repeatCount='indefinite'/>
  </circle>
  <circle cx='60' cy='30' r='1.5' fill='{{primaryColor}}'>
    <animate attributeName='opacity' values='1;0.2;1' dur='2.5s' repeatCount='indefinite'/>
  </circle>
  <circle cx='40' cy='60' r='2' fill='{{secondaryColor}}'>
    <animate attributeName='opacity' values='0.5;1;0.5' dur='1.8s' repeatCount='indefinite'/>
  </circle>
  <circle cx='70' cy='70' r='1' fill='{{primaryColor}}'>
    <animate attributeName='opacity' values='0.3;0.9;0.3' dur='2.2s' repeatCount='indefinite'/>
  </circle>
</svg>`,
    imagePosition: "Tile",
    tags: ["animated", "sparkle", "twinkle", "premium"],
  },
  {
    id: "animated-liquid-blob",
    name: "Liquid Blob",
    category: "animated",
    subcategory: "premium",
    description: "Morphing liquid blob shape",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 400 400'>
  <defs>
    <radialGradient id='blobGrad' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='{{primaryColor}}'/>
      <stop offset='100%' stop-color='{{secondaryColor}}'/>
    </radialGradient>
  </defs>
  <path fill='url(#blobGrad)' fill-opacity='0.6'>
    <animate attributeName='d' dur='6s' repeatCount='indefinite' values='
      M200,100 C280,100 350,170 350,250 C350,330 280,400 200,400 C120,400 50,330 50,250 C50,170 120,100 200,100 Z;
      M200,80 C300,80 380,150 380,230 C380,310 300,380 200,380 C100,380 20,310 20,230 C20,150 100,80 200,80 Z;
      M200,100 C280,100 350,170 350,250 C350,330 280,400 200,400 C120,400 50,330 50,250 C50,170 120,100 200,100 Z
    '/>
  </path>
</svg>`,
    imagePosition: "Fill",
    tags: ["animated", "liquid", "blob", "premium"],
  },
  {
    id: "animated-heartbeat",
    name: "Heartbeat Line",
    category: "animated",
    subcategory: "premium",
    description: "Medical heartbeat line animation",
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='60' viewBox='0 0 200 60'>
  <polyline points='0,30 40,30 50,10 60,50 70,30 80,30 100,30 110,15 115,45 120,25 125,35 130,30 200,30' stroke='{{primaryColor}}' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'>
    <animate attributeName='stroke-dasharray' values='0,500;500,0' dur='2s' repeatCount='indefinite'/>
  </polyline>
</svg>`,
    imagePosition: "Tile",
    tags: ["animated", "heartbeat", "medical", "premium"],
  },
];

