import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { Colors } from "@/constants/Colors";
import useTheme from "@/hooks/useTheme";
import { changeIndicatorAsync } from "@/state/mode/modeSlice";
import { AppDispatch } from "@/state/store";
import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

type AddingModalType = {
  minutes?: string;
  seconds?: string;
  visible: boolean;
  setVisible: (v: boolean) => void;
  index: number;
};

export default function AddingModal({
  minutes,
  seconds,
  visible,
  setVisible,
  index,
}: AddingModalType) {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useTheme(getStyles);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  const i18nRoot = "app:mode:addingModal";

  useEffect(() => {
    setMin(minutes || "");
    setSec(seconds || "");
  }, [minutes, seconds]);

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modal}>
        <View>
          <ElevatedContainer elevation={3} style={styles.container}>
            <ThemedText>{t(`${i18nRoot}.selectTime`)}</ThemedText>
            <View style={styles.inputContainer}>
              <View>
                <TextInput
                  style={[styles.input, styles.inputText]}
                  value={min}
                  maxLength={2}
                  keyboardType="numeric"
                  placeholder="00"
                  placeholderTextColor={theme.onSurface}
                  onChangeText={(v) => {
                    if (Number(v) <= 60 && Number(v) >= 0) setMin(v);
                  }}
                />
                <ThemedText type="small">{t(`${i18nRoot}.minutes`)}</ThemedText>
              </View>
              <ThemedText style={styles.inputText}>:</ThemedText>
              <View>
                <TextInput
                  style={[styles.input, styles.inputText]}
                  value={sec}
                  maxLength={2}
                  keyboardType="numeric"
                  placeholder="00"
                  placeholderTextColor={theme.onSurface}
                  onChangeText={(v) => {
                    if (Number(v) < 60 && Number(v) >= 0) setSec(v);
                  }}
                />
                <ThemedText type="small">{t(`${i18nRoot}.seconds`)}</ThemedText>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <ThemedButton
                title={t(`${i18nRoot}.cancel`)}
                type="text"
                onPress={() => {
                  setVisible(false);
                }}
              />
              <View style={{ flex: 1 }} />
              <ThemedButton
                title={t(`${i18nRoot}.ok`)}
                type="text"
                onPress={() => {
                  dispatch(
                    changeIndicatorAsync({
                      index,
                      indicator: `${min.padStart(2, "0")}:${sec.padStart(
                        2,
                        "0"
                      )}`,
                    })
                  );
                  setVisible(false);
                }}
              />
            </View>
          </ElevatedContainer>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    modal: {
      backgroundColor: Colors.shadowBackdrop,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      padding: 24,
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
      width: 96,
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
