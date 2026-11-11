'use client';

import { useState, type FormEvent } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Validate
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }
      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }
      if (!formData.message.trim()) {
        throw new Error('Message is required');
      }

      // Simulate API submission (in production, this would POST to a backend)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  const inputBase = `w-full px-4 py-3 rounded-lg border bg-[#12121b] text-white placeholder-[#66636a] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 focus:border-[#7c3aed]`;
  const labelBase = `block text-xs font-medium text-[#929095] uppercase tracking-wider mb-1.5`;

  return (
    <section
      id="contact"
      className="editorial-section contact-section"
      data-build-layer="Contact"
    >
      <div className="section-shell">
        <div className="section-kicker mb-6">
          <span>06</span>
          <span className="text-[#929095] uppercase tracking-[.15em] font-mono text-xs">
            GET IN TOUCH
          </span>
        </div>

        <div className="display-heading mb-4 max-w-4xl" style={{ lineHeight: 1.2 }}>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            LET&apos;S <span className="text-[#a78bfa]">BUILD.</span>
          </h2>
        </div>

        <p className="text-[#929095] mb-10 max-w-lg">
          Have a project in mind? I&apos;d love to hear about it. Drop me a message and I&apos;ll get back to you within 24 hours.
        </p>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Portfolio</h3>
              <p className="text-sm text-[#929095]">samyak-anand.vercel.app</p>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.2)' }}
              >
                <span className="text-lg text-[#a78bfa]">✉</span>
              </div>
              <div>
                <p className="text-xs font-medium text-white">Email</p>
                <a
                  href="mailto:samyak.g.anand@gmail.com"
                  className="text-sm text-[#929095] hover:text-white transition-colors"
                >
                  samyak.g.anand@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.2)' }}
              >
                <span className="text-lg text-[#a78bfa]">◆</span>
              </div>
              <div>
                <p className="text-xs font-medium text-white">Location</p>
                <p className="text-sm text-[#929095]">Hyderabad, India</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.2)' }}
              >
                <span className="text-lg text-[#a78bfa]">▷</span>
              </div>
              <div>
                <p className="text-xs font-medium text-white">Social</p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/SamyakAnand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#929095] hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/samyakanand/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#929095] hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.2)' }}
              >
                <span className="text-lg text-[#a78bfa]">↓</span>
              </div>
              <div>
                <p className="text-xs font-medium text-white">Resume</p>
                <a
                  href="/resume/samyak-anand-resume.pdf"
                  download
                  className="text-sm text-[#929095] hover:text-white transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className={labelBase}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputBase}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className={labelBase}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputBase}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className={labelBase}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className={inputBase}
                    rows={6}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex justify-center items-center gap-3 px-6 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm text-white"
                style={{
                  background: status === 'sending' ? '#555359' : '#7c3aed',
                  boxShadow: '0 4px 24px rgba(124,58,237,.3)',
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                }}
              >
                {status === 'sending' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white">
                      ✓
                    </span>
                    Message Sent
                  </>
                ) : (
                  <>
                    <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white">
                      →
                    </span>
                    Send Message
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-xs text-red-400">
                  Failed to send message. Please try again.
                </p>
              )}

              <p className="text-xs text-[#66636a]">
                * This form submits to your email address. No data is stored on a server.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
