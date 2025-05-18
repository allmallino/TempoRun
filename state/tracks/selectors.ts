import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getTrackInfoById = (id: string) =>
  createSelector(
    (state: RootState) => state.track.value,
    (value) => value.find((track) => track.id === id)?.info
  );

export const getTracksByIds = (ids: string[]) =>
  createSelector(
    (state: RootState) => state.track.value,
    (value) => value.filter((track) => ids.includes(track.id))
  );
