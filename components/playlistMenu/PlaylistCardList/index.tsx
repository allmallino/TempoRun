import { FlatList, StyleSheet } from "react-native";
import PlaylistCard from "../PlaylistCard";
import { useSelector } from "react-redux";
import { getImportedPlaylists } from "@/state/playlists/selectors";
import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

export default function PlaylistCardList() {
  const data = useSelector(getImportedPlaylists);
  const { t } = useTranslation();
  const i18nRoot = "app:playlists";

  return data.length > 0 ? (
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
  ) : (
    <ThemedText type="defaultSemiBold">
      {t(`${i18nRoot}.noPlaylists`)}
    </ThemedText>
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
