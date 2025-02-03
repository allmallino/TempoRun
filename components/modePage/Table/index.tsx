import { View, StyleSheet } from "react-native";
import SegmentedButtonsContainer from "../SegmentedButtonsContainer";
import { Mode } from "@/state/mode/types";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedMode } from "@/state/mode/selectors";
import { setSelectedMode } from "@/state/mode/modeSlice";

export default function Table() {
  const i18nRoot = "app:mode:mods";
  const selectedMode = useSelector(getSelectedMode);
  const dispatch = useDispatch();
  const mods = Object.values(Mode);

  return (
    <View style={styles.container}>
      <SegmentedButtonsContainer
        values={mods}
        selectedValue={selectedMode}
        i18nRoot={i18nRoot}
        onPressFactory={(v) => () => {
          dispatch(setSelectedMode(v));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
