import { VideoDataTimeUnit } from "../Video"
import { DeepViewAPIResponse } from "./response"




export interface ParticlesData {
  by_time_unit: number[],
  unit: VideoDataTimeUnit,
}


export interface DeepViewEvent {
  frame_index: number,
  x: number,
  y: number,
  radius: number,
  area: number,
}
export interface EventsData {  
  events: DeepViewEvent[],
}


export interface VideoDataResponse extends DeepViewAPIResponse {
  data: {
    particles: ParticlesData,
    events: EventsData,
  }
}