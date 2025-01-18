import { FlatList, StyleSheet } from "react-native";
import PlaylistItem from "../PlaylistCard";
import { PlaylistType } from "@/state/playlists/types";

type CompactPlaylistCardListProps = {
  playlists: PlaylistType[];
};

export default function CompactPlaylistCardList({
  playlists,
}: CompactPlaylistCardListProps) {
  return (
    <FlatList
      data={playlists}
      renderItem={({ item }) => <PlaylistItem name={item.info.name} />}
      style={styles.container}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  list: {
    gap: 8,
  },
});
