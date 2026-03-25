# LUXE Store

## Current State
Cyberpunk theme with neon cyan and hot magenta is live for both dark and light modes. Glowing borders, deep black backgrounds (dark), clean silver-white (light). All 11 Dribbble-inspired animations are active.

## Requested Changes (Diff)

### Add
- **Glitch effect** on hero headline text: periodic RGB-split / chromatic aberration glitch animation using CSS keyframes + Framer Motion (random interval triggers, 2–4 second idle then short burst)
- **Scanline overlay** on hero section: subtle CRT scanline texture using CSS repeating linear gradient, low opacity
- **Glitch flicker** on section headings site-wide (Trending Now, Flash Sale, Featured Categories, etc.) — lighter version, triggered on scroll-into-view
- **Premium cyberpunk color upgrade**: deeper, richer neon palette — electric cyan `#00FFFF`, neon magenta `#FF00FF`, acid green accent `#39FF14` for select highlights; backgrounds shifted to near-black `#050508` with subtle dark-purple undertone
- **Neon glow intensification**: multi-layer `text-shadow` and `box-shadow` on headings, cards, and buttons for a true premium neon sign feel
- **Glassmorphism upgrade**: card backgrounds with `backdrop-filter: blur(20px)`, dark glass with neon border glow — more depth and luxury
- **Animated neon border** on product cards: running light/dash animation around card borders on hover
- **Hero background upgrade**: animated grid/matrix dot pattern background (CSS) with subtle scan animation
- **Button glow pulse**: CTA buttons have a slow pulsing neon glow aura animation
- **Noise/grain texture overlay**: subtle CSS noise overlay on hero for premium film grain feel

### Modify
- Upgrade overall typography: use a more premium, sharp cyberpunk-style font stack; increase letter-spacing on headings
- Deepen dark mode background from near-black to true pitch `#020205` with subtle grid
- Flash Sale and Trending Now cards: enhance glow on hover with multi-color neon shadow (cyan + magenta layered)
- Navbar: add subtle scanline + neon underline accent; active links get glitch flicker on hover

### Remove
- Nothing removed

## Implementation Plan
1. Add CSS keyframe glitch animation utility (RGB split, skew, clip-path flicker)
2. Apply glitch to hero headline with randomized Framer Motion interval trigger
3. Apply lighter glitch flicker to all section headings on scroll-into-view
4. Add CRT scanline overlay to hero section
5. Upgrade color tokens: deeper blacks, richer neons, acid green accents
6. Intensify neon glow on headings, cards, buttons with multi-layer shadows
7. Upgrade glassmorphism on product cards and carousels
8. Add animated neon border dash on card hover
9. Add animated grid/matrix dot background to hero
10. Add pulsing aura glow animation to primary CTA buttons
11. Add subtle noise/grain texture overlay
12. Upgrade font stack and letter-spacing for headings
13. Validate and build
