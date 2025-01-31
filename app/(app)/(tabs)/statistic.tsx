import { StatusBar, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";

export default function StatisticsScreen() {
  const styles = useTheme(getStyle);

  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Statistic</ThemedText>
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
