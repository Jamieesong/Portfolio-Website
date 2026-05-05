import type { Metadata } from 'next'
import { Syncopate, Space_Mono } from 'next/font/google'
import './globals.css'

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-syncopate',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jamie Chaewon Song — Product & UX Designer',
  description: 'Portfolio of Jamie Chaewon Song — NYU IMA, UI/UX designer building products people actually enjoy using.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syncopate.variable} ${spaceMono.variable}`}>
      <body className="bg-bone min-h-screen">
        {children}
      </body>
    </html>
  )
}
