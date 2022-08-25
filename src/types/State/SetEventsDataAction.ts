import { DeepViewEvent } from "../Responses/get-data";
import { ParticlesByTimeUnit } from "../Video";
import { VideoModifierAction } from "./VideoModifierAction";

export interface SetEventsDataAction extends VideoModifierAction {
  events: DeepViewEvent[],
}
