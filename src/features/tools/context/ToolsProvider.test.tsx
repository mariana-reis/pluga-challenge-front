import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useTools } from '@/features/tools/hooks/useTools'
import { fetchTools } from '@/features/tools/services/toolsApi'
import type { Tool } from '@/features/tools/types/tool'
import {
  getLocalStorage,
  setLocalStorage
} from '@/features/tools/utils/localStorage'

import { ToolsProvider } from './ToolsProvider'

jest.mock('@/features/tools/services/toolsApi', () => ({
  fetchTools: jest.fn()
}))
jest.mock('@/features/tools/utils/localStorage', () => ({
  getLocalStorage: jest.fn(),
  setLocalStorage: jest.fn()
}))

const mockTool: Tool = {
  app_id: 'slack',
  name: 'Slack',
  icon: 'https://slack.com/icon.svg',
  color: '#4A154B',
  link: 'https://pluga.co/ferramentas/slack/integracao/'
}
const mockTools = [mockTool]

function Consumer() {
  const ctx = useTools()
  if (!ctx) return null
  return (
    <div>
      <p>Tool count: {ctx.tools.length}</p>
      <button type="button" onClick={() => ctx.selectTool(mockTool)}>
        Select
      </button>
      {ctx.selectedTool && <p>Selected: {ctx.selectedTool.name}</p>}
    </div>
  )
}

function renderWithProvider() {
  return render(
    <ToolsProvider>
      <Consumer />
    </ToolsProvider>
  )
}

describe('ToolsProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it.each([
    ['array válido no localStorage', ['slack']],
    ['null no localStorage', null],
    ['undefined no localStorage', undefined]
  ])(
    'deve carregar ferramentas e restaurar histórico com %s',
    async (_, storedIds) => {
      ;(fetchTools as jest.Mock).mockResolvedValue(mockTools)
      ;(getLocalStorage as jest.Mock).mockReturnValue(storedIds)

      renderWithProvider()

      await waitFor(() => {
        expect(fetchTools).toHaveBeenCalled()
        expect(getLocalStorage).toHaveBeenCalledWith('lastSelectedApps')
        expect(screen.getByText('Tool count: 1')).toBeInTheDocument()
      })
    }
  )

  it('deve registrar erro no console se falhar ao carregar ferramentas', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    ;(fetchTools as jest.Mock).mockRejectedValue(new Error('Falha na API'))

    renderWithProvider()

    await waitFor(() => {
      expect(fetchTools).toHaveBeenCalled()
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao carregar ferramentas:',
      expect.any(Error)
    )

    consoleErrorSpy.mockRestore()
  })

  it('deve selecionar ferramenta com delay e atualizar histórico corretamente', async () => {
    ;(fetchTools as jest.Mock).mockResolvedValue(mockTools)
    ;(getLocalStorage as jest.Mock).mockReturnValue([])

    renderWithProvider()

    const button = await screen.findByText('Select')

    act(() => {
      fireEvent.click(button)
    })

    act(() => {
      jest.advanceTimersByTime(700)
    })

    await waitFor(() => {
      expect(screen.getByText('Selected: Slack')).toBeInTheDocument()
    })

    expect(setLocalStorage).toHaveBeenCalledWith('lastSelectedApps', ['slack'])
  })
})
