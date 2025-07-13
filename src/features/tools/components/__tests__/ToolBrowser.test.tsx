import { fireEvent, render, screen } from '@testing-library/react'

import { ToolBrowser } from '@/features/tools/components/ToolBrowser'
import { useTools } from '@/features/tools/hooks/useTools'
import type { ToolsContextType } from '@/features/tools/types/context'
import type { Tool } from '@/features/tools/types/tool'

jest.mock('@/features/tools/hooks/useTools')

const mockedUseTools = useTools as jest.MockedFunction<typeof useTools>

const mockTools: Tool[] = Array.from({ length: 20 }, (_, i) => ({
  app_id: `pagar_me${i + 1}`,
  name: `Pagar.me ${i + 1}`,
  icon: 'https://assets.pluga.co/apps/icons/pagar_me/pagar_me-icon.svg',
  color: '#95C93F',
  link: 'https://pluga.co/ferramentas/pagar_me/integracao/'
}))

const mockLastViewedTools: Tool[] = [mockTools[0], mockTools[1]]

const defaultToolsContext: ToolsContextType = {
  tools: [],
  search: '',
  setSearch: jest.fn(),
  page: 1,
  setPage: jest.fn(),
  selectTool: jest.fn(),
  lastViewedTools: [],
  selectedTool: null,
  modalRef: { current: null },
  loadingToolId: null
}

describe('ToolBrowser', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve exibir loading quando a lista de ferramentas está vazia', () => {
    mockedUseTools.mockReturnValue({
      ...defaultToolsContext,
      tools: []
    })

    render(<ToolBrowser />)

    const loadingContainer = screen.getByRole('status')
    expect(loadingContainer).toBeInTheDocument()
    expect(
      loadingContainer.querySelector('span.loading-spinner')
    ).toBeInTheDocument()
  })

  it('deve mostrar mensagem quando nenhum app corresponde à busca', () => {
    mockedUseTools.mockReturnValue({
      ...defaultToolsContext,
      tools: [{ app_id: '1', name: 'Zapier', icon: '', color: '', link: '' }],
      search: 'inexistente'
    })

    render(<ToolBrowser />)

    expect(screen.getByText(/nenhum app encontrado para/i)).toBeInTheDocument()
    expect(screen.getByText(/inexistente/i)).toBeInTheDocument()
  })

  it('deve renderizar ferramentas paginadas e lista de visualizados recentemente', () => {
    const setSearch = jest.fn()
    const setPage = jest.fn()
    const selectTool = jest.fn()

    mockedUseTools.mockReturnValue({
      ...defaultToolsContext,
      tools: mockTools,
      search: '',
      setSearch,
      page: 1,
      setPage,
      selectTool,
      lastViewedTools: mockLastViewedTools
    })

    render(<ToolBrowser />)

    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /visualizados recentemente/i })
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: /abrir detalhes da ferramenta/i })
        .length
    ).toBeGreaterThan(0)

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'Tool 1' }
    })
    expect(setSearch).toHaveBeenCalledWith('Tool 1')

    fireEvent.click(screen.getByRole('button', { name: /próxima página/i }))
    expect(setPage).toHaveBeenCalledWith(2)
  })

  it('deve renderizar layout correto quando não há ferramentas visualizadas recentemente', () => {
    mockedUseTools.mockReturnValue({
      ...defaultToolsContext,
      tools: mockTools,
      lastViewedTools: []
    })

    const { container } = render(<ToolBrowser />)

    const flexContainer = container.querySelector('div.flex.gap-10')

    expect(flexContainer).toBeInTheDocument()
    expect(flexContainer?.className).toContain('flex-col items-center')
    expect(flexContainer?.className).not.toContain('lg:flex-row')
  })
})
