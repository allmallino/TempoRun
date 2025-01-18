import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import ModeCardTitle from "../ModeCardTitle";
import { Link } from "expo-router";

export default function ActiveModeCard() {
  const color = Colors.dark.onSurface;
  const mode = "Timer";

  return (
    <Link href="/(tabs)/mode">
      <ElevatedContainer style={styles.container} elevation={4}>
        <IconSymbol size={28} name="watch.analog" color={color} />
        <ModeCardTitle name={mode} />
      </ElevatedContainer>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 25,
    gap: 16,
  },
});
