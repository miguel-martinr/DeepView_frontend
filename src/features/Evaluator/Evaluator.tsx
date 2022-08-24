import { createNextState } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { deepViewApi } from '../../api/api';
import { useAppDispatch } from '../../app/hooks';
import { setVideoStatus } from '../../state/workspace-slice';
import { defaultParameters, ProcessingParameters } from '../../types/Parameters';
import { VideoStatus } from '../../types/Video';
import { useFormFields } from '../../utils/form-hook';
import { mergeArrayOfObjects } from '../../utils/objects';
import { StatusWatcher } from '../../utils/StatusWatcher';
import { FilterParameters, Parameter } from './FilterParameters';

export interface EvaluatorProps {
  videoId: string, // Html video element id 
  videoName: string,
  statusWatcherRef: React.MutableRefObject<StatusWatcher>,
  watchStatusCallBack: () => void,
}

export interface ParticleObject {
  circle: [[number, number], number],
  area: number
}

const thresholdParameters: Parameter[] = [
  { id: 'thresh', name: 'Umbral', type: 'number', defaultValue: '20' }
]

const { kernelWidth: defaultWidth, kernelHeight: defaultHeight } = defaultParameters.preprocess.top_hat;

const tophatParameters: Parameter[] = [
  { id: 'kernelWidth', name: 'Ancho del kernel', type: 'number', defaultValue: defaultWidth },
  { id: 'kernelHeight', name: 'Alto del kernel', type: 'number', defaultValue: defaultHeight }
]

export const Evaluator = ({ 
  videoId, 
  videoName, 
  statusWatcherRef, 
  watchStatusCallBack: wacthStatus }: EvaluatorProps) => {

  // Useful hooks
  const dispatch = useAppDispatch();

  // Internal state
  const [scaled, setScaled] = useState<boolean>(false);
  const statusWatcher = statusWatcherRef.current;
  const canvasId = 'frameCanvas';

  // Parameters fields setters 
  const [thresholdFields, setThresholdFields] = useFormFields(mergeArrayOfObjects(thresholdParameters
    .map(p => ({ [p.id]: p.defaultValue }))
  ))

  const [tophatFields, setTophatFields] = useFormFields(mergeArrayOfObjects(tophatParameters
    .map(p => ({ [p.id]: p.defaultValue }))
  ))

  // Effects
  useEffect(() => {
    selectFrame()
    fetchParametersForVideo()
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
    // frameIndex -= (frameIndex > 0 ? 1 : 0);

    const params = getProcessingParameters();
    deepViewApi.processFrame(videoName, frameIndex, params)
      .then((objects: ParticleObject[]) => {
        for (const object of objects)
          drawObject(ctx, object)
      })
  }

  const getProcessingParameters = (): ProcessingParameters => {
    const parameters: ProcessingParameters = {
      preprocess: {
        top_hat: {
          kernelWidth: parseInt(tophatFields.kernelWidth),
          kernelHeight: parseInt(tophatFields.kernelHeight),
        }
      },

      process: {
        threshold: {
          thresh: parseInt(thresholdFields.thresh),
        }
      }
    }

    return parameters;
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

  const saveParameters = () => {
    const parameters = getProcessingParameters();
    deepViewApi.saveParameters(videoName, parameters)
      .then((res) => {
        console.log(res.message);
      })
      .catch(err => alert(`Error guardando los parámetros :(  : ${err.message}`));
  }


  const fetchParametersForVideo = async () => {
    const parameters = await deepViewApi.getParametersForVideo(videoName);

    // Set parameters
    const { kernelWidth, kernelHeight } = parameters.preprocess.top_hat;
    setTophatFields({
      kernelWidth,
      kernelHeight,
    });

    const { thresh } = parameters.process.threshold;
    setThresholdFields({
      thresh,
    });
  }

  const handleProcess = () => {
    deepViewApi.processVideo(videoName).then((res: any) => {
      statusWatcher.clear();
      statusWatcher.setCurrentStatus('processing');
      wacthStatus();
      updateVideoStatus('processing');
      console.log(`Vídeo ${videoName} is being processed: ${res}`);
    }).catch(err => alert(`Error al procesar vídeo :( -> ${err.message}`));
  }

  const updateVideoStatus = (status: VideoStatus) => {
    dispatch(setVideoStatus({ videoName, status }));
  }

  return (
    <>
      <Row className='mt-2'>
        <Col>
          <canvas width={635} height={357} id={canvasId} />
        </Col>
      </Row>
      {/* Under frame Buttons */}
      <Row>
        <Col>
          <Button
            onClick={() => selectFrame()}
            className='me-1'
          >
            Seleccionar frame actual
          </Button>
          <Button
            variant='success'
            onClick={() => processFrame()}
            className='me-1'
          >
            Procesar frame
          </Button>
          <Button
            variant='warning'
            onClick={() => { handleProcess() }}
          >
            Procesar vídeo
          </Button>
        </Col>
      </Row>
      {/* Parameters */}
      <Row className='mt-3'>
        <Col>
          <h4>Parámetros</h4>
        </Col>
      </Row>

      {/* Threshold */}
      <Row>
        <Col>
          <FilterParameters
            filterName='Binarizado'
            parameters={[
              { id: 'thresh', name: 'Umbral', type: 'number', defaultValue: thresholdFields.thresh }
            ]}
            setter={setThresholdFields}
          />
        </Col>
      </Row>

      {/* Tophat */}
      <Row>
        <Col>
          <FilterParameters
            filterName='Top-hat'
            parameters={[
              { id: 'kernelWidth', name: 'Ancho del kernel', type: 'number', defaultValue: tophatFields.kernelWidth },
              { id: 'kernelHeight', name: 'Alto del kernel', type: 'number', defaultValue: tophatFields.kernelHeight }
            ]}
            setter={setTophatFields}
          />
        </Col>
      </Row>

      {/* Save button */}
      <Row className='mt-1'>
        <Col>
          <Button
            variant='primary'
            onClick={() => saveParameters()}
          >
            Guardar parámetros
          </Button>
        </Col>
      </Row>
    </>
  )
}
