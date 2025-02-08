import { createSlice } from "@reduxjs/toolkit";
import { Mode, ModeOptionType, ModeType, MusicTempo } from "./types";

interface modeState {
  value: ModeType;
}

const initialState: modeState = {
  value: {
    selectedMode: Mode.TIMER,
    modsInfo: {
      [Mode.TIMER]: [
        {
          indicator: "00:00",
          musicTempo: MusicTempo.MEDIUM,
        },
      ],
      [Mode.MAP]: [
        {
          indicator: "A",
          musicTempo: MusicTempo.MEDIUM,
        },
      ],
      [Mode.LENGTH]: [
        {
          indicator: "0",
          musicTempo: MusicTempo.MEDIUM,
        },
      ],
      [Mode.PACE]: [
        {
          indicator: "00:00",
          musicTempo: MusicTempo.MEDIUM,
        },
      ],
    },
  },
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setSelectedMode: (state, action) => {
      state.value.selectedMode = action.payload as Mode;
    },
    setOptions: (state, action) => {
      state.value.modsInfo[action.payload.indicator as Mode] = action.payload
        .options as ModeOptionType[];
    },
    changeTempo: (state, action) => {
      state.value.modsInfo[state.value.selectedMode][
        action.payload.index
      ].musicTempo = action.payload.tempo;
    },
    changeIndicator: (state, action) => {
      state.value.modsInfo[state.value.selectedMode][
        action.payload.index
      ].indicator = action.payload.indicator;
      state.value.modsInfo[state.value.selectedMode].sort((a, b) => {
        if (!a.indicator.length) return 1;
        if (!b.indicator.length) return -1;
        return a.indicator > b.indicator ? 1 : -1;
      });
    },
    addOption: (state, action) => {
      state.value.modsInfo[state.value.selectedMode] = [
        ...state.value.modsInfo[state.value.selectedMode],
        action.payload,
      ];
    },
    removeOption: (state, action) => {
      state.value.modsInfo[state.value.selectedMode] = state.value.modsInfo[
        state.value.selectedMode
      ].filter((_, index) => index !== action.payload);
    },
  },
});

export const {
  setSelectedMode,
  setOptions,
  addOption,
  removeOption,
  changeTempo,
  changeIndicator,
} = modeSlice.actions;

export default modeSlice.reducer;
