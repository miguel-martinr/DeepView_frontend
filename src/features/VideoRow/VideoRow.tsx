import React, { useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { deepViewApi } from '../../api/api'
import { useAppDispatch } from '../../app/hooks'

import { Video, VideoStatus } from '../../pages/VideosPage'
import { setVideo } from '../../state/workspace-slice'
import { StatusButton } from '../StatusButton/StatusButton'
import './Videos.css'

interface VideoRowProps {
  video: Video
}

export const VideoRow = (props: VideoRowProps) => {
  // Internal state
  const { video } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<VideoStatus>(video.status);
  const intervalRef = useRef<any>(null);
  


  // Handlers
  const handleProcess = () => {
    deepViewApi.processVideo(video.name).then((res: any) => {
      setStatus('processing');
      
      intervalRef.current = setInterval(() => {
        checkStatus();
      }, 5000);
      
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
    dispatch(setVideo(video));
    navigate(`/video/${video.name}`);
  }
  

  return (
    <Row className="video-row p-1 mt-1">
      <Col sm={1}>
        <img className="card-img" src="src/favicon.svg" alt="" />
      </Col>
      {/* d-flex flex-column justify-content-center  */}
      <Col>
        <Row>
          <Col>
            <h5>{video.name}</h5>
          </Col>
          <Col className='text-end m-1'>
            <StatusButton status={status} />
          </Col>
        </Row>
        <Row>
          <div className="btn-group" role="group" aria-label="Basic example">
            <Button onClick={() => navigateToVideo()}>Abrir</Button>
            <Button
              variant='success'
              onClick={status === 'processing' ? handleStopProcessing : handleProcess}
              
            >
              {status === 'processing' ? 'Detener' : 'Procesar'}
            </Button>
            <Button disabled variant="warning">{status}</Button>
          </div>
        </Row>
      </Col>
    </Row>
  )
}
