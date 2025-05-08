import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { useContext } from "react";
import { ThemeContext } from "@/theme/ThemeContext";
import { useTranslation } from "react-i18next";
import ThemedText from "@/components/ThemedText";
import { getSelectedMode } from "@/state/mode/selectors";
import { useSelector } from "react-redux";
import { Mode } from "@/state/mode/types";

const modeIcon = {
  [Mode.TIMER]: "watch.analog",
  [Mode.MAP]: "map.fill",
  [Mode.LENGTH]: "location.north.line.fill",
  [Mode.PACE]: "speedometer",
} as Record<Mode, IconSymbolName>;

export default function ActiveModeCard() {
  const { theme } = useContext(ThemeContext);
  const color = theme.onSurface;
  const mode = useSelector(getSelectedMode);
  const { t } = useTranslation();
  const i18nRoot = "app:menu";

  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold">{t(`${i18nRoot}.mode`)}</ThemedText>
      <Link href="/mode">
        <ElevatedContainer style={styles.elevatedContainer} elevation={4}>
          <IconSymbol size={28} name={modeIcon[mode]} color={color} />
          <ThemedText>{t(`${i18nRoot}:mods.${mode}`)}</ThemedText>
        </ElevatedContainer>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "center",
  },
  elevatedContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 25,
    gap: 16,
  },
});
