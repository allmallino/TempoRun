import { FlatList, StyleSheet } from "react-native";
import { PlaylistContainer } from "../PlaylistContainer/PlaylistContainer";

type PlaylistType = {
  name: string;
  platform: "Spotify" | "Apple Music" | "YouTube Music";
  id: number;
};

export function PlaylistList() {
  const data: Array<PlaylistType> = [
    { name: "Hip-Hop", platform: "Spotify", id: 1 },
    { name: "Jazz", platform: "Spotify", id: 2 },
    { name: "Rock", platform: "YouTube Music", id: 3 },
    { name: "Pop", platform: "Spotify", id: 4 },
    { name: "Hyper Pop", platform: "Spotify", id: 5 },
    { name: "Death Grips collection", platform: "Apple Music", id: 6 },
    { name: "This is Eminem", platform: "Spotify", id: 7 },
    { name: "This is Kanye West", platform: "Spotify", id: 8 },
    { name: "Rap", platform: "Apple Music", id: 9 },
  ];
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <PlaylistContainer
          name={item.name}
          platform={item.platform}
          key={item.id}
        />
      )}
      style={styles.container}
      contentContainerStyle={{
        gap: 8,
      }}
      showsVerticalScrollIndicator={false}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
