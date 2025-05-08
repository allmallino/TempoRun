import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentOption from "@/components/runningPage/CurrentOption";
import Dashboard from "@/components/runningPage/Dashboard";
import StopButton from "@/components/runningPage/StopButton";
export default function RunningPage() {
  return (
    <SafeAreaView
      style={styles.mainContainer}
      edges={["left", "right", "top", "bottom"]}
    >
      <Dashboard />
      <CurrentOption />
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
