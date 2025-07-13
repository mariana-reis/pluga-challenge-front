import { act, fireEvent, render, screen } from '@testing-library/react'

import { RecentlyViewedTools } from '@/features/tools/components/RecentlyViewedTools'
import { useTools } from '@/features/tools/hooks/useTools'
import type { ToolsContextType } from '@/features/tools/types/context'
import type { Tool } from '@/features/tools/types/tool'

jest.mock('@/features/tools/hooks/useTools')
const mockedUseTools = useTools as jest.MockedFunction<
  () => Partial<ToolsContextType>
>

const mockTool: Tool = {
  app_id: 'pagar_me',
  name: 'Pagar.me',
  icon: 'https://assets.pluga.co/apps/icons/pagar_me/pagar_me-icon.svg',
  color: '#95C93F',
  link: 'https://pluga.co/ferramentas/pagar_me/integracao/'
}

describe('RecentlyViewedTools', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('deve não renderizar se não houver ferramentas visualizadas', () => {
    mockedUseTools.mockReturnValue({
      lastViewedTools: [],
      selectTool: jest.fn()
    })

    const { container } = render(<RecentlyViewedTools />)
    expect(container.firstChild).toBeNull()
  })

  it('deve renderizar ferramentas visualizadas recentemente', () => {
    mockedUseTools.mockReturnValue({
      lastViewedTools: [mockTool],
      selectTool: jest.fn()
    })

    render(<RecentlyViewedTools />)

    expect(
      screen.getByRole('heading', { name: /visualizados recentemente/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: `Abrir detalhes da ferramenta ${mockTool.name}`
      })
    ).toBeInTheDocument()
  })

  function testLoadingBehavior(triggerEvent: () => void) {
    const selectTool = jest.fn()

    mockedUseTools.mockReturnValue({
      lastViewedTools: [mockTool],
      selectTool
    })

    render(<RecentlyViewedTools />)

    const button = screen.getByRole('button', {
      name: `Abrir detalhes da ferramenta ${mockTool.name}`
    })

    act(() => {
      triggerEvent()
    })

    expect(button).toBeDisabled()
    expect(selectTool).toHaveBeenCalledWith(mockTool)

    act(() => {
      jest.advanceTimersByTime(900)
    })

    expect(button).not.toBeDisabled()
  }

  it('deve ativar loading ao clicar em uma ferramenta e remover após 900ms', () => {
    testLoadingBehavior(() => {
      fireEvent.click(
        screen.getByRole('button', {
          name: `Abrir detalhes da ferramenta ${mockTool.name}`
        })
      )
    })
  })

  it('deve chamar selectTool ao pressionar Enter e remover loading após 900ms', () => {
    testLoadingBehavior(() => {
      fireEvent.keyDown(
        screen.getByRole('button', {
          name: `Abrir detalhes da ferramenta ${mockTool.name}`
        }),
        { key: 'Enter', code: 'Enter' }
      )
    })
  })

  it('deve aplicar classes corretas quando horizontal é true', () => {
    mockedUseTools.mockReturnValue({
      lastViewedTools: [mockTool],
      selectTool: jest.fn()
    })

    const { container } = render(<RecentlyViewedTools horizontal />)

    const aside = container.querySelector('aside')
    const toolListContainer = container.querySelector('div.flex')

    expect(aside).toHaveClass('w-full')
    expect(aside).toHaveClass('overflow-x-auto')

    expect(toolListContainer).toHaveClass('flex-row', 'min-w-max')
  })
})
