import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import MusicServiceButton from "../MusicServiceButton";
import { getPlatformIcon } from "@/helpers";
import useSpotifyAuth from "@/hooks/useSpotifyAuth";

export default function MusicButtonsContainer() {
  const { t } = useTranslation();
  const i18nRoot = "app:settings:accountLinkage";
  const [error, isAuthenticated, authenticateAsync] = useSpotifyAuth();
  return (
    <View style={styles.container}>
      <ThemedText>{t(`${i18nRoot}.link`)}</ThemedText>
      <ScrollView horizontal contentContainerStyle={styles.buttonContainer}>
        {!isAuthenticated && (
          <MusicServiceButton
            icon={getPlatformIcon("Spotify")}
            onPress={authenticateAsync}
          />
        )}
        <MusicServiceButton
          icon={getPlatformIcon("Apple Music")}
          onPress={() => {}}
        />
        <MusicServiceButton
          icon={getPlatformIcon("YouTube Music")}
          onPress={() => {}}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  buttonContainer: {
    gap: 12,
  },
});
