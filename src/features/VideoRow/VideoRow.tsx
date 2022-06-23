import React, { useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { deepViewApi } from '../../api/api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { Video, VideoStatus } from '../../pages/VideosPage'
import { setCurrentVideo, setVideo } from '../../state/workspace-slice'
import { StatusWatcher } from '../../utils/fetch'
import { StatusButton } from '../StatusButton/StatusButton'
import './Videos.css'

interface VideoRowProps {
  name: string
}

export const VideoRow = ({ name }: VideoRowProps) => {
  // Global state
  const video = useAppSelector(({ workspace }) => workspace.videos[name]);
  const dispatch = useAppDispatch();

  if (!video) return null;

  // Internal state
  const navigate = useNavigate();
  const intervalRef = useRef<any>(null);



  // Handlers
  const handleProcess = () => {
    deepViewApi.processVideo(video.name).then((res: any) => {
      
      setStatus('processing');
      const watcher = new StatusWatcher();
      watcher.addEventListener('statusChanged', (e) => {
        const ev = e as CustomEvent;
        setStatus(ev.detail);
      });

      watcher.startWatching(video.name);
      console.log(res);
    });
  }

  const handleStopProcessing = () => {
    deepViewApi.stopProcessing(video.name).then((res: any) => {
      setStatus("stopped");
      clearInterval(intervalRef.current);
    });
  }

  const checkStatus = () => {
    deepViewApi.checkVideoStatus(video.name).then((status: VideoStatus) => {
      setStatus(status);
      console.log(`Status checkef: ${status}`);


      if (status !== 'processing') {
        clearCheckStatusInterval();
      }
    });
  }

  const clearCheckStatusInterval = () => {
    clearInterval(intervalRef.current);
    console.log('Interval cleared --> ', intervalRef.current);
  }

  const navigateToVideo = () => {
    dispatch(setCurrentVideo(video));
    navigate(`/video/${video.name}`);
  }

  const setStatus = (status: VideoStatus) => {
    const updatedVideo  = JSON.parse(JSON.stringify(video));
    updatedVideo.status = status;
    dispatch(setVideo(updatedVideo));
  }

  return (
    <Row className="video-row p-1 mt-1">

      {/* d-flex flex-column justify-content-center  */}
      <Col>
        <Row>
          <Col>
            <h5>{video.name}</h5>
          </Col>
          <Col className='text-end'>
            <StatusButton status={video.status} />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="btn-group" role="group" aria-label="Basic example">
              <Button onClick={() => navigateToVideo()}>Abrir</Button>
              <Button
                variant='success'
                onClick={video.status === 'processing' ? handleStopProcessing : handleProcess}
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
