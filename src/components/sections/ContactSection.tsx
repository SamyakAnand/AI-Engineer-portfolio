'use client';

import React, { useState, useRef } from 'react';
import { contactSchema, type ContactInput } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactSection() {
  const [form, setForm] = useState<ContactInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
  });
  const [errors, setErrors] = useState<Partial<ContactInput>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const update = (field: keyof ContactInput, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const err: Partial<ContactInput> = {};
      result.error.issues.forEach((i) => {
        err[i.path[0] as keyof ContactInput] = i.message;
      });
      setErrors(err as Partial<ContactInput>);
      return;
    }
    setStatus('submitting');
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus('error');
        setServerError(data.error || 'Submission failed');
      } else {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '', company: '' });
      }
    } catch {
      setStatus('error');
      setServerError('Network error — retry');
    }
  };

  return (
    <section id="contact" className="scene scene-contact scene-graded">
      <div className="relative z-10 max-w-2xl mx-auto px-5 py-20 text-center">
        <p className="text-xs uppercase tracking-[.28em] text-accent2">Contact</p>
        <h2 className="mt-2 font-sans text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
          <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
            Let&apos;s build.
          </span>
        </h2>
        <p className="mt-3 max-w-md mx-auto text-sm leading-relaxed text-text-dim">
          Projects, collaborations, or speaking — reply and I&apos;ll get back within one working day.
        </p>

        <div className="mt-8 glass rounded-xl p-6 border border-line/60 max-w-xl mx-auto">
          {status === 'success' ? (
            <div className="py-4 text-sm text-emerald-400">
              <p>Thanks — your message was sent. I&apos;ll reply within one working day.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-3 text-xs uppercase tracking-wider text-accent2 hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4">
                <Input
                  ref={nameRef}
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Your name"
                  error={errors.name}
                  className="bg-surface"
                />
                <Input
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="Email address"
                  type="email"
                  error={errors.email}
                  className="bg-surface"
                />
                <Input
                  value={form.subject}
                  onChange={(e) => update('subject', e.target.value)}
                  placeholder="Subject"
                  error={errors.subject}
                  className="bg-surface"
                />
                <Textarea
                  ref={messageRef}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Message"
                  rows={5}
                  error={errors.message}
                  className="bg-surface"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-2"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send message'}
                </Button>
              </div>
              <p className="mt-2 text-xs text-text-dim">
                {serverError ? <span className="text-red-400">{serverError}</span> : <span>Fields marked * required.</span>}
              </p>
            </form>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4 text-xs text-text-dim">
          <a href="mailto:samyak.g.anand@gmail.com" className="hover:text-text transition-colors">samyak.g.anand@gmail.com</a>
          <a href="tel:+919623719948" className="hover:text-text transition-colors">+91 9623719948</a>
        </div>
      </div>
    </section>
  );
}
