import { View, StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";

type DashboardItemProps = {
  label: string;
  value: string;
};

export default function DashboardItem({ label, value }: DashboardItemProps) {
  const styles = useTheme(getStyles);

  const i18nRoot = "app:running";
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{t(`${i18nRoot}.${label}`)}</ThemedText>
      <ThemedText style={styles.value}>{value}</ThemedText>
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      gap: 8,
      borderBottomWidth: 1,
      borderColor: theme.onSurface,
      width: "75%",
    },
    label: {
      fontSize: 24,
      lineHeight: 32,
    },
    value: {
      fontSize: 48,
      fontWeight: "bold",
      lineHeight: 56,
    },
  });
