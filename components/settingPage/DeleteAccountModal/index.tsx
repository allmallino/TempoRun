import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import ModalBase from "@/components/ui/ModalBase";

type DeleteAccountModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteAccountModal({
  visible,
  onConfirm,
  onCancel,
}: DeleteAccountModalProps) {
  const { t } = useTranslation();
  const i18nRoot = "app:settings:account:deleteAccountModal";

  return (
    <ModalBase visible={visible} onClose={onCancel} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ThemedText type="subtitle">{t(`${i18nRoot}.title`)}</ThemedText>
          <ThemedText>{t(`${i18nRoot}.description`)}</ThemedText>
        </View>
        <View style={styles.buttonsContainer}>
          <ThemedButton title={t(`${i18nRoot}.cancel`)} onPress={onCancel} />
          <ThemedButton title={t(`${i18nRoot}.delete`)} onPress={onConfirm} />
        </View>
      </View>
    </ModalBase>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },
  contentContainer: {
    gap: 16,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  modal: {
    paddingHorizontal: 48,
  },
});
