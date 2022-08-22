import { VideoDataTimeUnit } from "../Video"
import { DeepViewAPIResponse } from "./response"




export interface ParticlesData {
  by_time_unit: number[],
  unit: VideoDataTimeUnit,
}

export interface EventsData {
  seconds_with_events: number[],
}


export interface VideoDataResponse extends DeepViewAPIResponse {
  data: {
    particles: ParticlesData,
    events: EventsData,
  }
}