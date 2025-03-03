import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { PlaylistInfoType } from "@/state/playlists/types";
import { useDispatch } from "react-redux";
import {
  toggleActive,
  toggleImported,
  updatePlaylistTracks,
} from "@/state/playlists/playlistSlice";
import IconButton from "@/components/ui/IconButton";
import {
  getSpotifyPlaylistTracks,
  getSpotifyTracksInfo,
} from "@/services/spotifyService";
import CardInfo from "../CardInfo";
import { useContext } from "react";
import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";
import { updateTracks } from "@/state/tracks/trackSlice";
import { setLoaderVisibility } from "@/state/loader/loaderSlice";
import { useStreamingServiceToken } from "@/hooks/useStreamingServiceToken";

type PlaylistCardProps = {
  id: string;
  streamingServiceId: string;
  info: PlaylistInfoType;
  activated?: boolean;
  isImported?: boolean;
};

export default function PlaylistCard({
  info: { name, platform, imageUrl },
  id,
  streamingServiceId,
  activated,
  isImported,
}: PlaylistCardProps) {
  const { theme } = useContext(ThemeContext);
  const styles = useTheme(getStyle);
  const dispatch = useDispatch();
  const { getToken } = useStreamingServiceToken(streamingServiceId);
  const color = theme.onSurface;
  const toggleActivation = () => {
    dispatch(toggleActive(id));
  };

  const toggleImport = async () => {
    const accessToken = await getToken();
    if (!isImported && accessToken) {
      dispatch(setLoaderVisibility(true));
      const tracks = (await getSpotifyPlaylistTracks(accessToken, id)) ?? [];
      const tracksIDs = tracks.map((v) => v.id);
      const tracksInfo =
        (await getSpotifyTracksInfo(accessToken, tracksIDs)) ?? [];
      dispatch(updateTracks(tracksInfo));
      dispatch(updatePlaylistTracks({ id, tracks }));
      dispatch(setLoaderVisibility(false));
    }
    dispatch(toggleImported(id));
  };

  return (
    <Pressable onPress={isImported ? toggleActivation : null}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: activated
              ? theme.surfaceContainerHighest
              : theme.surface,
          },
        ]}
      >
        <Image source={imageUrl} style={styles.logo} />
        <CardInfo title={name} text={platform} />
        {isImported ? (
          <IconButton
            onPress={() => {
              router.navigate({
                pathname: "/settings/[id]",
                params: { id },
              });
            }}
            color={color}
            icon="ellipsis"
            style={styles.settingsButton}
          />
        ) : (
          <IconButton
            onPress={toggleImport}
            color={color}
            icon="plus"
            style={styles.settingsButton}
          />
        )}
      </View>
    </Pressable>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 16,
      gap: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.outlineVariant,
      alignItems: "center",
      width: "100%",
    },

    logo: {
      width: 48,
      height: 48,
      borderRadius: 2,
      overflow: "hidden",
      padding: 8,
    },

    settingsButton: {
      padding: 16,
    },
  });
