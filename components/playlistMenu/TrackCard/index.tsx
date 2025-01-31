import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTrackActive } from "@/state/playlists/playlistSlice";
import CardInfo from "../CardInfo";
import { getTrackInfoById } from "@/state/tracks/selectors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import useTheme from "@/hooks/useTheme";
import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";

type TrackCardProps = {
  trackId: number;
  active?: boolean;
};

export default function TrackCard({ trackId, active }: TrackCardProps) {
  const { theme } = useContext(ThemeContext);
  const styles = useTheme(getStyle);

  const trackInfo = useSelector(getTrackInfoById(trackId));
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();

  const color = theme.onSurface;

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
              ? theme.surfaceContainerHighest
              : theme.surface,
          },
        ]}
      >
        <CardInfo
          title={trackInfo?.name || "Undefined"}
          text={trackInfo?.artist || "Undefined"}
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

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 16,
      gap: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.outlineVariant,
      alignItems: "center",
      width: "100%",
    },

    icon: {
      padding: 16,
    },
  });
