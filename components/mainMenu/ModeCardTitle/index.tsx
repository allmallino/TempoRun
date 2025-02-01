import ThemedText from "@/components/ThemedText";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

type ModeCardTitleProps = {
  name: "timer" | "geolocation" | "pace" | "distance";
};

export default function ModeCardTitle({ name }: ModeCardTitleProps) {
  const styles = useTheme(getStyle);
  const { t } = useTranslation();
  const i18nRoot = "app:menu";

  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.text}>
        {t(`${i18nRoot}.mode`)}
      </ThemedText>
      <ThemedText style={styles.text}>
        {t(`${i18nRoot}:mods.${name}`)}
      </ThemedText>
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    text: {
      color: theme.onSurface,
    },
  });
