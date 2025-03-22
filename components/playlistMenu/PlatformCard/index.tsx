import { FlatList, StyleSheet } from "react-native";
import PlaylistCard from "../PlaylistCard";
import { PlaylistType } from "@/state/playlists/types";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import PlatformCardTitle from "../PlatfromCardTitle";

type PlatformCardProps = {
  name: string;
  data: PlaylistType[];
};

export default function PlatformCard({ name, data }: PlatformCardProps) {
  return (
    <ElevatedContainer elevation={2} style={styles.container}>
      <PlatformCardTitle platform={"Spotify"} name={name} />
      <FlatList
        data={data}
        renderItem={({ item }) => <PlaylistCard {...item} />}
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
