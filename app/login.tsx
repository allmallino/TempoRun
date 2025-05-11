import LoginInputs from "@/components/loginPage/LoginInputs";
import useLogo from "@/hooks/useLogo";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import { Image } from "expo-image";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const styles = useTheme(getStyle);
  const logo = useLogo();

  return (
    <SafeAreaView
      style={styles.mainContainer}
      edges={["left", "right", "top", "bottom"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <Image source={logo} style={styles.logo} />
        <LoginInputs />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.surfaceContainerLow,
    },
    keyboardAvoidingView: {
      flex: 1,
      alignItems: "center",
      gap: 25,
      paddingHorizontal: 16,
      paddingTop: 45,
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
