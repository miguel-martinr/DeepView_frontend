import { defaultVideoId } from "./defaults";

export const getVideo = (videoId: string = defaultVideoId) => {
  const video = document.getElementById(videoId) as HTMLVideoElement;
  if (!video) {
    throw new Error(`Video with id ${videoId} not found`);
  }
  return video as HTMLVideoElement;
}