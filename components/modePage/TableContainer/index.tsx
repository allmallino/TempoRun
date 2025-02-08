import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TableRow from "../TableRow";
import { ModeOptionType, MusicTempo } from "@/state/mode/types";
import Divider from "@/components/ui/Divider";
import React from "react";
import AddOptionButton from "../AddOptionButton";
import { useDispatch } from "react-redux";
import { changeTempo, removeOption } from "@/state/mode/modeSlice";
type TableContainerProps = {
  values: ModeOptionType[];
  onClickFactory: (index: number) => (() => void) | null;
};

export default function TableContainer({
  values,
  onClickFactory,
}: TableContainerProps) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      {values.map((value, index) => (
        <View key={"row-" + index}>
          <TableRow
            onTempoChange={(tempo: MusicTempo) => {
              dispatch(changeTempo({ index, tempo }));
            }}
            value={value.indicator}
            tempo={value.musicTempo}
            onClick={onClickFactory(index)}
            onRemoveClick={
              index !== 0
                ? () => {
                    dispatch(removeOption(index));
                  }
                : null
            }
          />
          <Divider color={theme.surfaceContainer} />
        </View>
      ))}
      <AddOptionButton />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
