import { View, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function PlaylistsScreen() {
  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Playlists</ThemedText>
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
