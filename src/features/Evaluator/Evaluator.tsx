import { createNextState } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { deepViewApi } from '../../api/api';

export interface EvaluatorProps {
  videoId: string,
  videoName: string,
}

export interface ParticleObject {
  circle: [[number, number], number],
  area: number
}

export const Evaluator = ({ videoId, videoName }: EvaluatorProps) => {

  // Internal state
  const [scaled, setScaled] = useState<boolean>(false);
  const canvasId = 'frameCanvas';


  // Effects
  useEffect(() => {
    selectFrame()
  }, [])

  // Handlers
  const selectFrame = () => {

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const video = document.getElementById(videoId) as HTMLVideoElement;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!scaled) {
      ctx.scale(0.33073, 0.33056)
      setScaled(true);
    }

    ctx.drawImage(video, 0, 0);
  }


  const processFrame = () => {
    const video = document.getElementById(videoId) as HTMLVideoElement;

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const fps = 30;
    let frameIndex = Math.round(video.currentTime * fps);
    frameIndex -= (frameIndex > 0 ? 1 : 0);
    deepViewApi.processFrame(videoName, frameIndex, {})
      .then((objects: ParticleObject[]) => {
        for (const object of objects)
          drawObject(ctx, object)
      })
  }

  const drawObject = (ctx: CanvasRenderingContext2D, object: ParticleObject) => {
    ctx.beginPath()
    const { circle } = object;
    const [center, radius] = circle;

    ctx.arc(center[0], center[1], radius * 2, 0, 2 * Math.PI, false)


    ctx.lineWidth = 5
    ctx.strokeStyle = '#00ff00';
    ctx.stroke()
  }

  return (
    <>
      <Row className='mt-2'>
        <Col>
          <canvas width={635} height={357} id={canvasId} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={() => selectFrame()}
          >
            Seleccionar frame actual
          </Button>
          <Button
            variant='success'
            onClick={() => processFrame()}
          >
            Procesar
          </Button>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col>
          Parámetros
        </Col>
      </Row>
    </>
  )
}
