import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { type TextProps, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

export type ThemedTextProps = TextProps & {
  type?:
    | "small"
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link";
};

export default function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const { theme } = useContext(ThemeContext);

  const color = theme.onSurface;

  return (
    <Animated.Text
      style={[
        { color, fontFamily: "Roboto" },
        type === "small" ? styles.small : undefined,
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
