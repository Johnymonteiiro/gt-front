import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center  text-white">
        <h1 className="text-7xl text-pink-400 font-extrabold">SIVIC</h1>
        <strong className="font-thin py-3 text-3xl">
          Sistema de Visão Computacional para Libras
        </strong>

        <div className="w-2xl mt-6">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            laudantium facere, voluptates nulla, non temporibus molestias
            nesciunt
          </p>

          <Link
            to="/jogo"
            className="py-2 px-8 rounded bg-blue-500 relative mt-8
             inline-block"
          >
            Ir para o jogo
          </Link>
        </div>
      </header>
    </div>
  )
}
