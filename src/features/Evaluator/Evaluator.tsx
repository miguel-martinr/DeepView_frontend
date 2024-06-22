import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { deepViewApi } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setVideoStatus } from '../../state/workspace-slice';
import { defaultParameters, ProcessingParameters } from '../../types/Parameters';
import { Video, VideoStatus } from '../../types/Video';
import { useFormFields } from '../../utils/form-hook';
import { mergeArrayOfObjects } from '../../utils/objects';
import { StatusWatcher } from '../../utils/StatusWatcher';
import { FilterParameters, Parameter } from './FilterParameters';
import { drawObjectInCanvas, ParticleObject } from '../../utils/Canvas';
import { drawCurrentFrame } from '../../utils/Canvas/drawCurrentFrameInCanvas';
import { getVideo } from '../../utils/Video';
import { useReprocess } from '../../state/hooks/useReprocess';
import { ReprocessConfirmationModal } from '../ReprocessConfirmationModal/ReprocessConfirmationModal';


export interface EvaluatorProps {
  video: Video,  
  // videoName: string,
  // videoFps: number,
  // videoMissing?: boolean
  statusWatcherRef: React.MutableRefObject<StatusWatcher>,
  watchStatusCallBack: () => void,
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
  video,  
  statusWatcherRef,
  watchStatusCallBack: wacthStatus,
}: EvaluatorProps) => {

  // Useful hooks
  const dispatch = useAppDispatch();

  // Internal state  
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
    !video.video_missing && selectFrame();
    fetchParametersForVideo()
  }, [])

  // Handlers
  const selectFrame = () => {
    drawCurrentFrame();
  }


  const processFrame = () => {

    const htmlVideo = getVideo();
    const frameIndex = Math.round(htmlVideo.currentTime * video.fps) - 1;
    const params = getLocalProcessingParameters();

    deepViewApi.processFrame(video.name, frameIndex, params)
      .then((objects: ParticleObject[]) => {
        for (const object of objects)
          drawObjectInCanvas(object)
      })
  }

  const getLocalProcessingParameters = (): ProcessingParameters => {
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


  const saveParameters = () => {
    const parameters = getLocalProcessingParameters();
    deepViewApi.saveParameters(video.name, parameters)
      .then((res) => {
        console.log(res.message);
      })
      .catch(err => alert(`Error guardando los parámetros :(  : ${err.message}`));
  }


  const fetchParametersForVideo = async () => {
    const parameters = await deepViewApi.getParametersForVideo(video.name);

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
    deepViewApi.processVideo(video.name).then((res: any) => {
      statusWatcher.clear();
      statusWatcher.setCurrentStatus('processing');
      wacthStatus();
      updateVideoStatus('processing');
      console.log(`Vídeo ${video.name} is being processed: ${res}`);
    }).catch(err => alert(`Error al procesar vídeo :( -> ${err.message}`));
  }

  const {
    handleCancelReprocess,
    handleConfirmReprocess,
    getProcessingHandler,
    showReprocessModal
  } = useReprocess({ handleProcess, handleStopProcessing: () => {} });

  const updateVideoStatus = (status: VideoStatus) => {
    dispatch(setVideoStatus({ videoName: video.name, status }));
  }

  return (
    <>
      {
        !video.video_missing &&
        <>
          <ReprocessConfirmationModal
            isVisible={showReprocessModal}
            onCancel={handleCancelReprocess}
            onConfirm={handleConfirmReprocess}
          />
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
                onClick={getProcessingHandler(video.status)}
              >
                Procesar vídeo
              </Button>
            </Col>
          </Row>
        </>
      }
      
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
