import useTheme from "@/hooks/useTheme";
import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";
import { Image } from "expo-image";
import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type MusicServicesButtonProps = {
  icon: string;
  onPress: () => void;
};

export default function MusicServiceButton({
  icon,
  onPress,
}: MusicServicesButtonProps) {
  const styles = useTheme(getStyle);
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={styles.pressable}
        android_ripple={{ color: theme.onSurfaceOpacity[12] }}
      >
        <Image source={icon} style={{ width: 24, height: 24 }} />
      </Pressable>
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.outline,
      borderRadius: 100,
      overflow: "hidden",
    },
    pressable: {
      padding: 8,
    },
  });
