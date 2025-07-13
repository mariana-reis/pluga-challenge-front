import { House, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function NavBar() {
  return (
    <header className="navbar bg-white shadow-sm px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        <Link
          href="/"
          aria-label="Página Inicial"
          className="inline-flex items-center gap-2"
        >
          <Image
            src="https://manage.pluga.co/static/images/pluga-alltype-blue.svg"
            alt="Logo da Pluga com texto azul"
            width={180}
            height={40}
            className="w-[90px] h-auto"
            priority
          />
        </Link>

        <nav className="flex gap-3 ml-4">
          <Link
            href="/"
            className="btn rounded-full bg-blue-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-blue-600"
          >
            <House />
            Home
          </Link>

          <Link
            href="/tools"
            className="btn rounded-full bg-green-400 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-500"
          >
            <Wrench />
            Ferramentas
          </Link>
        </nav>
      </div>
    </header>
  )
}
