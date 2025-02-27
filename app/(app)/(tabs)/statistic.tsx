import { StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatisticsScreen() {
  const { t } = useTranslation();
  const i18nRoot = "app:stats";

  return (
    <SafeAreaView style={styles.mainContainer} edges={["left", "right", "top"]}>
      <ThemedText type="title">{t(`${i18nRoot}.title`)}</ThemedText>
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
});
