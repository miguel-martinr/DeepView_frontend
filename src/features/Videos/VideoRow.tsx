import React, { useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { deepViewApi } from '../../api/api'
import { Video } from '../../pages/VideosPage'
import './Videos.css'

interface VideoRowProps {
  video: Video
}

export type VIDEO_STATUS = 'PROCESSING' | 'PROCESSED' | 'STOPPED' | 'UNPROCESSED';

export const VideoRow = (props: VideoRowProps) => {
  const { video } = props;

  // Internal state
  const [status, setStatus] = useState<VIDEO_STATUS>("UNPROCESSED");
  const intervalRef = useRef<any>(null);



  // Handlers
  const handleProcess = () => {
    deepViewApi.processVideo(video.name).then((res: any) => {
      setStatus("PROCESSING");
      
      intervalRef.current = setInterval(() => {
        checkStatus();
      }, 5000);

      console.log("INTERVAL : ", intervalRef.current);
      console.log(res);
    });
  }

  const handleStopProcessing = () => {
    deepViewApi.stopProcessing(video.name).then((res: any) => {
      setStatus("STOPPED");
      clearInterval(intervalRef.current);
    });
  }

  const checkStatus = () => {
    deepViewApi.checkVideoStatus(video.name).then((status: VIDEO_STATUS) => {
      setStatus(status); 
      console.log(`Status checkef: ${status}`);

      
      if (status !== 'PROCESSING') {
        clearCheckStatusInterval();
      }     
    });
  }

  const clearCheckStatusInterval = () => {
    clearInterval(intervalRef.current);
    console.log('Interval cleared --> ', intervalRef.current);
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
        </Row>
        <Row>
          <div className="btn-group" role="group" aria-label="Basic example">
            <Button>Abrir</Button>
            <Button
              variant='success'
              onClick={status === 'PROCESSING' ? handleStopProcessing : handleProcess}
              
            >
              {status === 'PROCESSING' ? 'Detener' : 'Procesar'}
            </Button>
            <Button disabled variant="warning">{status}</Button>
          </div>
        </Row>
      </Col>
    </Row>
  )
}
