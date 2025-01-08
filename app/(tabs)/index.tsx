import { MusicModeContainer } from "@/components/mainMenu/MusicMode/MusicModeContainer";
import { PlaylistsListContainer } from "@/components/mainMenu/PlaylistList/PlaylistsListContainer";
import { ThemedButton } from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require("@/assets/images/temporun-logo.png")}
        style={styles.logo}
      />
      <View style={styles.buttonContainer}>
        <ThemedButton title="Let's run" />
      </View>
      <MusicModeContainer />
      <PlaylistsListContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 25,
    paddingHorizontal: 16,
    paddingTop: 69,
    paddingBottom: 25,
    backgroundColor: Colors.dark.surfaceContainerLow,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    height: 80,
    width: 323,
  },
});
