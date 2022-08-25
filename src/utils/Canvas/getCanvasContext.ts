import { defaultCanvasId } from "./defaults";
import { getCanvas } from "./getCanvas";

export const getCanvasContext = (canvasId: string = defaultCanvasId) => {
  const canvas = getCanvas(canvasId);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas context not found');
  }

  return ctx as CanvasRenderingContext2D;
}