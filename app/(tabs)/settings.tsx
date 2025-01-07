import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function SettingsScreen() {
  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Settings</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 52,
  },
});
