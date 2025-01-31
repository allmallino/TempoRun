import ThemedText from "@/components/ThemedText";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import { StyleSheet, View } from "react-native";

type PlaylistCardProps = {
  name: string;
};

export default function PlaylistCard({ name }: PlaylistCardProps) {
  const styles = useTheme(getStyle);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>{name}</ThemedText>
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      borderColor: theme.outlineVariant,
      borderWidth: 1,
      padding: 16,
    },
    text: {
      color: theme.onSurface,
    },
  });
