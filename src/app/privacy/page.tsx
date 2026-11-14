import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Samyak Anand — Applied AI Engineer',
  description: 'Privacy policy for Samyak Anand’s engineering portfolio, contact interactions, and data protection practices.',
};

export default function PrivacyPolicyPage() {
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
            <Shield className="h-3.5 w-3.5" />
            <span>Legal · Data Protection</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs font-mono text-white/50">
            Last Updated: November 2026 · Effective Date: November 2026
          </p>
        </header>

        {/* Content */}
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-white/80">
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">1. Introduction &amp; Scope</h2>
            <p>
              This Privacy Policy outlines how Samyak Anand (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) collects, uses, and safeguards information when you visit this personal portfolio website (<span className="text-purple-300 font-mono text-xs">samyak-anand-ai-scientist-portfolio.vercel.app</span>) or reach out through direct contact channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">2. Information Collection</h2>
            <p>
              This website is primarily an informational portfolio designed to showcase engineering case studies, machine learning systems, and professional experience.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-white/75">
              <li>
                <strong className="text-white">Contact Form Inquiries:</strong> When you submit a message via the contact form, you provide your name, email address, project scope, and message content. This data is used solely to reply to your inquiry.
              </li>
              <li>
                <strong className="text-white">Technical Analytics:</strong> Non-personally identifiable telemetry (browser type, referrers, and device category) may be processed by hosting infrastructure (e.g., Vercel) strictly for performance, uptime monitoring, and security diagnostics.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">3. Third-Party Integrations</h2>
            <p>
              Messages transmitted through the contact form are dispatched securely using established email routing providers (EmailJS). No data submitted through this website is sold, rented, monetized, or shared with commercial advertising brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">4. Cookies &amp; Tracking</h2>
            <p>
              This portfolio does not utilize cross-site tracking cookies, behavioral marketing trackers, or third-party advertising cookies. Minimal session storage may be used purely to preserve client-side UI states during your active visit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white">5. Direct Contact &amp; Rights</h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request the deletion of any communication history you have sent, please reach out directly:
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
            <Link href="/terms" className="hover:text-purple-300 transition-colors">Terms &amp; Conditions</Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
