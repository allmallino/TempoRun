import { Colors } from "@/constants/Colors";
import { StyleSheet, Pressable, View, PressableProps } from "react-native";
import ThemedText from "./ThemedText";

export type ButtonType = "filled" | "outlined" | "text";

export type ThemedButtonProps = Omit<PressableProps, "children"> & {
  type?: ButtonType;
  icon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => React.ReactNode;
  title: string;
};

const getButtonStyles = (type: ButtonType, disabled?: boolean | null) => {
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

const getTextStyles = (type: ButtonType, disabled?: boolean | null) => {
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
  ...rest
}: ThemedButtonProps) {
  return (
    <View style={[styles.container, getButtonStyles(type, disabled), style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: disabled ? null : Colors.dark.primaryOpacity[12],
        }}
        style={styles.button}
        {...rest}
      >
        {icon && icon({ focused: false, color: Colors.dark.primary, size: 24 })}
        <ThemedText
          type="defaultSemiBold"
          style={[styles.text, getTextStyles(type, disabled)]}
        >
          {title}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: "hidden",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 8,
  },
  text: {
    textAlign: "center",
  },

  filled: {
    backgroundColor: Colors.dark.primary,
  },
  filledDisabled: {
    backgroundColor: Colors.dark.onSurfaceOpacity[12],
  },
  filledText: {
    color: Colors.dark.onPrimary,
  },

  outlined: {
    borderColor: Colors.dark.outline,
    borderWidth: 1,
  },
  outlinedDisabled: {
    borderColor: Colors.dark.onSurface,
  },
  outlinedText: {
    color: Colors.dark.primary,
  },

  textButtonText: {
    color: Colors.dark.primary,
  },

  textDisabled: {
    color: Colors.dark.onSurface,
  },
});
