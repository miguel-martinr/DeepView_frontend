import { defaultCanvasId } from "./defaults";

export const getCanvas = (canvasId = defaultCanvasId) => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) {
    throw new Error(`Canvas with id ${canvasId} not found`);
  }
  return canvas as HTMLCanvasElement;
}
