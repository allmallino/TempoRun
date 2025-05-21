import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import MusicServiceButton from "../MusicServiceButton";
import { getPlatformIcon } from "@/helpers";
import useSpotifyAuth from "@/hooks/useSpotifyAuth";
import React, { useEffect, useState } from "react";
import InfoModal from "@/components/mainMenu/InfoModal";

export default function MusicButtonsContainer() {
  const { t } = useTranslation();
  const i18nRoot = "app:settings:accountLinkage";
  const [error, isAuthenticated, authenticateAsync] = useSpotifyAuth();
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setErrorVisible(true);
    }
  }, [error]);

  return !isAuthenticated ? (
    <>
      {errorVisible && (
        <InfoModal
          title={t(`${i18nRoot}:error.title`)}
          description={`${t(`${i18nRoot}:error.description`)} ${error}`}
          visible={errorVisible}
          onClose={() => setErrorVisible(false)}
        />
      )}
      <View style={styles.container}>
        <ThemedText>{t(`${i18nRoot}.link`)}</ThemedText>
        <ScrollView horizontal contentContainerStyle={styles.buttonContainer}>
          <MusicServiceButton
            icon={getPlatformIcon("Spotify")}
            onPress={authenticateAsync}
          />
        </ScrollView>
      </View>
    </>
  ) : null;
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
