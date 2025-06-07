import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect, useRef, useState } from 'react'

import AwsS3 from '@uppy/aws-s3'
import Uppy from '@uppy/core'

import Webcam from 'react-webcam'

export const Route = createFileRoute('/camera')({
  component: CameraWithReactWebcam,
})

export function CameraWithReactWebcam() {
  const webcamRef = useRef(null)
  const [uppy] = useState(() =>
    new Uppy({ autoProceed: false }) // desliga autoProceed para controlar manualmente
      .use(AwsS3, {
        endpoint: 'http://localhost:4569/',
        // Você pode adicionar `getUploadParameters` aqui para customizar upload, se necessário
      }),
  )

  useEffect(() => {
    uppy.on('upload-success', (file, response) => {
      console.log('Upload concluído!', file, response)
    })

    uppy.on('upload-error', (file, error, response) => {
      console.error('Erro no upload:', error, response)
    })

    return () => {
      uppy.destroy()
    }
  }, [uppy])

  const captureAndUpload = React.useCallback(async () => {
    if (!webcamRef.current) return

    const screenshot = webcamRef.current.getScreenshot({ width: 1280 })
    if (!screenshot) return

    try {
      const res = await fetch(screenshot)
      const blob = await res.blob()
      const file = new File([blob], `photo-${Date.now()}.jpg`, {
        type: blob.type,
      })

      const id = await uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
      })

      console.log('Arquivo adicionado:', id)

      const result = await uppy.upload()

      console.info('Successful uploads:', result.successful)

      if (result.failed.length > 0) {
        console.error('Errors:')
        result.failed.forEach((file) => {
          console.error(file.error)
        })
      }

      const body = uppy.getFile(id)
      console.log('Arquivo enviado com sucesso:', body)
    } catch (err) {
      console.error(
        'Falha ao converter screenshot em Blob ou enviar arquivo:',
        err,
      )
    }
  }, [uppy])

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Camera Capture</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'user' }}
        className="w-full max-w-md rounded-lg border"
      />
      <button
        onClick={captureAndUpload}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Capture & Upload
      </button>
    </div>
  )
}
