import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video, VideoData, VideoStatus } from "../types/Video";


export interface VideoCollection {
  [id: string]: Video
}
export interface WorkspaceState {
  video: Video | null,
  videos: VideoCollection
}

const initialState: WorkspaceState = {
  video: null,
  videos: {},
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<Video>) => {
      state.video = action.payload;
    },

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

    setVideoStatus(state, action: PayloadAction<{videoName: string, status: VideoStatus}>) {
      
      const { videoName, status } = action.payload;
      if (!state.videos[videoName]) return;

      state.videos[videoName].status = status;
    }
  }
});

export const {
  setCurrentVideo,
  setVideo,
  setVideoData,
  setVideos,
  setVideoStatus

} = workspaceSlice.actions;

export default workspaceSlice.reducer;