import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PlatformType, PlaylistType } from "./types";
import { groupBy } from "@/helpers/helpers";

export const getImportedPlaylists = createSelector(
  (state: RootState) => state.playlist.value,
  (value) => value.filter((playlist) => playlist.imported)
);

export const getUnimportedPlaylists = createSelector(
  (state: RootState) => state.playlist.value,
  (value) =>
    groupBy(
      value.filter((playlist) => !playlist.imported),
      (playlist) => playlist.info.platform
    )
);

export const getActivatedPlaylists = createSelector(
  (state: RootState) => state.playlist.value,
  (value) => value.filter((playlist) => playlist.active)
);

export const getPlaylistById = (id: number) =>
  createSelector(
    (state: RootState) => state.playlist.value,
    (value) => value.find((playlist) => playlist.id === id)
  );
