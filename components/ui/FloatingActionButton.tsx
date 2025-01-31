import { Colors } from "@/constants/Colors";
import { PressableProps, StyleSheet, View } from "react-native";
import { IconSymbolName } from "./IconSymbol";
import IconButton from "./IconButton";
import { useContext } from "react";
import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";

type FloatingActionButtonPropsType = {
  icon: IconSymbolName;
} & PressableProps;

export default function FloatingActionButton({
  onPress,
  icon,
}: FloatingActionButtonPropsType) {
  const { theme } = useContext(ThemeContext);
  const styles = useTheme(getStyles);

  const color = theme.primary;
  return (
    <View style={styles.outerShadow}>
      <View style={styles.innerShadow}>
        <IconButton
          icon={icon}
          color={color}
          onPress={onPress}
          style={styles.container}
          android_ripple={{ color: theme.primaryOpacity[12] }}
          size={28}
        />
      </View>
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surfaceContainerHigh,
      padding: 16,
    },
    outerShadow: {
      position: "absolute",
      bottom: 16,
      right: 16,
      borderRadius: 16,

      shadowColor: Colors.black,
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      elevation: 8,
    },

    innerShadow: {
      borderRadius: 16,

      shadowColor: Colors.black,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
      elevation: 3,
      overflow: "hidden",
    },
  });
