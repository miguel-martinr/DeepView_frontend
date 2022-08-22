import { ParticlesByTimeUnit } from "../Video";
import { VideoModifierAction } from "./VideoModifierAction";

export interface SetParticlesByTimeUnitAction extends VideoModifierAction {
  particlesByTimeUnit: ParticlesByTimeUnit,
}
