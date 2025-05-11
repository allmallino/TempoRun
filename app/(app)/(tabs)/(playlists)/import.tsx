import { View, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import PlatformCardList from "@/components/playlistMenu/PlatformCardList";
import IconButton from "@/components/ui/IconButton";
import { router } from "expo-router";
import { ThemeContext } from "@/theme/ThemeContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ImportPlaylistsScreen() {
  const { theme } = useContext(ThemeContext);
  const color = theme.onSurfaceVariant;
  const { t } = useTranslation();
  const i18nRoot = "app:playlists";

  return (
    <SafeAreaView style={styles.mainContainer} edges={["left", "right", "top"]}>
      <View style={styles.headerButtonsContainer}>
        <IconButton icon="arrow.left" color={color} onPress={router.back} />
        <IconButton
          icon="gear"
          color={color}
          onPress={() => {
            router.navigate("/(app)/(tabs)/(settings)");
          }}
        />
      </View>
      <ThemedText type="title">{t(`${i18nRoot}.import`)}</ThemedText>
      <PlatformCardList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 25,
    marginTop: -45,
  },
  headerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: -20,
  },
});
