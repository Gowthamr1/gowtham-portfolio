# Project Guidelines: 3D Interactive Portfolio

## Architectural Standards
1. **Framework**: Vite + React + TypeScript + Tailwind CSS.
2. **3D Graphics Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`.
3. **Physics**: `@react-three/rapier` for lightweight, interactive ragdoll/physics elements.
4. **Animation & Motion**: Framer Motion for UI/DOM animations, GSAP / Lenis for camera transitions and smooth scroll choreography.
5. **Sound & Haptics**: Subtle interactive audio cues (clicks, whoosh, neon hums) with a global mute toggle.

## Performance & Best Practices
- **No Garbage Collection inside `useFrame`**: Pre-allocate `Vector3`, `Euler`, `Color` objects outside loops to prevent frame drops.
- **DPR Clamping**: Restrict canvas pixel ratio to `[1, 1.5]` (max 2) to maintain high framerates across 4K displays and laptops.
- **Responsive & Mobile First**: Fall back gracefully on mobile viewports (adjust camera FOV, decrease post-processing intensity, or switch to lightweight touch controls).
- **Graceful Loading**: Implement a sleek holographic cyberpunk / minimalist progress loader while textures, shaders, and 3D assets stream in.
