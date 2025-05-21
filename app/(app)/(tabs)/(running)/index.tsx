import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentOption from "@/components/runningPage/CurrentOption";
import Dashboard from "@/components/runningPage/Dashboard";
import StopButton from "@/components/runningPage/StopButton";
import { useSession } from "@/contexts/SessionContext";
import React, { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function RunningPage() {
  const { startSession, endSession, sessionStarted } = useSession();

  useEffect(() => {
    startSession();
    return () => {
      endSession();
    };
  }, []);

  return (
    <SafeAreaView
      style={styles.mainContainer}
      edges={["left", "right", "top", "bottom"]}
    >
      {sessionStarted ? (
        <>
          <Dashboard />
          <CurrentOption />
          <StopButton />
        </>
      ) : (
        <LoadingScreen isVisible={true} />
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
});
