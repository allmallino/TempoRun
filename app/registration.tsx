import RegistrationInputs from "@/components/loginPage/RegistrationInputs";
import useLogo from "@/hooks/useLogo";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import { Image } from "expo-image";
import { View, StyleSheet, StatusBar } from "react-native";

export default function RegistrationScreen() {
  const styles = useTheme(getStyle);
  const logo = useLogo();

  return (
    <View style={styles.mainContainer}>
      <Image source={logo} style={styles.logo} />
      <RegistrationInputs />
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
      gap: 120,
      paddingHorizontal: 16,
      paddingTop: 45 + (StatusBar.currentHeight || 0),
      paddingBottom: 25,
      backgroundColor: theme.surfaceContainerLow,
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
