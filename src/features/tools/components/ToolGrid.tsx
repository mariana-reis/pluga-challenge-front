import { Tool } from '@/features/tools/types/tool'

import { ToolCard } from './ToolCard'

type Props = {
  tools: Tool[]
  onSelect: (tool: Tool) => void
}

export function ToolGrid({ tools, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {tools.map(tool => (
        <ToolCard key={tool.app_id} tool={tool} onSelect={onSelect} />
      ))}
    </div>
  )
}
