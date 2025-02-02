import ThemedText from "@/components/ThemedText";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

type SettingButtonProps = {
  title: string;
  icon: IconSymbolName;
  onPress: () => void;
};

export default function SettingButton({
  title,
  icon,
  onPress,
}: SettingButtonProps) {
  const { theme } = useContext(ThemeContext);
  const color = theme.onSurfaceVariant;

  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
      android_ripple={{
        color: theme.primaryOpacity[12],
      }}
    >
      <IconSymbol name={icon} size={24} color={color} />
      <ThemedText>{title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 16,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
