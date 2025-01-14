import { FlatList, StyleSheet } from "react-native";
import { PlaylistContainer } from "../PlaylistContainer/PlaylistContainer";
import { useSelector } from "react-redux";
import { getImportedPlaylists } from "@/state/playlists/selectors";

export function PlaylistList() {
  const data = useSelector(getImportedPlaylists);
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <PlaylistContainer
          info={item.info}
          key={item.id}
          id={item.id}
          activated={item.active}
          isImported={item.imported}
        />
      )}
      style={styles.container}
      contentContainerStyle={{
        gap: 8,
        paddingBottom: 76,
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
