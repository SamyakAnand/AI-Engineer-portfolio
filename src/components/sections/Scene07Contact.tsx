'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle2,
  AlertCircle, ArrowUpRight, Sparkles, ExternalLink
} from 'lucide-react';

/* ─── Social Platform Icons & Links ─────────────────────────────────── */
const socialChannels = [
  {
    name: 'GitHub',
    url: 'https://github.com/SamyakAnand',
    handle: '@SamyakAnand',
    bgHover: 'hover:bg-slate-800 hover:border-slate-500 hover:text-white',
    glow: 'rgba(255,255,255,0.2)',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/samyakanand/',
    handle: 'in/samyakanand',
    bgHover: 'hover:bg-[#0077b5]/20 hover:border-[#0077b5] hover:text-[#0077b5]',
    glow: 'rgba(0,119,181,0.3)',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/samyak_anand17/',
    handle: '@samyak_anand17',
    bgHover: 'hover:bg-[#E1306C]/20 hover:border-[#E1306C] hover:text-[#E1306C]',
    glow: 'rgba(225,48,108,0.3)',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Naukri',
    url: 'https://www.naukri.com/mnjuser/profile',
    handle: 'Samyak Anand',
    bgHover: 'hover:bg-[#275df5]/20 hover:border-[#275df5] hover:text-[#4d7cfe]',
    glow: 'rgba(39,93,245,0.3)',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        {/* Modern Naukri badge glyph */}
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 7v10l8-10v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/919623719948',
    handle: '+91 96237 19948',
    bgHover: 'hover:bg-[#25D366]/20 hover:border-[#25D366] hover:text-[#25D366]',
    glow: 'rgba(37,211,102,0.3)',
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
];

/* ─── Direct Contact Redirect Cards ─────────────────────────────────── */
const directRedirects = [
  {
    type: 'Email',
    title: 'Mail me directly',
    value: 'samyak.g.anand@gmail.com',
    href: 'mailto:samyak.g.anand@gmail.com',
    icon: Mail,
    color: 'text-sky-400',
    borderHover: 'hover:border-sky-400/40 hover:bg-sky-950/30',
    btnLabel: 'Send Email',
  },
  {
    type: 'Call / WhatsApp',
    title: 'Direct Call & Messages',
    value: '+91 96237 19948',
    href: 'tel:+919623719948',
    icon: Phone,
    color: 'text-emerald-400',
    borderHover: 'hover:border-emerald-400/40 hover:bg-emerald-950/30',
    btnLabel: 'Dial Now',
  },
  {
    type: 'Location',
    title: 'Current Base',
    value: 'Hyderabad, Telangana, India',
    href: 'https://www.google.com/maps/search/?api=1&query=Hyderabad,+Telangana,+India',
    icon: MapPin,
    color: 'text-violet-400',
    borderHover: 'hover:border-violet-400/40 hover:bg-violet-950/30',
    btnLabel: 'View Map',
  },
];

export default function Scene07Contact() {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  /* EmailJS setup */
  useEffect(() => {
    const pubKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      process.env.VITE_EMAILJS_PUBLIC_KEY ||
      'RyYjzXPQkgqfzpaP_';
    if (pubKey) {
      emailjs.init(pubKey);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('Transmitting message via neural uplink…');

    const serviceID =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      process.env.VITE_EMAILJS_SERVICE_ID ||
      'service_hk72t6g';
    const templateID =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      process.env.VITE_EMAILJS_TEMPLATE_ID ||
      'template_cwuq73n';

    try {
      await emailjs.send(serviceID, templateID, {
        user_name: formData.user_name,
        from_name: formData.user_name,
        user_email: formData.user_email,
        from_email: formData.user_email,
        reply_to: formData.user_email,
        subject: formData.subject,
        message: formData.message,
      });

      setStatus('success');
      setStatusMessage('Thank you! Your message was sent successfully. Samyak will respond shortly.');
      setFormData({ user_name: '', user_email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 7000);
    } catch (err: unknown) {
      console.error('EmailJS transmit error:', err);
      setStatus('error');
      setStatusMessage('Transmission error. Please email directly at samyak.g.anand@gmail.com');
      setTimeout(() => setStatus('idle'), 7000);
    }
  };

  return (
    <section
      id="scene-contact"
      className="relative z-10 scroll-mt-24 bg-transparent px-6 py-28 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center sm:text-left"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            Get In Touch
          </div>
          <h2
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,1)' }}
          >
            Let’s make something useful<span className="text-sky-400">.</span>
          </h2>
          <p
            className="mt-4 max-w-2xl text-base font-light text-white/85 sm:text-lg"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
          >
            I’m always open to discussing cutting-edge AI systems, ML pipelines, analytics solutions,
            collaborations, or opportunities. Connect instantly below.
          </p>
        </motion.div>

        {/* ── Main Two-Column Layout ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ── Left Column: Interactive EmailJS Contact Form (7 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-white/15 bg-black/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.6)]">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-950/50 text-sky-300 shadow-[0_0_16px_rgba(56,189,248,0.3)]">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold text-white"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
                  >
                    Send Direct Message
                  </h3>
                  <p className="text-xs text-sky-200/80">Delivered straight to Samyak’s inbox</p>
                </div>
              </div>

              {/* Status Alert Banner */}
              <AnimatePresence>
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm font-medium ${
                      status === 'success'
                        ? 'border-emerald-500/40 bg-emerald-950/60 text-emerald-200'
                        : status === 'error'
                        ? 'border-rose-500/40 bg-rose-950/60 text-rose-200'
                        : 'border-sky-500/40 bg-sky-950/60 text-sky-200'
                    }`}
                  >
                    {status === 'success' ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    ) : status === 'error' ? (
                      <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
                    ) : (
                      <div className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
                    )}
                    <span>{statusMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="user_name"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sky-200"
                    >
                      Your Name
                    </label>
                    <div className="relative group">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40 group-focus-within:text-sky-400 transition-colors">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        id="user_name"
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full rounded-xl border border-white/15 bg-black/50 py-3 pl-10 pr-4 text-sm text-white placeholder-white/35 backdrop-blur-sm transition-all focus:border-sky-400 focus:bg-black/70 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="user_email"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sky-200"
                    >
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40 group-focus-within:text-sky-400 transition-colors">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        id="user_email"
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full rounded-xl border border-white/15 bg-black/50 py-3 pl-10 pr-4 text-sm text-white placeholder-white/35 backdrop-blur-sm transition-all focus:border-sky-400 focus:bg-black/70 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sky-200"
                  >
                    Subject
                  </label>
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40 group-focus-within:text-sky-400 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="AI Engineering / Data Science Opportunity"
                      required
                      className="w-full rounded-xl border border-white/15 bg-black/50 py-3 pl-10 pr-4 text-sm text-white placeholder-white/35 backdrop-blur-sm transition-all focus:border-sky-400 focus:bg-black/70 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                    />
                  </div>
                </div>

                {/* Message TextArea */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sky-200"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, problem statement, or idea…"
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-white/15 bg-black/50 p-4 text-sm text-white placeholder-white/35 backdrop-blur-sm transition-all focus:border-sky-400 focus:bg-black/70 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(56,189,248,0.4)] transition-all hover:from-sky-400 hover:to-violet-500 hover:shadow-[0_0_36px_rgba(56,189,248,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Sending Message…</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* ── Right Column: Direct Redirects & Social Channels (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            {/* Direct Contact Cards (Email, Call, Location) */}
            <div className="rounded-3xl border border-white/15 bg-black/40 p-6 sm:p-7 backdrop-blur-xl shadow-xl">
              <h4
                className="mb-4 text-lg font-bold text-white flex items-center gap-2"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,1)' }}
              >
                <Sparkles className="h-4 w-4 text-sky-400" />
                Direct Communication
              </h4>
              <p className="mb-5 text-xs text-white/75 leading-relaxed">
                Click any channel below to immediately launch a phone call, WhatsApp chat, or direct email client.
              </p>

              <div className="space-y-3">
                {directRedirects.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.type}
                      href={item.href}
                      target={item.type === 'Location' ? '_blank' : undefined}
                      rel={item.type === 'Location' ? 'noopener noreferrer' : undefined}
                      className={`group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 ${item.borderHover} hover:scale-[1.01]`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-black/50 shadow-md ${item.color} transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/50">
                            {item.title}
                          </span>
                          <span className="block text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                            {item.value}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Social & Professional Network Redirections */}
            <div className="rounded-3xl border border-white/15 bg-black/40 p-6 sm:p-7 backdrop-blur-xl shadow-xl">
              <h4
                className="mb-2 text-lg font-bold text-white"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,1)' }}
              >
                Connect on Networks
              </h4>
              <p className="mb-5 text-xs text-white/70">
                Click any profile to instantly redirect to GitHub, LinkedIn, Instagram, Naukri, or WhatsApp.
              </p>

              {/* Grid of Redirection Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialChannels.map((net) => (
                  <motion.a
                    key={net.name}
                    href={net.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className={`group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 px-3.5 transition-all duration-300 ${net.bgHover}`}
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/60 border border-white/10 text-white/80 group-hover:text-white transition-colors">
                        {net.icon}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white group-hover:text-white">
                          {net.name}
                        </span>
                        <span className="block text-[10px] text-white/60 font-mono">
                          {net.handle}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Samyak Anand. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            Available for AI &amp; Data Science Engagements
          </span>
        </footer>
      </div>
    </section>
  );
}
