import { FlatList, StyleSheet } from "react-native";
import { PlaylistContainer } from "../PlaylistContainer/PlaylistContainer";
import { PlatformType, PlaylistType } from "@/state/playlists/types";
import { ElevatedContainer } from "@/components/ui/ElevatedContainer";
import { PlatformName } from "./PlatformName";

export function PlatformPlaylistList({
  platform,
  data,
}: {
  platform: PlatformType;
  data: PlaylistType[];
}) {
  return (
    <ElevatedContainer elevation={2} style={styles.container}>
      <PlatformName platform={platform} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <PlaylistContainer
            info={item.info}
            key={item.id}
            id={item.id}
            isImported={item.imported}
          />
        )}
        style={{ width: "100%", gap: 12 }}
        scrollEnabled={false}
      />
    </ElevatedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 25,
    paddingHorizontal: 10,
    gap: 20,
  },
});
