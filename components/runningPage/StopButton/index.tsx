import IconButton from "@/components/ui/IconButton";
import useTheme from "@/hooks/useTheme";
import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";
import { router } from "expo-router";
import { useContext } from "react";
import { StyleSheet } from "react-native";

export default function StopButton() {
  const { theme } = useContext(ThemeContext);
  const color = theme.onPrimary;
  const styles = useTheme(getStyles);
  return (
    <IconButton
      icon="stop"
      color={color}
      size={64}
      style={styles.stopButton}
      onPress={() => {
        router.dismissAll();
        router.replace("/results");
      }}
    />
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    stopButton: {
      backgroundColor: theme.primary,
      borderRadius: 999,
      position: "absolute",
      bottom: 32,
    },
  });
