import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { ThemeContext } from "@/theme/ThemeContext";
import ThemedText from "@/components/ThemedText";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";
import { formatPace } from "@/helpers";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/state/store";
import { changeIndicatorAsync } from "@/state/mode/modeSlice";
import { getSelectedOptionByIndex } from "@/state/mode/selectors";

const MIN_PACE = 4 * 60;
const MAX_PACE = 8 * 60;
const INITIAL_PADDING = 60;
const STEP = 15;

const ThumbMessage = ({
  value,
  style,
}: {
  value: number;
  style: StyleProp<ViewStyle>;
}) => (
  <View style={style}>
    <ThemedText>{formatPace(value)}</ThemedText>
  </View>
);

export default function PaceSlider() {
  const [value, setValue] = useState([
    MIN_PACE + INITIAL_PADDING,
    MAX_PACE - INITIAL_PADDING,
  ]);
  const [visibleThumbMessageIndex, setVisibleThumbMessageIndex] = useState<
    number | null
  >(null);
  const { theme } = useContext(ThemeContext);
  const styles = useTheme(getStyle);

  const option = useSelector(getSelectedOptionByIndex(0));

  useEffect(() => {
    if (option) {
      const [min, max] = option.indicator.split(":").map(Number);
      setValue([
        min > MIN_PACE && min < MAX_PACE ? min : MIN_PACE,
        max > MIN_PACE && max < MAX_PACE ? max : MAX_PACE,
      ]);
    }
  }, [option]);

  const { t } = useTranslation();
  const i18nRoot = "app:mode:paceSlider";
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="subtitle">
        {t(`${i18nRoot}.title`)}
      </ThemedText>

      <Slider
        minimumValue={MIN_PACE}
        maximumValue={MAX_PACE}
        thumbTintColor={theme.primary}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.outline}
        renderBelowThumbComponent={(index, value) =>
          visibleThumbMessageIndex === index ? (
            <ThumbMessage value={value} style={styles.thumbMessageContainer} />
          ) : null
        }
        onSlidingStart={(_, index) => setVisibleThumbMessageIndex(index)}
        step={STEP}
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue);
        }}
        onSlidingComplete={([min, max]) => {
          setVisibleThumbMessageIndex(null);
          dispatch(
            changeIndicatorAsync({
              index: 0,
              indicator: `${min}:${max}`,
            })
          );
        }}
      />
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    thumbMessageContainer: {
      borderColor: theme.onSurfaceVariant,
      backgroundColor: theme.surface,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      marginLeft: -32,
    },
    container: {
      paddingHorizontal: 32,
      height: 300,
      backgroundColor: theme.surface,
      justifyContent: "center",
      gap: 16,
    },
    title: {
      textAlign: "center",
      top: 32,
      left: 0,
      right: 0,
      position: "absolute",
    },
  });
