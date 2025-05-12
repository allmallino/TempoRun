import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentOption from "@/components/runningPage/CurrentOption";
import Dashboard from "@/components/runningPage/Dashboard";
import StopButton from "@/components/runningPage/StopButton";
import { useSession } from "@/contexts/SessionContext";
import React, { useCallback, useContext } from "react";
import { ThemeContext } from "@/theme/ThemeContext";
import { useFocusEffect } from "expo-router";
export default function RunningPage() {
  const { startSession, endSession, sessionData } = useSession();
  const { theme } = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      startSession();
      return () => {
        endSession();
      };
    }, [startSession, endSession])
  );
  return (
    <SafeAreaView
      style={styles.mainContainer}
      edges={["left", "right", "top", "bottom"]}
    >
      {sessionData ? (
        <>
          <Dashboard />
          <CurrentOption />
          <StopButton />
        </>
      ) : (
        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={styles.loading}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 164,
    paddingTop: -48,
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
