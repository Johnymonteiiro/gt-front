import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import ImageAmbiente from '../../public/cenario_3.webp'
import blank_image from '../../public/image_blank.png'

export const Route = createFileRoute('/jogo')({
  component: RouteComponent,
})

const palavraSecreta = 'JAVASCRIPT'

function RouteComponent() {
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState<Array<string>>([])
  const [letrasErradas, setLetrasErradas] = useState<Array<string>>([])
  const [erros, setErros] = useState(0)

  // Letras únicas da palavra secreta em lowercase
  const letrasUnicas = [...new Set(palavraSecreta.toLowerCase().split(''))]
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const lidarComTecla = (letra: string) => {
    const lower = letra.toLowerCase()

    // Verifica duplicata
    if (letrasAdivinhadas.includes(lower)) {
      alert('Você já escolheu essa letra.')
      return
    }

    if (!letrasUnicas.includes(lower)) {
      setErros((prev) => {
        const novoErro = prev + 1
        alert(`Erros: ${novoErro}`)
        return novoErro
      })
      setLetrasErradas((prev) => [...prev, lower])
      return
    }

    // Letra correta
    setLetrasAdivinhadas((prev) => [...prev, lower])
  }

  const renderPalavra = () =>
    palavraSecreta.split('').map((letra, i) => {
      const lower = letra.toLowerCase()
      return (
        <div className="relative flex justify-between" key={i}>
          <div className="h-20 w-20 hover:cursor-pointer rounded-md">
            {letrasAdivinhadas.includes(lower) ? (
              <img
                src={`../../public/letras/${lower}.png`}
                alt={`letra-${lower}`}
              />
            ) : (
              <img src={blank_image} alt="blank_image" />
            )}
          </div>
        </div>
      )
    })

  return (
    <div className="flex justify-between text-white">
      <div className="w-[400px] h-dvh p-8 border-r border-zinc-600">
        <strong className="font-bold text-2xl text-pink-500">
          Seja Bem-vindo ao Jogo da Forca
        </strong>

        <p className="pt-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dignissimos natus tempora ex dolorum sed corporis corrupti porro sit
          eveniet.
        </p>
      </div>

      <div className="relative flex items-center justify-center flex-col w-full">
        <div>
          <img src={ImageAmbiente} className="h-lvh w-full object-cover" />
        </div>

        <div className="absolute bottom-16">
          <div className="flex">{renderPalavra()}</div>
          <div className="teclado grid grid-cols-9 gap-2">
            {alfabeto.map((letra) => (
              <button
                key={letra}
                className="p-2 bg-blue-900 hover:cursor-pointer rounded-md"
                onClick={() => lidarComTecla(letra)}
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
