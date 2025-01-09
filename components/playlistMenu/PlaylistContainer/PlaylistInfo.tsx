import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

type PlaylistInfoProps = {
  name: string;
  platform: "Spotify" | "Apple Music" | "YouTube Music";
};

export function PlaylistInfo({ name, platform }: PlaylistInfoProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold">{name}</ThemedText>
      <ThemedText>{platform}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
});
