import { StyleSheet } from "react-native";
import CompactPlaylistCardList from "../CompactPlaylistCardList";
import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { getActivatedPlaylists } from "@/state/playlists/selectors";
import { useTranslation } from "react-i18next";

export default function ActivePlaylistCardList() {
  const playlists = useSelector(getActivatedPlaylists);
  const { t } = useTranslation();
  const i18nRoot = "app:menu";

  return (
    <Link href="/(app)/(tabs)/(playlists)">
      <ElevatedContainer style={styles.container} elevation={3}>
        <ThemedText type="defaultSemiBold">
          {t(`${i18nRoot}.activePlaylists`)}
        </ThemedText>
        <CompactPlaylistCardList playlists={playlists} />
      </ElevatedContainer>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 5,
    paddingTop: 12,
    paddingBottom: 30,
    height: 270,
  },
});
