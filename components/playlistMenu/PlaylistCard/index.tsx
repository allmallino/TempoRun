import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { PlaylistInfoType } from "@/state/playlists/types";
import { useDispatch } from "react-redux";
import { toggleActive, toggleImported } from "@/state/playlists/playlistSlice";
import IconButton from "@/components/ui/IconButton";
import { getPlatformIcon } from "@/helpers";
import CardInfo from "../CardInfo";
import { useContext } from "react";
import { ThemeContext } from "@/theme/ThemeContext";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";

type PlaylistCardProps = {
  id: number;
  info: PlaylistInfoType;
  activated?: boolean;
  isImported?: boolean;
};

export default function PlaylistCard({
  info: { name, platform },
  id,
  activated,
  isImported,
}: PlaylistCardProps) {
  const { theme } = useContext(ThemeContext);
  const styles = useTheme(getStyle);
  const dispatch = useDispatch();

  const color = theme.onSurface;

  const toggleActivation = () => {
    dispatch(toggleActive(id));
  };

  const toggleImport = () => {
    dispatch(toggleImported(id));
  };

  return (
    <Pressable onPress={isImported ? toggleActivation : null}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: activated
              ? theme.surfaceContainerHighest
              : theme.surface,
          },
        ]}
      >
        {isImported && (
          <Image source={getPlatformIcon(platform)} style={styles.logo} />
        )}
        <CardInfo title={name} text={platform} />
        {isImported ? (
          <IconButton
            onPress={() => {
              router.navigate({
                pathname: "/settings/[id]",
                params: { id },
              });
            }}
            color={color}
            icon="ellipsis"
            style={styles.settingsButton}
          />
        ) : (
          <IconButton
            onPress={toggleImport}
            color={color}
            icon="plus"
            style={styles.settingsButton}
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

    logo: {
      width: 40,
      height: 40,
      padding: 8,
    },

    settingsButton: {
      padding: 16,
    },
  });
