import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../pages/VideosPage";


export interface WorkspaceState {
  video: Video | null,
}

const initialState: WorkspaceState = {
  video: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setVideo: (state, action: PayloadAction<Video>) => {
      state.video = action.payload;
    },
  }
});

export const {
  setVideo
} = workspaceSlice.actions;

export default workspaceSlice.reducer;