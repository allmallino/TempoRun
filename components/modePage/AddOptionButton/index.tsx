import ThemedButton from "@/components/ThemedButton";
import { addOption } from "@/state/mode/modeSlice";
import { MusicTempo } from "@/state/mode/types";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

export default function AddOptionButton() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const i18nRoot = "app:mode:table";

  const handleClick = () => {
    dispatch(
      addOption({
        indicator: "",
        musicTempo: MusicTempo.MEDIUM,
      })
    );
  };

  return (
    <View style={styles.container}>
      <ThemedButton
        title={t(`${i18nRoot}.addOption`)}
        type="text"
        icon="plus"
        onPress={handleClick}
        color={theme.onSurfaceVariant}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    padding: 4,
  },
});
