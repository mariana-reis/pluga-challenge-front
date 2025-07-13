import type { Metadata } from 'next'

import { Hero } from '@/features/tools/components/Hero'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home - Ferramentas Integradas'
}

export default function Home() {
  return <Hero />
}
