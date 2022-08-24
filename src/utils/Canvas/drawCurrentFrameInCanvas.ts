import { defaultCanvasId } from "./defaults";
import { defaultVideoId, getVideo } from "../Video";
import { getCanvas } from "./getCanvas";
import { getCanvasContext } from "./getCanvasContext";
import { store } from "../../app/store";

export interface DrawCurrentFrameInCanvasOptions {
  videoId?: string
  canvasId?: string,  
}

export const defaultOptions: DrawCurrentFrameInCanvasOptions = {
  videoId: defaultVideoId,
  canvasId: defaultCanvasId,
}

export const drawCurrentFrame = (options = defaultOptions) => {
  const fullOptions = {...defaultOptions, ...options};
  const { canvasId, videoId } = fullOptions;
  const scaled = store.getState().workspace.canvasIsScaled;

  try {    
    const ctx = getCanvasContext(canvasId);
    const video = getVideo(videoId);
    console.log(`New time: ${video.currentTime}`);
    
    if (!scaled) {
      ctx.scale(0.33073, 0.33056)
      store.dispatch({type: "workspace/setCanvasIsScaled", payload: true});
    }

    ctx.drawImage(video, 0, 0);

  } catch (error) {
    console.error(error);
  }
}