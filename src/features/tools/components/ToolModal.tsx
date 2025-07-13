'use client'

import { SquareArrowOutUpRight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import { useTools } from '@/features/tools/hooks/useTools'

import { RecentlyViewedTools } from './RecentlyViewedTools'

export function ToolModal() {
  const { selectedTool, modalRef } = useTools()

  useEffect(() => {
    if (selectedTool && modalRef.current) {
      if (!modalRef.current.open) {
        modalRef.current.showModal()
      }
    }
  }, [selectedTool, modalRef])

  if (!selectedTool) return null

  return (
    <dialog
      id="tool_modal"
      ref={modalRef}
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-title"
    >
      <div className="modal-box max-w-3xl p-6">
        <header className="flex justify-between items-center mb-6 border-b border-base-300 pb-3">
          <h2 id="tool-title" className="text-xl font-bold text-base-content">
            {selectedTool.name}
          </h2>
          <form method="dialog" className="m-0">
            <button
              type="submit"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>
          </form>
        </header>

        <div className="flex flex-wrap gap-4 items-center mb-4">
          <figure
            className="rounded-full p-4 flex-shrink-0"
            style={{
              backgroundColor: selectedTool.color,
              width: 80,
              height: 80
            }}
          >
            <Image
              src={selectedTool.icon}
              alt={`Ícone da ferramenta ${selectedTool.name}`}
              width={80}
              height={80}
              className="transition"
            />
          </figure>

          <div className="flex-1 min-w-[180px]">
            <Link
              href={selectedTool.link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-primary"
            >
              <SquareArrowOutUpRight size={20} />
              Acessar ferramenta
            </Link>
          </div>
        </div>

        <div className="mb-4 max-h-40 overflow-x-auto">
          <RecentlyViewedTools horizontal />
        </div>
      </div>
    </dialog>
  )
}
