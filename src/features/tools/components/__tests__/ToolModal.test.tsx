import { render, screen } from '@testing-library/react'
import React from 'react'

import { useTools } from '@/features/tools/hooks/useTools'

import { ToolModal } from '../ToolModal'

import '@testing-library/jest-dom'

jest.mock('@/features/tools/hooks/useTools')
jest.mock('../RecentlyViewedTools', () => ({
  RecentlyViewedTools: () => <div data-testid="recently-viewed-tools" />
}))

beforeAll(() => {
  if (!window.HTMLDialogElement.prototype.showModal) {
    window.HTMLDialogElement.prototype.showModal = jest.fn()
  } else {
    jest
      .spyOn(window.HTMLDialogElement.prototype, 'showModal')
      .mockImplementation(() => {})
  }
})

beforeEach(() => {
  jest.clearAllMocks()
})

const mockedUseTools = useTools as jest.Mock

describe('ToolModal', () => {
  it('deve não renderizar nada quando selectedTool for null', () => {
    mockedUseTools.mockReturnValue({
      selectedTool: null,
      modalRef: { current: null }
    })

    const { container } = render(<ToolModal />)
    expect(container.firstChild).toBeNull()
  })

  it('deve renderizar modal e chamar showModal quando selectedTool existir', () => {
    const modalRef = React.createRef<HTMLDialogElement>()

    mockedUseTools.mockReturnValue({
      selectedTool: {
        name: 'Pagar.me',
        icon: 'https://assets.pluga.co/apps/icons/pagar_me/pagar_me-icon.svg',
        color: '#95C93F',
        link: 'https://pluga.co/ferramentas/pagar_me/integracao/'
      },
      modalRef
    })

    render(<ToolModal />)

    expect(
      screen.getByRole('heading', {
        name: /Pagar.me/i,
        hidden: true
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /acessar ferramenta/i,
        hidden: true
      })
    ).toHaveAttribute(
      'href',
      'https://pluga.co/ferramentas/pagar_me/integracao/'
    )

    expect(screen.getByTestId('recently-viewed-tools')).toBeInTheDocument()
    expect(window.HTMLDialogElement.prototype.showModal).toHaveBeenCalled()
  })
})
