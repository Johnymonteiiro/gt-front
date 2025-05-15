import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/jogo')({
  component: RouteComponent,
})

const palavraSecreta = 'JAVASCRIPT'

function RouteComponent() {
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState<Array<string>>([])
  const [erros, setErros] = useState(0)

  const letrasUnicas = [...new Set(palavraSecreta.toUpperCase().split(''))]

  const lidarComTecla = (letra: string) => {
    letra = letra.toUpperCase()
    if (letrasAdivinhadas.includes(letra)) return

    setLetrasAdivinhadas((prev) => [...prev, letra])

    if (!letrasUnicas.includes(letra)) {
      //   setErros((prev) => Math.min(prev + 1, partesBoneco.length))
    }
  }

  const renderPalavra = () =>
    palavraSecreta.split('').map((letra, i) =>
      letrasAdivinhadas.includes(letra.toUpperCase()) ? (
        <span key={i} className="p-2 text-2xl">
          {letra}
        </span>
      ) : (
        <span key={i} className="p-2 text-2xl">
          _
        </span>
      ),
    )

  const letrasAlfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <div className=" flex justify-between text-white">
      <div className="w-[600px] h-dvh p-8 border-r border-zinc-600">
        <strong className="font-bold text-2xl text-pink-500">
          Seja Bem-vindo ao Jogo da Forca
        </strong>

        <p className="pt-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dignissimos natus tempora ex dolorum sed corporis corrupti porro sit
          eveniet.
        </p>
      </div>
      <div className="w-full p-8">
        <h2>Container do jogo</h2>

        <div className="flex justify-center relative flex-col items-center w-full top-40">
          <div className="palavra pb-18">{renderPalavra()}</div>

          <div className="teclado grid grid-cols-11 gap-4">
            {letrasAlfabeto.map((letra) => (
              <button
                className="py-2 px-3 text-2xl bg-pink-400 rounded-sm hover:cursor-pointer hover:bg-pink-400/50"
                key={letra}
                onClick={() => lidarComTecla(letra)}
                disabled={letrasAdivinhadas.includes(letra)}
              >
                {letra}
              </button>
            ))}
          </div>

          <p className="pt-12">
            <span className="text-pink-600">Sugestão:</span> Linguagem de
            programação baste popular 😊
          </p>
        </div>
      </div>
    </div>
  )
}
