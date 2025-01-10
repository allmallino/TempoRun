import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getImportedPlaylists = createSelector(
  (state: RootState) => state.playlist.value,
  (value) => value.filter((playlist) => playlist.imported)
);

export const getUnimportedPlaylists = createSelector(
  (state: RootState) => state.playlist.value,
  (value) => value.filter((playlist) => !playlist.imported)
);

export const getActivatedPlaylists = createSelector(
  (state: RootState) => state.playlist.value,
  (value) => value.filter((playlist) => playlist.active)
);
