import { Tool } from '@/features/tools/types/tool'

export async function fetchTools(): Promise<Tool[]> {
  try {
    const response = await fetch('https://pluga.co/ferramentas_search.json', {
      cache: 'force-cache',
      next: {
        revalidate: 60
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar ferramentas:', error)
    return []
  }
}
