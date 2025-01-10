import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { PlaylistInfo } from "./PlaylistInfo";
import { Link } from "expo-router";
import { Images } from "@/constants/Images";
import { PlaylistInfoType } from "@/state/playlists/types";
import { useDispatch } from "react-redux";
import { toggleActive } from "@/state/playlists/playlistSlice";

type PlaylistContainerProps = {
  id: number;
  info: PlaylistInfoType;
  activated: boolean;
};

export function PlaylistContainer({
  info: { name, platform },
  id,
  activated,
}: PlaylistContainerProps) {
  const color = Colors.dark.onSurface;
  const dispatch = useDispatch();

  let platformLogo;
  switch (platform) {
    case "Spotify":
      platformLogo = Images.streamingServices.spotify.icon;
      break;
    case "Apple Music":
      platformLogo = Images.streamingServices.appleMusic.icon;
      break;
    case "YouTube Music":
      platformLogo = Images.streamingServices.youtubeMusic.icon;
      break;
  }

  return (
    <Pressable
      onPress={() => {
        dispatch(toggleActive(id));
      }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: activated
              ? Colors.dark.surfaceContainerHighest
              : Colors.dark.surface,
          },
        ]}
      >
        <Image source={platformLogo} style={styles.logo} />
        <PlaylistInfo name={name} platform={platform} />
        <Link href={"/settings"} style={styles.settingsButton}>
          <IconSymbol size={24} name="ellipsis" color={color} />
        </Link>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.outlineVariant,
    alignItems: "center",
    width: "100%",
  },

  logo: {
    width: 40,
    height: 40,
    padding: 8,
  },

  settingsButton: {
    padding: 16,
  },
});
