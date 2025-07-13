import { render, screen } from '@testing-library/react'

import { NavBar } from '@/shared/layout/NavBar'

describe('NavBar', () => {
  it('deve exibir a logo e os links para Home e Ferramentas com ícones', () => {
    render(<NavBar />)

    const homeLink = screen.getByRole('link', { name: /home/i })
    const toolsLink = screen.getByRole('link', { name: /ferramentas/i })
    const logo = screen.getByAltText(/logo da pluga com texto azul/i)

    expect(homeLink).toBeInTheDocument()
    expect(toolsLink).toBeInTheDocument()

    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute(
      'src',
      expect.stringContaining('pluga-alltype-blue.svg')
    )

    expect(homeLink.querySelector('svg')).toBeInTheDocument()
    expect(toolsLink.querySelector('svg')).toBeInTheDocument()
  })
})
