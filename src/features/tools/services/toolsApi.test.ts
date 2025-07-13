import type { Tool } from '@/features/tools/types/tool'

import { fetchTools } from './toolsApi'

describe('fetchTools', () => {
  const mockTools: Tool[] = [
    {
      app_id: 'slack',
      name: 'Slack',
      icon: 'https://slack.com/icon.svg',
      color: '#4A154B',
      link: 'https://pluga.co/ferramentas/slack/integracao/'
    }
  ]

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('deve retornar a lista de ferramentas quando o fetch for bem-sucedido', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTools)
      } as Response)
    ) as jest.Mock

    const result = await fetchTools()

    expect(global.fetch).toHaveBeenCalledWith(
      'https://pluga.co/ferramentas_search.json',
      expect.objectContaining({
        cache: 'force-cache',
        next: { revalidate: 60 }
      })
    )
    expect(result).toEqual(mockTools)
  })

  it('deve retornar array vazio e logar erro quando resposta não for ok', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500
      } as Response)
    ) as jest.Mock

    const result = await fetchTools()

    expect(result).toEqual([])
    expect(consoleError).toHaveBeenCalledWith(
      'Erro ao buscar ferramentas:',
      expect.any(Error)
    )

    consoleError.mockRestore()
  })

  it('deve retornar array vazio e logar erro quando fetch lançar exceção', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    const result = await fetchTools()

    expect(result).toEqual([])
    expect(consoleError).toHaveBeenCalledWith(
      'Erro ao buscar ferramentas:',
      expect.any(Error)
    )

    consoleError.mockRestore()
  })
})
