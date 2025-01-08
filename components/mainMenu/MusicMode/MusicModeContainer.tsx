import { ElevatedContainer } from "@/components/ui/ElevatedContainer";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { MusicModeName } from "./MusicModeName";

export function MusicModeContainer() {
  const color = Colors.dark.onSurface;
  const mode = "Timer";

  return (
    <ElevatedContainer style={styles.container} elevation={4}>
      <IconSymbol size={28} name="watch.analog" color={color} />
      <MusicModeName name={mode} />
    </ElevatedContainer>
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
