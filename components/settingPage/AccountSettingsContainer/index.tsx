import { StyleSheet, View } from "react-native";
import SettingButton from "../SettingButton";
import DeleteAccountButton from "../DeleteAccountButton";
import { useTranslation } from "react-i18next";
import auth from "@react-native-firebase/auth";
import React from "react";

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
          <SettingButton
            title={`${t(`${i18nRoot}.changeEmail`)}`}
            icon="envelope.fill"
            onPress={() => {}}
          />

          <SettingButton
            title={`${t(`${i18nRoot}.changePassword`)}`}
            icon="lock.fill"
            onPress={() => {}}
          />
        </>
      )}

      <SettingButton
        title={t(`${i18nRoot}.disconnectSpotify`)}
        icon="person.crop.circle.fill.badge.minus"
        onPress={() => {}}
      />
      <DeleteAccountButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 12,
  },
});
