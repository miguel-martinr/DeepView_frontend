import { DeepViewEvent } from "./Responses/get-data";

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


export type ParticlesByTimeUnit = {
  [key in VideoDataTimeUnit]: number[]
}
export interface ParticlesData {
  byTimeUnit: ParticlesByTimeUnit,
}

export interface EventsData {
  events: DeepViewEvent[],
}

export interface VideoData {
  particles: ParticlesData,
  eventsData: EventsData,
}

export interface Video {
  name: string,
  size_in_MB: number,
  duration_in_seconds: number,
  fps: number,
  // resolution: string,
  status: VideoStatus,
  data: VideoData,
  spentSeconds?: number,
  video_missing?: boolean,
}


export const defaultVideoData: VideoData = {
  particles: {
    byTimeUnit: {seconds: [], minutes: [], hours: []},

  },
  eventsData: {
    events: [],
  },
}