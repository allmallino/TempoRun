import { StyleSheet, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "@/components/ui/IconButton";
import { useContext } from "react";
import { ThemeContext } from "@/theme/ThemeContext";
import { useRouter } from "expo-router";
import React from "react";
import AccountSettingsContainer from "@/components/settingPage/AccountSettingsContainer";
export default function AccountScreen() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const i18nRoot = "app:settings:account";
  const router = useRouter();

  const color = theme.onSurface;

  return (
    <SafeAreaView style={styles.mainContainer} edges={["left", "right", "top"]}>
      <View style={styles.headerButtonsContainer}>
        <IconButton icon="arrow.left" color={color} onPress={router.back} />
      </View>
      <ThemedText type="title" style={styles.title}>
        {t(`${i18nRoot}.title`)}
      </ThemedText>
      <AccountSettingsContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    paddingBottom: 25,
  },
  headerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: -40,
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  },
});
