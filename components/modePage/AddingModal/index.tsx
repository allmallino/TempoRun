import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import useTheme from "@/hooks/useTheme";
import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, View } from "react-native";
import {
  getSelectedMode,
  getSelectedOptionByIndex,
} from "@/state/mode/selectors";
import { useSelector } from "react-redux";
import ModalBase from "@/components/ui/ModalBase";
import { Mode } from "@/state/mode/types";

type inputInfoType = {
  inputTitles: string[];
  inputWidthes: number[];
  defaultValues: string[];
  valueValidators: ((value: string) => boolean)[];
  modalTitle: string;
  inputSeparator?: string;
  fromInputToIndicator: (inputValues: string[]) => string;
  fromIndicatorToInput: (indicator: string) => string[];
};

const inputInfoByMode: Record<Mode, inputInfoType> = {
  [Mode.TIMER]: {
    inputTitles: ["minutes", "seconds"],
    inputWidthes: [2, 2],
    defaultValues: ["00", "00"],
    valueValidators: [
      (value) => Number(value) <= 60 && Number(value) >= 0,
      (value) => Number(value) < 60 && Number(value) >= 0,
    ],
    modalTitle: "selectTime",
    inputSeparator: ":",
    fromInputToIndicator: (inputValues) =>
      inputValues
        .map((v) => v.padStart(2, "0"))
        .join(":")
        .padEnd(5, ":00"),
    fromIndicatorToInput: (indicator) =>
      indicator
        .split(":")
        .map((v) => (v ? `${parseInt(v)}`.padStart(2, "0") : "")),
  },
  [Mode.LENGTH]: {
    inputTitles: ["kilometers", "meters"],
    inputWidthes: [2, 3],
    defaultValues: ["0", "0"],
    valueValidators: [
      (value) => Number(value) < 100 && Number(value) >= 0,
      (value) => Number(value) < 1000 && Number(value) >= 0,
    ],
    modalTitle: "selectLength",
    inputSeparator: ".",
    fromInputToIndicator: (inputValues) =>
      `${Number(inputValues[0] ?? 0)
        .toString()
        .padStart(1, "0")}.${Number(inputValues[1] ?? 0)
        .toString()
        .padStart(3, "0")}`,
    fromIndicatorToInput: (indicator) => indicator.split("."),
  },
  [Mode.MAP]: {
    inputTitles: ["latitude", "longitude"],
    inputWidthes: [2, 2],
    defaultValues: ["0", "0"],
    valueValidators: [
      (value) => !isNaN(Number(value)),
      (value) => !isNaN(Number(value)),
    ],
    modalTitle: "selectMap",
    inputSeparator: ",",
    fromInputToIndicator: (inputValues) =>
      inputValues.map((v) => v.padStart(2, "0")).join(","),
    fromIndicatorToInput: (indicator) => indicator.split(","),
  },
  [Mode.PACE]: {
    inputTitles: ["minutes", "seconds"],
    inputWidthes: [2, 2],
    defaultValues: ["00", "00"],
    valueValidators: [
      (value) => Number(value) <= 60 && Number(value) >= 0,
      (value) => Number(value) < 60 && Number(value) >= 0,
    ],
    modalTitle: "selectTime",
    inputSeparator: ":",
    fromInputToIndicator: (inputValues) =>
      inputValues.map((v) => v.padStart(2, "0")).join(":"),
    fromIndicatorToInput: (indicator) => indicator.split(":"),
  },
};

type AddingModalType = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (indicator: string) => void;
  index: number;
};

export default function AddingModal({
  visible,
  onCancel,
  onSubmit,
  index,
}: AddingModalType) {
  const styles = useTheme(getStyles);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const option = useSelector(getSelectedOptionByIndex(index));
  const mode = useSelector(getSelectedMode);
  const inputInfo = inputInfoByMode[mode];

  const [inputValues, setInputValues] = useState<string[]>(
    inputInfo.defaultValues
  );

  useEffect(() => {
    if (option) {
      setInputValues(inputInfo.fromIndicatorToInput(option.indicator));
    }
  }, [option]);

  const i18nRoot = "app:mode:addingModal";

  return (
    <ModalBase visible={visible} onClose={onCancel} style={styles.modal}>
      <View style={styles.container}>
        <ThemedText type="small">
          {t(`${i18nRoot}.${inputInfo.modalTitle}`)}
        </ThemedText>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={[
                styles.input,
                styles.inputText,
                { width: inputInfo.inputWidthes[0] === 2 ? 96 : 144 },
              ]}
              value={inputValues[0]}
              maxLength={inputInfo.inputWidthes[0]}
              keyboardType="numeric"
              placeholder={inputInfo.defaultValues[0]}
              placeholderTextColor={theme.onSurface}
              onChangeText={(v) => {
                if (inputInfo.valueValidators[0](v))
                  setInputValues((prev) => {
                    const newInputValues = [...prev];
                    newInputValues[0] = v;
                    return newInputValues;
                  });
              }}
            />
            <ThemedText type="small" style={{ textAlign: "center" }}>
              {t(`${i18nRoot}.${inputInfo.inputTitles[0]}`)}
            </ThemedText>
          </View>
          {inputInfo.inputSeparator && (
            <ThemedText style={styles.inputText}>
              {inputInfo.inputSeparator}
            </ThemedText>
          )}
          <View>
            <TextInput
              style={[
                styles.input,
                styles.inputText,
                { width: inputInfo.inputWidthes[1] === 2 ? 96 : 116 },
              ]}
              value={inputValues[1]}
              maxLength={inputInfo.inputWidthes[1]}
              keyboardType="numeric"
              placeholder={inputInfo.defaultValues[1]}
              placeholderTextColor={theme.onSurface}
              onChangeText={(v) => {
                if (inputInfo.valueValidators[1](v))
                  setInputValues((prev) => {
                    const newInputValues = [...prev];
                    newInputValues[1] = v;
                    return newInputValues;
                  });
              }}
            />
            <ThemedText type="small" style={{ textAlign: "center" }}>
              {t(`${i18nRoot}.${inputInfo.inputTitles[1]}`)}
            </ThemedText>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ThemedButton
            title={t(`${i18nRoot}.cancel`)}
            type="text"
            onPress={onCancel}
          />
          <View style={{ flex: 1 }} />
          <ThemedButton
            title={t(`${i18nRoot}.ok`)}
            type="text"
            onPress={() => {
              if (inputValues.some((v) => v !== "" && Number(v) !== 0)) {
                onSubmit(inputInfo.fromInputToIndicator(inputValues));
              }
            }}
          />
        </View>
      </View>
    </ModalBase>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    modal: {
      paddingHorizontal: 64,
    },
    container: {
      gap: 20,
    },
    inputContainer: {
      flexDirection: "row",
      gap: 4,
    },
    inputText: {
      paddingVertical: 9,
      fontSize: 45,
      fontWeight: 400,
      lineHeight: 52,
    },
    input: {
      textAlign: "center",
      paddingHorizontal: 20,
      borderRadius: 8,
      backgroundColor: theme.surfaceContainerHighest,
      marginBottom: 7,
      color: theme.onSurface,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
