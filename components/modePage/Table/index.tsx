import { View, StyleSheet } from "react-native";
import SegmentedButtonsContainer from "../SegmentedButtonsContainer";
import { Mode } from "@/state/mode/types";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedOption, getSelectedMode } from "@/state/mode/selectors";
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

export default function Table() {
  const dispatch = useDispatch<AppDispatch>();
  const styles = useTheme(getStyle);
  const { theme } = useContext(ThemeContext);

  const i18nRoot = "app:mode:mods";
  const titles = ["time", "tempo"];

  const selectedMode = useSelector(getSelectedMode);
  const options = useSelector(getSelectedOption);
  const mods = Object.values(Mode);

  const [selectedItem, selectItem] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const onClickFactory = (id: number) => {
    return id !== 0
      ? () => {
          setSelectedId(id);
          selectItem(options[id].indicator);
          setVisible(true);
        }
      : null;
  };

  return (
    <View style={styles.container}>
      <AddingModal
        minutes={selectedItem.split(":")[0]}
        seconds={selectedItem.split(":")[1]}
        visible={visible}
        setVisible={setVisible}
        index={selectedId}
      />
      <SegmentedButtonsContainer
        values={mods}
        selectedValue={selectedMode}
        i18nRoot={i18nRoot}
        onPressFactory={(v) => () => {
          dispatch(setSelectedModeAsync(v));
        }}
      />
      <View style={styles.table}>
        <TableHeader titles={titles} />
        <Divider color={theme.surfaceContainerHighest} />
        <TableContainer values={options} onClickFactory={onClickFactory} />
      </View>
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
