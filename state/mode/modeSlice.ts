import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  Reducer,
} from "@reduxjs/toolkit";
import { Mode, ModeOptionType, ModeType, MusicTempo } from "./types";
import { revertAll } from "../actions";
import {
  updateSelectedUserModeInfo,
  getUserModeInfo,
  initUserModeInfo,
  updateUserModeInfo,
} from "@/services/firestoreService";
import { RootState } from "../store";
import { getUserUId } from "../user/selectors";
import { getSelectedMode, getSelectedOption } from "./selectors";

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
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(revertAll, () => initialState)
      .addCase(initModeStateAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.value = action.payload;
        }
      })
      .addCase(setSelectedModeAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.value.selectedMode = action.payload;
        }
      })
      .addMatcher(
        isAnyOf(
          addOptionAsync.fulfilled,
          removeOptionAsync.fulfilled,
          changeTempoAsync.fulfilled,
          changeIndicatorAsync.fulfilled
        ),
        (state, action) => {
          if (action.payload) {
            state.value.modsInfo[state.value.selectedMode] = action.payload;
          }
        }
      ),
});

export const initModeStateAsync = createAsyncThunk(
  "mode/initModeStateAsync",
  async (userId: string) => {
    const modeInfo = await getUserModeInfo(userId);
    if (!modeInfo) {
      await initUserModeInfo(userId);
    }
    return modeInfo;
  }
);

export const setSelectedModeAsync = createAsyncThunk(
  "mode/setSelectedModeAsync",
  async (mode: Mode, { getState }) => {
    const state = getState() as RootState;
    const userId = getUserUId(state);
    if (userId) {
      await updateSelectedUserModeInfo(userId, mode);
    }
    return mode;
  }
);

export const addOptionAsync = createAsyncThunk(
  "mode/addOptionAsync",
  async (option: ModeOptionType, { getState }) => {
    const state = getState() as RootState;

    const selectedMode = getSelectedMode(state);
    const userId = getUserUId(state);
    const modsInfo = getSelectedOption(state);

    const result = [...modsInfo, option];
    if (userId) await updateUserModeInfo(userId, selectedMode, result);

    return result;
  }
);

export const removeOptionAsync = createAsyncThunk(
  "mode/removeOptionAsync",
  async (index: number, { getState }) => {
    const state = getState() as RootState;

    const selectedMode = getSelectedMode(state);
    const userId = getUserUId(state);
    const modsInfo = getSelectedOption(state);

    const result = modsInfo.filter(
      (_: ModeOptionType, i: number) => i !== index
    );
    if (userId) await updateUserModeInfo(userId, selectedMode, result);

    return result;
  }
);

export const changeTempoAsync = createAsyncThunk(
  "mode/changeTempoAsync",
  async (
    { index, musicTempo }: { index: number; musicTempo: MusicTempo },
    { getState }
  ) => {
    const state = getState() as RootState;

    const selectedMode = getSelectedMode(state);
    const userId = getUserUId(state);
    const modsInfo = getSelectedOption(state);

    const result = modsInfo.map((v: ModeOptionType, i: number) => {
      return i === index ? { ...v, musicTempo } : v;
    });
    if (userId) await updateUserModeInfo(userId, selectedMode, result);
    return result;
  }
);

export const changeIndicatorAsync = createAsyncThunk(
  "mode/changeIndicatorAsync",
  async (
    { index, indicator }: { index: number; indicator: string },
    { getState }
  ) => {
    const state = getState() as RootState;

    const selectedMode = getSelectedMode(state);
    const userId = getUserUId(state);
    const modsInfo = getSelectedOption(state);

    const result: ModeOptionType[] = modsInfo.map(
      (v: ModeOptionType, i: number) => {
        return i === index ? { ...v, indicator } : v;
      }
    );
    result.sort((a, b) => {
      if (!a.indicator.length) return 1;
      if (!b.indicator.length) return -1;
      return a.indicator > b.indicator ? 1 : -1;
    });

    if (userId) await updateUserModeInfo(userId, selectedMode, result);
    return result;
  }
);

export default modeSlice.reducer as Reducer<typeof initialState>;
