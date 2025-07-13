import type { Tool } from './tool'

export interface ToolsContextType {
  tools: Tool[]
  search: string
  setSearch: (value: string) => void
  page: number
  setPage: (value: number) => void
  selectedTool: Tool | null
  selectTool: (tool: Tool) => void
  lastViewedTools: Tool[]
  modalRef: React.RefObject<HTMLDialogElement | null>
  loadingToolId: string | null
}
