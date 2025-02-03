import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import SegmentButton from "../SegmentedButton";

export type SegmentedButtonsContainerProps<T> = {
  values: T[];
  selectedValue: T;
  i18nRoot: string;
  onPressFactory: (value: T) => () => void;
};

export default function SegmentedButtonsContainer<T>({
  values,
  selectedValue,
  onPressFactory,
  i18nRoot,
}: SegmentedButtonsContainerProps<T>) {
  const styles = useTheme(getStyle);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {values.map((v, i) => (
        <SegmentButton
          onPress={onPressFactory(v)}
          title={t(`${i18nRoot}.${v}`)}
          isSelected={selectedValue === v}
          key={i}
        />
      ))}
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      borderRadius: 100,
      borderWidth: 1,
      borderColor: theme.outline,
      paddingLeft: -1,
      gap: -1,
      overflow: "hidden",
    },
  });
