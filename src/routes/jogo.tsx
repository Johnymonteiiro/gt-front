import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/jogo')({
  component: RouteComponent,
})

const palavraSecreta = 'REACT'

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
        <span key={i} className="letra">
          {letra}
        </span>
      ) : (
        <span key={i} className="letra">
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

        <div className="flex justify-center items-center h-dvh w-full">
          <div className="palavra">{renderPalavra()}</div>

          <div className="teclado">
            {letrasAlfabeto.map((letra) => (
              <button
                key={letra}
                onClick={() => lidarComTecla(letra)}
                disabled={letrasAdivinhadas.includes(letra)}
              >
                {letra}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
