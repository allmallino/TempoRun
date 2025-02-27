import { ScrollView, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import SettingsContainer from "@/components/settingPage/SettingsContainer";
import { useTranslation } from "react-i18next";
import MusicServicesContainer from "@/components/settingPage/MusicServicesContainer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const i18nRoot = "app:settings";

  return (
    <SafeAreaView style={styles.mainContainer} edges={["left", "right", "top"]}>
      <ScrollView contentContainerStyle={[styles.contentContainer]}>
        <ThemedText type="title" style={styles.title}>
          {t(`${i18nRoot}.title`)}
        </ThemedText>
        <MusicServicesContainer />
        <SettingsContainer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    gap: 10,
  },
  title: {
    textAlign: "center",
    paddingBottom: 25,
  },
});
