import { SessionProvider } from "@/contexts/SessionContext";
import { ThemeContext } from "@/theme/ThemeContext";
import { Stack } from "expo-router";
import React, { useContext } from "react";

export default function RunningLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <SessionProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.surfaceContainerLow },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="results" />
      </Stack>
    </SessionProvider>
  );
}
