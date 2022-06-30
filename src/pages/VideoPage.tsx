import { ChartData } from 'chart.js';
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { deepViewApi } from '../api/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BarChart } from '../features/Charts/BarChart';
import { StatusButton } from '../features/StatusButton/StatusButton';
import { VideoInfoCard } from '../features/VideoInfo/VideoInfoCard';
import { VideoPlayer } from '../features/VideoPlayer/VideoPlayer';
import { setVideo, setVideoData } from '../state/workspace-slice';
import { StatusWatcher } from '../utils/StatusWatcher';
import { Video, VideoData, VideoDataUnit, VideoStatus } from '../types/Video';
import { groupArr } from '../utils/math';
import { Evaluator } from '../features/Evaluator/Evaluator';


type VideoPageMode = 'evaluation' | 'analysis';

export const VideoPage = () => {

  const navigate = useNavigate();
  const [drawInterval, setDrawInterval] = useState(-1);
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
  const [unit, setUnit] = useState<VideoDataUnit>('hours');
  const [mode, setMode] = useState<VideoPageMode>('analysis');

  if (!video) {
    navigate(-1);
    alert('No se ha encontrado el vídeo :(');
    return null;
  }

  const videoId = "videoInput";
  const canvasId = "frameCanvas";

  const statusWatcher = new StatusWatcher({ autoClear: false, currentStatus: video.status })
  const label = unit === 'seconds' ? 'Moda de partículas cada 30 frames' :
    `Partículas por ${unit === 'minutes' ? 'minuto' : 'hora'}`;


  useEffect(() => {
    fetchData(unit);
    watchStatus();

    return () => {
      statusWatcher.clear();
    }
  }, [])

  // Handlers
  const fetchData = async (unitToFetch: VideoDataUnit) => {
    if (!video) return;
    setFetchingData(true);
    deepViewApi.fetchParticlesAverageQuantity(video.name, unitToFetch)
      .then((data: number[]) => {
        setData(data, unitToFetch)
      })
      .catch(err => {

      })
      .finally(() => setFetchingData(false));
  }

  const setData = (data: number[], targetUnit: VideoDataUnit) => {
    const units: VideoDataUnit[] = ['seconds', 'minutes', 'hours'];
    let calculatedData: any = { [targetUnit]: data };

    for (let i = units.indexOf(targetUnit) + 1; i < units.length; i++) {
      const newUnit = groupArr<number>(data, Math.pow(60, i))
        .map(group => group.reduce((sum, cur) => sum + cur, 0));
      console.log(`NEWUNIT: ${newUnit}`)
      calculatedData[units[i]] = newUnit;
    }
    dispatch(setVideoData({
      videoName: video.name,
      data: calculatedData,
    }))
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

  const updateUnit = (newUnit: VideoDataUnit) => {
    const fetchedData = video.data;
    if (fetchedData[newUnit].length === 0)
      fetchData(newUnit);
    setUnit(newUnit);
  }

  const toggleMode = () => {
    if (mode === 'analysis')
      return setMode('evaluation')
    return setMode('analysis')
  }

  return (
    !video ? null :
      <Container className='p-5' fluid>
        <Row>
          <Col sm={4}>
            <Row>
              <Col className='mb-2'>
                <Button
                  variant={mode === 'evaluation' ? 'warning' : ''}
                  onClick={() => toggleMode()}
                >
                  Evaluación
                </Button>
                <Button
                  variant={mode === 'analysis' ? 'warning' : ''}
                  onClick={() => toggleMode()}
                >
                  Análisis
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <VideoPlayer
                  src={deepViewApi.getVideoStaticPath(video.name)}
                  videoId={videoId}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <canvas id='videoCanvas'></canvas>
              </Col>
            </Row>
            <Row>
              <Col><VideoInfoCard video={video}></VideoInfoCard></Col>
            </Row>
          </Col>
          <Col sm={8}>
            <Row>
              <Col className='text-end' sm={{ span: 3, offset: 6 }}>
                <Button onClick={() => fetchData(unit)}>
                  {fetchingData ? <Spinner animation='border' size='sm' /> : 'Actualizar'}
                </Button>
              </Col>
              <Col className='text-end' sm={3}>
                <StatusButton status={video.status} />
              </Col>
            </Row>
            {
              mode === 'analysis' ?
                <>
                  <Row>
                    <Col>
                      <BarChart
                        height={100}
                        data={{
                          labels: video.data[unit].map((_, i) => i),
                          datasets: [
                            {
                              label,
                              backgroundColor: '#f87979',
                              data: video.data[unit],
                            }
                          ]
                        }}
                        unit={unit}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ButtonGroup>
                        <Button variant={unit === 'seconds' ? 'primary' : ''} className='active' onClick={() => updateUnit('seconds')}>
                          Segundos
                        </Button>
                        <Button variant={unit === 'minutes' ? 'primary' : ''} onClick={() => updateUnit('minutes')}>
                          Minutos
                        </Button>
                        <Button variant={unit === 'hours' ? 'primary' : ''} onClick={() => updateUnit('hours')}>
                          Horas
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </>
                :
                <Evaluator videoId={videoId} videoName={video.name}/>
            }
          </Col>
        </Row>
      </Container>
  )
}
