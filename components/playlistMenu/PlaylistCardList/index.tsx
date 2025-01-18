import { FlatList, StyleSheet } from "react-native";
import PlaylistCard from "../PlaylistCard";
import { useSelector } from "react-redux";
import { getImportedPlaylists } from "@/state/playlists/selectors";

export default function PlaylistCardList() {
  const data = useSelector(getImportedPlaylists);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <PlaylistCard
          info={item.info}
          key={item.id}
          id={item.id}
          activated={item.active}
          isImported={item.imported}
        />
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
    paddingBottom: 76,
  },
});
