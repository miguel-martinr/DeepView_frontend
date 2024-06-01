import { getVideo } from "./getVideo";

export const seekFrame = (frameIndex: number, frameRate: number) => {
  try {
    const video = getVideo();
    const approxInstant = frameIndex / frameRate;
    
    video.currentTime = approxInstant;

  } catch(error) {
    console.log(error);
  }    
}