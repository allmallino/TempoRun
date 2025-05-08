import { View, StyleSheet } from "react-native";
import SegmentedButtonsContainer from "../SegmentedButtonsContainer";
import { Mode } from "@/state/mode/types";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedMode } from "@/state/mode/selectors";
import { setSelectedModeAsync } from "@/state/mode/modeSlice";
import TableHeader from "../TableHeader";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";
import Divider from "@/components/ui/Divider";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext, useState } from "react";
import TableContainer from "../TableContainer";
import AddingModal from "../AddingModal";
import { AppDispatch } from "@/state/store";
import Map from "../Map";

const titlesByMode = {
  [Mode.TIMER]: ["time", "tempo"],
  [Mode.MAP]: ["point", "tempo"],
  [Mode.PACE]: ["pace", "tempo"],
  [Mode.LENGTH]: ["length", "tempo"],
};

export default function Table() {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useTheme(getStyle);
  const { theme } = useContext(ThemeContext);

  const i18nRoot = "app:mode:mods";

  const selectedMode = useSelector(getSelectedMode);
  const mods = Object.values(Mode);

  const titles = titlesByMode[selectedMode];

  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onClickFactory = (index: number) => {
    return index !== 0 && selectedMode !== Mode.MAP
      ? () => {
          setSelectedIndex(index);
          setVisible(true);
        }
      : null;
  };

  return (
    <View style={styles.container}>
      <AddingModal
        visible={visible}
        setVisible={setVisible}
        index={selectedIndex}
      />
      <SegmentedButtonsContainer
        values={mods}
        selectedValue={selectedMode}
        i18nRoot={i18nRoot}
        onPressFactory={(v) => () => {
          dispatch(setSelectedModeAsync(v));
        }}
      />
      {selectedMode === Mode.MAP ? <Map /> : null}
      {selectedMode !== Mode.PACE ? (
        <View style={styles.table}>
          <TableHeader titles={titles} />
          <Divider color={theme.surfaceContainerHighest} />
          <TableContainer onClickFactory={onClickFactory} />
        </View>
      ) : null}
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 12,
    },
    table: {
      backgroundColor: theme.surface,
      flex: 1,
    },
  });
