import { StyleSheet } from "react-native";
import CompactPlaylistCardList from "../CompactPlaylistCardList";
import ThemedText from "@/components/ThemedText";
import ElevatedContainer from "@/components/ui/ElevatedContainer";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { getActivatedPlaylists } from "@/state/playlists/selectors";

export default function ActivePlaylistCardList() {
  const playlists = useSelector(getActivatedPlaylists);

  return (
    <Link href="/(app)/(tabs)/(playlists)">
      <ElevatedContainer style={styles.container} elevation={3}>
        <ThemedText type="defaultSemiBold">Playlists</ThemedText>
        <CompactPlaylistCardList playlists={playlists} />
      </ElevatedContainer>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 5,
    paddingTop: 12,
    paddingBottom: 30,
    height: 270,
  },
});
