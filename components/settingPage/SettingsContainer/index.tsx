import { StyleSheet, View } from "react-native";
import Divider from "../Divider";
import SettingsSection from "../SettingsSection";
import SettingButton from "../SettingButton";
import useAuth from "@/hooks/useAuth";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsContainer() {
  const { signOut } = useAuth();
  const { theme, changeTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const i18nRoot = "app:settings";
  const themeText = t(`${i18nRoot}.theme.${theme.dark ? "dark" : "light"}`);

  return (
    <View style={styles.container}>
      <SettingsSection title={t(`${i18nRoot}:appSettings.title`)}>
        <SettingButton
          title={`${t(`${i18nRoot}:appSettings.theme`)}${themeText}`}
          icon={theme.dark ? "moon" : "sun.max"}
          onPress={changeTheme}
        />

        <SettingButton
          title={`${t(`${i18nRoot}:appSettings.language`)}`}
          icon="globe"
          onPress={() => {
            i18n.changeLanguage(i18n.language === "ua" ? "en" : "ua");
            AsyncStorage.setItem("language", i18n.language);
          }}
        />
      </SettingsSection>

      <Divider color={theme.outlineVariant} />
      <SettingsSection title={t(`${i18nRoot}:accountSettings.title`)}>
        <SettingButton
          title={t(`${i18nRoot}:accountSettings.changeInfo`)}
          icon="person.crop.circle.fill"
          onPress={() => {}}
        />
        <SettingButton
          title={t(`${i18nRoot}:accountSettings.logout`)}
          icon="xmark.circle"
          onPress={signOut}
        />
      </SettingsSection>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
  },
});
