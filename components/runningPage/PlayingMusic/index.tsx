import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function PlayingMusic() {
  const name = "Song Name";
  const artist = "Artist Name";
  return (
    <ElevatedContainer style={styles.container} elevation={4}>
      <Image
        source={require("@/assets/images/applemusic-icon.png")}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <ThemedText type="defaultSemiBold">{name}</ThemedText>
        <ThemedText type="default">{artist}</ThemedText>
      </View>
    </ElevatedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  image: {
    width: 48,
    height: 48,
  },
});
