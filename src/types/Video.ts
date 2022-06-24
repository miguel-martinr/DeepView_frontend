export interface Particle {
  x: number,
  y: number,
  radius: number,
  area: number,
}

export interface Frame {
  particles: Particle[],
}

export interface VideoData {
  frames: Frame[],
}

export type VideoStatus = 'processing' | 'processed' | 'stopped' | 'unprocessed';
export interface Video {
  name: string,
  size_in_MB: number,
  duration_in_seconds: number,
  fps: number,
  // resolution: string,
  status: VideoStatus,
  data: VideoData
}
