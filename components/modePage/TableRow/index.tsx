import ThemedText from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { MusicTempo } from "@/state/mode/types";
import { ThemeContext } from "@/theme/ThemeContext";
import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import TableSelector from "../TableSelector";
import { useTranslation } from "react-i18next";

type TableRowProps = {
  value: string;
  tempo: MusicTempo;
  onClick: (() => void) | null;
  onRemoveClick: (() => void) | null;
  onTempoChange: (tempo: MusicTempo) => void;
};

export default function TableRow({
  value,
  tempo,
  onClick,
  onRemoveClick,
  onTempoChange,
}: TableRowProps) {
  const { theme } = useContext(ThemeContext);
  const tempoItems = Object.values(MusicTempo);
  const { t } = useTranslation();
  const i18nRoot = "app:mode:table:tempo";

  return (
    <View style={styles.container}>
      <Pressable onPress={onClick} style={[styles.cellContainer, { flex: 1 }]}>
        <ThemedText>{value}</ThemedText>
      </Pressable>
      <View style={[styles.cellContainer, { flex: 1.5 }]}>
        <TableSelector
          value={tempo}
          items={tempoItems.map((tempo) => ({
            label: t(`${i18nRoot}.${tempo}`),
            value: tempo,
          }))}
          onValueChange={onTempoChange}
        />
      </View>
      <View style={styles.removeButtonContainer}>
        {onRemoveClick && (
          <Pressable
            onPress={onRemoveClick}
            style={styles.removeButton}
            android_ripple={{ color: theme.surfaceContainer }}
          >
            <IconSymbol
              name="xmark.circle"
              size={24}
              color={theme.onSurfaceVariant}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cellContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  removeButtonContainer: {
    width: 48,
    paddingHorizontal: 8,
  },
  removeButton: {
    paddingHorizontal: 4,
  },
});
