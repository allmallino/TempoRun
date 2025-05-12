import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import auth from "@react-native-firebase/auth";
import React from "react";
import SettingButtonWithConfirmationModal from "../SettingButtonWithConfirmationModal";
import SettingButtonWithInputModal from "../SettingButtonWithInputModal";

export default function AccountSettingsContainer() {
  const { t } = useTranslation();
  const i18nRoot = "app:settings:account";
  const currentUser = auth().currentUser;
  const isEmailProvider = currentUser?.providerData.some(
    (provider) => provider.providerId === "password"
  );

  return (
    <View style={styles.container}>
      {!isEmailProvider && (
        <>
          <SettingButtonWithInputModal
            title={`${t(`${i18nRoot}.changeEmail`)}`}
            icon="envelope.fill"
            type="email"
            onSave={() => {}}
          />
          <SettingButtonWithInputModal
            title={`${t(`${i18nRoot}.changePassword`)}`}
            icon="lock.fill"
            type="password"
            onSave={() => {}}
          />
        </>
      )}
      <SettingButtonWithConfirmationModal
        title={t(`${i18nRoot}.disconnectSpotify`)}
        icon="person.crop.circle.fill.badge.minus"
        onConfirm={() => {}}
      />
      <SettingButtonWithConfirmationModal
        title={t(`${i18nRoot}.deleteAccount`)}
        icon="minus.circle.fill"
        onConfirm={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
  },
});
