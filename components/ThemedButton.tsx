import { StyleSheet, Pressable, View, PressableProps } from "react-native";
import ThemedText from "./ThemedText";
import { Theme } from "@/theme/types";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { IconSymbol, IconSymbolName } from "./ui/IconSymbol";

export type ButtonType = "filled" | "outlined" | "text";

export type ThemedButtonProps = Omit<PressableProps, "children"> & {
  type?: ButtonType;
  icon?: IconSymbolName;
  title: string;
  color?: string;
};

const getButtonStyles = (
  styles: ReturnType<typeof getStyles>,
  type: ButtonType,
  disabled?: boolean | null
) => {
  const styleMap: Record<ButtonType, any> = {
    filled: styles.filled,
    outlined: styles.outlined,
    text: null,
  };
  const disabledStyleMap: Record<ButtonType, any> = {
    filled: styles.filledDisabled,
    outlined: styles.outlinedDisabled,
    text: null,
  };

  return disabled ? disabledStyleMap[type] : styleMap[type];
};

const getTextStyles = (
  styles: ReturnType<typeof getStyles>,
  type: ButtonType,
  disabled?: boolean | null
) => {
  const styleMap: Record<ButtonType, any> = {
    filled: styles.filledText,
    outlined: styles.outlinedText,
    text: styles.textButtonText,
  };
  return disabled ? styles.textDisabled : styleMap[type];
};

export default function ThemedButton({
  onPress,
  type = "filled",
  icon,
  title,
  style,
  disabled = false,
  color,
  ...rest
}: ThemedButtonProps) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const hasFixedDimensions =
    style &&
    ("width" in StyleSheet.flatten(style) ||
      "height" in StyleSheet.flatten(style));

  return (
    <View
      style={[styles.container, getButtonStyles(styles, type, disabled), style]}
    >
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: disabled ? null : theme.primaryOpacity[12],
        }}
        style={[
          styles.button,
          type === "text" && { paddingHorizontal: 12 },
          hasFixedDimensions && { flex: 1 },
        ]}
        {...rest}
      >
        {icon && (
          <IconSymbol name={icon} color={color || theme.primary} size={24} />
        )}
        <ThemedText
          type="defaultSemiBold"
          style={[
            styles.text,
            color ? { color } : getTextStyles(styles, type, disabled),
          ]}
        >
          {title}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 100,
      overflow: "hidden",
      justifyContent: "center",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
      paddingHorizontal: 24,
      paddingVertical: 10,
      gap: 12,
    },
    text: {
      textAlign: "center",
    },

    filled: {
      backgroundColor: theme.primary,
    },
    filledDisabled: {
      backgroundColor: theme.onSurfaceOpacity[12],
    },
    filledText: {
      color: theme.onPrimary,
    },

    outlined: {
      borderColor: theme.outline,
      borderWidth: 1,
    },
    outlinedDisabled: {
      borderColor: theme.onSurface,
    },
    outlinedText: {
      color: theme.primary,
    },

    textButtonText: {
      color: theme.primary,
    },

    textDisabled: {
      color: theme.onSurface,
    },
  });
