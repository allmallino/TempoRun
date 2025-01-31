import ActiveModeCard from "@/components/mainMenu/ActiveModeCard";
import ActivePlaylistCardList from "@/components/mainMenu/ActivePlaylistCardList";
import ThemedButton from "@/components/ThemedButton";
import { Theme } from "@/theme/types";
import useTheme from "@/hooks/useTheme";
import { Image } from "expo-image";
import { View, StyleSheet, StatusBar } from "react-native";
import useLogo from "@/hooks/useLogo";

export default function HomeScreen() {
  const styles = useTheme(getStyle);
  const logo = useLogo();

  return (
    <View style={styles.mainContainer}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <ThemedButton title="Let's run" style={styles.letsRunButton} />
      </View>
      <ActiveModeCard />
      <ActivePlaylistCardList />
    </View>
  );
}

const getStyle = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
      gap: 25,
      paddingHorizontal: 16,
      paddingTop: 45 + (StatusBar.currentHeight || 0),
      paddingBottom: 25,
      backgroundColor: theme.surfaceContainerLow,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: "center",
    },
    logo: {
      height: 80,
      width: 323,
    },
    letsRunButton: {
      width: 156,
      height: 60,
    },
  });
