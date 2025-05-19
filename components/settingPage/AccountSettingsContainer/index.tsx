import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import React from "react";
import SettingButtonWithConfirmationModal from "../SettingButtonWithConfirmationModal";
import SettingButtonWithInputModal from "../SettingButtonWithInputModal";
import { getStreamingService } from "@/state/streaming/selectors";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";

export default function AccountSettingsContainer() {
  const { t } = useTranslation();
  const i18nRoot = "app:settings:account";
  const serviceInfo = useSelector(getStreamingService);
  const {
    deleteAccount,
    changeEmail,
    changePassword,
    removeSpotifyService,
    isEmailProvider,
  } = useAuth();

  return (
    <View style={styles.container}>
      {isEmailProvider && (
        <>
          <SettingButtonWithInputModal
            title={`${t(`${i18nRoot}.changeEmail`)}`}
            icon="envelope.fill"
            type="email"
            onSave={changeEmail}
          />
          <SettingButtonWithInputModal
            title={`${t(`${i18nRoot}.changePassword`)}`}
            icon="lock.fill"
            type="password"
            onSave={changePassword}
          />
        </>
      )}
      {serviceInfo && (
        <SettingButtonWithConfirmationModal
          title={t(`${i18nRoot}.disconnectSpotify`)}
          icon="person.crop.circle.fill.badge.minus"
          onConfirm={removeSpotifyService}
        />
      )}
      <SettingButtonWithConfirmationModal
        title={t(`${i18nRoot}.deleteAccount`)}
        icon="minus.circle.fill"
        onConfirm={deleteAccount}
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
