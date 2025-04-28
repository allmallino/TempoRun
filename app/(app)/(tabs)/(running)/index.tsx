import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlayingMusic from "@/components/runningPage/PlayingMusic";
import Dashboard from "@/components/runningPage/Dashboard";
import StopButton from "@/components/runningPage/StopButton";
export default function RunningPage() {
  return (
    <SafeAreaView
      style={styles.mainContainer}
      edges={["left", "right", "top", "bottom"]}
    >
      <Dashboard />
      <PlayingMusic />
      <StopButton />
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
