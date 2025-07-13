import Image from 'next/image'

import { Tool } from '@/features/tools/types/tool'

type Props = {
  tool: Tool
  onSelect: (tool: Tool) => void
}

export function ToolCard({ tool, onSelect }: Props) {
  return (
    <div
      onClick={() => onSelect(tool)}
      className="card card-sm group bg-base-100 cursor-pointer transition shadow-sm hover:shadow-lg"
    >
      <figure style={{ backgroundColor: tool.color }} className="p-6">
        <Image
          src={tool.icon}
          alt={tool.name}
          width={64}
          height={64}
          className="transition group-hover:scale-110"
        />
      </figure>
      <div className="card-body min-h-17 text-center justify-center">
        <h4>{tool.name}</h4>
      </div>
    </div>
  )
}
