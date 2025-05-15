import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { Mode } from "@/state/mode/types";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAlgorithm } from "@/hooks/useAlgorithm";
import React from "react";

const modeIcon = {
  [Mode.TIMER]: "watch.analog",
  [Mode.MAP]: "map.fill",
  [Mode.LENGTH]: "location.north.line.fill",
  [Mode.PACE]: "speedometer",
} as Record<Mode, IconSymbolName>;

export default function CurrentOption() {
  const { theme } = useContext(ThemeContext);
  const color = theme.onSurface;
  const { t } = useTranslation();
  const i18nRoot = "app:menu";
  const { currentOptionIndex, currentTempo, totalOptions, mode } =
    useAlgorithm();

  return (
    <ElevatedContainer style={styles.container} elevation={4}>
      {currentOptionIndex !== -1 ? (
        <>
          <IconSymbol size={28} name={modeIcon[mode]} color={color} />

          <View style={styles.textContainer}>
            <ThemedText type="defaultSemiBold">
              {t(`${i18nRoot}:mods.${mode}`)}
            </ThemedText>
            <ThemedText type="default">
              Current song pace:{" "}
              <ThemedText type="defaultSemiBold">{currentTempo}</ThemedText>
            </ThemedText>
          </View>
          {mode !== Mode.PACE && (
            <ThemedText type="defaultSemiBold">
              {`${currentOptionIndex + 1} / ${totalOptions}`}
            </ThemedText>
          )}
        </>
      ) : (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={color} />
        </View>
      )}
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
  activityIndicatorContainer: {
    flex: 1,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
