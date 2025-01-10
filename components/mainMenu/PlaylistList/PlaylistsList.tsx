import { FlatList, StyleSheet } from "react-native";
import { PlaylistItem } from "./PlaylistItem";
import { PlaylistType } from "@/state/playlists/types";

export function PlaylistList({ playlists }: { playlists: PlaylistType[] }) {
  return (
    <FlatList
      data={playlists}
      renderItem={({ item }) => <PlaylistItem name={item.info.name} />}
      style={styles.container}
      contentContainerStyle={{
        gap: 8,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
