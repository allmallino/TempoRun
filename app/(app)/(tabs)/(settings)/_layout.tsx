import { ThemeContext } from "@/theme/ThemeContext";
import { Stack } from "expo-router";
import React, { useContext } from "react";

export default function SettingsLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.surfaceContainerLow },
        animation: "fade",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="account" />
    </Stack>
  );
}
