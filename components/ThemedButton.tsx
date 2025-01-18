import { Colors } from "@/constants/Colors";
import { StyleSheet, Pressable, View, ButtonProps } from "react-native";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = ButtonProps & {
  type?: "filled" | "outlined" | "text" | "elevated" | "tonal";
  icon?:
    | ((props: {
        focused: boolean;
        color: string;
        size: number;
      }) => React.ReactNode)
    | undefined;
};

export function ThemedButton({
  onPress,
  type = "filled",
  icon,
  ...rest
}: ThemedButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          type === "filled" ? styles.filled : undefined,
          type === "outlined" ? styles.outlined : undefined,
          type === "text" ? styles.text : undefined,
          type === "elevated" ? styles.elevated : undefined,
          type === "tonal" ? styles.tonal : undefined,
        ]}
      >
        <ThemedText
          type="defaultSemiBold"
          style={[
            type === "filled" ? styles.filledText : undefined,
            type === "outlined" ? styles.outlinedText : undefined,
            type === "text" ? styles.textText : undefined,
            type === "elevated" ? styles.elevatedText : undefined,
            type === "tonal" ? styles.tonalText : undefined,
          ]}
          children={rest.title}
          {...rest}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filled: {
    backgroundColor: Colors.dark.primary,
    borderRadius: 100,
    paddingHorizontal: 48,
    paddingVertical: 20,
  },
  filledText: {
    color: Colors.dark.onPrimary,
  },

  outlined: {},
  outlinedText: {},

  text: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textText: {
    color: Colors.dark.primary,
  },

  elevated: {},
  elevatedText: {},

  tonal: {},
  tonalText: {},
});
