import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import {
  getCurrentOptionIndex,
  getSelectedMode,
  getSelectedOptionsLength,
} from "@/state/mode/selectors";
import { Mode } from "@/state/mode/types";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const modeIcon = {
  [Mode.TIMER]: "watch.analog",
  [Mode.MAP]: "map.fill",
  [Mode.LENGTH]: "location.north.line.fill",
  [Mode.PACE]: "speedometer",
} as Record<Mode, IconSymbolName>;

export default function CurrentOption() {
  const { theme } = useContext(ThemeContext);
  const color = theme.onSurface;
  const mode = useSelector(getSelectedMode);
  const { t } = useTranslation();
  const i18nRoot = "app:menu";
  const songPace = "Medium";
  const currentOptionIndex = useSelector(getCurrentOptionIndex) + 1;
  const totalOptions = useSelector(getSelectedOptionsLength);

  return (
    <ElevatedContainer style={styles.container} elevation={4}>
      <IconSymbol size={28} name={modeIcon[mode]} color={color} />

      <View style={styles.textContainer}>
        <ThemedText type="defaultSemiBold">
          {t(`${i18nRoot}:mods.${mode}`)}
        </ThemedText>
        <ThemedText type="default">
          Current song pace:{" "}
          <ThemedText type="defaultSemiBold">{songPace}</ThemedText>
        </ThemedText>
      </View>
      <ThemedText type="defaultSemiBold">
        {`${currentOptionIndex} / ${totalOptions}`}
      </ThemedText>
    </ElevatedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
