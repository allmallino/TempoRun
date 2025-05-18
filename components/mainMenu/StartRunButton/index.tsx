import ThemedButton from "@/components/ThemedButton";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import * as Location from "expo-location";
import { getAvailableDevices } from "@/services/spotifyService";
import { useStreamingServiceToken } from "@/hooks/useStreamingServiceToken";
import InfoModal from "@/components/mainMenu/InfoModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getSelectedMode, getSelectedOptions } from "@/state/mode/selectors";
import { getActivatedPlaylist } from "@/state/playlists/selectors";
import { Mode } from "@/state/mode/types";
import React from "react";

type StartSessionError = {
  message:
    | "noOptions"
    | "noActivePlaylist"
    | "noSongs"
    | "noToken"
    | "noDevices"
    | "noForegroundPermissions"
    | "noBackgroundPermissions";
};

export default function StartRunButton() {
  const { t } = useTranslation();
  const i18nRoot = "app:menu";
  const { getToken } = useStreamingServiceToken();
  const [infoModalState, setInfoModalState] = useState({
    visible: false,
    description: "",
  });

  const options = useSelector(getSelectedOptions);
  const activePlaylist = useSelector(getActivatedPlaylist);
  const mode = useSelector(getSelectedMode);

  const validateRunRequirements = () => {
    if (options.length === 1 && mode !== Mode.PACE) {
      throw new Error("noOptions");
    }
    if (!activePlaylist) {
      throw new Error("noActivePlaylist");
    }
    if (activePlaylist.tracks?.filter((track) => track.active).length === 0) {
      throw new Error("noSongs");
    }
  };

  const checkSpotifyRequirements = async () => {
    const accessToken = await getToken();
    if (!accessToken) {
      throw new Error("noToken");
    }
    const devices = await getAvailableDevices(accessToken);
    if (devices?.length === 0) {
      throw new Error("noDevices");
    }
  };

  const checkLocationPermissions = async () => {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== "granted") {
      throw new Error("noForegroundPermissions");
    }

    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus !== "granted") {
      throw new Error("noBackgroundPermissions");
    }
  };

  const startSession = async () => {
    try {
      validateRunRequirements();
      await checkSpotifyRequirements();
      await checkLocationPermissions();
      router.navigate("../(running)");
    } catch (error) {
      console.error("Error starting session:", error);
      const typedError = error as StartSessionError;
      setInfoModalState({
        visible: true,
        description: t(`${i18nRoot}:infoModal.${typedError.message}`),
      });
    }
  };

  return (
    <>
      <InfoModal
        visible={infoModalState.visible}
        title={t(`${i18nRoot}:infoModal.title`)}
        description={infoModalState.description}
        onClose={() =>
          setInfoModalState((prev) => ({ ...prev, visible: false }))
        }
      />
      <ThemedButton
        title={t(`${i18nRoot}.run`)}
        style={styles.button}
        onPress={startSession}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 156,
    height: 60,
  },
});
