import ThemedText from "@/components/ThemedText";
import { getPlatformIcon } from "@/helpers";
import useTheme from "@/hooks/useTheme";
import { StreamingServiceInfoType } from "@/state/streaming/types";
import { Theme } from "@/theme/types";
import { Image } from "expo-image";
import { openBrowserAsync } from "expo-web-browser";
import { Pressable, StyleSheet, View } from "react-native";

type MusicServicesCardProps = StreamingServiceInfoType & {
  id: string;
};

export default function MusicServicesCard({
  id,
  name,
  profileImage,
}: MusicServicesCardProps) {
  const styles = useTheme(getStyles);
  const url = `https://open.spotify.com/user/${id}`;
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        openBrowserAsync(url);
      }}
    >
      <View style={styles.infoContainer}>
        <Image
          style={styles.platformImage}
          source={getPlatformIcon("Spotify")}
        />
        <ThemedText>{name}</ThemedText>
      </View>
      <Image style={styles.image} source={profileImage} />
    </Pressable>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.outlineVariant,
      borderRadius: 12,
      overflow: "hidden",
    },
    infoContainer: {
      flex: 1,
      flexDirection: "row",
      gap: 16,
      padding: 16,
      alignItems: "center",
    },
    platformImage: {
      width: 24,
      height: 24,
      margin: 8,
    },
    image: {
      width: 80,
      height: 80,
    },
  });
