import type { Metadata } from 'next'

import { ToolBrowser } from '@/features/tools/components/ToolBrowser'
import { ToolsProvider } from '@/features/tools/context/ToolsProvider'

export const metadata: Metadata = {
  title: 'Ferramentas Integradas',
  description: 'Dasboard - Ferramentas Integradas'
}

export default function Tools() {
  return (
    <ToolsProvider>
      <ToolBrowser />
    </ToolsProvider>
  )
}
