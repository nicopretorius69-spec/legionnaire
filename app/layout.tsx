import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Legionnaire | Premium Tactical Gear',
    template: '%s | Legionnaire',
  },
  description: 'South African engineered tactical equipment for hunters and outdoor enthusiasts in New Zealand. Premium quality gear built for real-world performance.',
  keywords: ['tactical gear', 'hunting equipment', 'New Zealand', 'South African made', 'F-TAC Evolution'],
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: 'https://legionnaire.co.nz',
    siteName: 'Legionnaire',
    title: 'Legionnaire | Premium Tactical Gear',
    description: 'South African engineered tactical equipment for hunters and outdoor enthusiasts in New Zealand.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Legionnaire - Premium Tactical Gear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legionnaire | Premium Tactical Gear',
    description: 'South African engineered tactical equipment for hunters and outdoor enthusiasts in New Zealand.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
