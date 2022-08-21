import { VideoDataTimeUnit } from "../Video"
import { DeepViewAPIResponse } from "./response"




export interface ParticlesData {
  byTimeUnit: number[],
  unit: VideoDataTimeUnit,
}

export interface EventsData {
  secondsWithEvents: number[],
}


export interface VideoDataResponse extends DeepViewAPIResponse {
  data: {
    particles: ParticlesData,
    events: EventsData,
  }
}