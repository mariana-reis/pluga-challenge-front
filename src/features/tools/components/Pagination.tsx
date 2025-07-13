'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  const getPagesToShow = () => {
    const pages: number[] = []
    const start = Math.max(currentPage - 2, 1)
    const end = Math.min(currentPage + 2, totalPages)

    for (let page = start; page <= end; page++) {
      pages.push(page)
    }

    return pages
  }

  const pages = getPagesToShow()

  return (
    <nav
      aria-label="Navegação de páginas"
      className="flex justify-center space-x-1"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className={`px-2 py-1 rounded-md border flex items-center justify-center ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {pages[0] > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded-md border bg-white text-gray-700 hover:bg-gray-100"
          >
            1
          </button>
          {pages[0] > 2 && (
            <span className="px-2 py-1 text-gray-500 select-none">...</span>
          )}
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`px-3 py-1 rounded-md border ${
            page === currentPage
              ? 'bg-blue-600 text-white cursor-default'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-2 py-1 text-gray-500 select-none">...</span>
          )}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded-md border bg-white text-gray-700 hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
        className={`px-2 py-1 rounded-md border flex items-center justify-center ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}
