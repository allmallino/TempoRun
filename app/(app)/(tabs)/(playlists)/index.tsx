import { View, StyleSheet, StatusBar } from "react-native";
import ThemedText from "@/components/ThemedText";
import PlaylistCardList from "@/components/playlistMenu/PlaylistCardList";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { router } from "expo-router";
import useTheme from "@/hooks/useTheme";
import { Theme } from "@/theme/types";

export default function PlaylistsScreen() {
  const styles = useTheme(getStyles);

  return (
    <View style={styles.mainContainer}>
      <ThemedText type="title">Playlists</ThemedText>
      <PlaylistCardList />
      <FloatingActionButton
        icon={"plus"}
        onPress={() => {
          router.navigate("/import");
        }}
      />
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
      gap: 25,
      paddingHorizontal: 16,
      paddingTop: 45 + (StatusBar.currentHeight || 0),
      backgroundColor: theme.surfaceContainerLow,
    },
  });
