'use client';

import React from 'react';
import CinematicHeader from '@/components/navigation/CinematicHeader';
import VideoScrubberHero from '@/components/cinematic/VideoScrubberHero';
import FullPageFrameSequence from '@/components/cinematic/FullPageFrameSequence';
import Scene02Identity from '@/components/sections/Scene02Identity';
import Scene03TechUniverse from '@/components/sections/Scene03TechUniverse';
import Scene04Projects from '@/components/sections/Scene04Projects';
import Scene06Journey from '@/components/sections/Scene06Journey';
import SceneCertifications from '@/components/sections/SceneCertifications';
import Scene05Services from '@/components/sections/Scene05Services';
import Scene07Contact from '@/components/sections/Scene07Contact';
import PortfolioChatbot from '@/components/chatbot/PortfolioChatbot';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-clip bg-[#07111d] text-[#f3f3f3] selection:bg-sky-600/30 selection:text-sky-300">
      {/* ── Scroll-driven Frame Sequence Background (from video frames) ── */}
      <FullPageFrameSequence />

      {/* ── Top Floating Cinematic Navbar ───────────────────────────── */}
      <CinematicHeader />

      {/* ── SCENE 01: The Awakening Hero Experience ─────────────────── */}
      <VideoScrubberHero />

      {/* ── SCENE 02: Architectural Identity & Creed ───────────────── */}
      <Scene02Identity />

      {/* ── SCENE 03: The Intelligence Matrix & Tech Constellation ──── */}
      <Scene03TechUniverse />

      {/* ── SCENE 04: Flagship Real Projects & Architecture Blueprints ─ */}
      <Scene04Projects />

      {/* ── SCENE 06: Professional Journey & Academic Foundations ───── */}
      <Scene06Journey />

      {/* ── SCENE 06B: Credentials & Certifications ──────────────────── */}
      <SceneCertifications />

      {/* ── SCENE 05: Engineering Capabilities & Services ───────────── */}
      <Scene05Services />

      {/* ── SCENE 07: Direct Uplink Terminal & Contact ──────────────── */}
      <Scene07Contact />

      {/* ── Interactive AI Portfolio Assistant with 3D Neural Universe ─ */}
      <PortfolioChatbot />
    </main>
  );
}
