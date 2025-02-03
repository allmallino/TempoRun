import ThemedText from "@/components/ThemedText";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import { Pressable, StyleSheet } from "react-native";

type SegmentButtonProps = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
};

export default function SegmentButton({
  title,
  isSelected,
  onPress,
}: SegmentButtonProps) {
  const styles = useTheme(getStyle);

  return (
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <ThemedText>{title}</ThemedText>
    </Pressable>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 12,
      alignItems: "center",
      justifyContent: "center",
      borderStartWidth: 1,
      borderColor: theme.outline,
    },
    selectedContainer: {
      backgroundColor: theme.secondaryContainer,
    },
  });
