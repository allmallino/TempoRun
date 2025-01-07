import { StyleSheet } from "react-native";
import { PlaylistList } from "./PlaylistsList";
import { ThemedText } from "@/components/ThemedText";
import { ElevatedContainer } from "@/components/ui/ElevatedContainer";

export function PlaylistsListContainer() {
  const playlists = ["Hip-Hop", "Jazz", "Pop"];
  return (
    <ElevatedContainer style={styles.container}>
      <ThemedText type="defaultSemiBold">Playlists</ThemedText>
      <PlaylistList playlists={playlists} />
    </ElevatedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 5,
    paddingTop: 12,
    paddingBottom: 30,
  },
});
