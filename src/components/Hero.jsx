import React from 'react';
import Galaxy from './Galaxy';
import SideRays from './background/SideRays';
import ParticleText from './ParticleText';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
      {/* Background Layer: Deep Cosmic Galaxy + Ambient Falling Light Rays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Layer 1: Galaxy Starfield with deep twinkling stars, mouse repulsion & warp */}
        <div className="absolute inset-0">
          <Galaxy
            density={1}
            glowIntensity={0.35}
            flareIntensity={1}
            starSpeed={0.5}
            mouseRepulsion={true}
            repulsionStrength={2}
            clickWarp={true}
            twinkleIntensity={0.35}
            transparent={true}
            className="w-full h-full opacity-85"
          />
        </div>

        {/* Layer 2: SideRays WebGL shader - Ambient light with warm golden/emerald rays */}
        <SideRays
          rayColor1="#FFC46B"
          rayColor2="#1a5b45"
          origin="top-left"
          speed={2.2}
          intensity={2.0}
          spread={2}
          density={5}
          followMouse={true}
          mouseInfluence={0.8}
          className="w-full h-full opacity-80"
        />

        {/* Layer 3: Subtle radial vignette anchoring center without swallowing the light */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#060707]/20 to-[#060707] pointer-events-none" />
      </div>

      {/* Hero Interactive Particle Text */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center pointer-events-auto">
        <div style={{ width: '100%', height: 360 }} className="flex items-center justify-center cursor-pointer">
          <ParticleText
            text="Dream. Build. Elevate."
            particleSize={2.2}
            density={4}
            color="#ffffff"
            highlightColor="#000000"
            highlightMode="motion"
            shape="circle"
            intro="gather"
            scatter={160}
            gatherDuration={1400}
            stagger={380}
            clickBurst={false}
            burstStrength={0}
            idleDrift={0}
            trigger="mount"
            fontSize="clamp(2.8rem, 8.5vw, 6.8rem)"
            fontWeight={800}
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            glow={false}
          />
        </div>

        {/* Minimal interaction cue */}
        <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mt-2">
          ✦ Hover or touch to disperse
        </p>
      </div>
    </section>
  );
}
