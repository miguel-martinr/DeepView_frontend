import { DeepViewEvent } from "../../types/Responses/get-data";
import { getVideo } from "../Video";
import { seekFrame } from "../Video/seekFrame";
import { drawCurrentFrame } from "./drawCurrentFrameInCanvas";
import { drawObjectInCanvas } from "./drawObjectInCanvas";

  export const seekEvent = (event: DeepViewEvent) => {
    const video = getVideo();
    video.requestVideoFrameCallback(() => {
      drawCurrentFrame();
      drawObjectInCanvas({
        area: event.area,
        circle: [[event.x, event.y], event.radius],
      }, {color: '#ff0000'});
    });

    seekFrame(event.frame_index);  
    video.currentTime += 0.00001;    
  }