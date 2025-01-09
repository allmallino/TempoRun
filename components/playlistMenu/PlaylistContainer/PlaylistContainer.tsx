import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { PlaylistInfo } from "./PlaylistInfo";
import { Link } from "expo-router";
import { useState } from "react";
import { Images } from "@/constants/Images";

type PlaylistContainerProps = {
  name: string;
  platform: "Spotify" | "Apple Music" | "YouTube Music";
  activated?: boolean;
};

export function PlaylistContainer({
  name,
  platform,
  activated = false,
}: PlaylistContainerProps) {
  const color = Colors.dark.onSurface;
  const [isActive, setActive] = useState(activated);
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
        setActive(!isActive);
      }}
    >
      <View
        style={[
          styles.container,
          isActive ? styles.containerActivated : styles.containerDeactivated,
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

  containerActivated: {
    backgroundColor: Colors.dark.surfaceContainerHighest,
  },

  containerDeactivated: {
    backgroundColor: Colors.dark.surface,
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
