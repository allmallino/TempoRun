import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getUnimportedPlaylists } from "@/state/playlists/selectors";
import { PlatformPlaylistList } from "./PlatformPlaylistList";
import { PlatformType } from "@/state/playlists/types";
import { ThemedText } from "@/components/ThemedText";

export function ImportPlaylistList() {
  const data = useSelector(getUnimportedPlaylists);
  return Object.values(data).length ? (
    <FlatList
      data={Object.keys(data).sort() as PlatformType[]}
      renderItem={({ item }: { item: PlatformType }) => (
        <PlatformPlaylistList platform={item} data={data[item]} />
      )}
      style={styles.container}
      contentContainerStyle={{
        gap: 25,
      }}
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <ThemedText type="defaultSemiBold">No playlists to import</ThemedText>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
