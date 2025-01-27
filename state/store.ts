import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./playlists/playlistSlice";
import trackReducer from "./tracks/trackSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    track: trackReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
