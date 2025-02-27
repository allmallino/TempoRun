import { StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import PlaylistCardList from "@/components/playlistMenu/PlaylistCardList";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlaylistsScreen() {
  const { t } = useTranslation();
  const i18nRoot = "app:playlists";

  return (
    <SafeAreaView style={styles.mainContainer} edges={["left", "right", "top"]}>
      <ThemedText type="title">{t(`${i18nRoot}.title`)}</ThemedText>
      <PlaylistCardList />
      <FloatingActionButton
        icon={"plus"}
        onPress={() => {
          router.navigate("/import");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    gap: 25,
  },
});
