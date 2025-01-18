import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getUnimportedPlaylists } from "@/state/playlists/selectors";
import PlatformCard from "../PlatformCard";
import { PlatformType } from "@/state/playlists/types";
import ThemedText from "@/components/ThemedText";

export default function PlatformCardList() {
  const data = useSelector(getUnimportedPlaylists);

  return Object.values(data).length ? (
    <FlatList
      data={Object.keys(data).sort() as PlatformType[]}
      renderItem={({ item }: { item: PlatformType }) => (
        <PlatformCard platform={item} data={data[item]} />
      )}
      style={styles.container}
      contentContainerStyle={styles.list}
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
  list: {
    gap: 25,
  },
});
