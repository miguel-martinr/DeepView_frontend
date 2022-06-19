import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { BASE_URL, deepViewApi } from '../api/api';
import { useAppSelector } from '../app/hooks';
import { BarChart } from '../features/Charts/BarChart';
import { StatusButton } from '../features/StatusButton/StatusButton';
import { VideoInfoCard } from '../features/VideoInfo/VideoInfoCard';
import { VideoPlayer } from '../features/VideoPlayer/VideoPlayer';


interface Particle {
  x: number,
  y: number,
  radius: number,
  area: number,
}

interface Frame {
  particles: Particle[],
}

interface VideoData {
  frames: Frame[],
}


export const VideoPage = () => {

  // Internal state
  const video = useAppSelector(({ workspace }) => workspace.video);



  const [videoData, setVideoData] = useState<VideoData>({ frames: [] });



  useEffect(() => {
    fetchData();
  }, [])

  // Handlers
  const fetchData = async () => {
    if (!video) return;
    deepViewApi.fetchVideoData(video.name)
      .then(data => setVideoData(data))
      .catch(err => console.warn(err.message));
  }



  return (
    !video ? null :
      <Container className='p-5' fluid>
        <Row>
          <Col sm={4}>
            <Row>
              <Col><VideoPlayer src={BASE_URL + 'static/videos/' + video.name} /></Col>
            </Row>
            <Row>
              <Col><VideoInfoCard video={video}></VideoInfoCard></Col>
            </Row>
          </Col>
          <Col sm={8}>
            <Row>
              <Col className='text-end'>
                <StatusButton status={'processed'}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <BarChart
                  height={100}

                  data={{
                    labels: videoData.frames.map((frame, i) => i),
                    datasets: [
                      {
                        label: 'Partículas',
                        backgroundColor: '#f87979',
                        data: videoData.frames.map(frame => frame.particles.length)
                      }
                    ]
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
  )
}
