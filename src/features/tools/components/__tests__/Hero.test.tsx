import { render, screen } from '@testing-library/react'

import { Hero } from '@/features/tools/components/Hero'
import '@testing-library/jest-dom'

describe('Hero component', () => {
  it('deve exibir o título corretamente', () => {
    render(<Hero />)

    expect(
      screen.getByRole('heading', {
        name: /explore as ferramentas integradas da pluga/i
      })
    ).toBeInTheDocument()
  })

  it('deve exibir a descrição corretamente', () => {
    render(<Hero />)

    expect(
      screen.getByText(/conecte e potencialize seus negócios/i)
    ).toBeInTheDocument()
  })

  it('deve renderizar o botão com link para a página /tools', () => {
    render(<Hero />)

    const botao = screen.getByRole('link', { name: /comece a explorar/i })
    expect(botao).toBeInTheDocument()
    expect(botao).toHaveAttribute('href', '/tools')
  })

  it('deve exibir todas as categorias listadas', () => {
    render(<Hero />)

    const categorias = [
      'Ads analytics',
      'Assinaturas',
      'Calendario',
      'Chatbot',
      'Comunicação',
      'Contato',
      'CRM',
      'Developer tools',
      'Documento',
      'Ecommerce',
      'Email',
      'Email Transacional',
      'ERP',
      'Evento',
      'Financeiro',
      'Forms',
      'Google',
      'IA',
      'Infoproduto',
      'Marketing',
      'Marketplace',
      'Nfe',
      'Pagamento',
      'Phone SMS',
      'Planilha',
      'Pluga',
      'Projeto',
      'Redes sociais',
      'Site',
      'Suporte'
    ]

    categorias.forEach(categoria => {
      const badge = screen.getByTitle(categoria)
      expect(badge).toBeInTheDocument()
    })
  })
})
