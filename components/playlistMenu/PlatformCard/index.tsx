import { FlatList, StyleSheet } from "react-native";
import PlaylistCard from "../PlaylistCard";
import { PlatformType, PlaylistType } from "@/state/playlists/types";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import PlatformCardTitle from "../PlatfromCardTitle";

type PlatformCardProps = {
  platform: PlatformType;
  name: string;
  data: PlaylistType[];
};

export default function PlatformCard({
  platform,
  name,
  data,
}: PlatformCardProps) {
  return (
    <ElevatedContainer elevation={2} style={styles.container}>
      <PlatformCardTitle platform={platform} name={name} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <PlaylistCard
            info={item.info}
            key={item.id}
            id={item.id}
            isImported={item.imported}
          />
        )}
        style={styles.list}
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
  list: { width: "100%", gap: 12 },
});
