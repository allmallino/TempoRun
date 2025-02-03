import ThemedText from "@/components/ThemedText";
import { PlatformType } from "@/state/playlists/types";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { getPlatformIcon } from "@/helpers";

type PlaylistCardProps = {
  name: string;
  platform: PlatformType;
};

export default function PlaylistCard({ name, platform }: PlaylistCardProps) {
  return (
    <View style={styles.container}>
      <Image source={getPlatformIcon(platform)} style={styles.image} />
      <ThemedText>{name}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    gap: 16,
  },
  image: {
    width: 28,
    height: 28,
  },
});
