import { StyleSheet, View } from "react-native";
import { PlatformType } from "@/state/playlists/types";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { getPlatformIcon } from "@/helpers/helpers";

export function PlatformName({ platform }: { platform: PlatformType }) {
  return (
    <View style={styles.container}>
      <Image source={getPlatformIcon(platform)} style={styles.logo} />
      <ThemedText type="defaultSemiBold">{platform}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logo: { height: 24, width: 24 },
});