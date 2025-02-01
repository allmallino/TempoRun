import { View, StyleSheet, StatusBar } from "react-native";
import ThemedText from "@/components/ThemedText";
import PlatformCardList from "@/components/playlistMenu/PlatformCardList";
import IconButton from "@/components/ui/IconButton";
import { router } from "expo-router";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function ImportPlaylistsScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = useTheme(getStyles);

  const color = theme.onSurfaceVariant;
  const { t } = useTranslation();
  const i18nRoot = "app:playlists";
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerButtonsContainer}>
        <IconButton icon="arrow.left" color={color} onPress={router.back} />
        <IconButton
          icon="gear"
          color={color}
          onPress={() => {
            router.navigate("/(app)/(tabs)/appSettings");
          }}
        />
      </View>
      <ThemedText type="title">{t(`${i18nRoot}.import`)}</ThemedText>
      <PlatformCardList />
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
      gap: 25,
      paddingHorizontal: 16,
      paddingTop: 5 + (StatusBar.currentHeight || 0),
      backgroundColor: theme.surfaceContainerLow,
    },
    headerButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: -20,
    },
  });
