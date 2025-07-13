import type { Metadata } from 'next'

import { Footer } from '@/shared/layout/Footer'
import { NavBar } from '@/shared/layout/NavBar'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Pluga',
  description: 'Ferramentas Integradas'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-base-200 text-base-content antialiased">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
