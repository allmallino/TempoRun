import { View, StyleSheet, StatusBar } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { PlaylistList } from "@/components/playlistMenu/PlaylistList/PlaylistList";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { router } from "expo-router";

export default function PlaylistsScreen() {
  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Playlists</ThemedText>
      <PlaylistList />
      <FloatingActionButton
        icon={"plus"}
        onPress={() => {
          router.navigate("/import");
        }}
      />
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
    backgroundColor: Colors.dark.surfaceContainerLow,
  },
});
