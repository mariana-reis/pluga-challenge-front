import {
  getLocalStorage,
  setLocalStorage
} from '@/features/tools/utils/localStorage'

describe('localStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('deve ler e desserializar valor do localStorage', () => {
    localStorage.setItem('key', JSON.stringify({ foo: 'bar' }))
    const result = getLocalStorage<{ foo: string }>('key')
    expect(result).toEqual({ foo: 'bar' })
  })

  it('deve retornar null quando a chave não existe', () => {
    expect(getLocalStorage('nonexistent')).toBeNull()
  })

  it('deve serializar e gravar valor no localStorage', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem')
    setLocalStorage('key', { foo: 'bar' })
    expect(spy).toHaveBeenCalledWith('key', JSON.stringify({ foo: 'bar' }))
  })
})
