export function navigateToPortfolioSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  window.dispatchEvent(new CustomEvent('portfolio:navigate', { detail: { sectionId } }));
  // Lenis owns the cinematic scroll when active. Keep a native fallback so
  // section shortcuts still work if its provider has not mounted yet.
  window.setTimeout(() => {
    const current = target.getBoundingClientRect().top;
    if (Math.abs(current) > 140) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 1100);
}
