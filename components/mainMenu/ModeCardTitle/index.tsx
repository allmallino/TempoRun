import ThemedText from "@/components/ThemedText";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import { StyleSheet, View } from "react-native";

type ModeCardTitleProps = {
  name: string;
};

export default function ModeCardTitle({ name }: ModeCardTitleProps) {
  const styles = useTheme(getStyle);

  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.text}>
        Mode:{" "}
      </ThemedText>
      <ThemedText style={styles.text}>{name}</ThemedText>
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
