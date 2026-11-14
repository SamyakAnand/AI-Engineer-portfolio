import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Samyak Anand — Applied AI Engineer',
  description: 'Terms and conditions governing the use of Samyak Anand’s engineering portfolio and project codebases.',
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30 selection:text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
        {/* Top Back Link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 transition-colors hover:text-purple-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 rounded"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Header */}
        <header className="mt-8 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-950/30 px-3 py-1 text-xs font-mono text-purple-300">
            <FileText className="h-3.5 w-3.5" />
            <span>Legal · Terms of Service</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-xs font-mono text-white/50">
            Last Updated: November 2026 · Effective Date: November 2026
          </p>
        </header>

        {/* Content */}
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-white/80">
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and browsing this portfolio website (<span className="text-purple-300 font-mono text-xs">samyak-anand-ai-scientist-portfolio.vercel.app</span>), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">2. Intellectual Property &amp; Code Access</h2>
            <p>
              The design, layout, written case studies, custom visuals, and interactive implementations on this website are the intellectual property of Samyak Anand, unless otherwise credited.
            </p>
            <p>
              Open-source repositories linked via GitHub are governed by their respective repository licenses (e.g., MIT, Apache 2.0). Visitors may inspect and review published source code in accordance with those licenses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">3. Professional Engagements &amp; Availability</h2>
            <p>
              The content presented on this site is provided for informational and recruitment evaluation purposes. Statements of availability, project specifications, and capabilities do not constitute a binding unilateral contract until confirmed through an executed engagement agreement or mutual written contract.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">4. Disclaimer of Warranties</h2>
            <p>
              This website and its demonstrative applications are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without warranties of any kind, whether express or implied. External demonstration endpoints hosted on third-party cloud tiers (e.g., Vercel, Render) are subject to third-party availability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">5. Governing Jurisdiction</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the Republic of India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">6. Inquiries</h2>
            <p>
              For legal inquiries, intellectual property permissions, or enterprise engagements, please contact:
            </p>
            <p className="font-mono text-xs text-purple-300">
              Email: samyak.g.anand@gmail.com
            </p>
          </section>
        </div>

        {/* Minimal Bottom Bar */}
        <footer className="mt-16 border-t border-white/10 pt-6 text-[12px] sm:text-[13px] text-white/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>&copy; {currentYear} Samyak Anand. All rights reserved.</p>
          <nav className="flex items-center gap-2">
            <Link href="/" className="hover:text-purple-300 transition-colors">Portfolio Home</Link>
            <span className="text-white/20">·</span>
            <Link href="/privacy" className="hover:text-purple-300 transition-colors">Privacy Policy</Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
