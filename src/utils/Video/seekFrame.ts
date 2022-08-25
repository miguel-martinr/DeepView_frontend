import { getVideo } from "./getVideo";

export const seekFrame = (frameIndex: number) => {
  try {
    const video = getVideo();
    const approxInstant = frameIndex / 30;
    
    video.currentTime = approxInstant;

  } catch(error) {
    console.log(error);
  }    
}