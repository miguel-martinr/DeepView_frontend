import { ChartData } from 'chart.js';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { BASE_URL, deepViewApi } from '../api/api';
import { useAppSelector } from '../app/hooks';
import { BarChart } from '../features/Charts/BarChart';
import { StatusButton } from '../features/StatusButton/StatusButton';
import { VideoInfoCard } from '../features/VideoInfo/VideoInfoCard';
import { VideoPlayer } from '../features/VideoPlayer/VideoPlayer';
import { getFormattedTime } from '../utils/time';


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



  const [videoData, setVideoData] = useState({ frames: [], particlesAverage: [] });
  const [visibleData, setVisibleData] = useState<ChartData<"bar", (number | null)[], unknown>>({
    labels: [],
    datasets: [
      {
        label: '',
        backgroundColor: '#f87979',
        data: []
      }
    ]
  });


  useEffect(() => {
    fetchData();
  }, [])

  // Handlers
  const fetchData = async () => {
    if (!video) return;
    deepViewApi.fetchParticlesAverageQuantity(video.name, 'minutes')
      .then((data: number[]) => {
        setVisibleData({
          labels: data.map((_, i) => getFormattedTime(i)),
          datasets: [
            {
              label: 'Media de partículas por frame',
              backgroundColor: '#f87979',
              data,
            }
          ]
        });
      })
      .catch(err => console.warn(err.message));
  }



  return (
    !video ? null :
      <Container className='p-5' fluid>
        <Row>
          <Col sm={4}>
            <Row>
              <Col><VideoPlayer src={deepViewApi.http.getUri() + 'videos/' + video.name} /></Col>
            </Row>
            <Row>
              <Col><VideoInfoCard video={video}></VideoInfoCard></Col>
            </Row>
          </Col>
          <Col sm={8}>
            <Row>
              <Col className='text-end'>
                <StatusButton status={video.status} />
              </Col>
            </Row>
            <Row>
              <Col>
                <BarChart
                  height={100}

                  data={visibleData}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
  )
}
