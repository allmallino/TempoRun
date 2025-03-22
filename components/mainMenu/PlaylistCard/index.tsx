import ThemedText from "@/components/ThemedText";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

type PlaylistCardProps = {
  name: string;
  imageUrl: string;
};

export default function PlaylistCard({ name, imageUrl }: PlaylistCardProps) {
  return (
    <View style={styles.container}>
      <Image source={imageUrl} style={styles.image} />
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
