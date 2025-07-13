'use client'

import { Frown, Search } from 'lucide-react'

import { useTools } from '@/features/tools/hooks/useTools'
import { paginate } from '@/features/tools/utils/pagination'

import { Pagination } from './Pagination'
import { RecentlyViewedTools } from './RecentlyViewedTools'
import { SearchInput } from './SearchInput'
import { ToolGrid } from './ToolGrid'
import { ToolModal } from './ToolModal'

export function ToolBrowser() {
  const {
    tools,
    search,
    setSearch,
    page,
    setPage,
    selectTool,
    lastViewedTools
  } = useTools()

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  )

  const pageSize = 12
  const paginatedTools = paginate(filteredTools, page, pageSize)
  const totalPages = Math.ceil(filteredTools.length / pageSize)
  const hasRecentTools = lastViewedTools.length > 0

  const isLoading = tools.length === 0
  const noResults = !isLoading && filteredTools.length === 0

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto p-6 sm:p-10">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
        Pluga Challenge Front
      </h1>

      <SearchInput value={search} onChange={setSearch} />

      {isLoading && (
        <div
          className="flex justify-center py-20"
          role="status"
          aria-live="polite"
          aria-label="Carregando"
        >
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {noResults && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
          <div className="flex gap-6 mb-6">
            <Search size={48} className="text-gray-400" aria-hidden="true" />
            <Frown size={48} className="text-gray-400" aria-hidden="true" />
          </div>
          <p className="mb-2 text-lg font-semibold">
            Nenhum app encontrado para
            <strong className="block max-w-xs truncate">{search}</strong>
          </p>
          <p className="max-w-sm text-sm text-gray-500 mb-6">
            Tente palavras-chave diferentes ou remova os filtros para ampliar a
            busca.
          </p>
        </div>
      )}

      {!isLoading && !noResults && (
        <div
          className={`flex gap-10 ${
            hasRecentTools ? 'flex-col lg:flex-row' : 'flex-col items-center'
          }`}
        >
          {hasRecentTools && (
            <aside className="lg:w-64 w-full">
              <RecentlyViewedTools />
            </aside>
          )}

          <main className="flex-1 w-full max-w-5xl flex flex-col gap-6">
            <ToolGrid tools={paginatedTools} onSelect={selectTool} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </main>
        </div>
      )}

      <ToolModal />
    </div>
  )
}
