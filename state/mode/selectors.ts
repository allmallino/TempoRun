import { RootState } from "../store";
import { Mode } from "./types";

export const getSelectedMode = (state: RootState) =>
  state.mode.value.selectedMode;

export const getOptionByModeName = (mode: Mode) => (state: RootState) =>
  state.mode.value.modsInfo[mode];
