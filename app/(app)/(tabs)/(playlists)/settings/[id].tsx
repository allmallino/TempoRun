import { View, StyleSheet, StatusBar } from "react-native";
import ThemedText from "@/components/ThemedText";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistById } from "@/state/playlists/selectors";
import IconButton from "@/components/ui/IconButton";
import ThemedButton from "@/components/ThemedButton";
import { toggleImported } from "@/state/playlists/playlistSlice";
import TracksLists from "@/components/playlistMenu/TracksLists";
import useTheme from "@/hooks/useTheme";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { Theme } from "@/theme/types";
import { useTranslation } from "react-i18next";

export default function PlaylistSettingsScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = useTheme(getStyles);
  const { id } = useLocalSearchParams();
  const playlist = useSelector(getPlaylistById(id.toString()));
  const dispatch = useDispatch();

  const color = theme.onSurfaceVariant;

  const toggleImport = () => {
    dispatch(toggleImported(id));
    router.back();
  };
  const { t } = useTranslation();
  const i18nRoot = "app:playlists";

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerButtonsContainer}>
        <IconButton icon="arrow.left" color={color} onPress={router.back} />
        <ThemedButton
          type="text"
          title={t(`${i18nRoot}.delete`)}
          onPress={toggleImport}
        />
      </View>
      <ThemedText type="title" style={styles.titleText}>
        {playlist?.info.name}
      </ThemedText>

      {playlist?.tracks ? (
        <TracksLists data={playlist.tracks} />
      ) : (
        <ThemedText type="defaultSemiBold">
          {t(`${i18nRoot}.noTracks`)}
        </ThemedText>
      )}
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
      gap: 25,
      paddingHorizontal: 16,
      paddingTop: 5 + (StatusBar.currentHeight || 0),
      backgroundColor: theme.surfaceContainerLow,
    },
    headerButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: -20,
    },
    titleText: {
      textAlign: "center",
    },
  });
