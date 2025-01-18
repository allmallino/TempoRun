import { FlatList, StyleSheet } from "react-native";
import { TrackType } from "@/state/playlists/types";
import { TrackContainer } from "../TrackContainer/TrackContainer";

type TrackListProps = {
  data: TrackType[];
};

export function TrackList({ data }: TrackListProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TrackContainer key={item.id} trackId={item.id} active={item.active} />
      )}
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
