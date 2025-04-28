import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { groupBy } from "@/helpers";
import { PlaylistType } from "./types";
export const getImportedPlaylists = createSelector(
  (state: RootState) => state.playlist.value,
  (value: PlaylistType[]) => value.filter((playlist) => playlist.imported)
);

export const getUnimportedPlaylists = createSelector(
  (state: RootState) => state.playlist.value,
  (value) =>
    groupBy(
      value.filter((playlist) => !playlist.imported),
      (playlist) => playlist.streamingServiceId
    )
);

export const getActivatedPlaylist = createSelector(
  (state: RootState) => state.playlist.value,
  (value) => value.find((playlist) => playlist.active)
);

export const getPlaylistById = (id: string) =>
  createSelector(
    (state: RootState) => state.playlist.value,
    (value) => value.find((playlist) => playlist.id === id)
  );
