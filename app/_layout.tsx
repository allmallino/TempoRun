globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import SplashScreen from "@/components/loginPage/SplashScreen";
import { getTheme } from "@/helpers";
import { persistor, store } from "@/state/store";
import { PersistGate } from "redux-persist/integration/react";
import { dark, light } from "@/theme";
import { ThemeContext } from "@/theme/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import "@/localization/i18n";

export default function AuthLayout() {
  const [theme, setTheme] = useState(dark);

  const changeTheme = () => {
    setTheme(theme === dark ? light : dark);
    AsyncStorage.setItem("theme", theme === dark ? "light" : "dark");
  };

  useEffect(() => {
    getTheme(setTheme);
  }, []);

  const [loaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <ThemeContext.Provider value={{ theme, changeTheme }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(app)" />
            <Stack.Screen name="login" />
            <Stack.Screen name="registration" />
          </Stack>
          <StatusBar style={theme.dark ? "light" : "dark"} />
        </ThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
}
