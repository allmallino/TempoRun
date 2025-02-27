import { ActivityIndicator, StyleSheet, View } from "react-native";

type LoadingScreen = {
  isVisible: boolean;
};

export default function LoadingScreen() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.backgroundContainer]}>
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: "#000000a6",
    justifyContent: "center",
    alignItems: "center",
  },
});
