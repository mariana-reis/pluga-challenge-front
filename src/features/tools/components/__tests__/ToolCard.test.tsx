import { fireEvent, render, screen } from '@testing-library/react'

import { ToolCard } from '@/features/tools/components/ToolCard'
import type { Tool } from '@/features/tools/types/tool'

const mockTool: Tool = {
  app_id: 'pagar_me',
  name: 'Pagar.me',
  icon: 'https://assets.pluga.co/apps/icons/pagar_me/pagar_me-icon.svg',
  color: '#95C93F',
  link: 'https://pluga.co/ferramentas/pagar_me/integracao/'
}

describe('ToolCard', () => {
  it('deve renderizar o nome e o ícone corretamente', () => {
    const mockOnSelect = jest.fn()
    render(<ToolCard tool={mockTool} onSelect={mockOnSelect} />)

    expect(screen.getByText(mockTool.name)).toBeInTheDocument()

    const img = screen.getByAltText(mockTool.name) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toBe(mockTool.icon)
  })

  it('deve chamar onSelect ao clicar no card', () => {
    const mockOnSelect = jest.fn()
    render(<ToolCard tool={mockTool} onSelect={mockOnSelect} />)

    fireEvent.click(screen.getByText(mockTool.name))

    expect(mockOnSelect).toHaveBeenCalledTimes(1)
    expect(mockOnSelect).toHaveBeenCalledWith(mockTool)
  })
})
