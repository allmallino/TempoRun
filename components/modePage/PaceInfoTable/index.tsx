import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import TableRow from "../TableRow";
import { MusicTempo } from "@/state/mode/types";
import Divider from "@/components/ui/Divider";
import React from "react";
import { useSelector } from "react-redux";
import { getSelectedOptionByIndex } from "@/state/mode/selectors";
import { formatPace } from "@/helpers";

interface PaceRow {
  title: string;
  tempo: MusicTempo;
}

export default function PaceInfoTable() {
  const { theme } = useContext(ThemeContext);
  const option = useSelector(getSelectedOptionByIndex(0));
  const [lowPace, highPace] = option.indicator.split(":").map(Number);

  const paceRows: PaceRow[] = [
    {
      title: `<= ${formatPace(lowPace)}`,
      tempo: MusicTempo.HIGH,
    },
    {
      title: `<= ${formatPace(highPace)}`,
      tempo: MusicTempo.MEDIUM,
    },
    {
      title: `> ${formatPace(highPace)}`,
      tempo: MusicTempo.LOW,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {paceRows.map((row, index) => (
        <React.Fragment key={index}>
          <TableRow title={row.title} tempo={row.tempo} />
          {index < paceRows.length - 1 && (
            <Divider color={theme.surfaceContainer} />
          )}
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
