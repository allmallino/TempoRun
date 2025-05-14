import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import ResultTableRow from "../ResultTableRow";
import { useSession } from "@/contexts/SessionContext";
import { formatDistance, formatPace, formatTime } from "@/helpers";
import { useSelector } from "react-redux";
import { getSelectedOptionsLength } from "@/state/mode/selectors";
export default function ResultTable() {
  const styles = useTheme(getStyles);
  const { t } = useTranslation();
  const i18nRoot = "app:results";

  const { sessionData, getAveragePace, currentOptionIndex } = useSession();
  const totalOptions = useSelector(getSelectedOptionsLength);

  const time = formatTime((Date.now() - sessionData!.startTime) / 1000);
  const distance = formatDistance(sessionData!.distance);
  const pace = formatPace(getAveragePace());

  return (
    <ElevatedContainer elevation={2} style={styles.container}>
      <ThemedText type="title">{t(`${i18nRoot}.wellDone`)}</ThemedText>
      <View style={styles.table}>
        <ResultTableRow
          title={t(`${i18nRoot}.distance`)}
          value={`${distance}km`}
        />
        <ResultTableRow title={t(`${i18nRoot}.time`)} value={`${time}`} />
        <ResultTableRow title={t(`${i18nRoot}.pace`)} value={`${pace}/km`} />
        <ResultTableRow
          title={t(`${i18nRoot}.checkpoints`)}
          value={`${currentOptionIndex + 1}/${totalOptions}`}
        />
      </View>
    </ElevatedContainer>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 32,
      gap: 16,
    },
    table: {
      justifyContent: "space-between",
      backgroundColor: theme.surfaceContainerLow,
      width: "100%",
      borderRadius: 8,
      padding: 16,
    },
  });
