import { View, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export default function ImportPlaylistsScreen() {
  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Import playlists</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 25,
    paddingHorizontal: 16,
    paddingTop: 69,
    paddingBottom: 25,
    backgroundColor: Colors.dark.surfaceContainerLow,
  },
});
