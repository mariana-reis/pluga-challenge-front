import { fireEvent, render, screen } from '@testing-library/react'

import { Pagination } from '@/features/tools/components/Pagination'

describe('Pagination', () => {
  const setup = (currentPage: number, totalPages: number = 10) => {
    const onPageChange = jest.fn()

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    )

    return { onPageChange }
  }

  it('deve renderizar os botões de navegação corretamente', () => {
    setup(5)

    expect(screen.getByRole('button', { name: '5' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getAllByText('...').length).toBeGreaterThan(0)
  })

  it('deve desativar o botão "Página anterior" na primeira página', () => {
    setup(1)

    expect(
      screen.getByRole('button', { name: 'Página anterior' })
    ).toBeDisabled()
  })

  it('deve desativar o botão "Próxima página" na última página', () => {
    setup(10, 10)

    expect(
      screen.getByRole('button', { name: 'Próxima página' })
    ).toBeDisabled()
  })

  it('deve chamar onPageChange ao clicar em um número de página', () => {
    const { onPageChange } = setup(3)

    fireEvent.click(screen.getByRole('button', { name: '4' }))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('deve chamar onPageChange ao clicar no botão "Próxima página"', () => {
    const { onPageChange } = setup(2)

    fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('deve chamar onPageChange ao clicar no botão "Página anterior"', () => {
    const { onPageChange } = setup(3)

    fireEvent.click(screen.getByRole('button', { name: 'Página anterior' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})
