import { View, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { PlaylistList } from "@/components/playlistMenu/PlaylistList/PlaylistList";

export default function PlaylistsScreen() {
  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Playlists</ThemedText>
      <PlaylistList />
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
    backgroundColor: Colors.dark.surfaceContainerLow,
  },
});
