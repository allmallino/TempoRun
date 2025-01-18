import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./playlists/playlistSlice";
import trackReducer from "./tracks/trackSlice";

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    track: trackReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
