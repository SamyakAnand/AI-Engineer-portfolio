'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';
import { navigateToPortfolioSection } from '@/lib/portfolio-navigation';

const navLinks = [
  { label: 'About', id: 'scene-identity' },
  { label: 'Skills', id: 'scene-tech' },
  { label: 'Projects', id: 'scene-projects' },
  { label: 'Experience', id: 'scene-journey' },
  { label: 'Certifications', id: 'scene-certifications' },
  { label: 'Services', id: 'scene-services' },
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/SamyakAnand',
    mark: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.13c-3.1.68-3.75-1.32-3.75-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.84 2.45 3.93 1.74.1-.72.39-1.22.7-1.5-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.78 1.15 1.77 1.15 2.98 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/samyakanand/',
    mark: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.73H4.99V9.24h2.94v9.49ZM6.46 7.94a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm12.27 10.79h-2.94v-4.62c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.7H9.53V9.24h2.82v1.3h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.56 1.95 3.56 4.48v5.23Z" />
      </svg>
    ),
  },
];

export default function CinematicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-cinematic');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });

    const sectionIds = ['hero-cinematic', ...navLinks.map((link) => link.id), 'scene-contact'];
    let frame = 0;
    const syncActive = () => {
      frame = 0;
      const marker = Math.min(window.innerHeight * 0.42, 360);
      let active = sectionIds[0];
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) {
          active = id;
        }
      }
      setActiveSection(active);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(syncActive);
    };
    syncActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const navigate = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    navigateToPortfolioSection(id);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <motion.div
          initial={reduceMotion ? false : { y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3.5 py-2 transition-[background,border-color,box-shadow] duration-300 sm:px-5 ${
            scrolled
              ? 'border-white/20 bg-[#060f1b]/80 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-xl'
              : 'border-white/10 bg-[#060f1b]/40 backdrop-blur-md'
          }`}
        >
          {/* ── Left: Brand Logo + Name ── */}
          <a
            href="#hero-cinematic"
            onClick={(event) => {
              event.preventDefault();
              navigate('hero-cinematic');
            }}
            className="group flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors hover:text-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400"
            aria-label="Samyak Anand home"
            title="Go to home"
          >
            <BrandLogo className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-white transition-colors group-hover:text-purple-200 sm:text-[15px]" style={{ textShadow: '0 2px 10px rgba(0,0,0,1), 0 0 14px rgba(168,85,247,0.4)' }}>
                Samyak Anand
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-purple-400 sm:block" style={{ textShadow: '0 1px 4px rgba(0,0,0,1), 0 0 8px rgba(168,85,247,0.5)' }}>
                AI &amp; Data Scientist
              </span>
            </div>
          </a>

          {/* ── Center: Desktop Navigation Links (Visible on desktop md:flex) ── */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 md:flex lg:gap-1"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigate(link.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 lg:px-3.5 lg:text-[13px] ${
                    isActive ? 'text-white' : 'text-white/75 hover:text-purple-200'
                  }`}
                  style={{ textShadow: isActive ? '0 1px 4px rgba(0,0,0,1), 0 0 12px rgba(168,85,247,0.6)' : '0 1px 6px rgba(0,0,0,0.95)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full border border-purple-400/40 bg-purple-500/20 shadow-[0_0_18px_rgba(168,85,247,0.35)]"
                      transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── Right: Social Links + Contact CTA + Mobile Menu Button ── */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            {/* Social Icons (Desktop) */}
            <div className="hidden items-center gap-1 border-r border-white/10 pr-2 md:flex">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-purple-900/40 hover:text-purple-300"
                >
                  {item.mark}
                </a>
              ))}
            </div>

            {/* Let's talk CTA button */}
            <button
              type="button"
              onClick={() => navigate('scene-contact')}
              className="rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.45)] transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 sm:px-4 sm:py-2"
            >
              Let’s talk
            </button>

            {/* Mobile Hamburger Menu Toggle Button (Visible only on mobile/tablet: md:hidden) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="grid h-9 w-9 place-items-center rounded-full border border-purple-400/30 bg-purple-950/40 text-purple-200 transition hover:bg-purple-900/60 md:hidden"
            >
              {mobileMenuOpen ? (
                <X aria-hidden="true" className="h-5 w-5 text-purple-300" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5 text-purple-300" />
              )}
            </button>
          </div>
        </motion.div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              aria-label="Close navigation menu"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
            />
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="fixed left-3 right-3 top-[4.5rem] z-50 rounded-3xl border border-white/20 bg-[#060f1b]/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden"
              initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => navigate(link.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-purple-500/20 border border-purple-400/40 text-purple-200 font-bold'
                          : 'text-white/80 hover:bg-white/[0.08] hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
                        {link.label}
                      </span>
                      <span className="text-xs font-mono text-purple-400/70">0{index + 1}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex items-center gap-2">
                  {socials.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white"
                    >
                      {item.mark}
                    </a>
                  ))}
                </div>
                <span className="text-xs font-mono text-white/50">Hyderabad, IN</span>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
