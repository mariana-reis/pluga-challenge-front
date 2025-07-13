import { paginate } from '@/features/tools/utils/pagination'

describe('paginate', () => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1)

  it('deve retornar os itens corretos da página 1', () => {
    const result = paginate(items, 1, 3)
    expect(result).toEqual([1, 2, 3])
  })

  it('deve retornar os itens corretos da página 2', () => {
    const result = paginate(items, 2, 3)
    expect(result).toEqual([4, 5, 6])
  })

  it('deve retornar os itens corretos da última página com menos itens', () => {
    const result = paginate(items, 4, 3)
    expect(result).toEqual([10])
  })

  it('deve retornar um array vazio se a página estiver fora do intervalo', () => {
    const result = paginate(items, 5, 3)
    expect(result).toEqual([])
  })

  it('deve funcionar com página 1 e pageSize maior que o número total de itens', () => {
    const result = paginate(items, 1, 20)
    expect(result).toEqual(items)
  })

  it('deve retornar vazio com pageSize zero', () => {
    const result = paginate(items, 1, 0)
    expect(result).toEqual([])
  })

  it('deve retornar vazio com página zero', () => {
    const result = paginate(items, 0, 3)
    expect(result).toEqual([])
  })

  it('deve retornar vazio com lista vazia', () => {
    const result = paginate([], 1, 5)
    expect(result).toEqual([])
  })
})
