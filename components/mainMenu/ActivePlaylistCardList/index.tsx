import { StyleSheet, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { getActivatedPlaylist } from "@/state/playlists/selectors";
import { useTranslation } from "react-i18next";
import PlaylistItem from "../PlaylistCard";
import React from "react";

export default function ActivePlaylistCardList() {
  const playlist = useSelector(getActivatedPlaylist);
  const { t } = useTranslation();
  const i18nRoot = "app:menu";

  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold">
        {t(`${i18nRoot}.activePlaylist`)}
      </ThemedText>
      <Link href="/(app)/(tabs)/(playlists)">
        <ElevatedContainer style={styles.elevatedContainer} elevation={3}>
          {playlist ? (
            <PlaylistItem {...playlist.info} />
          ) : (
            <ThemedText>{t(`${i18nRoot}.noActivePlaylist`)}</ThemedText>
          )}
        </ElevatedContainer>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "center",
  },
  elevatedContainer: {
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 25,
    flexDirection: "row",
  },
});
