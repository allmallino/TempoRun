import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getUnimportedPlaylists } from "@/state/playlists/selectors";
import PlatformCard from "../PlatformCard";
import ThemedText from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { getStreamingServiceInfo } from "@/state/streaming/selectors";

export default function PlatformCardList() {
  const { t } = useTranslation();
  const data = useSelector(getUnimportedPlaylists);
  const streamingService = useSelector(getStreamingServiceInfo);
  const i18nRoot = "app:playlists";
  return (
    <FlatList
      data={Object.keys(data).sort()}
      renderItem={({ item }) => {
        return streamingService ? (
          <PlatformCard name={streamingService.name} data={data[item]} />
        ) : null;
      }}
      style={styles.container}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <ThemedText type="defaultSemiBold" style={styles.text}>
          {t(`${i18nRoot}.noAccounts`)}
        </ThemedText>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  list: {
    gap: 25,
  },
  text: {
    textAlign: "center",
  },
});
