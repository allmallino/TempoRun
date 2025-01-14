import { View, StyleSheet, StatusBar } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ImportPlaylistList } from "@/components/playlistMenu/ImportPlaylistList/ImportPlaylistList";
import { IconButton } from "@/components/ui/IconButton";
import { router } from "expo-router";

export default function ImportPlaylistsScreen() {
  const color = Colors.dark.onSurfaceVariant;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerButtonsContainer}>
        <IconButton icon="arrow.left" color={color} onPress={router.back} />
        <IconButton
          icon="gear"
          color={color}
          onPress={() => {
            router.navigate("/(tabs)/appSettings");
          }}
        />
      </View>
      <ThemedText type="title">Import playlists</ThemedText>
      <ImportPlaylistList />
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
