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

// export type VideoData = {unit: VideoDataUnit, values: number[]};
export type VideoData = {
  seconds: number[],
  minutes: number[],
  hours: number[],
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
}
