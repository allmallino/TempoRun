import { View, StyleSheet, BackHandler } from "react-native";
import InfoModal from "@/components/mainMenu/InfoModal";
import { useTranslation } from "react-i18next";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";

export default function NoInternetError() {
  const styles = useTheme(getStyle);
  const { t } = useTranslation();
  const i18n_root = "app:noInternetModal";

  const handleClose = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <InfoModal
        visible={true}
        isClosableOutside={false}
        title={t(`${i18n_root}.title`)}
        description={t(`${i18n_root}.description`)}
        onClose={handleClose}
      />
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surfaceContainerLow,
      flex: 1,
    },
  });
