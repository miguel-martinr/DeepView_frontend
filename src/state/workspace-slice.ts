import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetEventsDataAction } from "../types/State/SetEventsDataAction";
import { SetParticlesByTimeUnitAction } from "../types/State/SetParticlesDataAction";
import { Video, VideoData, VideoStatus } from "../types/Video";



export interface VideoCollection {
  [id: string]: Video
}
export interface WorkspaceState {  
  videos: VideoCollection,
  canvasIsScaled: boolean,
}

const initialState: WorkspaceState = {  
  videos: {},
  canvasIsScaled: false,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {

    setVideo(state, action: PayloadAction<Video>) {
      const video = action.payload;      
      state.videos[video.name] = video;
    },

    setVideos(state, action: PayloadAction<Video[]>) {
      const videos = action.payload;
      videos.forEach(v => state.videos = {...state.videos, [v.name]: v});      
    },

    setVideoData(state, action: PayloadAction<{videoName: string, data: Partial<VideoData>}>) {

      const { videoName, data } = action.payload;
      if (!state.videos[videoName]) return;

      
      const currentData = state.videos[videoName].data;
      state.videos[videoName].data = {...currentData, ...data};
    },
    

    setParticlesDataByTimeUnit(state, action: PayloadAction<SetParticlesByTimeUnitAction>) {
      const { videoName, particlesByTimeUnit } = action.payload;
      if (!state.videos[videoName]) return;
      
      const currentData = state.videos[videoName].data.particles.byTimeUnit;
      state.videos[videoName].data.particles.byTimeUnit = {...currentData, ...particlesByTimeUnit};
    },

    setEventsData(state, action: PayloadAction<SetEventsDataAction>) {
      const { videoName, events } = action.payload;
      if (!state.videos[videoName]) return;
            
      state.videos[videoName].data.eventsData.events = events;
    },
    

    setVideoStatus(state, action: PayloadAction<{videoName: string, status: VideoStatus}>) {
      
      const { videoName, status } = action.payload;
      if (!state.videos[videoName]) return;

      state.videos[videoName].status = status;
    },

    setVideoSpentSeconds(state, action: PayloadAction<{videoName: string, spentSeconds: number}>) {
      const { videoName, spentSeconds } = action.payload;

      if (!state.videos[videoName]) return;

      state.videos[videoName].spentSeconds = spentSeconds;
    },

    setCanvasIsScaled(state, action: PayloAdAction<boolean>) {
      state.canvasIsScaled = action.payload;
    }
  }
});

export const {  
  setVideo,
  setVideoData, 
  setParticlesDataByTimeUnit, 
  setEventsData,  
  setVideos,
  setVideoStatus,
  setVideoSpentSeconds,
  setCanvasIsScaled

} = workspaceSlice.actions;

export default workspaceSlice.reducer;