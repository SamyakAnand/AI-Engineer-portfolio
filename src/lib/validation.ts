// Zod validation schemas shared by client form and server route.
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(80, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email').max(120, 'Email is too long'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
  // Honeypot — must remain empty.
  company: z.string().max(0, 'Spam detected').optional().default(''),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_MAX = 5;