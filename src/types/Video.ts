export interface Particle {
  x: number,
  y: number,
  radius: number,
  area: number,
}

export interface Frame {
  particles: Particle[],
}

// export interface VideoData {
//   frames: Frame[],
// }

export type VideoStatus = 'processing' | 'processed' | 'stopped' | 'unprocessed';
export type VideoDataTimeUnit = 'seconds' | 'minutes' | 'hours';

export interface ParticlesData {
  by_time_unit: {
    [key in VideoDataTimeUnit]: number[]
  },
}

export interface EventsData {
  seconds_with_events: number[],
}

export interface VideoData {
  particles: ParticlesData,
  events: EventsData,
}


// export type VideoData = {
//   seconds: number[],
//   minutes: number[],
//   hours: number[],
// }
export interface Video {
  name: string,
  size_in_MB: number,
  duration_in_seconds: number,
  fps: number,
  // resolution: string,
  status: VideoStatus,
  data: VideoData,
  spentSeconds?: number,
}
