import { fireEvent, render, screen } from '@testing-library/react'

import { SearchInput } from '@/features/tools/components/SearchInput'

describe('SearchInput', () => {
  it('deve renderizar o input com valor e placeholder corretos', () => {
    render(<SearchInput value="teste" onChange={() => {}} />)

    const input = screen.getByRole('searchbox', { name: /buscar ferramentas/i })
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('teste')
    expect(input).toHaveAttribute('placeholder', 'Buscar +100 ferramentas')
  })

  it('deve chamar onChange com o valor digitado', () => {
    const onChange = jest.fn()
    render(<SearchInput value="" onChange={onChange} />)

    const input = screen.getByRole('searchbox', { name: /buscar ferramentas/i })

    fireEvent.change(input, { target: { value: 'novo valor' } })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('novo valor')
  })
})
