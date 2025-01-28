import { View, StyleSheet, StatusBar } from "react-native";

import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistById } from "@/state/playlists/selectors";
import IconButton from "@/components/ui/IconButton";
import ThemedButton from "@/components/ThemedButton";
import { toggleImported } from "@/state/playlists/playlistSlice";
import TracksLists from "@/components/playlistMenu/TracksLists";

export default function PlaylistSettingsScreen() {
  const { id } = useLocalSearchParams();
  const playlist = useSelector(getPlaylistById(Number(id)));
  const color = Colors.dark.onSurfaceVariant;
  const dispatch = useDispatch();

  const toggleImport = () => {
    dispatch(toggleImported(Number(id)));
    router.back();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerButtonsContainer}>
        <IconButton icon="arrow.left" color={color} onPress={router.back} />
        <ThemedButton type="text" title="Delete" onPress={toggleImport} />
      </View>
      <ThemedText type="title">{playlist?.info.name}</ThemedText>
      {playlist ? (
        <TracksLists data={playlist.tracks} />
      ) : (
        <ThemedText type="defaultSemiBold">
          No music tracks to manage
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 25,
    paddingHorizontal: 16,
    paddingTop: 5 + (StatusBar.currentHeight || 0),
    backgroundColor: Colors.dark.surfaceContainerLow,
  },
  headerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: -20,
  },
});
