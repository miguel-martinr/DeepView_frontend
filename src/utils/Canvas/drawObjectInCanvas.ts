import { ParticleObject } from './types';
import { defaultCanvasId } from './defaults';
import { getCanvasContext } from './getCanvasContext';

export interface DrawObjectInCanvasOptions {
  canvasId?: string,
  color?: string,
  lineWidth?: number,
}

export const defaultOptions: DrawObjectInCanvasOptions = {
  canvasId: defaultCanvasId,
  color: '#00ff00',
  lineWidth: 5,
}

export const drawObjectInCanvas = (object: ParticleObject, 
  options: DrawObjectInCanvasOptions = defaultOptions) => {
  
  const fullOptions = { ...defaultOptions, ...options };
  const { canvasId, color, lineWidth } = fullOptions;

  try {
    const ctx = getCanvasContext(canvasId);

    ctx.beginPath(); 
    const { circle } = object;
    const [center, radius] = circle;
  
    ctx.arc(center[0], center[1], radius * 2, 0, 2 * Math.PI, false)
  
  
    ctx.lineWidth = lineWidth as number;
    ctx.strokeStyle = color as string;
    ctx.stroke()

  } catch (error) {
    console.error(error);
  }
}