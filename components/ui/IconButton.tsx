import {
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  PressableProps,
} from "react-native";
import { IconSymbol, IconSymbolName } from "./IconSymbol";

export type IconButtonProps = PressableProps & {
  icon: IconSymbolName;
  color: string;
  style?: StyleProp<ViewStyle>;
  size?: number;
};

export function IconButton({
  onPress,
  icon,
  color,
  style,
  size,
}: IconButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <IconSymbol name={icon} color={color} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
