import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import ThemedButton from "@/components/ThemedButton";
import ResultTable from "@/components/runningPage/ResultTable";

export default function ResultsPage() {
  const { t } = useTranslation();
  const i18nRoot = "app:results";

  return (
    <SafeAreaView
      style={styles.mainContainer}
      edges={["left", "right", "top", "bottom"]}
    >
      <ResultTable />
      <ThemedButton
        title={t(`${i18nRoot}.goBack`)}
        style={styles.finishButton}
        onPress={() => {
          router.back();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    paddingHorizontal: 16,
  },
  finishButton: {
    width: 156,
    height: 60,
  },
});
