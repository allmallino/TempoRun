import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "@/theme/ThemeContext";
import { Colors } from "@/constants/Colors";

type LoadingScreenProps = {
  isVisible: boolean;
};

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const { theme } = useContext(ThemeContext);
  const color = theme.primary;

  return (
    isVisible && (
      <View style={[StyleSheet.absoluteFill, styles.backgroundContainer]}>
        <ActivityIndicator color={color} size="large" />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: Colors.shadowBackdrop,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
