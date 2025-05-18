import ActiveModeCard from "@/components/mainMenu/ActiveModeCard";
import ActivePlaylistCardList from "@/components/mainMenu/ActivePlaylistCardList";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";
import useLogo from "@/hooks/useLogo";
import { SafeAreaView } from "react-native-safe-area-context";
import StartRunButton from "@/components/mainMenu/StartRunButton";

export default function HomeScreen() {
  const logo = useLogo();

  return (
    <SafeAreaView style={styles.mainContainer} edges={["left", "right", "top"]}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <StartRunButton />
      </View>
      <ActiveModeCard />
      <ActivePlaylistCardList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 25,
    paddingBottom: 25,
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
