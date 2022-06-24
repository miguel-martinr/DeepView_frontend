import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../types/Video";


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
    }
  }
});

export const {
  setCurrentVideo,
  setVideo,
  setVideos,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;