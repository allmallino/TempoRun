import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, View, ActivityIndicator } from "react-native";
import ModalBase from "@/components/ui/ModalBase";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";
import { ThemeContext } from "@/theme/ThemeContext";
import Dimensions from "@/constants/Dimensions";

type InputModalProps = {
  type: "email" | "password";
  visible: boolean;
  onSave: (value: string) => void;
  onCancel: () => void;
};

export default function InputModal({
  type,
  visible,
  onSave,
  onCancel,
}: InputModalProps) {
  const { t } = useTranslation();
  const i18nRoot = "app:settings:account:inputModal";
  const { theme } = useContext(ThemeContext);

  const color = theme.onSurface;
  const styles = useTheme(getStyles);

  const [value, setValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateInput = () => {
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError(t(`${i18nRoot}.errors.invalidEmail`));
        return false;
      }
    } else if (type === "password") {
      if (value.length < 8) {
        setError(t(`${i18nRoot}.errors.passwordTooShort`));
        return false;
      }
      if (value !== confirmValue) {
        setError(t(`${i18nRoot}.errors.passwordsDoNotMatch`));
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleSave = async () => {
    if (!validateInput()) return;

    setIsLoading(true);
    try {
      await onSave(value);
      setValue("");
      setConfirmValue("");
      setError(null);
    } catch (err) {
      setError(t(`${i18nRoot}.errors.saveFailed`));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalBase visible={visible} onClose={onCancel} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <ThemedText type="subtitle">
            {t(`${i18nRoot}.title.${type}`)}
          </ThemedText>
          <ThemedText>{t(`${i18nRoot}.description.${type}`)}</ThemedText>
          <TextInput
            style={[styles.input, { color }]}
            placeholder={t(`${i18nRoot}.placeholder.${type}`)}
            placeholderTextColor={color}
            value={value}
            onChangeText={(text) => {
              setValue(text);
              setError(null);
            }}
            keyboardType={type === "email" ? "email-address" : "default"}
            secureTextEntry={type === "password"}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {type === "password" && (
            <TextInput
              style={[styles.input, { color }]}
              placeholderTextColor={color}
              placeholder={t(`${i18nRoot}.placeholder.repeatPassword`)}
              value={confirmValue}
              onChangeText={(text) => {
                setConfirmValue(text);
                setError(null);
              }}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
          {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
        </View>
        <View style={styles.buttonsContainer}>
          <ThemedButton
            title={t(`${i18nRoot}.cancel`)}
            onPress={onCancel}
            disabled={isLoading}
          />
          <ThemedButton
            title={t(`${i18nRoot}.save`)}
            onPress={handleSave}
            disabled={
              isLoading || !value || (type === "password" && !confirmValue)
            }
          />
        </View>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={theme.primary}
            style={styles.loader}
          />
        )}
      </View>
    </ModalBase>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 32,
      width: Dimensions.WIDTH * 0.7,
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
      paddingHorizontal: 12,
    },
    input: {
      textAlign: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: theme.surfaceContainerHighest,
      fontSize: 16,
      width: "100%",
    },
    errorText: {
      color: theme.error,
      fontSize: 14,
      textAlign: "center",
    },
    loader: {
      position: "absolute",
      bottom: 8,
      alignSelf: "center",
    },
  });
