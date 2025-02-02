import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./playlists/playlistSlice";
import trackReducer from "./tracks/trackSlice";
import userReducer from "./user/userSlice";
import streamingServicesReducer from "./streaming/streamingSlice";

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    track: trackReducer,
    user: userReducer,
    streaming: streamingServicesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
