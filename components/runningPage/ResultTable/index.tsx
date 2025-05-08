import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import ResultTableRow from "../ResultTableRow";

export default function ResultTable() {
  const styles = useTheme(getStyles);
  const { t } = useTranslation();
  const i18nRoot = "app:results";

  return (
    <ElevatedContainer elevation={2} style={styles.container}>
      <ThemedText type="title">{t(`${i18nRoot}.wellDone`)}</ThemedText>
      <View style={styles.table}>
        <ResultTableRow title={t(`${i18nRoot}.distance`)} value="100m" />
        <ResultTableRow title={t(`${i18nRoot}.time`)} value="10:00" />
        <ResultTableRow title={t(`${i18nRoot}.pace`)} value="10:00/km" />
        <ResultTableRow title={t(`${i18nRoot}.checkpoints`)} value="10/10" />
      </View>
    </ElevatedContainer>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 32,
      gap: 16,
    },
    table: {
      justifyContent: "space-between",
      backgroundColor: theme.surfaceContainerLow,
      width: "100%",
      borderRadius: 8,
      padding: 16,
    },
  });
