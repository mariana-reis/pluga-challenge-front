'use client'
import { useContext } from 'react'

import { ToolsContext } from '@/features/tools/context/ToolsProvider'

export const useTools = () => {
  const context = useContext(ToolsContext)

  if (!context) {
    throw new Error('useTools deve ser usado dentro de um <ToolsProvider>')
  }

  return context
}
