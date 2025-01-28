import RegistrationInputs from "@/components/loginPage/RegistrationInputs";
import { Colors } from "@/constants/Colors";
import { Images } from "@/constants/Images";
import { Image } from "expo-image";
import { View, StyleSheet, StatusBar } from "react-native";

export default function RegistrationScreen() {
  return (
    <View style={styles.mainContainer}>
      <Image source={Images.tempoRun.logo} style={styles.logo} />
      <RegistrationInputs />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 120,
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
