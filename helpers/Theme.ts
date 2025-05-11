import AsyncStorage from "@react-native-async-storage/async-storage";
import { dark, light } from "@/theme";
import { Theme } from "@/theme/types";

export const getTheme = async (setTheme: (theme: Theme) => void) => {
  const theme = await AsyncStorage.getItem("theme");
  setTheme(theme === "light" ? light : dark);
};
