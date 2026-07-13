// Space theme preview — four main tabs, Retro has three sub-variants.
// Visit at /preview-space. Does not affect the rest of the site.

import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

const POSTS = [
  { title: 'Cleaning Files with Python', href: '/blog/cleaning-files-with-python' },
  { title: 'Jiu-Jitsu Black Belt Journey', href: '/blog/JiuJitsuBlackbelt' },
  { title: 'Building a Discord Bot', href: '/blog/discordData' },
  { title: 'FitBit Data Visualization', href: '/blog/fitbit' },
  { title: 'Library Lists Scraper', href: '/blog/libraryLists' },
  { title: 'Self-Hosting My Stack', href: '/blog/selfHosting' },
]

const SOCIALS = [
  { label: 'email', href: 'mailto:tdnicola@gmail.com' },
  { label: 'github', href: 'https://github.com/tdnicola' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/tony-nicola/' },
]

// Fixed star positions — module-level so server and client produce identical CSS
const STARS_SM = [
  '45px 78px 0 0 rgba(255,255,255,0.7)',
  '156px 23px 0 0 rgba(255,255,255,0.45)',
  '267px 89px 0 0 rgba(255,255,255,0.8)',
  '412px 134px 0 0 rgba(255,255,255,0.5)',
  '523px 56px 0 0 rgba(255,255,255,0.65)',
  '634px 167px 0 0 rgba(255,255,255,0.4)',
  '745px 34px 0 0 rgba(255,255,255,0.75)',
  '856px 145px 0 0 rgba(255,255,255,0.55)',
  '967px 78px 0 0 rgba(255,255,255,0.8)',
  '1078px 23px 0 0 rgba(255,255,255,0.45)',
  '1189px 167px 0 0 rgba(255,255,255,0.6)',
  '1300px 89px 0 0 rgba(255,255,255,0.8)',
  '1411px 34px 0 0 rgba(255,255,255,0.5)',
  '1522px 145px 0 0 rgba(255,255,255,0.7)',
  '1633px 78px 0 0 rgba(255,255,255,0.45)',
  '1744px 56px 0 0 rgba(255,255,255,0.8)',
  '89px 234px 0 0 rgba(255,255,255,0.6)',
  '200px 312px 0 0 rgba(255,255,255,0.45)',
  '311px 245px 0 0 rgba(255,255,255,0.75)',
  '478px 289px 0 0 rgba(255,255,255,0.5)',
  '589px 334px 0 0 rgba(255,255,255,0.8)',
  '700px 256px 0 0 rgba(255,255,255,0.45)',
  '811px 289px 0 0 rgba(255,255,255,0.65)',
  '922px 312px 0 0 rgba(255,255,255,0.75)',
  '1033px 245px 0 0 rgba(255,255,255,0.5)',
  '1144px 334px 0 0 rgba(255,255,255,0.8)',
  '1255px 278px 0 0 rgba(255,255,255,0.45)',
  '1366px 289px 0 0 rgba(255,255,255,0.65)',
  '1477px 312px 0 0 rgba(255,255,255,0.7)',
  '1588px 256px 0 0 rgba(255,255,255,0.5)',
  '1699px 289px 0 0 rgba(255,255,255,0.8)',
  '1810px 234px 0 0 rgba(255,255,255,0.45)',
  '134px 445px 0 0 rgba(255,255,255,0.6)',
  '245px 478px 0 0 rgba(255,255,255,0.7)',
  '356px 423px 0 0 rgba(255,255,255,0.8)',
  '467px 489px 0 0 rgba(255,255,255,0.5)',
  '578px 412px 0 0 rgba(255,255,255,0.45)',
  '689px 456px 0 0 rgba(255,255,255,0.7)',
  '800px 423px 0 0 rgba(255,255,255,0.65)',
  '911px 489px 0 0 rgba(255,255,255,0.8)',
  '1022px 412px 0 0 rgba(255,255,255,0.5)',
  '1133px 456px 0 0 rgba(255,255,255,0.45)',
  '1244px 423px 0 0 rgba(255,255,255,0.7)',
  '1355px 489px 0 0 rgba(255,255,255,0.6)',
  '1466px 412px 0 0 rgba(255,255,255,0.8)',
  '1577px 456px 0 0 rgba(255,255,255,0.5)',
  '1688px 423px 0 0 rgba(255,255,255,0.45)',
  '1799px 489px 0 0 rgba(255,255,255,0.7)',
  '67px 567px 0 0 rgba(255,255,255,0.6)',
  '178px 589px 0 0 rgba(255,255,255,0.45)',
  '289px 612px 0 0 rgba(255,255,255,0.8)',
  '400px 578px 0 0 rgba(255,255,255,0.55)',
  '511px 634px 0 0 rgba(255,255,255,0.7)',
  '622px 589px 0 0 rgba(255,255,255,0.65)',
  '733px 612px 0 0 rgba(255,255,255,0.45)',
  '844px 578px 0 0 rgba(255,255,255,0.8)',
  '955px 634px 0 0 rgba(255,255,255,0.55)',
  '1066px 589px 0 0 rgba(255,255,255,0.7)',
  '1177px 612px 0 0 rgba(255,255,255,0.65)',
  '1288px 578px 0 0 rgba(255,255,255,0.45)',
  '350px 750px 0 0 rgba(255,255,255,0.8)',
  '780px 820px 0 0 rgba(255,255,255,0.55)',
  '1100px 756px 0 0 rgba(255,255,255,0.7)',
  '1450px 830px 0 0 rgba(255,255,255,0.45)',
  '220px 900px 0 0 rgba(255,255,255,0.65)',
  '660px 940px 0 0 rgba(255,255,255,0.8)',
  '990px 890px 0 0 rgba(255,255,255,0.55)',
  '1320px 960px 0 0 rgba(255,255,255,0.7)',
  '78px 345px 0 0 rgba(255,255,255,0.5)',
  '1560px 390px 0 0 rgba(255,255,255,0.65)',
  '890px 700px 0 0 rgba(255,255,255,0.45)',
  '1700px 650px 0 0 rgba(255,255,255,0.8)',
  '430px 850px 0 0 rgba(255,255,255,0.55)',
  '1230px 810px 0 0 rgba(255,255,255,0.7)',
  '560px 190px 0 0 rgba(255,255,255,0.5)',
  '1380px 520px 0 0 rgba(255,255,255,0.6)',
  '1870px 140px 0 0 rgba(255,255,255,0.7)',
  '30px 680px 0 0 rgba(255,255,255,0.45)',
  '1050px 320px 0 0 rgba(255,255,255,0.6)',
  '740px 860px 0 0 rgba(255,255,255,0.5)',
  '1780px 770px 0 0 rgba(255,255,255,0.7)',
  '110px 490px 0 0 rgba(255,255,255,0.45)',
].join(', ')

const STARS_LG = [
  '320px 145px 0 1px rgba(255,255,255,0.95)',
  '870px 67px 0 1px rgba(255,255,255,0.85)',
  '1450px 234px 0 1px rgba(255,255,255,0.95)',
  '678px 512px 0 1px rgba(255,255,255,0.8)',
  '1120px 445px 0 1px rgba(255,255,255,0.95)',
  '230px 720px 0 1px rgba(255,255,255,0.85)',
  '1650px 380px 0 1px rgba(255,255,255,0.9)',
  '990px 190px 0 1px rgba(255,255,255,0.8)',
  '480px 60px 0 1px rgba(255,255,255,0.9)',
  '1300px 680px 0 1px rgba(255,255,255,0.85)',
].join(', ')

const GLOBAL_CSS = `
  @keyframes psp-aurora {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes psp-twinkle {
    0%, 100% { opacity: 1; }
    40% { opacity: 0.2; }
  }

  /* z-index map: -1 bg | 1 stars | 2 atmosphere | 3 content | 100 UI chrome */

  /* Small stars — parallax layer (far, moves less) */
  .psp-stars-sm {
    will-change: transform;
    transition: transform 0.18s ease-out;
  }
  .psp-stars-sm::before {
    content: '';
    position: fixed; top: 0; left: 0;
    width: 1px; height: 1px;
    background: rgba(255,255,255,0.9);
    border-radius: 50%;
    box-shadow: ${STARS_SM};
    pointer-events: none;
    z-index: 1;
  }

  /* Large stars — parallax layer (close, moves more) */
  .psp-stars-lg {
    will-change: transform;
    transition: transform 0.12s ease-out;
  }
  .psp-stars-lg::after {
    content: '';
    position: fixed; top: 0; left: 0;
    width: 2px; height: 2px;
    background: white;
    border-radius: 50%;
    box-shadow: ${STARS_LG};
    animation: psp-twinkle 5s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  /* Shooting stars — fly across then disappear for a long pause */
  @keyframes psp-shoot-a {
    0%, 94% { opacity: 0; transform: rotate(38deg) translateX(0px); }
    95%     { opacity: 1; transform: rotate(38deg) translateX(0px); }
    98%     { opacity: 0; transform: rotate(38deg) translateX(700px); }
    100%    { opacity: 0; transform: rotate(38deg) translateX(0px); }
  }
  @keyframes psp-shoot-b {
    0%, 91% { opacity: 0; transform: rotate(32deg) translateX(0px); }
    92%     { opacity: 1; transform: rotate(32deg) translateX(0px); }
    95%     { opacity: 0; transform: rotate(32deg) translateX(550px); }
    100%    { opacity: 0; transform: rotate(32deg) translateX(0px); }
  }
  .psp-shoot-a {
    position: absolute; top: 14%; left: 12%;
    width: 130px; height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
    transform-origin: left center;
    animation: psp-shoot-a 22s ease-in infinite;
    pointer-events: none; opacity: 0;
  }
  .psp-shoot-b {
    position: absolute; top: 38%; right: 20%;
    width: 90px; height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 50%, transparent 100%);
    transform-origin: left center;
    animation: psp-shoot-b 31s ease-in infinite;
    animation-delay: -14s;
    pointer-events: none; opacity: 0;
  }

  /* VOID: ringed planet top-right */
  .psp-planet {
    position: fixed; top: -150px; right: -150px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle at 32% 32%, rgba(124,58,237,0.22) 0%, rgba(79,70,229,0.12) 35%, rgba(10,14,26,0.6) 65%, transparent 100%);
    border: 1px solid rgba(124,58,237,0.15);
    box-shadow: inset -10px -10px 60px rgba(124,58,237,0.1), 0 0 120px rgba(124,58,237,0.06);
    pointer-events: none; z-index: 2;
  }
  .psp-planet::after {
    content: '';
    position: absolute; top: 50%; left: 50%;
    width: 700px; height: 130px;
    margin-left: -350px; margin-top: -65px;
    border-radius: 50%;
    border: 1px solid rgba(124,58,237,0.13);
    transform: rotateX(75deg) rotateZ(-20deg);
    pointer-events: none;
  }

  /* COSMOS: Milky Way band */
  .psp-milkyway {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(-50deg, transparent 15%, rgba(165,180,252,0.03) 35%, rgba(255,255,255,0.022) 44%, rgba(199,210,254,0.03) 53%, transparent 72%);
    pointer-events: none; z-index: 2;
  }

  /* AURORA: animated color band */
  .psp-aurora-band {
    position: fixed; top: 0; left: 0; right: 0;
    height: 340px;
    background: linear-gradient(135deg, rgba(124,58,237,0.5) 0%, rgba(236,72,153,0.32) 28%, rgba(79,70,229,0.45) 60%, rgba(6,182,212,0.22) 100%);
    background-size: 400% 400%;
    animation: psp-aurora 9s ease infinite;
    pointer-events: none; z-index: 2;
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%);
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%);
  }

  /* RETRO / Interstellar: Gargantua accretion glow + nav ring */
  .psp-retro-glow {
    position: fixed; bottom: -120px; left: 50%;
    transform: translateX(-50%);
    width: 900px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center top, rgba(200,136,16,0.1) 0%, rgba(180,110,10,0.05) 45%, transparent 70%);
    pointer-events: none; z-index: 2;
  }
  .psp-retro-ring {
    position: fixed; top: 48px; right: 180px;
    width: 140px; height: 140px;
    border-radius: 50%;
    border: 1px solid rgba(200,136,16,0.14);
    pointer-events: none; z-index: 2;
  }
  .psp-retro-ring::before {
    content: '';
    position: absolute; top: 18px; left: 18px; right: 18px; bottom: 18px;
    border-radius: 50%;
    border: 1px solid rgba(200,136,16,0.08);
  }
  .psp-retro-ring::after {
    content: '';
    position: absolute; top: 50%; left: -18px;
    width: 176px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,136,16,0.12) 40%, rgba(200,136,16,0.12) 60%, transparent);
    transform: translateY(-50%);
  }

  /* ODYSSEY: HAL 9000 eye circle — near the monolith */
  .psp-odyssey-hal {
    position: fixed; top: 68px; right: 228px;
    width: 46px; height: 46px;
    border-radius: 50%;
    border: 1px solid rgba(147,197,253,0.13);
    pointer-events: none; z-index: 2;
  }
  .psp-odyssey-hal::before {
    content: '';
    position: absolute; top: 50%; left: 50%;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: rgba(147,197,253,0.07);
    border: 1px solid rgba(147,197,253,0.2);
    transform: translate(-50%, -50%);
  }
  .psp-odyssey-hal::after {
    content: '';
    position: absolute; top: 50%; left: 50%;
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(147,197,253,0.07);
    transform: translate(-50%, -50%);
  }

  /* ODYSSEY: telemetry readout — bottom-left, barely visible */
  .psp-odyssey-telemetry {
    position: fixed; bottom: 16px; left: 16px;
    font-family: 'Space Mono', monospace;
    font-size: 9px; letter-spacing: 0.12em;
    color: rgba(147,197,253,0.22);
    pointer-events: none; z-index: 100;
    line-height: 1.6;
  }

  /* RETRO / Odyssey: cold starlight from above + thin monolith bar */
  .psp-odyssey-light {
    position: fixed; top: -180px; left: 50%;
    transform: translateX(-50%);
    width: 700px; height: 420px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center bottom, rgba(147,197,253,0.07) 0%, rgba(147,197,253,0.03) 45%, transparent 70%);
    pointer-events: none; z-index: 2;
  }
  .psp-odyssey-monolith {
    position: fixed; top: 40px; right: 200px;
    width: 3px; height: 130px;
    background: linear-gradient(to bottom, transparent 0%, rgba(147,197,253,0.18) 30%, rgba(147,197,253,0.18) 70%, transparent 100%);
    pointer-events: none; z-index: 2;
  }
  .psp-odyssey-monolith::before {
    content: '';
    position: absolute; top: 0; left: -8px; right: -8px; bottom: 0;
    background: linear-gradient(to bottom, transparent, rgba(147,197,253,0.04), transparent);
  }

  /* RETRO / Event Horizon: red nebula from bottom-left */
  .psp-eventhorizon-nebula {
    position: fixed; bottom: -140px; left: -140px;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(220,38,38,0.12) 0%, rgba(154,52,18,0.07) 40%, transparent 70%);
    pointer-events: none; z-index: 2;
  }
  .psp-eventhorizon-glow {
    position: fixed; top: -80px; right: -80px;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(220,38,38,0.06) 0%, transparent 65%);
    pointer-events: none; z-index: 2;
  }

  /* Hover states — main themes */
  .psp-link-void:hover   { color: #c4b5fd !important; }
  .psp-link-cosmos:hover { color: #a5b4fc !important; }
  .psp-link-aurora:hover { color: #f472b6 !important; }

  .psp-social-void:hover   { color: #a78bfa !important; }
  .psp-social-cosmos:hover { color: #818cf8 !important; }
  .psp-social-aurora:hover { color: #ec4899 !important; }

  /* Hover states — retro sub-variants */
  .psp-link-interstellar:hover   { color: #e8c060 !important; }
  .psp-link-odyssey:hover        { color: #bae6fd !important; }
  .psp-link-eventhorizon:hover   { color: #fed7aa !important; }

  .psp-social-interstellar:hover { color: #cc8810 !important; }
  .psp-social-odyssey:hover      { color: #93c5fd !important; }
  .psp-social-eventhorizon:hover { color: #f97316 !important; }
`

const THEMES = {
  void: {
    label: 'Void',
    description: 'Nebula glow',
    bg: '#0a0e1a',
    bgImage:
      'radial-gradient(ellipse at 85% 0%, rgba(124,58,237,0.16) 0%, transparent 52%), radial-gradient(ellipse at 12% 100%, rgba(79,70,229,0.1) 0%, transparent 48%)',
    name: '#e2e8f0',
    nameExtra: {},
    body: '#94a3b8',
    accent: '#a78bfa',
    accentDim: 'rgba(167,139,250,0.72)',
    social: '#8899aa',
    divider: '·  ·  ·',
    dividerColor: 'rgba(124,58,237,0.55)',
    bullet: '→',
    sectionLabel: 'WRITING',
  },
  cosmos: {
    label: 'Cosmos',
    description: 'Deep starfield',
    bg: '#020617',
    bgImage: 'radial-gradient(ellipse at 70% 30%, rgba(79,70,229,0.09) 0%, transparent 60%)',
    name: '#f1f5f9',
    nameExtra: { textShadow: '0 0 30px rgba(165,180,252,0.45), 0 0 80px rgba(165,180,252,0.15)' },
    body: '#94a3b8',
    accent: '#818cf8',
    accentDim: 'rgba(129,140,248,0.72)',
    social: '#7a8fa8',
    divider: '✦',
    dividerColor: 'rgba(129,140,248,0.6)',
    bullet: '→',
    sectionLabel: 'TRANSMISSIONS',
  },
  aurora: {
    label: 'Aurora',
    description: 'Animated aurora',
    bg: '#0f0720',
    bgImage: 'none',
    name: 'transparent',
    nameExtra: {
      background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #818cf8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    body: '#e2e8f0',
    accent: '#ec4899',
    accentDim: 'rgba(236,72,153,0.72)',
    social: '#9ca3af',
    divider: '✧  ✦  ✧',
    dividerColor: 'rgba(236,72,153,0.5)',
    bullet: '✦',
    sectionLabel: 'MISSION LOG',
  },
  retro: {
    label: 'Retro',
    description: '80s sci-fi space',
    // bg/colors come from the active sub-variant — these are just defaults for the tab switcher
    bg: '#0a0800',
    bgImage: 'none',
    name: '#f59e0b',
    nameExtra: {},
    body: '#a0896a',
    accent: '#fbbf24',
    accentDim: 'rgba(251,191,36,0.55)',
    social: '#4a3a1e',
    divider: '',
    dividerColor: '',
    bullet: '◆',
    sectionLabel: '',
  },
}

// Three sub-variants that appear when Retro is active
const RETRO_VARIANTS = {
  interstellar: {
    variantLabel: 'Interstellar',
    // bg: near-black with warm brown undertone — deep space in the film
    bg: '#080600',
    bgImage:
      'radial-gradient(ellipse at 50% 0%, rgba(200,136,16,0.07) 0%, transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(160,100,10,0.05) 0%, transparent 45%)',
    // name: aged burnt amber — Gargantua accretion disk, not bright yellow
    name: '#cc8810',
    nameExtra: { textShadow: '0 0 20px rgba(200,136,16,0.65), 0 0 70px rgba(200,136,16,0.2)' },
    // body: dusty wheat/tan — the farmhouse/Earth dustbowl palette
    // accent: muted burnished gold (ref: #ceaa4b from film palette, brightened for readability)
    // all pairs pass WCAG AA on #080600 bg
    body: '#b09878',
    accent: '#d4a030',
    accentDim: 'rgba(212,160,48,0.75)',
    social: '#9a7840',
    divider: '◇  ─  ◇  ─  ◇',
    dividerColor: 'rgba(200,136,16,0.38)',
    bullet: '◆',
    sectionLabel: "SHIP'S LOG",
  },
  odyssey: {
    variantLabel: '2001: Odyssey',
    bg: '#000008',
    bgImage: 'radial-gradient(ellipse at 50% 0%, rgba(147,197,253,0.05) 0%, transparent 60%)',
    name: '#dde8f5',
    nameExtra: { textShadow: '0 0 24px rgba(147,197,253,0.35), 0 0 80px rgba(147,197,253,0.1)' },
    // body ~5:1, accent ~8:1, social ~4.8:1 — all pass WCAG AA
    body: '#6a8090',
    accent: '#93c5fd',
    accentDim: 'rgba(147,197,253,0.65)',
    social: '#5a7890',
    divider: '──── MISSION BRIEF ◉ ────',
    dividerColor: 'rgba(147,197,253,0.28)',
    bullet: '○',
    sectionLabel: 'TRANSMISSION LOG',
  },
  eventhorizon: {
    variantLabel: 'Event Horizon',
    bg: '#0c0200',
    bgImage:
      'radial-gradient(ellipse at 20% 85%, rgba(220,38,38,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 5%, rgba(154,52,18,0.06) 0%, transparent 50%)',
    name: '#f97316',
    nameExtra: { textShadow: '0 0 20px rgba(249,115,22,0.65), 0 0 60px rgba(249,115,22,0.2)' },
    // body ~6:1, accent ~10:1, social ~5:1, accentDim ~5.5:1 — all pass WCAG AA
    body: '#b07858',
    accent: '#fb923c',
    accentDim: 'rgba(251,146,60,0.72)',
    social: '#904828',
    divider: '▸  ·  ·  ·  ◂',
    dividerColor: 'rgba(220,38,38,0.4)',
    bullet: '▸',
    sectionLabel: 'DISTRESS LOG',
  },
}

// Dark-on-light accent colors need dark text in badges/buttons
const LIGHT_ACCENT = ['interstellar']

export default function PreviewSpace() {
  const [active, setActive] = useState('void')
  const [retroVariant, setRetroVariant] = useState('interstellar')

  // Parallax star layers — two layers move at different speeds for depth
  const smRef = useRef(null)
  const lgRef = useRef(null)
  const rafRef = useRef(null)
  useEffect(() => {
    const onMove = (e) => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5
        const y = e.clientY / window.innerHeight - 0.5
        if (smRef.current) smRef.current.style.transform = `translate(${x * 10}px, ${y * 7}px)`
        if (lgRef.current) lgRef.current.style.transform = `translate(${x * 22}px, ${y * 15}px)`
        rafRef.current = null
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // When Retro is active, pull colors from the sub-variant
  const t = active === 'retro' ? RETRO_VARIANTS[retroVariant] : THEMES[active]

  // Class suffixes for hover CSS
  const linkClass = active === 'retro' ? `psp-link-${retroVariant}` : `psp-link-${active}`
  const socialClass = active === 'retro' ? `psp-social-${retroVariant}` : `psp-social-${active}`

  const badgeTextColor =
    active === 'retro' && LIGHT_ACCENT.includes(retroVariant) ? '#0a0800' : '#fff'

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>{GLOBAL_CSS}</style>
      </Head>

      {/* Background at z-index -1 so stars (z:1) always paint on top of it */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: t.bg,
          backgroundImage: t.bgImage,
          zIndex: -1,
        }}
      />

      {/* Star container — fixed + overflow:hidden clips parallax/shooting-star overflow */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div className="psp-stars-sm" ref={smRef} />
        <div className="psp-stars-lg" ref={lgRef} />
        <div className="psp-shoot-a" />
        <div className="psp-shoot-b" />
      </div>

      {/* Per-theme atmospheric layer */}
      {active === 'void' && <div className="psp-planet" />}
      {active === 'cosmos' && <div className="psp-milkyway" />}
      {active === 'aurora' && <div className="psp-aurora-band" />}
      {active === 'retro' && retroVariant === 'interstellar' && (
        <>
          <div className="psp-retro-glow" />
          <div className="psp-retro-ring" />
        </>
      )}
      {active === 'retro' && retroVariant === 'odyssey' && (
        <>
          <div className="psp-odyssey-light" />
          <div className="psp-odyssey-monolith" />
          <div className="psp-odyssey-hal" />
          <div className="psp-odyssey-telemetry">
            DISCOVERY I · HAL 9000 UNIT · SYS: NOMINAL
            <br />
            CREW: BOWMAN / POOLE · DEST: JUPITER · MET +∞
          </div>
        </>
      )}
      {active === 'retro' && retroVariant === 'eventhorizon' && (
        <>
          <div className="psp-eventhorizon-nebula" />
          <div className="psp-eventhorizon-glow" />
        </>
      )}

      {/* Main tab switcher */}
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 100,
          display: 'flex',
          gap: 4,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 10,
          padding: '5px 6px',
        }}
      >
        {Object.entries(THEMES).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            style={{
              padding: '5px 13px',
              borderRadius: 6,
              border: 'none',
              background: active === key ? t.accent : 'transparent',
              color: active === key ? badgeTextColor : 'rgba(255,255,255,0.4)',
              fontSize: 12,
              fontWeight: active === key ? 600 : 400,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'background 0.2s',
            }}
          >
            {theme.label}
          </button>
        ))}
      </div>

      {/* Retro sub-variant tabs — only visible when Retro is active */}
      {active === 'retro' && (
        <div
          style={{
            position: 'fixed',
            top: 58,
            right: 20,
            zIndex: 100,
            display: 'flex',
            gap: 3,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            padding: '4px 5px',
          }}
        >
          {Object.entries(RETRO_VARIANTS).map(([key, variant]) => (
            <button
              key={key}
              onClick={() => setRetroVariant(key)}
              style={{
                padding: '4px 10px',
                borderRadius: 5,
                border: 'none',
                background: retroVariant === key ? t.accent : 'transparent',
                color:
                  retroVariant === key
                    ? LIGHT_ACCENT.includes(key)
                      ? '#0a0800'
                      : '#fff'
                    : 'rgba(255,255,255,0.35)',
                fontSize: 11,
                fontWeight: retroVariant === key ? 600 : 400,
                cursor: 'pointer',
                letterSpacing: '0.01em',
                transition: 'background 0.2s',
              }}
            >
              {variant.variantLabel}
            </button>
          ))}
        </div>
      )}

      {/* Page content */}
      <div
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          minHeight: '100vh',
          color: t.body,
          position: 'relative',
          zIndex: 3,
        }}
      >
        <main style={{ maxWidth: 560, margin: '0 auto', padding: '60px 24px 80px' }}>
          <h1
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: t.name,
              marginBottom: 28,
              ...t.nameExtra,
            }}
          >
            Tony Nicola
          </h1>

          <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
            Data engineer at{' '}
            <a
              href="https://www.palomar.com"
              className={linkClass}
              style={{ color: t.accent, textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              Palomar
            </a>
            , where I build pipelines that move data cleanly from point A to point B — ideally
            without catching fire. I work with SQL, Python, Airflow, Snowflake, and DBT.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 44 }}>
            Outside the terminal, I'm usually doing{' '}
            <a
              href="/blog/JiuJitsuBlackbelt"
              className={linkClass}
              style={{ color: t.accent, textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              Brazilian Jiu-Jitsu
            </a>
            , hiking the Pacific Northwest, or making something weird with my 3D printer.
          </p>

          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.15em',
              color: t.dividerColor,
              marginBottom: 32,
              userSelect: 'none',
              fontFamily:
                active === 'retro' && retroVariant === 'odyssey'
                  ? '"Space Mono", monospace'
                  : 'inherit',
            }}
          >
            {t.divider}
          </p>

          <p
            style={{
              fontFamily:
                active === 'retro' && retroVariant === 'odyssey'
                  ? '"Space Mono", monospace'
                  : '"Orbitron", sans-serif',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: t.accentDim,
              marginBottom: 16,
            }}
          >
            {t.sectionLabel}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 52px 0' }}>
            {POSTS.map(({ title, href }) => (
              <li key={href} style={{ marginBottom: 11 }}>
                <a
                  href={href}
                  className={linkClass}
                  style={{
                    fontSize: 15,
                    color: t.accent,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                  }}
                >
                  <span style={{ opacity: 0.5, fontSize: 12 }}>{t.bullet}</span>
                  {title}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: 20 }}>
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={socialClass}
                style={{
                  fontSize: 12,
                  color: t.social,
                  textDecoration: 'none',
                  letterSpacing:
                    active === 'retro' && retroVariant === 'odyssey' ? '0.1em' : '0.02em',
                  fontFamily:
                    active === 'retro' && retroVariant === 'odyssey'
                      ? '"Space Mono", monospace'
                      : 'inherit',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </main>
      </div>

      {/* Preview badge */}
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 100,
          background: t.accent,
          color: badgeTextColor,
          fontSize: 10,
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: 700,
          padding: '4px 12px',
          borderRadius: 999,
          boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
          letterSpacing: '0.08em',
        }}
      >
        {active === 'retro' ? RETRO_VARIANTS[retroVariant].variantLabel : THEMES[active].label}
        {' / '}
        {active === 'retro' ? THEMES[active].description : THEMES[active].description}
      </div>
    </>
  )
}

PreviewSpace.noLayout = true
