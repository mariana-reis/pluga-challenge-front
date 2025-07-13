'use client'

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from 'react'

import { fetchTools } from '@/features/tools/services/toolsApi'
import { ToolsContextType } from '@/features/tools/types/context'
import type { Tool } from '@/features/tools/types/tool'
import {
  getLocalStorage,
  setLocalStorage
} from '@/features/tools/utils/localStorage'

export const ToolsContext = createContext<ToolsContextType | null>(null)

export function ToolsProvider({ children }: { children: ReactNode }) {
  const [tools, setTools] = useState<Tool[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [lastViewedTools, setLastViewedTools] = useState<Tool[]>([])
  const [loadingToolId, setLoadingToolId] = useState<string | null>(null)

  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const loadTools = async () => {
      try {
        const data = await fetchTools()
        setTools(data)

        const toolsMap = Object.fromEntries(
          data.map(tool => [tool.app_id, tool])
        )
        const storedIds = getLocalStorage<string[]>('lastSelectedApps') || []
        const restored = storedIds
          .map(id => toolsMap[id])
          .filter(Boolean) as Tool[]

        setLastViewedTools(restored)
      } catch (error) {
        console.error('Erro ao carregar ferramentas:', error)
      }
    }

    loadTools()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [search])

  const selectTool = useCallback(
    (tool: Tool) => {
      setLoadingToolId(tool.app_id)

      setTimeout(() => {
        setSelectedTool(tool)
        setLoadingToolId(null)

        const updatedHistory = [
          ...lastViewedTools.filter(t => t.app_id !== tool.app_id),
          tool
        ].slice(-3)

        setLastViewedTools(updatedHistory)
        setLocalStorage(
          'lastSelectedApps',
          updatedHistory.map(t => t.app_id)
        )
      }, 700)
    },
    [lastViewedTools]
  )

  return (
    <ToolsContext.Provider
      value={{
        tools,
        search,
        setSearch,
        page,
        setPage,
        selectedTool,
        selectTool,
        lastViewedTools,
        modalRef,
        loadingToolId
      }}
    >
      {children}
    </ToolsContext.Provider>
  )
}
