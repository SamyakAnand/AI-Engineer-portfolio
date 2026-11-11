'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { DirectionArrow, ArrowRight } from '@/components/ui/arrows/ArrowSystem';
import { tokens } from '@/lib/design-system';

interface HeroProps {
  name: string;
  role: string;
  tagline: string;
  portraitUrl: string;
  resumeUrl: string;
  onExploreProjects: () => void;
  onViewResume: () => void;
  children?: React.ReactNode;
}

export function HeroSection({
  name,
  role,
  tagline,
  portraitUrl,
  resumeUrl,
  onExploreProjects,
  onViewResume,
  children,
}: HeroProps) {
  const [surname, setSurname] = useState('');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(true);
    // Typewriter animation for surname
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setSurname('ANAND'.slice(0, index));
      if (index >= 5) clearInterval(timer);
    }, 180);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#080809]"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,.04) 0%, #080809 70%)',
      }}
    >
      {/* Subtle UV background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(124,58,237,.06) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(99,102,241,.04) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(59,130,246,.03) 0%, transparent 40%)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Hero content */}
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-[.2em] text-[#a78bfa]">
              AI ENGINEER
            </span>
            <span className="text-xs text-[#66636a]">|</span>
            <span className="text-xs font-mono font-bold uppercase tracking-[.2em] text-[#94a3b8]">
              {role}
            </span>
          </div>

          <h1
            className="display-heading mb-6"
            style={{ fontSize: 'clamp(48px, 7.5vw, 112px)', lineHeight: 1.15 }}
          >
            <span className="text-[#f5f3f2] sm:inline">Samyak</span>
            <span className="text-[#a78bfa] sm:inline"> {surname}</span>
            <span className="text-[#f12b43] sm:inline ml-2">
              <span className="hero__caret" />
            </span>
          </h1>

          <p className="text-xl text-[#c8c6cc] mb-6 max-w-xl leading-relaxed">
            AI ENGINEER / LLM APPLICATIONS / APPLIED AI
          </p>

          <p className="text-base text-[#929095] mb-8 max-w-lg leading-relaxed">
            {tagline}
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={onExploreProjects}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-lg font-semibold text-white uppercase tracking-wider text-sm"
              style={{
                background: '#7c3aed',
                boxShadow: '0 4px 24px rgba(124,58,237,.35)',
              }}
            >
              {children ?? (
                <>
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-colors">
                    →
                  </span>
                  Explore Projects
                </>
              )}
            </button>

            <a
              href={resumeUrl}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm text-[#c8c6cc] border border-[#2a2a3e]"
            >
              <span className="w-5 h-5 rounded-full bg-[#2a2a3e] flex items-center justify-center text-white/70">
                ↓
              </span>
              View Resume
            </a>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#66636a]">
            <span>LIVE PROJECT</span>
            <div className="flex-1 h-px bg-[#2a2a3e]" />
            <span>3,000+ PROJECTS DELIVERED</span>
            <div className="flex-1 h-px bg-[#2a2a3e]" />
            <span>35+ CONFIDENTIAL</span>
          </div>
        </div>

        {/* Hero visual - portrait */}
        <div className="relative lg:flex items-center justify-center lg:justify-end">
          <div
            className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden bg-[#171719] border border-[#2a2a3e] shadow-2xl"
            style={{
              boxShadow: `
                0 0 60px rgba(124,58,237,.08),
                0 0 120px rgba(124,58,237,.04)
              `,
            }}
          >
            {/* UV glow border */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `
                  radial-gradient(circle at 50% 50%, rgba(124,58,237,.08) 0%, transparent 60%),
                  repeating-linear-gradient(45deg, rgba(124,58,237,.02) 0px, transparent 8px),
                  repeating-linear-gradient(-45deg, rgba(124,58,237,.02) 0px, transparent 8px),
                  radial-gradient(circle at 50% 50%, rgba(167,139,250,.08) 0%, transparent 50%)
                `,
              }}
            />

            {/* Portrait placeholder with crosshair grid */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Crosshair grid lines */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(124,58,237,.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(124,58,237,.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '20% 20%',
                }}
              />
              {/* Center crosshair */}
              <div
                className="absolute inset-0"
                style={{
                  border: '1px solid rgba(124,58,237,.2)',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                }}
              />

              {/* Portait image */}
              {portraitUrl && (
                <Image
                  src={portraitUrl}
                  alt="Samyak Anand - AI Engineer portrait"
                  fill
                  sizes="(max-width: 768px) 80vw, 50vw"
                  className="object-cover object-top"
                  style={{
                    filter: 'saturate(1.05) contrast(.98)',
                    borderRadius: '2rem',
                  }}
                />
              )}

              {/* Fallback placeholder */}
              {!portraitUrl && (
                <div
                  className="flex flex-col items-center justify-center text-[#66636a]"
                  style={{ minHeight: '280px' }}
                >
                  <span className="text-6xl mb-4 font-bold text-[#a78bfa]">▦</span>
                  <span className="text-xs uppercase tracking-widest">Portrait</span>
                </div>
              )}
            </div>
          </div>

          {/* Subtle float animation */}
          <div
            className="absolute -inset-4 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(124,58,237,.05) 0%, transparent 60%)`,
              animation: 'float 6s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-[fadeIn_0.8s_ease-out_both]">
        <div
          className="flex flex-col items-center gap-2 text-[#66636a] cursor-pointer"
          onClick={() => document.querySelector('section:last-of-type')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="w-5 h-5 rounded-full border border-[#2a2a3e] flex items-center justify-center text-[#a78bfa] transition-transform hover:rotate-90 duration-300">
            ↓
          </span>
          <span className="text-[10px] uppercase tracking-[.2em]">Scroll to explore</span>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.01); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
