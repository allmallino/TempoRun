import ActiveModeCard from "@/components/mainMenu/ActiveModeCard";
import ActivePlaylistCardList from "@/components/mainMenu/ActivePlaylistCardList";
import ThemedButton from "@/components/ThemedButton";
import { Image } from "expo-image";
import { View, StyleSheet, Alert } from "react-native";
import useLogo from "@/hooks/useLogo";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Location from "expo-location";

export default function HomeScreen() {
  const logo = useLogo();
  const { t } = useTranslation();
  const i18nRoot = "app:menu";
  const startSession = async () => {
    try {
      const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== "granted") {
        Alert.alert(
          t("app:permissions.location.title"),
          t("app:permissions.location.foregroundMessage")
        );
        return;
      }

      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== "granted") {
        Alert.alert(
          t("app:permissions.location.title"),
          t("app:permissions.location.backgroundMessage")
        );
        return;
      }

      router.navigate("../(running)");
    } catch (error) {
      console.error("Error requesting location permissions:", error);
      Alert.alert(
        t("app:permissions.location.title"),
        t("app:permissions.location.error")
      );
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer} edges={["left", "right", "top"]}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <ThemedButton
          title={t(`${i18nRoot}.run`)}
          style={styles.letsRunButton}
          onPress={startSession}
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
