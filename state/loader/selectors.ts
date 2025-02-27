import { RootState } from "../store";

export const getLoaderVisibility = (state: RootState) =>
  state.loader.value.loaderIsVisible;
