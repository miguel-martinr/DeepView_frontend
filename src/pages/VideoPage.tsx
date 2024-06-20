import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { deepViewApi } from '../api/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BarChart } from '../features/Charts/BarChart';
import { StatusButton } from '../features/StatusButton/StatusButton';
import { VideoInfoCard } from '../features/VideoInfo/VideoInfoCard';
import { VideoPlayer } from '../features/VideoPlayer/VideoPlayer';
import { setCanvasIsScaled, setEventsData, setMode, setParticlesDataByTimeUnit, setVideoSpentSeconds, setVideoStatus } from '../state/workspace-slice';
import { StatusWatcher } from '../utils/StatusWatcher';
import { VideoDataTimeUnit, VideoStatus } from '../types/Video';
import { groupArr } from '../utils/math';
import { Evaluator } from '../features/Evaluator/Evaluator';
import { EventsCard } from '../features/Events/EventsCard';


  type VideoPageMode = 'evaluation' | 'analysis';

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
  const [unit, setUnit] = useState<VideoDataTimeUnit>('hours');
  const mode = useAppSelector(({ workspace }) => workspace.mode);
  const [percentage, setPercentage] = useState<number | undefined>(0);
  const watcherRef = useRef<StatusWatcher>(new StatusWatcher({
    autoClear: false,
    currentStatus: video.status,
    onResponse: (res) => setPercentage(res.percentage)
  }));
  const statusWatcher = watcherRef.current;

  if (!video) {
    navigate(-1);
    alert('No se ha encontrado el vídeo :(');
    return null;
  }

  const videoId = "videoInput";

  const label = unit === 'seconds' ? `Moda de partículas cada ${video.fps} frames` :
    `Partículas por ${unit === 'minutes' ? 'minuto' : 'hora'}`;


  // Effects
  useEffect(() => {
    fetchData(unit);
    watchStatus();

    return () => {
      statusWatcher.clear();
    }
  }, [])

  // Handlers
  const fetchData = async (unitToFetch: VideoDataTimeUnit) => {
    if (!video) return;

    // So the spinner is shown
    setFetchingData(true);

    // Fetch data from API
    deepViewApi.fetchVideoDataResults(video.name, unitToFetch)
      .then((data) => {
        setParticlesData(data.particles_data.by_time_unit, unitToFetch);
        dispatch(setEventsData({
          videoName: video.name,
          events: data.events_data.events,
        }));

      })
      .catch(err => {

      })
      .finally(() => setFetchingData(false));
  }

  // Calculates and sets data in those time units that are greater than the targetUnit
  const setParticlesData = (particlesByUnit: number[], targetUnit: VideoDataTimeUnit) => {

    // Calculate data 
    const units: VideoDataTimeUnit[] = ['seconds', 'minutes', 'hours'];
    let calculatedData: any = { [targetUnit]: particlesByUnit };

    for (let i = units.indexOf(targetUnit) + 1; i < units.length; i++) {
      const currentUnit = units[i];
      const particlesByCurrentTimeUnit = groupArr<number>(particlesByUnit, Math.pow(60, i))
        .map(group => group.reduce((sum, cur) => sum + cur, 0));

      console.log(`NEWUNIT: ${particlesByCurrentTimeUnit}`)
      calculatedData[currentUnit] = particlesByCurrentTimeUnit;
    }

    // Set data
    dispatch(setParticlesDataByTimeUnit({
      videoName: video.name,
      particlesByTimeUnit: calculatedData
    }))
  }

  

  const watchStatus = () => {
    // Listen for processing completion
    statusWatcher.addEventListener('isProcessed', (e) => {
      const ev = e as CustomEvent;
      setSpentSeconds(ev.detail);
    });

    // Listen for status changes
    statusWatcher.addEventListener('statusChanged', (e) => {
      const ev = e as CustomEvent;
      setStatus(ev.detail);
    });

    statusWatcher.startWatching(video.name);
  }

  const setStatus = (status: VideoStatus) => {
    dispatch(setVideoStatus({ videoName: video.name, status }));
  }

  const setSpentSeconds = (spentSeconds: number) => {
    dispatch(setVideoSpentSeconds({ videoName: video.name, spentSeconds }));
  }

  const updateParticlesDataUnit = (newUnit: VideoDataTimeUnit) => {
    const particlesData = video.data.particles.byTimeUnit;

    if (particlesData[newUnit].length === 0)
      fetchData(newUnit);

    setUnit(newUnit);
  }

  const toggleMode = () => {
    if (mode === 'analysis') {
      dispatch(setCanvasIsScaled(false));
      return dispatch(setMode('evaluation'));
    }
    return dispatch(setMode('analysis'));
  }

  return (
    !video ? null :
      <Container className='p-5' fluid>
        <Row>
          <Col sm={4}>
            {/* Mode buttons */}
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

            {/* Video player */}
            <Row>
              <Col>
              {
                !video.video_missing ?
                <VideoPlayer
                  src={deepViewApi.getVideoStaticPath(video.name)}
                  videoId={videoId}
                /> :
                // Gray box with message
                <div style={{ backgroundColor: '#e8e8e8', height: '10rem', width: '100%' }} 
                  className='d-flex justify-content-center align-items-center'
                >
                  <p className='text-center text-muted'>Archivo de vídeo no disponible</p>
                </div>
              }
              </Col>
            </Row>

            {/* Video info */}
            <Row className="mt-2">
              <Col><VideoInfoCard video={video}></VideoInfoCard></Col>
            </Row>

            {/* Events table */}
            <Row className="mt-2">
              <Col>
                <EventsCard video={video} />
              </Col>
            </Row>
          </Col>
          <Col sm={8}>
            <Row>
              <Col className='text-end'>
                <Button onClick={() => fetchData(unit)} className='me-1'>
                  {fetchingData ? <Spinner animation='border' size='sm' /> : 'Actualizar'}
                </Button>
                <StatusButton status={video.status} percentage={percentage} />
              </Col>
            </Row>
            {
              mode === 'analysis' ?
                <>
                  <Row className='mt-1 ms-1'>
                    <Col><h2>Partículas</h2></Col>
                  </Row>
                  <Row>
                    <Col>
                      <BarChart
                        height={100}
                        data={{
                          labels: video.data.particles.byTimeUnit[unit].map((_, i) => i),
                          datasets: [
                            {
                              label,
                              backgroundColor: '#f87979',
                              data: video.data.particles.byTimeUnit[unit],
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
                        <Button variant={unit === 'seconds' ? 'primary' : ''} className='active' onClick={() => updateParticlesDataUnit('seconds')}>
                          Segundos
                        </Button>
                        <Button variant={unit === 'minutes' ? 'primary' : ''} onClick={() => updateParticlesDataUnit('minutes')}>
                          Minutos
                        </Button>
                        <Button variant={unit === 'hours' ? 'primary' : ''} onClick={() => updateParticlesDataUnit('hours')}>
                          Horas
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </>
                :
                <Evaluator
                  videoId={videoId}
                  videoName={video.name}
                  videoFps={video.fps}
                  statusWatcherRef={watcherRef}
                  watchStatusCallBack={watchStatus}
                  videoMissing={video.video_missing}
                />
            }
          </Col>
        </Row>
      </Container>
  )
}
