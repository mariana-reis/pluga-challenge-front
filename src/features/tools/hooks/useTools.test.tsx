import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

jest.mock('@/features/tools/services/toolsApi', () => ({
  fetchTools: jest.fn()
}))

jest.mock('@/features/tools/utils/localStorage', () => ({
  getLocalStorage: jest.fn(),
  setLocalStorage: jest.fn()
}))

import { ToolsProvider } from '@/features/tools/context/ToolsProvider'
import { fetchTools } from '@/features/tools/services/toolsApi'
import { getLocalStorage } from '@/features/tools/utils/localStorage'

import { useTools } from './useTools'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('useTools', () => {
  it('deve lançar erro se usado fora do ToolsProvider', () => {
    const renderSemProvider = () => renderHook(() => useTools())
    expect(renderSemProvider).toThrow(
      'useTools deve ser usado dentro de um <ToolsProvider>'
    )
  })

  it('deve fornecer contexto e inicializar estado corretamente dentro do ToolsProvider', async () => {
    ;(fetchTools as jest.Mock).mockResolvedValue([
      { app_id: 'pagar_me', name: 'Pagar.me', icon: '', color: '', link: '' }
    ])
    ;(getLocalStorage as jest.Mock).mockReturnValue(['pagar_me'])

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ToolsProvider>{children}</ToolsProvider>
    )

    const { result } = renderHook(() => useTools(), { wrapper })

    await waitFor(() => {
      expect(fetchTools).toHaveBeenCalled()
      expect(result.current.tools).toHaveLength(1)
      expect(result.current.lastViewedTools).toHaveLength(1)
    })

    expect(result.current.page).toBe(1)
    expect(result.current.search).toBe('')
    expect(typeof result.current.setSearch).toBe('function')
    expect(typeof result.current.selectTool).toBe('function')
  })
})
