import { createContext } from "react";
import { Theme } from "./types";
import { dark } from "./index";

interface IThemeContext {
  theme: Theme;
  changeTheme: () => void;
}

const defaultTheme: IThemeContext = {
  theme: dark,
  changeTheme: () => {},
};

export const ThemeContext = createContext<IThemeContext>(defaultTheme);
