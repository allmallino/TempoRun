import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getUnimportedPlaylists } from "@/state/playlists/selectors";
import PlatformCard from "../PlatformCard";
import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { getStreamingServices } from "@/state/streaming/selectors";

export default function PlatformCardList() {
  const { t } = useTranslation();
  const data = useSelector(getUnimportedPlaylists);
  const streamingServices = useSelector(getStreamingServices);
  const i18nRoot = "app:playlists";

  return Object.values(data).length ? (
    <FlatList
      data={Object.keys(data).sort()}
      renderItem={({ item }) => {
        const streamingService = streamingServices.find(
          (service) => service.id === item
        );
        return streamingService ? (
          <PlatformCard
            platform={streamingService.info.platform}
            name={streamingService.info.name}
            data={data[item]}
          />
        ) : null;
      }}
      style={styles.container}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <ThemedText type="defaultSemiBold">
      {t(`${i18nRoot}.noPlaylists`)}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  list: {
    gap: 25,
  },
});
