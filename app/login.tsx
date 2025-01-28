import LoginInputs from "@/components/loginPage/LoginInputs";
import { Colors } from "@/constants/Colors";
import { Images } from "@/constants/Images";
import { Image } from "expo-image";
import { View, StyleSheet, StatusBar } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.mainContainer}>
      <Image source={Images.tempoRun.logo} style={styles.logo} />
      <LoginInputs />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 25,
    paddingHorizontal: 16,
    paddingTop: 45 + (StatusBar.currentHeight || 0),
    paddingBottom: 25,
    backgroundColor: Colors.dark.surfaceContainerLow,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    height: 80,
    width: 323,
  },
});
