import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import ScrollRevealProvider from '@/components/providers/ScrollRevealProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Samyak Anand | AI & Data Science',
  description:
    'Portfolio of Samyak Anand: selected AI, machine learning, and data science projects, experience, and skills.',
  applicationName: 'Samyak Anand Portfolio',
  category: 'portfolio',
  keywords: [
    'Samyak Anand',
    'AI Engineer',
    'Applied AI',
    'Machine Learning Engineer',
    'Generative AI',
    'RAG Architectures',
    'Agentic AI',
    'LangChain',
    'LangGraph',
    'PyTorch',
    'FastAPI',
    'Hyderabad AI Engineer',
  ],
  authors: [{ name: 'Samyak Anand', url: 'https://github.com/SamyakAnand' }],
  creator: 'Samyak Anand',
  metadataBase: new URL('https://samyak-anand.vercel.app'),
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
      { url: '/branding/sam-chatbot-icon.png', sizes: '256x256', type: 'image/png' },
    ],
    apple: [
      { url: '/branding/sam-chatbot-icon.png', sizes: '256x256', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'Samyak Anand Portfolio',
    title: 'Samyak Anand | AI & Data Science',
    description:
      'Portfolio of Samyak Anand, focused on applied AI, machine learning, and data science.',
    url: 'https://samyak-anand.vercel.app',
    images: [{ url: '/og-image.webp', width: 1280, height: 720, alt: 'Samyak Anand portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samyak Anand | AI & Data Science',
    description: 'Portfolio of Samyak Anand: AI, machine learning, data projects, and experience.',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#07111d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#07111d] text-[#f3f3f3] selection:bg-sky-600/30 selection:text-sky-300 font-sans antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <ScrollRevealProvider>
          {children}
          </ScrollRevealProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
