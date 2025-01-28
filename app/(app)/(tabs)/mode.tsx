import { StatusBar, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export default function ModeScreen() {
  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Mode</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 25,
    paddingHorizontal: 16,
    paddingTop: 45 + (StatusBar.currentHeight || 0),
    paddingBottom: 25,
    backgroundColor: Colors.dark.surfaceContainerLow,
  },
});
