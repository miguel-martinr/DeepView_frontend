import { DeepViewAPIResponse } from "./response"


export type TimeUnit = 'secods' | 'minutes' | 'hours';

export interface ParticlesData {
  by_time_unit: number[],
  unit: TimeUnit,
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