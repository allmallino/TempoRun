import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTrackActive } from "@/state/playlists/playlistSlice";
import { TrackInfo } from "./TrackInfo";
import { getTrackInfoById } from "@/state/tracks/selectors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useLocalSearchParams } from "expo-router";

type TrackContainerProps = {
  trackId: number;
  active?: boolean;
};

export function TrackContainer({ trackId, active }: TrackContainerProps) {
  const color = Colors.dark.onSurface;
  const trackInfo = useSelector(getTrackInfoById(trackId));
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();

  const toggleActivation = () => {
    dispatch(toggleTrackActive({ playlistId: Number(id), trackId }));
  };

  return (
    <Pressable onPress={toggleActivation}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: active
              ? Colors.dark.surfaceContainerHighest
              : Colors.dark.surface,
          },
        ]}
      >
        <TrackInfo
          name={trackInfo?.name || "Undefined"}
          artist={trackInfo?.artist || "Undefined"}
        />
        {active ? (
          <IconSymbol
            name="eye.fill"
            color={color}
            size={24}
            style={styles.icon}
          />
        ) : (
          <IconSymbol
            name="eye.slash.fill"
            color={color}
            size={24}
            style={styles.icon}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.outlineVariant,
    alignItems: "center",
    width: "100%",
  },

  icon: {
    padding: 16,
  },
});
