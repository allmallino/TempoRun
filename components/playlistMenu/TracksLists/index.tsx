import { FlatList, StyleSheet } from "react-native";
import { TrackType } from "@/state/playlists/types";
import TrackCard from "../TrackCard";

type TrackListProps = {
  data: TrackType[];
};

export default function TrackList({ data }: TrackListProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TrackCard key={item.id} trackId={item.id} active={item.active} />
      )}
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
