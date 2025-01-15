import { View, StyleSheet, StatusBar } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { getPlaylistById } from "@/state/playlists/selectors";

export default function PlaylistSettingsScreen() {
  const { id } = useLocalSearchParams();
  const playlist = useSelector(getPlaylistById(Number(id)));

  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">{playlist?.info.name}</ThemedText>
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
