import { ChartData } from 'chart.js';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { deepViewApi } from '../api/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BarChart } from '../features/Charts/BarChart';
import { StatusButton } from '../features/StatusButton/StatusButton';
import { VideoInfoCard } from '../features/VideoInfo/VideoInfoCard';
import { VideoPlayer } from '../features/VideoPlayer/VideoPlayer';
import { setVideo } from '../state/workspace-slice';
import { StatusWatcher } from '../utils/fetch';
import { getFormattedTime } from '../utils/time';
import { VideoStatus } from '../types/Video';




export const VideoPage = () => {

  const navigate = useNavigate();
  
  const { name } = useParams();
  if (!name) {
    navigate(-1);
    alert('No se ha encontrado el vídeo :(');
    return null;
  }
  
  const dispatch = useAppDispatch();
  

  // Internal state
  const video = useAppSelector(({ workspace }) => workspace.videos[name]);
  const [fetchingData, setFetchingData] = useState(false);

  if (!video) {
    navigate(-1);
    alert('No se ha encontrado el vídeo :(');
    return null;
  }

  const statusWatcher = new StatusWatcher({ autoClear: false, currentStatus: video.status })

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
    watchStatus();

    return () => {
      statusWatcher.clear();
    }
  }, [])

  // Handlers
  const fetchData = async () => {
    if (!video) return;
    setFetchingData(true);
    deepViewApi.fetchParticlesAverageQuantity(video.name, 'seconds')
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
      .catch(err => {
        console.warn(err.message)
        setVisibleData({
          labels: [],
          datasets: [
            {
              label: '',
              backgroundColor: '#f87979',
              data: []
            }
          ]
        })
      })
      .finally(() => setFetchingData(false));
  }

  const watchStatus = () => {
    statusWatcher.addEventListener('statusChanged', (e) => {
      const ev = e as CustomEvent;
      setStatus(ev.detail);
    });

    statusWatcher.startWatching(video.name);
  }

  const setStatus = (status: VideoStatus) => {
    const updatedVideo = JSON.parse(JSON.stringify(video));
    updatedVideo.status = status;
    dispatch(setVideo(updatedVideo));
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
              <Col className='text-end' sm={{span: 3, offset: 6}}>
              <Button onClick={() => fetchData()}>
                {fetchingData ? <Spinner animation='border' size='sm' /> : 'Actualizar'}
                </Button>
              </Col>
              <Col className='text-end' sm={3}>
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
