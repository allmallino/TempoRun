import ActiveModeCard from "@/components/mainMenu/ActiveModeCard";
import ActivePlaylistCardList from "@/components/mainMenu/ActivePlaylistCardList";
import ThemedButton from "@/components/ThemedButton";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";
import useLogo from "@/hooks/useLogo";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const logo = useLogo();
  const { t } = useTranslation();
  const i18nRoot = "app:menu";

  return (
    <SafeAreaView style={styles.mainContainer} edges={["left", "right", "top"]}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <ThemedButton
          title={t(`${i18nRoot}.run`)}
          style={styles.letsRunButton}
        />
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
  letsRunButton: {
    width: 156,
    height: 60,
  },
});
