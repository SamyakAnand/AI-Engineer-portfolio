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

const CANONICAL_SITE_URL = 'https://samyak-anand-ai-scientist-portfolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_SITE_URL),
  title: 'Samyak Anand | Applied AI Engineer | GenAI & Python',
  description:
    'Applied AI Engineer building practical AI applications, LLM-powered workflows, retrieval systems, machine learning products and Python backend solutions.',
  applicationName: 'Samyak Anand Portfolio',
  category: 'portfolio',
  alternates: {
    canonical: CANONICAL_SITE_URL,
  },
  keywords: [
    'Samyak Anand',
    'Applied AI Engineer',
    'Generative AI',
    'Agentic AI',
    'RAG Architectures',
    'Python Backend',
    'Machine Learning',
    'FastAPI',
    'LangChain',
    'LangGraph',
    'NEXUS Autonomous Analyst',
    'ARGUS AI',
    'SHIRO CodeMind',
    'L Platform',
    'Hyderabad AI Engineer',
  ],
  authors: [{ name: 'Samyak Anand', url: 'https://github.com/SamyakAnand' }],
  creator: 'Samyak Anand',
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
    type: 'profile',
    siteName: 'Samyak Anand Portfolio',
    title: 'Samyak Anand | Applied AI Engineer | GenAI & Python',
    description:
      'Applied AI Engineer building practical AI applications, LLM-powered workflows, retrieval systems, machine learning products and Python backend solutions.',
    url: CANONICAL_SITE_URL,
    images: [{ url: '/og-image.webp', width: 1280, height: 720, alt: 'Samyak Anand — Applied AI Engineer Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samyak Anand | Applied AI Engineer | GenAI & Python',
    description:
      'Applied AI Engineer building practical AI applications, LLM-powered workflows, retrieval systems, machine learning products and Python backend solutions.',
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
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Samyak Anand',
    jobTitle: 'Applied AI Engineer',
    url: CANONICAL_SITE_URL,
    image: `${CANONICAL_SITE_URL}/portfolio/profile-samyak.png`,
    sameAs: [
      'https://github.com/SamyakAnand',
      'https://www.linkedin.com/in/samyakanand/',
    ],
    description:
      'Applied AI Engineer building practical AI applications that combine intelligent workflows, retrieval systems, machine learning, data engineering and reliable backend infrastructure.',
    knowsAbout: [
      'Applied AI',
      'Generative AI',
      'Agentic AI',
      'Large Language Models',
      'Retrieval-Augmented Generation (RAG)',
      'Machine Learning',
      'Python',
      'FastAPI',
      'Data Science',
      'Business Intelligence',
    ],
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Ballarpur Institute of Technology',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Bajaj College of Polytechnic',
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
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
