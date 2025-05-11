import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import DeleteAccountModal from "../DeleteAccountModal";
import SettingButton from "../SettingButton";

export default function DeleteAccountButton() {
  const { t } = useTranslation();
  const i18nRoot = "app:settings:account";
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <DeleteAccountModal
        visible={isModalVisible}
        onConfirm={() => {}}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
      <SettingButton
        title={t(`${i18nRoot}:deleteAccount`)}
        icon="minus.circle.fill"
        onPress={() => {
          setIsModalVisible(true);
        }}
      />
    </>
  );
}
