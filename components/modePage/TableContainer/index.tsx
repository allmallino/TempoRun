import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TableRow from "../TableRow";
import { Mode, MusicTempo } from "@/state/mode/types";
import Divider from "@/components/ui/Divider";
import React from "react";
import AddOptionButton from "../AddOptionButton";
import { useDispatch, useSelector } from "react-redux";
import { changeTempoAsync, removeOptionAsync } from "@/state/mode/modeSlice";
import { AppDispatch } from "@/state/store";
import { getSelectedMode, getSelectedOptions } from "@/state/mode/selectors";
type TableContainerProps = {
  onClickFactory: (index: number) => (() => void) | null;
};

const MAX_OPTIONS = 15;
export default function TableContainer({
  onClickFactory,
}: TableContainerProps) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  const options = useSelector(getSelectedOptions);
  const selectedMode = useSelector(getSelectedMode);

  const getTitle = (value: string, index: number) => {
    if (index === 0) {
      return "Start";
    }
    return selectedMode === Mode.MAP ? String.fromCharCode(64 + index) : value;
  };

  return (
    <ScrollView style={styles.container}>
      {options.map((value, index) => (
        <View key={"row-" + index}>
          <TableRow
            onTempoChange={(tempo: MusicTempo) => {
              dispatch(changeTempoAsync({ index, musicTempo: tempo }));
            }}
            title={getTitle(value.indicator, index)}
            tempo={value.musicTempo}
            onClick={onClickFactory(index)}
            onRemoveClick={
              index !== 0
                ? () => {
                    dispatch(removeOptionAsync(index));
                  }
                : null
            }
          />
          <Divider color={theme.surfaceContainer} />
        </View>
      ))}
      {options.length < MAX_OPTIONS && <AddOptionButton />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
