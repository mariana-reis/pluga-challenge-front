import { ArrowBigRightDash } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
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

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Explore as ferramentas integradas da{' '}
          <span className="text-blue-600">Pluga</span>
        </h1>
        <p className="max-w-3xl mx-auto mb-8 text-lg text-gray-700">
          Conecte e potencialize seus negócios com uma variedade incrível de
          ferramentas que facilitam sua rotina e aumentam sua produtividade.
        </p>
        <Link
          href="/tools"
          className="btn rounded-full bg-blue-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-blue-600"
        >
          <ArrowBigRightDash />
          Comece a explorar
        </Link>
        <div className="flex flex-wrap justify-center mt-12 gap-2 max-w-4xl mx-auto">
          {categorias.map(cat => (
            <span
              key={cat}
              className="inline-block bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full select-none cursor-default"
              title={cat}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
