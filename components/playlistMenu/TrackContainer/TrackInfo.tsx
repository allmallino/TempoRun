import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

type TrackInfoProps = {
  name: string;
  artist: string;
};

export function TrackInfo({ name, artist }: TrackInfoProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold">{name}</ThemedText>
      <ThemedText>{artist}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
});
