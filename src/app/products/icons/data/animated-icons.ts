// Animated Icons Data
// These icons use CSS keyframes animations that work in Power Apps Image control

export interface AnimatedIcon {
  id: string;
  name: string;
  description: string;
  category: 'morphing' | 'loaders' | 'feedback' | 'toggles';
  svgTemplate: string;
  toggleVariable: string;
  timestampVariable: string;
  tags: string[];
}

// Helper to create consistent class naming
const createClassNames = (base: string, timestamp: string) => ({
  class1: `${base}1${timestamp}`,
  class2: `${base}2${timestamp}`,
  class3: `${base}3${timestamp}`,
});

export const ANIMATED_ICONS: AnimatedIcon[] = [
  // 1. Hamburger → X (Morphing)
  {
    id: 'hamburger-to-x',
    name: 'Hamburger Menu',
    description: 'Hamburger icon that morphs into an X when toggled',
    category: 'morphing',
    toggleVariable: 'gblMenuOpen',
    timestampVariable: 'gblMenuTimestamp',
    tags: ['menu', 'hamburger', 'navigation', 'close'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .line1{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      transform-origin: center;
      animation: line1Anim{{timestamp}} 400ms ease-out both;
    }
    .line2{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      animation: line2Anim{{timestamp}} 400ms ease-out both;
    }
    .line3{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      transform-origin: center;
      animation: line3Anim{{timestamp}} 400ms ease-out both;
    }
    @keyframes line1Anim{{timestamp}} {
      {{fromState}} { transform: rotate(0deg); d: path('M5 7H19'); }
      {{toState}} { transform: rotate(45deg); d: path('M5 12L19 12'); }
    }
    @keyframes line2Anim{{timestamp}} {
      {{fromState}} { opacity: 1; }
      {{toState}} { opacity: 0; }
    }
    @keyframes line3Anim{{timestamp}} {
      {{fromState}} { transform: rotate(0deg); d: path('M5 17H19'); }
      {{toState}} { transform: rotate(-45deg); d: path('M5 12L19 12'); }
    }
  </style>
  <path class='line1{{timestamp}}' d='M5 7H19' fill='none'/>
  <path class='line2{{timestamp}}' d='M5 12H19' fill='none'/>
  <path class='line3{{timestamp}}' d='M5 17H19' fill='none'/>
</svg>`,
  },

  // 2. Plus → X (Morphing)
  {
    id: 'plus-to-x',
    name: 'Plus to Close',
    description: 'Plus icon that rotates into an X',
    category: 'morphing',
    toggleVariable: 'gblPlusOpen',
    timestampVariable: 'gblPlusTimestamp',
    tags: ['plus', 'add', 'close', 'fab'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .plus{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      transform-origin: center;
      animation: plusRotate{{timestamp}} 300ms ease-out both;
    }
    @keyframes plusRotate{{timestamp}} {
      {{fromState}} { transform: rotate(0deg); }
      {{toState}} { transform: rotate(45deg); }
    }
  </style>
  <g class='plus{{timestamp}}'>
    <line x1='12' y1='5' x2='12' y2='19' fill='none'/>
    <line x1='5' y1='12' x2='19' y2='12' fill='none'/>
  </g>
</svg>`,
  },

  // 3. Arrow Up/Down Toggle (Morphing)
  {
    id: 'arrow-toggle',
    name: 'Arrow Toggle',
    description: 'Arrow that flips up and down',
    category: 'morphing',
    toggleVariable: 'gblArrowUp',
    timestampVariable: 'gblArrowTimestamp',
    tags: ['arrow', 'chevron', 'accordion', 'collapse'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .arrow{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      transform-origin: center;
      animation: arrowFlip{{timestamp}} 300ms ease-out both;
    }
    @keyframes arrowFlip{{timestamp}} {
      {{fromState}} { transform: rotate(0deg); }
      {{toState}} { transform: rotate(180deg); }
    }
  </style>
  <polyline class='arrow{{timestamp}}' points='6 9 12 15 18 9'/>
</svg>`,
  },

  // 4. Chevron Rotate (Toggles)
  {
    id: 'chevron-rotate',
    name: 'Chevron Rotate',
    description: 'Chevron that rotates 90 degrees',
    category: 'toggles',
    toggleVariable: 'gblChevronOpen',
    timestampVariable: 'gblChevronTimestamp',
    tags: ['chevron', 'dropdown', 'expand', 'menu'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .chevron{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      transform-origin: center;
      animation: chevronRotate{{timestamp}} 250ms ease-out both;
    }
    @keyframes chevronRotate{{timestamp}} {
      {{fromState}} { transform: rotate(0deg); }
      {{toState}} { transform: rotate(90deg); }
    }
  </style>
  <polyline class='chevron{{timestamp}}' points='9 6 15 12 9 18'/>
</svg>`,
  },

  // 5. Loading Spinner (Loaders)
  {
    id: 'loading-spinner',
    name: 'Loading Spinner',
    description: 'Circular spinning loader animation',
    category: 'loaders',
    toggleVariable: 'gblLoading',
    timestampVariable: 'gblSpinnerTimestamp',
    tags: ['loading', 'spinner', 'progress', 'wait'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .spinner{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      fill: none;
      transform-origin: center;
      animation: spin{{timestamp}} 1s linear infinite;
    }
    .track{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      fill: none;
      opacity: 0.2;
    }
    @keyframes spin{{timestamp}} {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  <circle class='track{{timestamp}}' cx='12' cy='12' r='9'/>
  <circle class='spinner{{timestamp}}' cx='12' cy='12' r='9' stroke-dasharray='28 56'/>
</svg>`,
  },

  // 6. Pulsing Dot (Loaders)
  {
    id: 'pulsing-dot',
    name: 'Pulsing Dot',
    description: 'Pulsing notification indicator',
    category: 'loaders',
    toggleVariable: 'gblNotification',
    timestampVariable: 'gblPulseTimestamp',
    tags: ['pulse', 'notification', 'alert', 'dot'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .dot{{timestamp}} {
      fill: {{color}};
    }
    .pulse{{timestamp}} {
      fill: {{color}};
      transform-origin: center;
      animation: pulse{{timestamp}} 1.5s ease-out infinite;
    }
    @keyframes pulse{{timestamp}} {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(2.5); opacity: 0; }
    }
  </style>
  <circle class='pulse{{timestamp}}' cx='12' cy='12' r='4'/>
  <circle class='dot{{timestamp}}' cx='12' cy='12' r='4'/>
</svg>`,
  },

  // 7. Checkmark Success (Feedback)
  {
    id: 'checkmark-success',
    name: 'Success Check',
    description: 'Animated checkmark for success states',
    category: 'feedback',
    toggleVariable: 'gblSuccess',
    timestampVariable: 'gblCheckTimestamp',
    tags: ['check', 'success', 'done', 'complete'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .circle{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      fill: none;
      stroke-dasharray: 60;
      stroke-dashoffset: 60;
      animation: drawCircle{{timestamp}} 400ms ease-out forwards;
    }
    .check{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      stroke-dasharray: 20;
      stroke-dashoffset: 20;
      animation: drawCheck{{timestamp}} 300ms ease-out 400ms forwards;
    }
    @keyframes drawCircle{{timestamp}} {
      to { stroke-dashoffset: 0; }
    }
    @keyframes drawCheck{{timestamp}} {
      to { stroke-dashoffset: 0; }
    }
  </style>
  <circle class='circle{{timestamp}}' cx='12' cy='12' r='9'/>
  <polyline class='check{{timestamp}}' points='8 12 11 15 16 9'/>
</svg>`,
  },

  // 8. Heart Pulse (Feedback)
  {
    id: 'heart-pulse',
    name: 'Heart Pulse',
    description: 'Pulsing heart for favorite/like actions',
    category: 'feedback',
    toggleVariable: 'gblLiked',
    timestampVariable: 'gblHeartTimestamp',
    tags: ['heart', 'like', 'favorite', 'love'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .heart{{timestamp}} {
      fill: {{color}};
      transform-origin: center;
      animation: heartBeat{{timestamp}} 400ms ease-out;
    }
    @keyframes heartBeat{{timestamp}} {
      0% { transform: scale(1); }
      25% { transform: scale(1.3); }
      50% { transform: scale(0.9); }
      75% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  </style>
  <path class='heart{{timestamp}}' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/>
</svg>`,
  },

  // 9. Bell Notification (Feedback)
  {
    id: 'bell-notification',
    name: 'Bell Shake',
    description: 'Shaking notification bell',
    category: 'feedback',
    toggleVariable: 'gblNotify',
    timestampVariable: 'gblBellTimestamp',
    tags: ['bell', 'notification', 'alert', 'ring'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .bell{{timestamp}} {
      fill: {{color}};
      transform-origin: top center;
      animation: bellShake{{timestamp}} 500ms ease-out;
    }
    @keyframes bellShake{{timestamp}} {
      0% { transform: rotate(0deg); }
      15% { transform: rotate(15deg); }
      30% { transform: rotate(-15deg); }
      45% { transform: rotate(10deg); }
      60% { transform: rotate(-10deg); }
      75% { transform: rotate(5deg); }
      100% { transform: rotate(0deg); }
    }
  </style>
  <path class='bell{{timestamp}}' d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'/>
</svg>`,
  },

  // 10. Refresh Spin (Loaders)
  {
    id: 'refresh-spin',
    name: 'Refresh',
    description: 'Spinning refresh icon',
    category: 'loaders',
    toggleVariable: 'gblRefreshing',
    timestampVariable: 'gblRefreshTimestamp',
    tags: ['refresh', 'reload', 'sync', 'update'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .refresh{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      fill: none;
      transform-origin: center;
      animation: refreshSpin{{timestamp}} 1s linear infinite;
    }
    @keyframes refreshSpin{{timestamp}} {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  <path class='refresh{{timestamp}}' d='M1 4v6h6M23 20v-6h-6'/>
  <path class='refresh{{timestamp}}' d='M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15'/>
</svg>`,
  },

  // 11. Search Pulse (Loaders)
  {
    id: 'search-pulse',
    name: 'Search Pulse',
    description: 'Pulsing search indicator',
    category: 'loaders',
    toggleVariable: 'gblSearching',
    timestampVariable: 'gblSearchTimestamp',
    tags: ['search', 'find', 'lookup', 'pulse'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .searchIcon{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
    }
    .searchPulse{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      fill: none;
      transform-origin: 11px 11px;
      animation: searchPulse{{timestamp}} 1.2s ease-out infinite;
    }
    @keyframes searchPulse{{timestamp}} {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(1.8); opacity: 0; }
    }
  </style>
  <circle class='searchPulse{{timestamp}}' cx='11' cy='11' r='7'/>
  <circle class='searchIcon{{timestamp}}' cx='11' cy='11' r='7'/>
  <line class='searchIcon{{timestamp}}' x1='21' y1='21' x2='16.5' y2='16.5'/>
</svg>`,
  },

  // 12. X Circle Error (Feedback)
  {
    id: 'x-circle-error',
    name: 'Error X',
    description: 'Animated error/failure indicator',
    category: 'feedback',
    toggleVariable: 'gblError',
    timestampVariable: 'gblErrorTimestamp',
    tags: ['error', 'fail', 'cancel', 'close'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .errCircle{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      fill: none;
      stroke-dasharray: 60;
      stroke-dashoffset: 60;
      animation: drawErrCircle{{timestamp}} 400ms ease-out forwards;
    }
    .errX{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      stroke-dasharray: 12;
      stroke-dashoffset: 12;
      animation: drawErrX{{timestamp}} 200ms ease-out 400ms forwards;
    }
    @keyframes drawErrCircle{{timestamp}} {
      to { stroke-dashoffset: 0; }
    }
    @keyframes drawErrX{{timestamp}} {
      to { stroke-dashoffset: 0; }
    }
  </style>
  <circle class='errCircle{{timestamp}}' cx='12' cy='12' r='9'/>
  <line class='errX{{timestamp}}' x1='9' y1='9' x2='15' y2='15'/>
  <line class='errX{{timestamp}}' x1='15' y1='9' x2='9' y2='15'/>
</svg>`,
  },

  // 13. Warning Triangle (Feedback)
  {
    id: 'warning-triangle',
    name: 'Warning',
    description: 'Animated warning triangle',
    category: 'feedback',
    toggleVariable: 'gblWarning',
    timestampVariable: 'gblWarnTimestamp',
    tags: ['warning', 'alert', 'caution', 'exclamation'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .warnTriangle{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      fill: none;
      stroke-linejoin: round;
      transform-origin: center;
      animation: warnShake{{timestamp}} 500ms ease-out;
    }
    .warnMark{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
    }
    @keyframes warnShake{{timestamp}} {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-3px); }
      40% { transform: translateX(3px); }
      60% { transform: translateX(-2px); }
      80% { transform: translateX(2px); }
    }
  </style>
  <path class='warnTriangle{{timestamp}}' d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'/>
  <line class='warnMark{{timestamp}}' x1='12' y1='9' x2='12' y2='13'/>
  <circle class='warnMark{{timestamp}}' cx='12' cy='17' r='0.5' fill='{{color}}'/>
</svg>`,
  },

  // 14. Bookmark Toggle (Toggles)
  {
    id: 'bookmark-toggle',
    name: 'Bookmark',
    description: 'Animated bookmark save action',
    category: 'toggles',
    toggleVariable: 'gblBookmarked',
    timestampVariable: 'gblBookmarkTimestamp',
    tags: ['bookmark', 'save', 'favorite', 'flag'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .bookmark{{timestamp}} {
      fill: {{color}};
      transform-origin: center bottom;
      animation: bookmarkPop{{timestamp}} 400ms ease-out;
    }
    @keyframes bookmarkPop{{timestamp}} {
      0% { transform: scale(1); }
      30% { transform: scale(1.2) translateY(-2px); }
      60% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
  </style>
  <path class='bookmark{{timestamp}}' d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'/>
</svg>`,
  },

  // 15. Eye Toggle (Toggles)
  {
    id: 'eye-toggle',
    name: 'Eye Toggle',
    description: 'Show/hide password toggle',
    category: 'toggles',
    toggleVariable: 'gblShowPassword',
    timestampVariable: 'gblEyeTimestamp',
    tags: ['eye', 'visibility', 'password', 'show'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .eye{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .eyeSlash{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      animation: eyeSlash{{timestamp}} 300ms ease-out both;
    }
    @keyframes eyeSlash{{timestamp}} {
      {{fromState}} { stroke-dasharray: 30; stroke-dashoffset: 30; }
      {{toState}} { stroke-dasharray: 30; stroke-dashoffset: 0; }
    }
  </style>
  <path class='eye{{timestamp}}' d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/>
  <circle class='eye{{timestamp}}' cx='12' cy='12' r='3'/>
  <line class='eyeSlash{{timestamp}}' x1='2' y1='2' x2='22' y2='22'/>
</svg>`,
  },

  // 16. Lock Toggle (Toggles)
  {
    id: 'lock-toggle',
    name: 'Lock Toggle',
    description: 'Lock/unlock animation',
    category: 'toggles',
    toggleVariable: 'gblLocked',
    timestampVariable: 'gblLockTimestamp',
    tags: ['lock', 'unlock', 'security', 'password'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .lockBody{{timestamp}} {
      fill: {{color}};
    }
    .lockShackle{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      transform-origin: 12px 11px;
      animation: lockShackle{{timestamp}} 300ms ease-out both;
    }
    @keyframes lockShackle{{timestamp}} {
      {{fromState}} { transform: rotate(0deg); }
      {{toState}} { transform: rotate(-30deg); }
    }
  </style>
  <rect class='lockBody{{timestamp}}' x='5' y='11' width='14' height='10' rx='2'/>
  <path class='lockShackle{{timestamp}}' d='M8 11V7a4 4 0 0 1 8 0v4'/>
</svg>`,
  },

  // 17. Download Arrow (Morphing)
  {
    id: 'download-arrow',
    name: 'Download',
    description: 'Animated download arrow',
    category: 'morphing',
    toggleVariable: 'gblDownloading',
    timestampVariable: 'gblDownloadTimestamp',
    tags: ['download', 'arrow', 'save', 'file'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .dlArrow{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      animation: dlBounce{{timestamp}} 600ms ease-in-out infinite;
    }
    .dlLine{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
    }
    @keyframes dlBounce{{timestamp}} {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(3px); }
    }
  </style>
  <path class='dlArrow{{timestamp}}' d='M12 3v12m0 0l-4-4m4 4l4-4'/>
  <line class='dlLine{{timestamp}}' x1='5' y1='21' x2='19' y2='21'/>
</svg>`,
  },

  // 18. Upload Arrow (Morphing)
  {
    id: 'upload-arrow',
    name: 'Upload',
    description: 'Animated upload arrow',
    category: 'morphing',
    toggleVariable: 'gblUploading',
    timestampVariable: 'gblUploadTimestamp',
    tags: ['upload', 'arrow', 'cloud', 'file'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .upArrow{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      animation: upBounce{{timestamp}} 600ms ease-in-out infinite;
    }
    .upLine{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      stroke-linecap: round;
    }
    @keyframes upBounce{{timestamp}} {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
  </style>
  <path class='upArrow{{timestamp}}' d='M12 15V3m0 0l-4 4m4-4l4 4'/>
  <line class='upLine{{timestamp}}' x1='5' y1='21' x2='19' y2='21'/>
</svg>`,
  },

  // 19. Settings Gear (Loaders)
  {
    id: 'settings-gear',
    name: 'Settings Gear',
    description: 'Rotating settings gear',
    category: 'loaders',
    toggleVariable: 'gblSettingsOpen',
    timestampVariable: 'gblGearTimestamp',
    tags: ['settings', 'gear', 'cog', 'config'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .gear{{timestamp}} {
      stroke: {{color}};
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      transform-origin: center;
      animation: gearSpin{{timestamp}} 3s linear infinite;
    }
    @keyframes gearSpin{{timestamp}} {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  <circle class='gear{{timestamp}}' cx='12' cy='12' r='3'/>
  <path class='gear{{timestamp}}' d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'/>
</svg>`,
  },

  // 20. Send Message (Morphing)
  {
    id: 'send-message',
    name: 'Send',
    description: 'Animated send arrow',
    category: 'morphing',
    toggleVariable: 'gblSending',
    timestampVariable: 'gblSendTimestamp',
    tags: ['send', 'message', 'submit', 'arrow'],
    svgTemplate: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='{{size}}px' height='{{size}}px'>
  <style>
    .sendIcon{{timestamp}} {
      fill: {{color}};
      transform-origin: center;
      animation: sendFly{{timestamp}} 400ms ease-out;
    }
    @keyframes sendFly{{timestamp}} {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(5px, -5px) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }
  </style>
  <path class='sendIcon{{timestamp}}' d='M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z'/>
</svg>`,
  },
];

// Get icons by category
export function getAnimatedIconsByCategory(category: AnimatedIcon['category']): AnimatedIcon[] {
  return ANIMATED_ICONS.filter(icon => icon.category === category);
}

// Get all categories with counts
export function getAnimatedIconCategories(): { id: AnimatedIcon['category']; label: string; count: number }[] {
  const categories = [
    { id: 'morphing' as const, label: 'Morphing' },
    { id: 'loaders' as const, label: 'Loaders' },
    { id: 'feedback' as const, label: 'Feedback' },
    { id: 'toggles' as const, label: 'Toggles' },
  ];

  return categories.map(cat => ({
    ...cat,
    count: ANIMATED_ICONS.filter(icon => icon.category === cat.id).length,
  }));
}

// Search animated icons
export function searchAnimatedIcons(query: string): AnimatedIcon[] {
  const q = query.toLowerCase();
  return ANIMATED_ICONS.filter(icon =>
    icon.name.toLowerCase().includes(q) ||
    icon.description.toLowerCase().includes(q) ||
    icon.tags.some(tag => tag.includes(q))
  );
}
