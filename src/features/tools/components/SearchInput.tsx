import { Search } from 'lucide-react'
import { ChangeEvent } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: Props) {
  return (
    <div className="flex justify-center">
      <label
        htmlFor="search-input"
        role="search"
        className="relative w-full max-w-sm"
      >
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
          aria-hidden="true"
        />
        <input
          id="search-input"
          type="search"
          placeholder="Buscar +100 ferramentas"
          aria-label="Buscar ferramentas"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 transition"
        />
      </label>
    </div>
  )
}
