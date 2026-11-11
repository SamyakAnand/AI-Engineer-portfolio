'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, UserRound, X } from 'lucide-react';
import { navigateToPortfolioSection } from '@/lib/portfolio-navigation';

const navLinks = [
  { label: 'About', id: 'scene-identity' },
  { label: 'Skills', id: 'scene-tech' },
  { label: 'Projects', id: 'scene-projects' },
  { label: 'Experience', id: 'scene-journey' },
  { label: 'Services', id: 'scene-services' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/SamyakAnand', mark: <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.13c-3.1.68-3.75-1.32-3.75-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.84 2.45 3.93 1.74.1-.72.39-1.22.7-1.5-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.78 1.15 1.77 1.15 2.98 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samyakanand/', mark: <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.73H4.99V9.24h2.94v9.49ZM6.46 7.94a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm12.27 10.79h-2.94v-4.62c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.7H9.53V9.24h2.82v1.3h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.56 1.95 3.56 4.48v5.23Z"/></svg> },
];

export default function CinematicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-cinematic');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    const sectionIds = ['hero-cinematic', ...navLinks.map(link => link.id), 'scene-contact'];
    let frame = 0;
    const syncActive = () => {
      frame = 0;
      const marker = Math.min(window.innerHeight * .42, 360);
      let active = sectionIds[0];
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) active = id;
      }
      setActiveSection(active);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(syncActive); };
    syncActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const navigate = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    navigateToPortfolioSection(id);
  };

  return <>
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <motion.div
        initial={reduceMotion ? false : { y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .38, ease: 'easeOut' }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-[background,border-color,box-shadow] duration-300 sm:px-4 ${scrolled ? 'border-white/15 bg-[#07111d]/45 shadow-lg shadow-black/10 backdrop-blur-md' : 'border-white/10 bg-[#07111d]/25 backdrop-blur-sm'}`}
      >
        <a href="#hero-cinematic" onClick={event => { event.preventDefault(); navigate('hero-cinematic'); }} className="flex min-w-0 items-center gap-2.5 rounded-full px-2 py-1 text-left text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-200" aria-label="Samyak Anand home" title="Go to home">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[.07] text-white/90"><UserRound aria-hidden="true" className="h-4 w-4"/></span>
          <span className="truncate text-sm font-medium tracking-tight sm:text-[15px]">Samyak Anand</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map(link => <button key={link.id} type="button" onClick={() => navigate(link.id)} aria-current={activeSection === link.id ? 'location' : undefined} className={`relative rounded-full px-3 py-2 text-[13px] transition-colors ${activeSection === link.id ? 'text-white' : 'text-white/65 hover:text-white'}`}>
            {activeSection === link.id && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full border border-sky-100/25 bg-sky-100/[.12] shadow-[inset_0_0_18px_rgba(125,211,252,.08)]" transition={{ duration: reduceMotion ? 0 : .24, ease: 'easeOut' }} />}
            <span className="relative">{link.label}</span>
          </button>)}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-1 border-r border-white/10 pr-2 sm:flex">
            {socials.map(item => <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className="grid h-9 w-9 place-items-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white">{item.mark}</a>)}
          </div>
          <button type="button" onClick={() => navigate('scene-contact')} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#07111d] transition hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-100 sm:px-5 sm:text-sm">Let’s talk</button>
          <button type="button" onClick={() => setMobileMenuOpen(value => !value)} aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[.06] text-white lg:hidden">
            {mobileMenuOpen ? <X aria-hidden="true" className="h-4 w-4"/> : <Menu aria-hidden="true" className="h-4 w-4"/>}
          </button>
        </div>
      </motion.div>
    </header>

    <AnimatePresence>
      {mobileMenuOpen && <>
        <motion.button aria-label="Close navigation menu" className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .18 }} />
        <motion.nav id="mobile-navigation" aria-label="Mobile navigation" className="fixed left-4 right-4 top-[4.6rem] z-50 rounded-3xl border border-white/15 bg-[#07111d]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden" initial={reduceMotion ? false : { opacity: 0, y: -8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .98 }} transition={{ duration: reduceMotion ? 0 : .18 }}>
          {navLinks.map((link, index) => <button key={link.id} type="button" onClick={() => navigate(link.id)} aria-current={activeSection === link.id ? 'location' : undefined} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm ${activeSection === link.id ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/[.06] hover:text-white'}`}><span>{link.label}</span><span className="text-xs tabular-nums text-white/35">0{index + 1}</span></button>)}
          <div className="mt-2 flex items-center gap-2 border-t border-white/10 px-2 pt-3">
            {socials.map(item => <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 hover:bg-white/10 hover:text-white">{item.mark}</a>)}
            <span className="ml-auto text-xs text-white/45">Hyderabad, India</span>
          </div>
        </motion.nav>
      </>}
    </AnimatePresence>
  </>;
}
