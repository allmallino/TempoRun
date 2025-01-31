import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import ThemedText from "./ThemedText";
import React, { useContext, useEffect, useState } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";

export type ThemedInputProps = TextInputProps & {
  label: string;
  supportingText?: string;
  state?: "default" | "error";
  leadingIcon?: (color: string, style: StyleProp<ViewStyle>) => React.ReactNode;
  trailingIcon?: (
    color: string,
    style: StyleProp<ViewStyle>
  ) => React.ReactNode;
  textRef?: React.Ref<TextInput>;
  isLoading?: boolean;
};

const ThemedInput = React.memo(
  ({
    style,
    state = "default",
    label,
    supportingText,
    leadingIcon,
    trailingIcon,
    textRef,
    onChangeText,
    value,
    isLoading,
    ...rest
  }: ThemedInputProps) => {
    const { theme } = useContext(ThemeContext);
    const styles = useTheme(getStyles);

    const color = state === "default" ? theme.outline : theme.error;
    const [isFocused, setIsFocused] = useState(false);
    const values = useSharedValue({ x: 16, y: 16, scale: 1 });
    const animatedStyle = useAnimatedStyle(() => ({
      left: values.value.x,
      top: values.value.y,
      fontSize: 16 * values.value.scale,
      lineHeight: 24 * values.value.scale,
    }));
    const titleIsMain = isFocused || value || state === "error";

    useEffect(() => {
      values.value = withTiming({
        x: titleIsMain ? 12 : 16,
        y: titleIsMain ? -8 : 16,
        scale: titleIsMain ? 0.75 : 1,
      });
    }, [titleIsMain]);

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.inputContainer,
            { borderColor: color, borderWidth: isFocused ? 2 : 1 },
          ]}
        >
          <ThemedText
            type={titleIsMain ? "small" : "default"}
            style={[{ color }, styles.title, animatedStyle]}
          >
            {label}
          </ThemedText>
          {leadingIcon && leadingIcon(color, styles.icon)}
          <TextInput
            style={[{ color }, styles.input]}
            value={value}
            ref={textRef}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
          {trailingIcon && trailingIcon(color, styles.icon)}
        </View>
        {supportingText && state === "error" && (
          <ThemedText type="small" style={[{ color }, styles.supportingText]}>
            {supportingText}
          </ThemedText>
        )}
      </View>
    );
  }
);

export default ThemedInput;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 4,
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    inputContainer: {
      width: "100%",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4,
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      position: "absolute",
      paddingHorizontal: 4,
      backgroundColor: theme.surfaceContainerLow,
      top: -8,
      left: 12,
    },
    input: {
      flex: 1,
      height: 40,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    icon: {
      padding: 8,
    },
    supportingText: {
      flex: 1,
      marginHorizontal: 16,
      textAlign: "left",
    },
  });
