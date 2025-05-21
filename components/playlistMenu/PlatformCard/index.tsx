import { FlatList, StyleSheet } from "react-native";
import PlaylistCard from "../PlaylistCard";
import { PlaylistType } from "@/state/playlists/types";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import PlatformCardTitle from "../PlatfromCardTitle";
import { useTranslation } from "react-i18next";
import ThemedText from "@/components/ThemedText";

type PlatformCardProps = {
  name: string;
  data: PlaylistType[];
};

export default function PlatformCard({ name, data }: PlatformCardProps) {
  const { t } = useTranslation();
  const i18nRoot = "app:playlists";
  return (
    <ElevatedContainer elevation={2} style={styles.container}>
      <PlatformCardTitle platform={"Spotify"} name={name} />
      <FlatList
        data={data}
        renderItem={({ item }) => <PlaylistCard {...item} />}
        style={styles.list}
        scrollEnabled={false}
        ListEmptyComponent={
          <ThemedText type="defaultSemiBold" style={styles.text}>
            {t(`${i18nRoot}.noPlaylists`)}
          </ThemedText>
        }
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
  text: {
    textAlign: "center",
  },
});
