import { ScrollView, StatusBar, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Theme } from "@/theme/types";
import SettingsContainer from "@/components/settingPage/SettingsContainer";
import useTheme from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import MusicServicesContainer from "@/components/settingPage/MusicServicesContainer";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function SettingsScreen() {
  const styles = useTheme(getStyle);
  const { t } = useTranslation();
  const i18nRoot = "app:settings";
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: tabBarHeight },
      ]}
    >
      <ThemedText type="title" style={styles.title}>
        {t(`${i18nRoot}.title`)}
      </ThemedText>
      <MusicServicesContainer />
      <SettingsContainer />
    </ScrollView>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 45 + (StatusBar.currentHeight || 0),
      paddingBottom: 25,
      backgroundColor: theme.surfaceContainerLow,
    },
    contentContainer: {
      gap: 10,
    },
    title: {
      textAlign: "center",
      paddingBottom: 25,
    },
  });
