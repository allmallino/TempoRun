import { StatusBar, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Theme } from "@/theme/types";
import SettingsContainer from "@/components/settingPage/SettingsContainer";
import useTheme from "@/hooks/useTheme";

export default function SettingsScreen() {
  const styles = useTheme(getStyle);

  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Settings</ThemedText>
      <SettingsContainer />
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
      gap: 25,
      paddingHorizontal: 16,
      paddingTop: 45 + (StatusBar.currentHeight || 0),
      paddingBottom: 25,
      backgroundColor: theme.surfaceContainerLow,
    },
  });
