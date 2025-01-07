import { StyleSheet, View } from "react-native";
import { PlaylistItem } from "./PlaylistItem";

export function PlaylistList({ playlists }: { playlists: string[] }) {
  return (
    <View style={styles.container}>
      {playlists.map((v, i) => (
        <PlaylistItem name={v} key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap:8,
    width:"100%"
  },
});
