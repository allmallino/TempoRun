import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import AddMusicServicesContainer from "../MusicServiceButtonsContainer";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import MusicServicesCard from "../MusicServicesCard";
import { useSelector } from "react-redux";
import { getStreamingServices } from "@/state/streaming/selectors";

export default function MusicServicesContainer() {
  const { t } = useTranslation();
  const i18nRoot = "app:settings:accountLinkage";
  const data = useSelector(getStreamingServices);

  return (
    <ElevatedContainer elevation={2} style={styles.container}>
      {data.length ? (
        <>
          <ThemedText style={styles.title}>{t(`${i18nRoot}.title`)}</ThemedText>
          <View style={styles.listContainer}>
            {data.map(({ info, id }) => (
              <MusicServicesCard
                key={id}
                id={id}
                platform={info.platform}
                name={info.name}
                profileImage={info.profileImage}
              />
            ))}
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
