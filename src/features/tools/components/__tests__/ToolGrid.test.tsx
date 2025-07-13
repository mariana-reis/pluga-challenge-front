import { fireEvent, render, screen } from '@testing-library/react'

import { ToolGrid } from '@/features/tools/components/ToolGrid'
import type { Tool } from '@/features/tools/types/tool'

const mockTools: Tool[] = [
  {
    app_id: 'pagar_me',
    name: 'Pagar.me',
    icon: 'https://assets.pluga.co/apps/icons/pagar_me/pagar_me-icon.svg',
    color: '#95C93F',
    link: 'https://pluga.co/ferramentas/pagar_me/integracao/'
  },
  {
    app_id: 'slack',
    name: 'Slack',
    icon: 'https://assets.pluga.co/apps/icons/slack/slack-icon.svg',
    color: '#4A154B',
    link: 'https://pluga.co/ferramentas/slack/integracao/'
  }
]

describe('ToolGrid', () => {
  it('deve renderizar todos os ToolCards corretamente e responder ao clique', () => {
    const mockOnSelect = jest.fn()

    render(<ToolGrid tools={mockTools} onSelect={mockOnSelect} />)

    mockTools.forEach(tool => {
      expect(screen.getByText(tool.name)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText(mockTools[0].name))

    expect(mockOnSelect).toHaveBeenCalledTimes(1)
    expect(mockOnSelect).toHaveBeenCalledWith(mockTools[0])
  })
})
