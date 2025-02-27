import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./playlists/playlistSlice";
import trackReducer from "./tracks/trackSlice";
import userReducer from "./user/userSlice";
import streamingServicesReducer from "./streaming/streamingSlice";
import modeReducer from "./mode/modeSlice";
import loaderReducer from "./loader/loaderSlice";

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    track: trackReducer,
    user: userReducer,
    streaming: streamingServicesReducer,
    mode: modeReducer,
    loader: loaderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
