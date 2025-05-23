import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import AddMusicServicesContainer from "../MusicServiceButtonsContainer";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import MusicServicesCard from "../MusicServicesCard";
import { useSelector } from "react-redux";
import { getStreamingService } from "@/state/streaming/selectors";
import React from "react";

export default function MusicServicesContainer() {
  const { t } = useTranslation();
  const i18nRoot = "app:settings:accountLinkage";
  const serviceInfo = useSelector(getStreamingService);

  return (
    <ElevatedContainer elevation={2} style={styles.container}>
      {serviceInfo ? (
        <>
          <ThemedText style={styles.title}>{t(`${i18nRoot}.title`)}</ThemedText>
          <View style={styles.listContainer}>
            <MusicServicesCard
              key={serviceInfo.id}
              id={serviceInfo.id}
              name={serviceInfo.info.name}
              profileImage={serviceInfo.info.profileImage}
            />
          </View>
        </>
      ) : null}
      <AddMusicServicesContainer />
    </ElevatedContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 16,
  },
  listContainer: {
    gap: 8,
  },

  title: {
    textAlign: "center",
  },
});
