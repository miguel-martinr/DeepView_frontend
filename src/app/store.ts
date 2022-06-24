import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "../state/workspace-slice";

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;