import { Theme } from "./types";

export const light: Theme = {
  dark: false,
  error: "#BA1A1A",

  outline: "#74796D",
  outlineVariant: "#C4C8BB",

  surface: "#FCFDF6",
  surfaceContainerLow: "#F2F3EC",
  surfaceContainer: "#ECF3E6",
  surfaceContainerHigh: "#E6E7E1",
  surfaceContainerHighest: "#E1E2DC",
  onSurface: "#1A1C18",
  onSurfaceVariant: "#43483E",

  primary: "#246D00",
  onPrimary: "#FFFFFF",
  secondaryContainer: "#E6E7E1",

  primaryOpacity: {
    12: "#2460001F",
  },
  onSurfaceOpacity: {
    12: "#1A1C181F",
  },
};

export const dark: Theme = {
  dark: true,
  error: "#FFB4AB",

  outline: "#8E9286",
  outlineVariant: "#43483E",

  surface: "#121410",
  surfaceContainerLow: "#1A1C18",
  surfaceContainer: "#1E201C",
  surfaceContainerHigh: "#292B26",
  surfaceContainerHighest: "#343531",
  onSurface: "#C7C7C0",
  onSurfaceVariant: "#C4C8BB",

  primary: "#85DC4B",
  onPrimary: "#163800",
  secondaryContainer: "#3E4A35",

  primaryOpacity: {
    12: "#D0BCFF1F",
  },
  onSurfaceOpacity: {
    12: "#E6E0E91F",
  },
};
