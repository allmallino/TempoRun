import { RootState } from "../store";

export const getUser = (state: RootState) => state.user.value;

export const getUserUId = (state: RootState) => state.user.value?.uid;
