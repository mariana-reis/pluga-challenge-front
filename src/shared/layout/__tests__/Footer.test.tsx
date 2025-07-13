import { render, screen } from '@testing-library/react'

import { Footer } from '@/shared/layout/Footer'

describe('Footer', () => {
  it('deve exibir o rodapé com o texto e o ano atual', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')

    expect(footer).toBeInTheDocument()
    expect(footer).toHaveTextContent(
      `© ${new Date().getFullYear()} Pluga. Todos os direitos reservados.`
    )
  })
})
