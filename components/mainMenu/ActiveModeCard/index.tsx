import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { StyleSheet } from "react-native";
import ModeCardTitle from "../ModeCardTitle";
import { Link } from "expo-router";
import { useContext } from "react";
import { ThemeContext } from "@/theme/ThemeContext";

export default function ActiveModeCard() {
  const { theme } = useContext(ThemeContext);
  const color = theme.onSurface;
  const mode = "timer";

  return (
    <Link href="/mode">
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
