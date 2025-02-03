import { StatusBar, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import Table from "@/components/modePage/Table";

export default function ModeScreen() {
  const styles = useTheme(getStyle);
  const { t } = useTranslation();
  const i18nRoot = "app:mode";

  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">{t(`${i18nRoot}.title`)}</ThemedText>
      <Table />
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
      gap: 25,
      paddingHorizontal: 16,
      paddingTop: 45 + (StatusBar.currentHeight || 0),
      paddingBottom: 25,
      backgroundColor: theme.surfaceContainerLow,
    },
  });
