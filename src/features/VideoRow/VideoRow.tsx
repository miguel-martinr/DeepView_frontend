import React, { useEffect, useRef } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { deepViewApi } from '../../api/api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setCurrentVideo, setVideo } from '../../state/workspace-slice'
import { VideoStatus } from '../../types/Video'
import { StatusWatcher } from '../../utils/StatusWatcher'
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
  const watcherRef = useRef<StatusWatcher>(new StatusWatcher({ autoClear: true, currentStatus: video.status, }));
  const watcher = watcherRef.current;

  useEffect(() => {
    if (video.status === 'processing')
      wacthStatus();

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

  const wacthStatus = () => {

    watcher.addEventListener('statusChanged', (e) => {
      const ev = e as CustomEvent;
      setStatus(ev.detail);
    });

    watcher.startWatching(video.name);
  }

  const navigateToVideo = () => {
    dispatch(setCurrentVideo(video));
    navigate(`/video/${video.name}`);
  }

  const setStatus = (status: VideoStatus) => {
    const updatedVideo = JSON.parse(JSON.stringify(video));
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
                variant={video.status === 'processing' ? 'warning' : 'success'}
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
