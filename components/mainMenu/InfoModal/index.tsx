import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import ModalBase from "@/components/ui/ModalBase";

type InfoModalProps = {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
};

export default function InfoModal({
  visible,
  onClose,
  title,
  description,
}: InfoModalProps) {
  const { t } = useTranslation();
  const i18nRoot = "app:menu:infoModal";

  return (
    <ModalBase visible={visible} onClose={onClose} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ThemedText type="subtitle">{title}</ThemedText>
          <ThemedText style={styles.description}>{description}</ThemedText>
        </View>
        <View style={styles.buttonsContainer}>
          <ThemedButton title={t(`${i18nRoot}.close`)} onPress={onClose} />
        </View>
      </View>
    </ModalBase>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 32,
    minWidth: 250,
  },
  contentContainer: {
    gap: 16,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  modal: {
    paddingHorizontal: 48,
  },
  description: {
    textAlign: "center",
  },
});
