import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { deepViewApi } from '../../api/api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setVideo, setVideoSpentSeconds } from '../../state/workspace-slice'

import { VideoStatus } from '../../types/Video'
import { StatusWatcher } from '../../utils/StatusWatcher'
import { StatusButton } from '../StatusButton/StatusButton'
import { ReprocessConfirmationModal } from '../ReprocessConfirmationModal/ReprocessConfirmationModal'

import './Videos.css'
import { set } from 'immer/dist/internal'
import { useReprocess } from '../../state/hooks/useReprocess'

interface VideoRowProps {
  name: string
}


const ChipWithTooltip = ({ label, tooltip }: { label: string, tooltip: string }) => {
  return (
    <div className="badge bg-warning text-dark" data-bs-toggle="tooltip" data-bs-placement="top" title={tooltip}>
      {label}
    </div>
  )
}

const VideoMissingChip = () => {
  const tooltip = `
No se ha encontrado un archivo de vídeo que corresponda con este nombre. 
Debido a esto, algunas características no están disponibles para los datos de este vídeo.
  `;

  const styles: React.CSSProperties = {
    cursor: 'help'
  }

  return <div style={styles}>
    <ChipWithTooltip
      label="Media no disponible | ?"
      tooltip={tooltip}
    />
  </div>
}

export const VideoRow = ({ name }: VideoRowProps) => {
  // Global state
  const video = useAppSelector(({ workspace }) => workspace.videos[name]);
  const dispatch = useAppDispatch();

  if (!video) return null;

  // Internal state
  const navigate = useNavigate();
  const watcherRef = useRef<StatusWatcher>(new StatusWatcher({ autoClear: true, currentStatus: video.status, }));
  const watcher = watcherRef.current;

  useEffect(() => {
    if (video.status === 'processing')
      wacthStatus();

    if (video.status === 'processed')
      deepViewApi.checkVideoStatus(video.name)
        .then(({ spent_seconds: spentSeconds }) => {
          dispatch(setVideoSpentSeconds({ videoName: video.name, spentSeconds }))
        });

    return () => watcher.clear();
  }, [])


  // Handlers
  const handleProcess = () => {
    deepViewApi.processVideo(video.name).then((res: any) => {
      setStatus('processing');
      watcher.clear();
      watcher.setCurrentStatus('processing');
      wacthStatus();
      console.log(res);
    }).catch(err => alert(`Error al procesar vídeo :( -> ${err.message}`));
  }  

  const handleStopProcessing = () => {
    deepViewApi.stopProcessing(video.name).then((res: any) => {
      console.log('stopping')
      setStatus("stopped");
    });
  }

  const { 
    handleCancelReprocess, 
    handleConfirmReprocess, 
    getProcessingHandler,
    showReprocessModal 
  } = useReprocess({ handleProcess, handleStopProcessing });

  const wacthStatus = () => {

    watcher.addEventListener('statusChanged', (e) => {
      const ev = e as CustomEvent;
      setStatus(ev.detail);
    });

    watcher.startWatching(video.name);
  }

  const navigateToVideo = () => {
    // dispatch(setCurrentVideo(video));
    navigate(`/video/${video.name}`);
  }

  const setStatus = (status: VideoStatus) => {
    const updatedVideo = JSON.parse(JSON.stringify(video));
    updatedVideo.status = status;
    dispatch(setVideo(updatedVideo));
  }

  return (
    <Row className="video-row p-1 mt-1">
      <ReprocessConfirmationModal
        isVisible={showReprocessModal}
        onConfirm={handleConfirmReprocess}
        onCancel={handleCancelReprocess}
      />
      <Col>
        <Row>
          <Col>
            <h5>{video.name}</h5>
          </Col>
          {
            video.video_missing &&
            <Col className='text-end'>
              <VideoMissingChip />
            </Col>
          }
          <Col sm={'auto'} className='text-end'>
            <StatusButton status={video.status} />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="btn-group" role="group" aria-label="Basic example">
              <Button onClick={() => navigateToVideo()}>Abrir</Button>
              <Button
                variant={video.status === 'processing' ? 'warning' : 'success'}
                onClick={getProcessingHandler(video.status)}
              >
                {video.status === 'processing' ? 'Detener' : 'Procesar'}

              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
