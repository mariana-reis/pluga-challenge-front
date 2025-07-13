'use client'

import Image from 'next/image'
import { useState } from 'react'

import { useTools } from '@/features/tools/hooks/useTools'

type Props = {
  horizontal?: boolean
}

export function RecentlyViewedTools({ horizontal = false }: Props) {
  const { lastViewedTools, selectTool } = useTools()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  if (!lastViewedTools.length) return null

  function handleClick(tool: (typeof lastViewedTools)[0]) {
    setLoadingId(tool.app_id)
    selectTool(tool)
    setTimeout(() => {
      setLoadingId(null)
    }, 900)
  }

  return (
    <aside
      className={`w-full ${horizontal ? 'overflow-x-auto' : ''}`}
      aria-label="Últimas ferramentas visualizadas"
    >
      <div className="divider">
        <h2>Visualizados recentemente</h2>
      </div>

      <div
        className={`flex gap-3 ${
          horizontal ? 'flex-row min-w-max' : 'flex-col'
        }`}
      >
        {[...lastViewedTools]
          .reverse()
          .slice(0, 6)
          .map(tool => {
            const isLoading = loadingId === tool.app_id

            return (
              <button
                type="button"
                key={tool.app_id}
                onClick={() => handleClick(tool)}
                onKeyDown={e => e.key === 'Enter' && handleClick(tool)}
                disabled={isLoading}
                className={`
                  py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium
                  rounded-lg border text-gray-500 
                  transition-colors
                  ${isLoading ? 'cursor-wait' : 'cursor-pointer'}
                  border-gray-200 hover:border-blue-600 hover:text-blue-600 
                  focus:outline-hidden disabled:opacity-50
                `}
                aria-label={`Abrir detalhes da ferramenta ${tool.name}`}
              >
                <div
                  className="p-1 rounded"
                  style={{
                    backgroundColor: tool.color,
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md text-blue-600" />
                  ) : (
                    <Image
                      src={tool.icon}
                      alt={`Ícone de ${tool.name}`}
                      width={28}
                      height={28}
                    />
                  )}
                </div>
                <span className="truncate font-medium">{tool.name}</span>
              </button>
            )
          })}
      </div>
    </aside>
  )
}
