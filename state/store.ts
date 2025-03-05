import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./playlists/playlistSlice";
import trackReducer from "./tracks/trackSlice";
import userReducer from "./user/userSlice";
import streamingServicesReducer from "./streaming/streamingSlice";
import modeReducer from "./mode/modeSlice";
import loaderReducer from "./loader/loaderSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  playlist: playlistReducer,
  track: trackReducer,
  user: userReducer,
  streaming: streamingServicesReducer,
  mode: modeReducer,
  loader: loaderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
